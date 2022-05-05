import { select, scaleLinear, axisBottom } from "d3";
import { useRef, useEffect } from "react";
import { useColumnDataContext } from "../../hooks/useColumnDataContext";
import { ILongitudinalResultsDisplay } from "../../interfaces/ILongitudinalResultsDisplay";
import '../../styles/results-svg.scss'


export function LongitudinalResultSVG({...props}: ILongitudinalResultsDisplay) {

    const { state } = useColumnDataContext();

    const resultsSvg = useRef<SVGSVGElement | null>(null)
    
    useEffect(() => {


        const svg = select(resultsSvg.current)
        
        
        const desiredResult = props.result
        const title = props.title
        const unit = props.unit
        
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
                .style('fill', 'red' )
            return
        }

        svg.append('g').attr('id', 'axis')
        svg.append('g').attr('id', 'result-line')
        svg.append('g').attr('id', 'column-line')
        svg.append('g').attr('id', 'title')

        let lengthPoints:number[];
        let columnLength:number;
        let lastIndex:number;

        if (state.results.lengthPoints != null) {
            lengthPoints = state.results.lengthPoints;
            lastIndex = lengthPoints.length - 1
            columnLength = lengthPoints[lastIndex];
        } else {
            return
        }
        
        let resultValues:number[];

        if (desiredResult != null) {
            resultValues = state.results[desiredResult] as number[]
        } else {
            return
        }

        if (resultValues != null) {

            const notPlottedValueIndexes = [1, 2, 3, 5, 6, 7,
                lastIndex - 1, lastIndex - 2, lastIndex - 3, 
                lastIndex - 5, lastIndex - 6,
                lastIndex - 7]

            let previousValue:number;


            const maxResult = Math.max(...resultValues)  > columnLength/5 ? Math.max(...resultValues) : columnLength/5;
            const minResult = Math.min(...resultValues)  < -columnLength/5 ? Math.min(...resultValues) : -columnLength/5;
            const absMax = Math.abs(maxResult) > Math.abs(minResult) ? Math.abs(maxResult) : Math.abs(minResult);

            const hMargin = 0.05
            const domainMargin = 0.5
            const vMargin = 0.05

            const viewBoxParams = {
                x: absMax,
                y: columnLength,
            }

            const width = parseInt(svg.style('width'))
            const height = parseInt(svg.style('height'))

            const xScale = scaleLinear()
                        .domain([-(1+domainMargin)*viewBoxParams.x, (1+domainMargin)*viewBoxParams.x])
                        .range([hMargin*width, (1-hMargin)*width])

            const yScale = scaleLinear()
                        .domain([columnLength, 0])
                        .range([vMargin*height, (1-vMargin)*height])

            svg.select('#axis')
                .append('g')
                .attr('transform', `translate (0, ${(1-vMargin)*height})`)
                .call(axisBottom(xScale))

            resultValues.map((value, index) => {

                if (!notPlottedValueIndexes.includes(index)) {
                    
                    const roundedValue = Math.round(value*1000)/1000


                    svg.select('#result-line')
                    .append('line')
                    .attr('x1', xScale(0))
                    .attr('x2', xScale(roundedValue))
                    .attr('y1', yScale(lengthPoints[index]))
                    .attr('y2', yScale(lengthPoints[index]))
                    .style('stroke', 'green')
                    .style('stroke-width', '1px')
                    

                    if (index > 0) {
                        const previousIndex = resultValues.indexOf(previousValue);

                        svg.select('#result-line')
                            .append('line')
                            .attr('x1', xScale(roundedValue))
                            .attr('x2', xScale(previousValue))
                            .attr('y1', yScale(lengthPoints[index]))
                            .attr('y2', yScale(lengthPoints[previousIndex]))
                            .style('stroke', 'green')
                            .style('stroke-width', '0.5px')
                    }

                    if (value == Math.max(...resultValues) || value == Math.min(...resultValues)) {

                        if(roundedValue < 0) {
                            svg.select('#title')
                            .append('text')
                            .attr('x', xScale(roundedValue))
                            .attr('y', yScale(lengthPoints[index]))
                            .attr('text-anchor', 'end')
                            .style('font-size', '12px')
                            .style('font-weight', 700)
                            .text(`${roundedValue} ${unit}`)
                            
                        } else if (roundedValue > 0) {
                            svg.select('#title')
                            .append('text')
                            .attr('x', xScale(roundedValue))
                            .attr('y', yScale(lengthPoints[index]))
                            .attr('text-anchor', 'start')
                            .style('font-size', '12px')
                            .style('font-weight', 700)
                            .text(`${roundedValue} ${unit}`)
                        }

                    }

                    previousValue = value;
                } 
            })

            svg.select('#column-line')
                .append('line')
                .attr('x1', xScale(0))
                .attr('x2', xScale(0))
                .attr('y1', yScale(0))
                .attr('y2', yScale(columnLength))
                .style('stroke', '#000')
                .style('stroke-width', '5px')


            svg.select('#title')
                .append("text")
                .attr("x", width/2)
                .attr("y", vMargin/2*height)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .text(`${title}`)
                .style('font-weight', 700)
                .style('font-family', 'Poppins')

            
        }
    }, [props])

    return (
        <>
            <div className="svg-container" id="svg-d3-results">
                <svg className='svg-results'ref={resultsSvg}></svg>
            </div>
        </>)
}
