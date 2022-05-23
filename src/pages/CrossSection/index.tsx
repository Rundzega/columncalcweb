/* eslint-disable no-lone-blocks */
import React, { SVGProps, useEffect, useRef, useState } from 'react'
import AddButton from '../../components/AddButton';
import RemoveButton from '../../components/RemoveButton';
import errorMsg from '../../utilities/errorMsg';
import handleValidateNumber from '../../utilities/handleValidateNumber';
import handleValidateMinimum from '../../utilities/handleValidateMinimum';
import { select } from 'd3-selection'
import handleCheckRectOverlap from '../../utilities/handleCheckOverlap';
import handleCheckInsideRect from '../../utilities/handleCheckInsideRect';
import { axisBottom, axisLeft, line, scaleLinear, } from 'd3';
import NextPageButton from '../../components/NextPageButton';
import PreviousPageButton from '../../components/PreviousPageButton';
import { useColumnDataContext } from '../../hooks/useColumnDataContext';


function CrossSection() {
    
    const { state,  dispatch } = useColumnDataContext();
    
    const [rectProps, setRectProps] = useState({
        width: 25,
        height: 40,
        xCoord: 0,
        yCoord: 0
    })

    const [rebarProps, setRebarProps] = useState({
        diameter: 5.0,
        xCoord: 0,
        yCoord: 0    
    })
        
    const crossSectionSvg = useRef<SVGSVGElement | null>(null)
    const rectTable = useRef<HTMLTableSectionElement | null>(null)
    const rebarTable = useRef<HTMLTableSectionElement | null>(null)
    
    useEffect(() => {
        
        const svg = select(crossSectionSvg.current)
              
        svg.selectAll('g').remove()
        svg.selectAll('rect').remove()
        svg.selectAll('circle').remove()

        let rectXVertices = Array() as number[];
        let rectYVertices = Array() as number[];

        svg.append('g').attr('id', 'rects')
        svg.append('g').attr('id', 'rebars')
        svg.append('g').attr('id', 'axis')
        svg.append('g').attr('id', 'lines')
        
        {Object.values(state.rectangleList).map((rectangle) => {
            
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
        
        {Object.values(state.rebarList).map((rebar) => {
            
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


    }, [state.rectangleList, state.rebarList])

    return (
        <>
            <div className="flex flex-col justify-center max-w-3xl items-center m-auto py-6 px-9 rounded-3xl">
                <h2 className="text-brandPurple-300 text-2xl font-bold">Seção Transversal</h2>
                <div className="flex border-brandPurple-300 rounded-2xl bg-white w-full justify-center text-center items-center mb-3 aspect-square" id="svg-d3">
                    <svg className='w-[90%] h-[90%]' ref={crossSectionSvg}></svg>
                </div>
                <div className="border-brandPurple-300 w-full p-5 my-3 rounded-2xl bg-white">
                    <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Adicionar Seção</div>
                    <div className="flex flex-col justify-between items-stretch h-full md:flex-row">
                        <div className="w-full h-full justify-between flex flex-col md:w-[calc(100%/2-0.75rem)]">
                            <form className='flex flex-wrap justify-between' action="#">
                                <div className="py-1 w-full flex flex-col">
                                    <span className='ml-2 text-sm text-brandGreen-300'>Largura (cm)</span>
                                    <input type="number" 
                                    min={0}
                                    required
                                    defaultValue={rectProps.width}
                                    onBlur={(e) => {
                                        if(handleValidateMinimum(e, 1, ('Largura deve ser um número positivo'))) {

                                            e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                                            setRectProps({...rectProps, width:parseFloat(e.target.value)})
                                            return
                                        } else {
                                            e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                                        }
                                        e.target.value = String(rectProps.width)
                                    }}
                                    className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" />
                                </div>
                                <div className="py-1 w-full flex flex-col">
                                    <span className='ml-2 text-sm text-brandGreen-300'>Altura (cm)</span>
                                    <input type="number"
                                    min={0} 
                                    required 
                                    defaultValue={rectProps.height}
                                    onBlur={(e) => {
                                        if(handleValidateMinimum(e, 1, 'Altura deve ser um número positivo')) {

                                            e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                                            setRectProps({...rectProps, height:parseFloat(e.target.value)})
                                            return
                                        } else {
                                            e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                                        }
                                        e.target.value = String(rectProps.height)
                                    }}
                                    className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" />
                                </div>
                                <div className="py-1 w-full flex flex-col">
                                    <span className='ml-2 text-sm text-brandGreen-300'>Coord. X CG (cm)</span>
                                    <input 
                                        type="number" 
                                        required 
                                        defaultValue={rectProps.xCoord}
                                        onBlur={(e) => {
                                            if(handleValidateNumber(e, 'A coordenada X do CG deve ser um número')) {

                                                e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                                                setRectProps({...rectProps, xCoord:parseFloat(e.target.value)})
                                                return
                                            } else {
                                                e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                                            }
                                            e.target.value = String(rectProps.xCoord);
                                        }}
                                        className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" />
                                </div>
                                <div className="py-1 w-full flex flex-col">
                                    <span className='ml-2 text-sm text-brandGreen-300'>Coord. Y CG (cm)</span>
                                    <input 
                                        type="number" 
                                        required 
                                        defaultValue={rectProps.yCoord}
                                        onBlur={(e) => {
                                            if(handleValidateNumber(e, 'A coordenada Y do CG deve ser um número')) {

                                                e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                                                setRectProps({...rectProps, yCoord:parseFloat(e.target.value)})
                                                return
                                            } else {
                                                e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                                            }
                                            e.target.value = String(rectProps.yCoord);
                                        }}
                                        className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" />
                                </div>
                            </form>
                            <div>
                                <AddButton
                                onClick={() => {
                                    if (rectProps.width > 0 && rectProps.height > 0 && !Number.isNaN(rectProps.xCoord) && !Number.isNaN(rectProps.yCoord) ) {
                                        if (!handleCheckRectOverlap(rectProps, state.rectangleList)) {

                                            dispatch({type:'add-rectangle', payload: {
                                                index: state.elementCounter,
                                                width: rectProps.width,
                                                height: rectProps.height,
                                                xCenterCoordinate: rectProps.xCoord,
                                                yCenterCoordinate: rectProps.yCoord,
                                                isHighlighted: false
                                            }})
                                        }
                                    } else {
                                        errorMsg('Dados do retângulo inválidos')
                                    }
                                }}
                                />
                            </div>
                        </div>
                        <div className="w-full text-sm justify-between flex flex-col mt-4 md:w-[calc(100%/2-0.75rem)] md:mt-0">
                            <div className="border-brandGreen-300 border-[1px] h-full w-full mb-3 rounded-2xl overflow-hidden max-h-[252px]">
                                <table className={state.rectangleList.length > 5 ? 'text-sm block justify-between w-full max-h-full text-center border-collapse rounded-2xl resize-none overflow-x-hidden overflow-y-scroll block scrollbar scrollbar-thumb-brandGreen-300 scrollbar-track-transparent scrollbar-thin' : 'text-sm block justify-between w-full max-h-full text-center border-collapse rounded-t-2xl overflow-x-hidden'}>
                                    <thead>
                                        <tr>
                                            <th className='sticky top-0 text-white bg-brandGreen-300 border-gray-400 border-[0.5px] overflow-y-auto w-40'>Largura</th>
                                            <th className='sticky top-0 text-white bg-brandGreen-300 border-gray-400 border-[0.5px] overflow-y-auto w-40'>Altura</th>
                                            <th className='sticky top-0 text-white bg-brandGreen-300 border-gray-400 border-[0.5px] overflow-y-auto w-40'>XCG</th>
                                            <th className='sticky top-0 text-white bg-brandGreen-300 border-gray-400 border-[0.5px] overflow-y-auto w-40'>YCG</th>
                                        </tr>
                                    </thead>
                                    <tbody ref={rectTable}>
                                        {state.rectangleList.map((rectangle) => {
                                            return(
                                                <tr 
                                                key = {rectangle.index}
                                                id = {String(rectangle.index)}
                                                onClick={(e) => {
                                                    dispatch({type:'select-element', payload:{element: e.currentTarget}})
                                                }}
                                                className = {rectangle.isHighlighted ? 'bg-brandPurple-300 h-11 text-white cursor-pointer duration-100' : 'cursor-pointer duration-100 h-9 hover:bg-brandBlue-300 hover:h-11 hover:overflow-hidden'}>
                                                    <td className={rectangle.isHighlighted ? 'text-white w-40 border-gray-400 border-[0.5px]' : 'text-brandGreen-300 w-40 border-gray-400 border-[0.5px]'}>{rectangle.width}</td>
                                                    <td className={rectangle.isHighlighted ? 'text-white w-40 border-gray-400 border-[0.5px]' : 'text-brandGreen-300 w-40 border-gray-400 border-[0.5px]'}>{rectangle.height}</td>
                                                    <td className={rectangle.isHighlighted ? 'text-white w-40 border-gray-400 border-[0.5px]' : 'text-brandGreen-300 w-40 border-gray-400 border-[0.5px]'}>{rectangle.xCenterCoordinate}</td>
                                                    <td className={rectangle.isHighlighted ? 'text-white w-40 border-gray-400 border-[0.5px]' : 'text-brandGreen-300 w-40 border-gray-400 border-[0.5px]'}>{rectangle.yCenterCoordinate}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <RemoveButton 
                                    onClick={() => {
                                        dispatch({type:'remove-rectangle'})
                                    }}
                                />
                            </div>

                        </div>

                    </div>
                </div>
                <div className="border-brandPurple-300 w-full p-5 my-3 rounded-2xl bg-white">
                    <div className="text-2xl font-bold relative mb-2 text-brandGreen-300 before:absolute before:bottom-0 before:h-1 before:w-10 before:bg-brandPurple-300 z-10">Adicionar Barra</div>
                    <div className="flex flex-col justify-between items-stretch h-full md:flex-row">
                        <div className="w-full h-full justify-between flex flex-col md:w-[calc(100%/2-0.75rem)] ">
                            <form className='flex flex-wrap justify-between' action="#" id='add-rect'>
                                <div className="py-1 flex flex-col w-full justify-between">
                                    <span className='ml-2 text-sm text-brandGreen-300'>Diâmetro (mm)</span>
                                    <select className='cursor-pointer bg-white text-brandGreen-300 px-3 text-base rounded-2xl border-brandGreen-300 py-1 focus:outline-none focus:border-brandPurple-300 focus:ring-0'
                                        name="diameter"
                                        required 
                                        onChange={(e) => {
                                            setRebarProps({...rebarProps, diameter:parseFloat(e.target.value)})
                                        }}>
                                        
                                        <option value="5.0">5.0</option>
                                        <option value="6.3">6.3</option>
                                        <option value="8.0">8.0</option>
                                        <option value="10.0">10.0</option>
                                        <option value="12.5">12.5</option>
                                        <option value="16.0">16.0</option>
                                        <option value="20.0">20.0</option>
                                        <option value="25.0">25.0</option>
                                        <option value="32.0">32.0</option>
                                        <option value="40.0">40.0</option>
                                    </select>
                                </div>
                                <div className="py-1 w-full flex flex-col">
                                    <span className='ml-2 text-sm text-brandGreen-300'>Coord. X CG (cm)</span>
                                    <input 
                                        type="number" 
                                        required 
                                        defaultValue={0}
                                        onBlur={(e) => {
                                            if(handleValidateNumber(e, 'A coordenada X do CG deve ser um número')) {

                                                e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                                                setRebarProps({...rebarProps, xCoord:parseFloat(e.target.value)})
                                                return
                                            } else {
                                                e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                                            }
                                            e.target.value = String(rebarProps.xCoord);
                                        }}
                                        className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" />
                                </div>
                                <div className="py-1 w-full flex flex-col">
                                    <span className='ml-2 text-sm text-brandGreen-300'>Coord. Y CG (cm)</span>
                                    <input 
                                        type="number" 
                                        required 
                                        defaultValue={0}
                                        onBlur={(e) => {
                                            if(handleValidateNumber(e, 'A coordenada Y do CG deve ser um número')) {

                                                e.target.setAttribute('class', "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" )
                                                setRebarProps({...rebarProps, yCoord:parseFloat(e.target.value)})
                                                return
                                            } else {
                                                e.target.setAttribute('class', "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none ")
                                            }
                                            e.target.value = String(rebarProps.yCoord);
                                        }}
                                        className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:outline-none resize-none" />
                                </div>
                            </form>
                            <div>
                                <AddButton
                                    onClick={() => {

                                    if (rebarProps.diameter > 0 && !Number.isNaN(rebarProps.xCoord) && !Number.isNaN(rebarProps.yCoord)) {
                                        if (handleCheckInsideRect(rebarProps, state.rebarList, state.rectangleList)) {

                                            dispatch({type:'add-rebar', payload: {
                                                index: state.elementCounter,
                                                diameter: rebarProps.diameter,
                                                xCenterCoordinate: rebarProps.xCoord,
                                                yCenterCoordinate: rebarProps.yCoord,
                                                isHighlighted: false,
                                                isInsideRectangle: true
                                            }})
                                        }
                                    } else {
                                        errorMsg('Dados da barra inválidos')
                                    }

                                }}
                                />
                            </div>
                        </div>
                        <div className="w-full text-sm justify-between flex flex-col mt-4 md:w-[calc(100%/2-0.75rem)] md:mt-0">
                            <div className="border-brandGreen-300 border-[1px] h-full w-full mb-3 rounded-2xl overflow-hidden max-h-[180px] ">
                                <table className={state.rebarList.length > 4 ? 'text-sm block justify-between w-full max-h-full text-center rounded-2xl resize-none overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thumb-brandGreen-300 scrollbar-track-transparent scrollbar-thin' : 'text-sm block justify-between w-full max-h-full text-center border-collapse rounded-t-2xl overflow-x-hidden'}>
                                    <thead>
                                        <tr>
                                            <th className='sticky top-0 text-white bg-brandGreen-300 border-gray-400 border-[0.5px] overflow-y-auto w-40'>Diâmetro</th>
                                            <th className='sticky top-0 text-white bg-brandGreen-300 border-gray-400 border-[0.5px] overflow-y-auto w-40'>XCG</th>
                                            <th className='sticky top-0 text-white bg-brandGreen-300 border-gray-400 border-[0.5px] overflow-y-auto w-40'>YCG</th>
                                        </tr>
                                    </thead>
                                    <tbody ref={rebarTable}>
                                        {state.rebarList.map((rebar) => {
                                        return(
                                            <tr 
                                            key = {rebar.index}
                                            id = {String(rebar.index)}
                                            onClick={(e) => {
                                                dispatch({type:'select-element', payload:{element: e.currentTarget}})
                                            }}
                                            className = {rebar.isHighlighted ? 'bg-brandPurple-300 h-11 text-white cursor-pointer duration-100' : 'cursor-pointer duration-100 h-9 hover:bg-brandBlue-300 hover:h-11 hover:overflow-hidden'}
                                            >
                                                <td className={rebar.isHighlighted ? 'text-white w-40 border-gray-400 border-[0.5px]' : 'text-brandGreen-300 w-40 border-gray-400 border-[0.5px]'}>{rebar.diameter}</td>
                                                <td className={rebar.isHighlighted ? 'text-white w-40 border-gray-400 border-[0.5px]' : 'text-brandGreen-300 w-40 border-gray-400 border-[0.5px]'}>{rebar.xCenterCoordinate}</td>
                                                <td className={rebar.isHighlighted ? 'text-white w-40 border-gray-400 border-[0.5px]' : 'text-brandGreen-300 w-40 border-gray-400 border-[0.5px]'}>{rebar.yCenterCoordinate}</td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <RemoveButton
                                    onClick={() => {
                                        dispatch({type: 'remove-rebar'})
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <footer className="w-full flex flex-row justify-between items-center">
                    <div>
                        <PreviousPageButton to='materials' />
                    </div>
                    <div>
                        <NextPageButton to='discretization' />
                    </div>
                </footer>
            </div>
        </>
    )

}

export default CrossSection;