import { select, scaleLinear, axisBottom, axisLeft } from "d3";
import { useRef, useEffect } from "react";
import { useColumnDataContext } from "../../../../hooks/useColumnDataContext";
import { ITransversalResultsDisplay } from "../../../../interfaces/ITransversalResultsDisplay";
import { fitLinearPolynomialFunction } from "../../../../utilities/fitLinearPolynomialFunction";


export function TransversalResultSVG({...props}: ITransversalResultsDisplay) {
    const { state } = useColumnDataContext();
    const resultsSvg = useRef<SVGSVGElement | null>(null)
    
    useEffect(() => {
        const svg = select(resultsSvg.current)
        const desiredDiagram = props.diagram
        const solicitingForcesKey = props.forces
        
        svg.selectAll('g').remove()
        svg.selectAll('text').remove()

        if (!state.results.isResultsAvailable) {
            const width = parseInt(svg.style('width'))
            const height = parseInt(svg.style('height'))
            const fontSize = width/20

            svg.append('text')
                .attr('x', width/2)
                .attr('y', height/2)
                .text('RESULTADOS NÃO DISPONÍVEIS')
                .attr('text-anchor', 'middle')
                .style('font-weigth', 700 )
                .style('font-size', `${fontSize}` )
                .style('fill', '#8E3A9D' )
            return
        }

        svg.append('g').attr('id', 'axis')
        svg.append('g').attr('id', 'soliciting-forces')
        svg.append('g').attr('id', 'resistance-diagram')
        svg.append('g').attr('id', 'title')

        let diagramPoints:[number, number][];
        let anglePoints:number[];
        let solicitingForces:number[];

        if (state.results.anglesResistanceDiagramPoints != null 
            && state.results[desiredDiagram] != null
            && state.results[solicitingForcesKey] != null) {

            anglePoints = state.results.anglesResistanceDiagramPoints;
            diagramPoints = state.results[desiredDiagram] as [number, number][];
            solicitingForces = state.results[solicitingForcesKey] as number[];
        } else {
            return
        }
        
        if (diagramPoints != null && solicitingForces != null && anglePoints != null) {
            let graphAngle:number;
            const mx = solicitingForces[0]
            const my = solicitingForces[1]
            const auxAngle = (180/Math.PI) * Math.atan(Math.abs(my) / Math.abs(mx))

            if (mx === 0) {
                if (my > 0) {
                    graphAngle = 90 
                } else if (my < 0) {
                    graphAngle = 270
                } else {
                    graphAngle = 0
                } 
            } else if (mx > 0 && my > 0) {
                graphAngle = auxAngle
            } else if (mx < 0 && my >= 0) {
                graphAngle = 180 - auxAngle
            } else if (mx < 0 && my < 0) {
                graphAngle = 180 + auxAngle
            } else {
                graphAngle = 360 - auxAngle
            }

            let afterAngle = 0;
            let loopIndex = 0;
            const sortedAngles = [...anglePoints]

            for (let angle of sortedAngles.sort(function(a, b){return a-b})) {
                if (angle > graphAngle) {
                    afterAngle = sortedAngles[loopIndex]
                    break
                } else if (loopIndex === sortedAngles.length - 1) {
                    afterAngle = sortedAngles[loopIndex]
                }
                loopIndex++
            }

            const angleIndex = anglePoints.indexOf(afterAngle)
            const beforeMx = diagramPoints[angleIndex - 1][0]
            const afterMx = diagramPoints[angleIndex][0]
            const beforeMy = diagramPoints[angleIndex - 1][1]
            const afterMy = diagramPoints[angleIndex][1]
            let safetyFactor;

            if (Math.abs(mx) > 0.005 || Math.abs(my) > 0.005) {
                //FIND SAFETY FACTOR
                let [mr, nr] = fitLinearPolynomialFunction(beforeMx, afterMx, beforeMy, afterMy);
                const [ms, ns] = fitLinearPolynomialFunction(0, mx, 0, my);
                const xIntersect = (ns - nr) / (mr - ms)
                const yIntersect = ms * xIntersect + ns
                const intersectDistance = Math.sqrt(Math.pow(xIntersect, 2) + Math.pow(yIntersect, 2))
                const solicitingDistance = Math.sqrt(Math.pow(mx, 2) + Math.pow(my, 2))  
                safetyFactor =  intersectDistance / solicitingDistance;
                safetyFactor = isNaN(safetyFactor) ? 100 : safetyFactor 
            } else {
                safetyFactor = 100;
            }

            let maxMx = 0;
            let minMx = 0;
            let maxMy = 0;
            let minMy = 0;

            diagramPoints.forEach((point) => {
                const currentMx = point[0]
                const currentMy = point[1]
                maxMx = currentMx > maxMx ? currentMx : maxMx
                minMx = currentMx < minMx ? currentMx : minMx
                maxMy = currentMy > maxMy ? currentMy : maxMy
                minMy = currentMy < minMy ? currentMy : minMy
            })

            const absMaxMx = Math.abs(maxMx) > Math.abs(minMx) ? Math.abs(maxMx) : Math.abs(minMx);
            const absMaxMy = Math.abs(maxMy) > Math.abs(minMy) ? Math.abs(maxMy) : Math.abs(minMy);
            const maxValue = absMaxMx > absMaxMy ? absMaxMx : absMaxMy
            const width = parseInt(svg.style('width'))
            const height = parseInt(svg.style('height'))
            const hMargin = 0.1
            const domainMargin = 0.2
            const vMargin = 0.1
            const xScale = scaleLinear()
                        .domain([-(1+domainMargin)*absMaxMx, (1+domainMargin)*absMaxMx])
                        .range([hMargin*width, (1-hMargin)*width])
            const yScale = scaleLinear()
                        .domain([(1+domainMargin)*absMaxMy, -(1+domainMargin)*absMaxMy])
                        .range([vMargin*height, (1-vMargin)*height])
            let previousPoint:number[];

            diagramPoints.forEach((point, index) => {
                if (index > 0) {

                    svg.select('#resistance-diagram')
                    .append('line')
                    .attr('x1', xScale(point[0]))
                    .attr('x2', xScale(previousPoint[0]))
                    .attr('y1', yScale(point[1]))
                    .attr('y2', yScale(previousPoint[1]))
                    .style('stroke', 'purple')
                    .style('stroke-width', '2px')
                }

                previousPoint = point;
            })

            svg.select('#soliciting-forces')
                .append('circle')
                .attr('cx', xScale(mx))
                .attr('cy', yScale(my))
                .attr('r', '5px')
                .style('fill', `${safetyFactor > 1 ? 'green' : 'red'}`)

            svg.select('#axis')
                .append('g')
                .attr('transform', `translate (0, ${height/2})`)
                .call(axisBottom(xScale).ticks(10).tickFormat((interval,i) => {
                    return i%2 !== 0 ? " ": interval.toString();
                   }))
                

            svg.select('#axis')
                .append('g')
                .attr('transform', `translate (${width/2}, 0)`)
                .call(axisLeft(yScale).ticks(10).tickFormat((interval,i) => {
                    return i%2 !== 0 ? " ": interval.toString();
                   }))
                

            svg.select('#axis')
                .append('text')
                .attr("x", (1-hMargin) * width)
                .attr("y", yScale(0))
                .attr('text-anchor', 'start')
                .style('font-size', '0.8rem')
                .style('fill', '#9c32af')
                .text('Mx')
                .style('font-weigth', 700)
                .style('font-family', 'Poppins')

            svg.select('#axis')
                .append('text')
                .attr("x", xScale(0))
                .attr("y", (1-vMargin/3) * height)
                .attr('text-anchor', 'start')
                .style('font-size', '0.8rem')
                .style('fill', '#9c32af')
                .text('My')
                .style('font-weigth', 700)
                .style('font-family', 'Poppins')

            svg.select('#title')
                .append("text")
                .attr("x", width/2)
                .attr("y", vMargin/1.5*height)
                .attr("text-anchor", "middle")
                .style("font-size", "0.8rem")
                .text(`FS:${safetyFactor.toFixed(2)} - Mx:${mx.toFixed(2)} kN.m - My:${my.toFixed(2)} kN.m`)
                .style('fill', `${safetyFactor > 1? 'green' : 'red'}`)
                .style('font-weight', 700)
                .style('font-family', 'Poppins')
        }
    }, [props, state.results])

    return (
        <>
            <div className="flex border-brandPurple-300 border-2 rounded-2xl bg-white w-full justify-center text-center items-center aspect-square md:aspect-video mt-2" id="svg-d3-results">
                <svg className='w-full h-full'ref={resultsSvg}></svg>
            </div>
        </>)
}
