/* eslint-disable no-lone-blocks */
import { useEffect, useRef } from "react";
import { select } from 'd3-selection';
import { axisBottom, axisLeft, scaleLinear } from "d3";
import { useColumnDataContext } from "../../../hooks/useColumnDataContext";

export function CrossSectionSVG () {
    const { state,  dispatch } = useColumnDataContext();
    const crossSectionSvg = useRef<SVGSVGElement | null>(null)
    
    useEffect(() => {
        const svg = select(crossSectionSvg.current)
              
        svg.selectAll('g').remove()
        svg.selectAll('rect').remove()
        svg.selectAll('circle').remove()

        let rectXVertices = [] as number[];
        let rectYVertices = [] as number[];

        svg.append('g').attr('id', 'rects')
        svg.append('g').attr('id', 'rebars')
        svg.append('g').attr('id', 'axis')
        svg.append('g').attr('id', 'lines')
        
        {Object.values(state.rectangleList).forEach((rectangle) => {
            const classStyle = rectangle.isHighlighted ? 'fill-brandPurple-300 stroke-black duration-150 stroke-[0.25px]' : 'fill-gray-500 stroke-black hover:fill-brandBlue-300 duration-150 stroke-[0.25px]'

            svg.select('#rects')
            .append('rect')
            .attr('width', rectangle.width)
            .attr('height', rectangle.height)
            .attr('x', rectangle.xCenterCoordinate - rectangle.width/2)
            .attr('y', -rectangle.yCenterCoordinate - rectangle.height/2)
            .attr('id', rectangle.index)
            .attr('class', `${classStyle}`)
            .on('mouseover', function() {
                select(this)
                .attr('x', `${rectangle.xCenterCoordinate - rectangle.width/2 - 0.05*rectangle.width}`)
                .attr('y', `${-rectangle.yCenterCoordinate - rectangle.height/2 - 0.05*rectangle.height}`)
                .attr('width', `${1.10*rectangle.width}`)
                .attr('height', `${1.10*rectangle.height}`)
                .style('cursor', 'pointer')
                .raise()
                .transition('150')
            })
            .on('mouseleave', function() {
                select(this)
                .attr('width', rectangle.width)
                .attr('height', rectangle.height)
                .attr('x', rectangle.xCenterCoordinate - rectangle.width/2)
                .attr('y', -rectangle.yCenterCoordinate - rectangle.height/2)
                .transition('150')
            })
            .on('click', function(this) {
                dispatch({type:'select-element', payload:{element:this}})
            })

            rectXVertices = [...rectXVertices,
                rectangle.xCenterCoordinate - rectangle.width/2,
                rectangle.xCenterCoordinate + rectangle.width/2]

            rectYVertices = [...rectYVertices,
                rectangle.yCenterCoordinate - rectangle.height/2,
                rectangle.yCenterCoordinate + rectangle.height/2]
        })};

        const leftMostVertice = Math.min(...rectXVertices)
        const rigthMostVertice = Math.max(...rectXVertices)   
        const horizontalDistance = Math.abs(rigthMostVertice - leftMostVertice)
        const downMostVertice = Math.min(...rectYVertices)
        const upMostVertice = Math.max(...rectYVertices)
        const verticalDistance = Math.abs(upMostVertice - downMostVertice)
        let viewBoxParams = {
            x: NaN,
            y: NaN,
            width: NaN,
            heigth: NaN
        }

        if ( horizontalDistance >= verticalDistance ) {
            const difference = horizontalDistance - verticalDistance
            viewBoxParams = {
                x: leftMostVertice - 0.05*horizontalDistance,
                y: -upMostVertice - difference/2 - 0.05*horizontalDistance,
                width: 1.10*horizontalDistance,
                heigth: 1.10*horizontalDistance
            }
        } else {
            const difference = verticalDistance - horizontalDistance
            viewBoxParams = {
                x: leftMostVertice - difference/2 - 0.05*verticalDistance,
                y: -upMostVertice - 0.05*verticalDistance,
                width: 1.10*verticalDistance,
                heigth: 1.10*verticalDistance
            }
        }
        
        if (state.rectangleList.length > 0 ) {
            svg.attr('viewBox', `${viewBoxParams.x} ${viewBoxParams.y} ${viewBoxParams.width} ${viewBoxParams.heigth}`)

        }
        
        {Object.values(state.rebarList).forEach((rebar) => {
            const classStyle = rebar.isHighlighted ? 'fill-brandPurple-300 stroke-black duration-150 stroke-[0.1px]' : 'fill-red-600 stroke-black hover:fill-brandBlue-300 duration-150 stroke-[0.1px]'
            
            svg.select('#rebars')
            .append('circle')
            .attr('cx', rebar.xCenterCoordinate)
            .attr('cy', -rebar.yCenterCoordinate)
            .attr('r', rebar.diameter/20)
            .attr('id', rebar.index)
            .attr('class', `${classStyle}`)
            .on('mouseover', function() {
                select(this)
                .attr('r', `${1.5*rebar.diameter/20}`).transition('150')
                .style('cursor', 'pointer')
            })
            .on('mouseleave', function() {
                select(this).attr('r', `${rebar.diameter/20}`).transition('150')
            })
            .on('click', function(this) {
                dispatch({type:'select-element', payload:{element:this}})
            })
        })}
        
        if (state.rectangleList.length > 0) {
            const xScale = scaleLinear()
                        .domain([viewBoxParams.x, (viewBoxParams.x + viewBoxParams.width)])
                        .range([viewBoxParams.x, (viewBoxParams.x + viewBoxParams.width)])
    
            const yScale = scaleLinear()
                        .domain([-viewBoxParams.y, (-viewBoxParams.y - viewBoxParams.heigth)])
                        .range([viewBoxParams.y, (viewBoxParams.y + viewBoxParams.heigth)])

            const fontScale = viewBoxParams.width * 0.025
            const tickScale = viewBoxParams.width * 0.025
                        
            svg.select('#axis')
                .append('g')
                .style('font', `${fontScale}px times`)
                .style('stroke', '0.5px')
                .style('stroke-width', '0.1px')
                .call(axisBottom(xScale).tickSizeInner(tickScale).tickSize(tickScale).tickPadding(1).offset(0))
                
            svg.select('#axis')
                .append('g')
                .style('font', `${fontScale}px times`)
                .style('stroke', '0.5px')
                .style('stroke-width', '0.1px')
                .call(axisLeft(yScale).tickSizeInner(tickScale).tickSize(tickScale).tickPadding(1).offset(0))

        }
    }, [state.rectangleList, state.rebarList, dispatch])

    return (
        <div className="flex border-brandPurple-300 rounded-2xl bg-white w-full justify-center text-center items-center mb-3 aspect-square" id="svg-d3">
            <svg className='w-[90%] h-[90%]' ref={crossSectionSvg}></svg>
        </div>
    )
}