import React, { useEffect, useRef, useState } from 'react'
import AddButton from '../../components/AddButton';
import RemoveButton from '../../components/RemoveButton';
import '../../styles/cross-section.scss'
import errorMsg from '../../utilities/errorMsg';
import handleValidateNumber from '../../utilities/handleValidateNumber';
import handleValidatePositive from '../../utilities/handleValidatePositive';
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import handleCheckRectOverlap from '../../utilities/handleCheckOverlap';
import handleCheckInsideRect from '../../utilities/handleCheckInsideRect';
import { axisBottom, axisLeft, scaleLinear } from 'd3';
import { useReducerContext } from '../../hooks/useReducerContext';


function CrossSection() {
    
    const { state,  dispatch } = useReducerContext();
    
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
        
        {Object.values(state.rectangleList).map((rectangle) => {
            
            const classStyle = rectangle.isHighlighted ? 'svgSelect' : 'svgElementRect'

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
            
            const classStyle = rebar.isHighlighted ? 'svgSelect' : 'svgElementRebar'
            
            svg.select('#rebars')
            .append('circle')
            .attr('cx', rebar.xCenterCoordinate)
            .attr('cy', -rebar.yCenterCoordinate)
            .attr('r', rebar.diameter/20)
            .attr('id', rebar.index)
            .attr('class', `${classStyle}`)
            .on('mouseover', function(d, i) {
                select(this)
                .attr('r', `${1.5*rebar.diameter/20}`).transition('150')
                .style('cursor', 'pointer')
            })
            .on('mouseleave', function(d, i ) {
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
                        
            svg.append('g')
                .style('font', `${fontScale}px times`)
                .style('stroke', '0.5px')
                .style('stroke-width', '0.1px')
                .call(axisBottom(xScale).tickSizeInner(tickScale).tickSize(tickScale).tickPadding(1))
            
            svg.append('g')
                .style('font', `${fontScale}px times`)
                .style('stroke', '0.5px')
                .style('stroke-width', '0.1px')
                .call(axisLeft(yScale).tickSizeInner(tickScale).tickSize(tickScale).tickPadding(1))
        }
    }, [state.rectangleList, state.rebarList])

    return (
        <>
            <div id="cross-section-container">
                <h2>Seção Transversal</h2>
                <div className="svg-container" id="svg-d3">
                    <svg ref={crossSectionSvg}></svg>
                </div>
                <div className="sub-container">
                    <div className="title">Adicionar Seção</div>
                    <div className="divider">
                        <div className="input">
                            <form action="#">
                                <div className="input-box">
                                    <span>Largura (cm)</span>
                                    <input type="number" 
                                    min={0}
                                    required
                                    defaultValue={rectProps.width}
                                    onBlur={(e) => {
                                        if(handleValidatePositive(e, ('Largura deve ser um número positivo'))) {
                                            setRectProps({...rectProps, width:parseFloat(e.target.value)})
                                            return
                                        }
                                        e.target.value = String(rectProps.width)
                                    }} />
                                </div>
                                <div className="input-box">
                                    <span>Altura (cm)</span>
                                    <input type="number"
                                    min={0} 
                                    required 
                                    defaultValue={rectProps.height}
                                    onBlur={(e) => {
                                        if(handleValidatePositive(e, 'Altura deve ser um número positivo')) {
                                            setRectProps({...rectProps, height:parseFloat(e.target.value)})
                                            return
                                        }
                                        e.target.value = String(rectProps.height)
                                    }} />
                                </div>
                                <div className="input-box">
                                    <span>Coord. X CG (cm)</span>
                                    <input 
                                        type="number" 
                                        required 
                                        defaultValue={rectProps.xCoord}
                                        onBlur={(e) => {
                                            if(handleValidateNumber(e, 'A coordenada X do CG deve ser um número')) {
                                                setRectProps({...rectProps, xCoord:parseFloat(e.target.value)})
                                                return
                                            }
                                            e.target.value = String(rectProps.xCoord);
                                        }} />
                                </div>
                                <div className="input-box">
                                    <span>Coord. Y CG (cm)</span>
                                    <input 
                                        type="number" 
                                        required 
                                        defaultValue={rectProps.yCoord}
                                        onBlur={(e) => {
                                            if(handleValidateNumber(e, 'A coordenada Y do CG deve ser um número')) {
                                                setRectProps({...rectProps, yCoord:parseFloat(e.target.value)})
                                                return
                                            }
                                            e.target.value = String(rectProps.yCoord);
                                        }} />
                                </div>
                            </form>
                            <div className="button-class">
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
                        <div className="table">
                            <div className="table-content first">
                                <table className={`table-class ${state.rectangleList.length > 5 ? 'long' : 'short'}`}>
                                    <thead>
                                        <tr>
                                            <th>Largura</th>
                                            <th>Altura</th>
                                            <th>XCG</th>
                                            <th>YCG</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-body' ref={rectTable}>
                                        {state.rectangleList.map((rectangle) => {
                                            return(
                                                <tr 
                                                key = {rectangle.index}
                                                id = {String(rectangle.index)}
                                                onClick={(e) => {
                                                    dispatch({type:'select-element', payload:{element: e.currentTarget}})
                                                }}
                                                className = {rectangle.isHighlighted ? 'selected' : ''}>
                                                    <td>{rectangle.width}</td>
                                                    <td>{rectangle.height}</td>
                                                    <td>{rectangle.xCenterCoordinate}</td>
                                                    <td>{rectangle.yCenterCoordinate}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="button-class">
                                <RemoveButton 
                                    onClick={() => {
                                        dispatch({type:'remove-rectangle'})
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="sub-container">
                    <div className="title">Adicionar Barra</div>
                    <div className="divider">
                        <div className="input">
                            <form action="#" id='add-rect'>
                                <div className="input-box select">
                                    <span>Diâmetro (mm)</span>
                                    <select 
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
                                <div className="input-box">
                                    <span>Coord. X CG (cm)</span>
                                    <input 
                                        type="number" 
                                        required 
                                        defaultValue={0}
                                        onBlur={(e) => {
                                            if(handleValidateNumber(e, 'A coordenada X do CG deve ser um número')) {
                                                setRebarProps({...rebarProps, xCoord:parseFloat(e.target.value)})
                                                return
                                            }
                                            e.target.value = String(rebarProps.xCoord);
                                        }} />
                                </div>
                                <div className="input-box">
                                    <span>Coord. Y CG (cm)</span>
                                    <input 
                                        type="number" 
                                        required 
                                        defaultValue={0}
                                        onBlur={(e) => {
                                            if(handleValidateNumber(e, 'A coordenada Y do CG deve ser um número')) {
                                                setRebarProps({...rebarProps, yCoord:parseFloat(e.target.value)})
                                                return
                                            }
                                            e.target.value = String(rebarProps.yCoord);
                                        }} />
                                </div>
                            </form>
                            <div className="button-class">
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
                        <div className="table">
                            <div className="table-content second">
                                <table className={`table-class ${state.rebarList.length > 4 ? 'long' : 'short'}`}>
                                    <thead>
                                        <tr>
                                            <th>Diâmetro</th>
                                            <th>XCG</th>
                                            <th>YCG</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-body' ref={rebarTable}>
                                        {state.rebarList.map((rebar) => {
                                        return(
                                            <tr 
                                            key = {rebar.index}
                                            id = {String(rebar.index)}
                                            onClick={(e) => {
                                                dispatch({type:'select-element', payload:{element: e.currentTarget}})
                                            }}
                                            className = {rebar.isHighlighted ? 'selected' : ''}
                                            >
                                                <td>{rebar.diameter}</td>
                                                <td>{rebar.xCenterCoordinate}</td>
                                                <td>{rebar.yCenterCoordinate}</td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="button-class">
                                <RemoveButton
                                    onClick={() => {
                                        dispatch({type: 'remove-rebar'})
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                    </div>
            </div>
        </>
    )
}

export default CrossSection;