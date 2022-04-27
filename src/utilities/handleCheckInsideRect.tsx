import React from 'react';
import { RectangleList, RebarList } from '../contexts/CrossSectionContext';
import errorMsg from './errorMsg';

type RebarProps = {
    diameter: number,
    xCoord: number,
    yCoord: number
}

const handleCheckInsideRect  = (newRebar:RebarProps, RebarList:RebarList, rectangleList:RectangleList) => {


    const rebarLeftExtreme = newRebar.xCoord - newRebar.diameter / 20;
    const rebarRightExtreme = newRebar.xCoord + newRebar.diameter / 20;
    const rebarTopExtreme = newRebar.yCoord + newRebar.diameter / 20;
    const rebarBottomExtreme = newRebar.yCoord - newRebar.diameter / 20;


    let overlap = false;
    let isInsideRectangle = false;


    rectangleList.forEach((rectangle) => {
        const rectLeftVertices = rectangle.xCenterCoordinate - rectangle.width / 2;
        const rectRightVertices = rectangle.xCenterCoordinate + rectangle.width / 2;
        const rectTopVertices = rectangle.yCenterCoordinate + rectangle.height / 2;
        const rectBottomVertices = rectangle.yCenterCoordinate - rectangle.height / 2;

        if (rectLeftVertices <= rebarLeftExtreme &&
            rectRightVertices >= rebarRightExtreme &&
            rectBottomVertices <= rebarBottomExtreme &&
            rectTopVertices >= rebarTopExtreme) {

            isInsideRectangle = true
        }
    })

    RebarList.forEach((rebar) => {
        
        const rebarsDistanceSquared = Math.pow(newRebar.xCoord - rebar.xCenterCoordinate, 2) +
                                      Math.pow(newRebar.yCoord - rebar.yCenterCoordinate, 2) 

        const radiusSumSquared = Math.pow(newRebar.diameter /20 + rebar.diameter / 20, 2)

        if (rebarsDistanceSquared < radiusSumSquared) {
            overlap = true
        }
    })

    if (isInsideRectangle && !overlap) {
        return true
    } else if (!isInsideRectangle) {
        errorMsg('Barra de aço deve estar dentro da seção')
        return false
    } else {
        errorMsg('Barras de aço não podem estar sobrepostas')
        return false
    }
}

export default handleCheckInsideRect;