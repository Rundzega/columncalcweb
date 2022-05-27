import React from 'react';
import { INewRect } from '../interfaces/INewRect';
import { IRectangleList } from '../interfaces/IRectangleList';
import errorMsg from './errorMsg';

const handleCheckRectOverlap = (newRectangle:INewRect, rectangleList:IRectangleList ) => {

    const newRectLeftVertices = newRectangle.xCoord - newRectangle.width / 2;
    const newRectRightVertices = newRectangle.xCoord + newRectangle.width / 2;
    const newRectTopVertices = newRectangle.yCoord + newRectangle.height / 2;
    const newRectBottomVertices = newRectangle.yCoord - newRectangle.height /2;

    const isFirstRectangle = rectangleList.length > 0 ? false : true

    if (isFirstRectangle) {
        return false
    }

    let overlap = false;
    let adjescent = false;


    rectangleList.forEach((rectangle) => {
        const rectLeftVertices = rectangle.xCenterCoordinate - rectangle.width / 2;
        const rectRightVertices = rectangle.xCenterCoordinate + rectangle.width / 2;
        const rectTopVertices = rectangle.yCenterCoordinate + rectangle.height / 2;
        const rectBottomVertices = rectangle.yCenterCoordinate - rectangle.height / 2;

        if (newRectLeftVertices < rectRightVertices && 
            newRectRightVertices > rectLeftVertices &&
            newRectBottomVertices < rectTopVertices &&
            newRectTopVertices > rectBottomVertices) {
                overlap = true
        }
        
        if (newRectangle.height < rectangle.height) {
            if (newRectLeftVertices == rectRightVertices || 
                newRectRightVertices == rectLeftVertices) {

                if ((rectBottomVertices <= newRectBottomVertices  && 
                    newRectBottomVertices <= rectTopVertices) || 
                    (rectBottomVertices <= newRectTopVertices &&
                    newRectTopVertices <= rectTopVertices)) {

                    adjescent = true
                }
            }
        } else {

            if (newRectLeftVertices == rectRightVertices ||
                newRectRightVertices == rectLeftVertices) {
                                    
                if((newRectBottomVertices <= rectBottomVertices &&
                    rectBottomVertices <= newRectTopVertices) ||
                    (newRectBottomVertices <= rectTopVertices &&
                    rectTopVertices <= newRectTopVertices)) {

                    adjescent = true
                }
            }
        }
                                    
        if (newRectangle.width < rectangle.width) {

            if (newRectBottomVertices == rectTopVertices ||
                newRectTopVertices == rectBottomVertices) {

                if ((rectLeftVertices <= newRectLeftVertices &&
                    newRectLeftVertices <= rectRightVertices) || 
                    (rectLeftVertices <= newRectRightVertices &&
                    newRectRightVertices <= rectRightVertices)) {

                    adjescent = true
                }
            }
        } else {

            if (newRectBottomVertices == rectTopVertices ||
                newRectTopVertices == rectBottomVertices) {

                if ((newRectLeftVertices <= rectLeftVertices &&
                    rectLeftVertices <= newRectRightVertices) ||
                    (newRectLeftVertices <= rectRightVertices &&
                    rectRightVertices <= newRectRightVertices)) {

                    adjescent = true
                }
            }
        }
    })
                        
    if (adjescent && !overlap) {
        return false
    } else if (overlap) {
        errorMsg("Erro de entrada de dados", "Retângulos sobrepostos")
        return true
    } else {
        errorMsg("Erro de entrada de dados", "Seção de concreto deve ser contínua")
        return true
    }
    
}
                    
export default handleCheckRectOverlap;
                    