import { FunctionComponent, useState, useEffect, useRef } from "react";
import React from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { getImageData, getClipPath, getBoundingPolygonPath } from "../ImageProcessing";
import { ImageState, ImageInitData, BoundingRect } from "../CommonTypes";
import { createUseStyles } from 'react-jss';
import Flatten from '@flatten-js/core';

const useStyles = createUseStyles({
    
    container: {
        display: 'inline-block',
        position: 'absolute',
        cursor: 'pointer'
    },

    svgEntity: {
        left: 0,
        top: 0
    }
});

export interface ImageProps {
    url: string,
    initialX?: number,
    initialY?: number,
    rotate?: number,
    canvas: HTMLCanvasElement,
    onInitialStateAvailable?: (img: ImageState) => void,
    onMovingStart?: (img: ImageState) => void,
    onMovingEnd?: (img: ImageState) => void,
    onMove?: (img: ImageState) => void,
    onMouseEnter?: (img: ImageState) => void,
    onMouseLeave?: (img: ImageState) => void,
    onSelect?: (img: ImageState) => void,
    dragScale?: number
}

const Image : FunctionComponent<ImageProps> = ({
     url, 
     canvas, 
     initialX = 0, initialY = 0, rotate = 0,
     onInitialStateAvailable,
     onMovingStart, onMovingEnd, onMove, 
     onMouseEnter, onMouseLeave, 
     onSelect,
     dragScale = 1 }) => {

    const classes = useStyles();
    const [ svgProps, setSvgProps ] = useState({ width: 0, height: 0, style: {} } as React.SVGAttributes<HTMLOrSVGElement>);
    const [ imgProps, setImgProps ] = useState({ width: 0, height: 0, href: "" } as React.SVGAttributes<SVGImageElement>);
    const [ clipPath, setClipPath] = useState("");
    const imageInitData = useRef(null as ImageInitData | null);
    const lastKnownPosition = useRef({ left: initialX, right: 0, top: initialY, bottom: 0 });
    const lastKnownIntersectionPolygon = useRef(new Flatten.Polygon());
    
    useEffect(() => {
        
        const load = async () => {
            const imageData = await getImageData(url, canvas)
        
            // Generate clip path.
            const clipPath = getClipPath(imageData);
    
            // Adjust the SVG size.
            setSvgProps({
                 width: imageData.width, 
                 height: imageData.height
            });

            setImgProps({
                width: imageData.width,
                height: imageData.height,
                href: imageData.dataUrl,
            });

            setClipPath(`polygon(${clipPath})`);

            imageInitData.current = {
                url,
                imageSize: { width: imageData.width, height: imageData.height },                
                rawPolygon: new Flatten.Polygon(imageData.boundingPoints.map(v => Flatten.point(v.x, v.y))),
                borderPoints: getBoundingPolygonPath(imageData)
            };

            lastKnownIntersectionPolygon.current = computeTransformedPolygon(imageInitData.current.rawPolygon, lastKnownPosition.current, rotate);

            onInitialStateAvailable?.({
                ...imageInitData.current!,
                inUse: true,
                rotate: rotate,
                boundingRect: lastKnownPosition.current,
                transformedPolygon: lastKnownIntersectionPolygon.current
            });
        }

        load();
    }, [url, canvas, rotate, onInitialStateAvailable]);

    const getStateData = (dragData: DraggableData, updatePolygon: boolean) : ImageState =>
    {
        const size = imageInitData.current!.imageSize;
        const boundingRect = { left: initialX + dragData.x, top: initialY + dragData.y, right: initialX + dragData.x + size.width, bottom: initialY + dragData.y + size.height };

        let transformedPolygon = lastKnownIntersectionPolygon.current;
        
        if (updatePolygon)
        {
            transformedPolygon = computeTransformedPolygon(
                                    imageInitData.current!.rawPolygon, 
                                    boundingRect,
                                    rotate)
        }

        return {
            ...imageInitData.current!,
            inUse: true,
            rotate: rotate,
            boundingRect: boundingRect,            
            transformedPolygon: transformedPolygon
        }
    }

    const moveStartHandler = (dragData: DraggableData) => {
        onMovingStart?.(getStateData(dragData, false));
    }

    const moveHandler = (dragData: DraggableData) => {
        onMove?.(getStateData(dragData, false));
    }    

    const moveEndHandler = (dragData: DraggableData) => {

        var state = getStateData(dragData, true);

        onMovingEnd?.(state);

        // Store the last known position and transform poly
        lastKnownPosition.current = state.boundingRect;
        lastKnownIntersectionPolygon.current = state.transformedPolygon;
    }

    const computeTransformedPolygon = (rawPolygon: Flatten.Polygon, boundingRect: BoundingRect, rotate: number) =>
    {    
        let angle = rotate * Math.PI/180.;

        let center = rawPolygon.box.center;

        // First rotate around the center; then translate.
        let matrix = new Flatten.Matrix()        
                            .translate(boundingRect.left, boundingRect.top)
                            .translate(center.x, center.y)
                            .rotate(angle)
                            .translate(-center.x, -center.y);

        return rawPolygon.transform(matrix);
    }

    const enterHandler = () => {
        onMouseEnter?.({
            ...imageInitData.current!,
            inUse: true,
            rotate: rotate,
            boundingRect: lastKnownPosition.current,
            transformedPolygon: lastKnownIntersectionPolygon.current
        });
    }

    const leaveHandler = () => {
        onMouseLeave?.({
            ...imageInitData.current!,
            inUse: true,
            rotate: rotate,
            boundingRect: lastKnownPosition.current,
            transformedPolygon: lastKnownIntersectionPolygon.current
        });
    }

    const selectedHandler = () => {
        onSelect?.({            
            ...imageInitData.current!,
            inUse: true,
            rotate: rotate,
            boundingRect: lastKnownPosition.current,
            transformedPolygon: lastKnownIntersectionPolygon.current
        })
    }    

    return <Draggable 
                scale={dragScale} 
                positionOffset={{x: initialX, y: initialY}}                
                onStart={(_, data) => moveStartHandler(data)}
                onStop={(_, data) => moveEndHandler(data)} 
                onDrag={(_, data) => moveHandler(data)}
                onMouseDown={selectedHandler}>
                <div>
                    <div style={{ clipPath: clipPath, transform: `rotate(${rotate}deg)` }} 
                        className={classes.container} 
                        onMouseEnter={() => enterHandler()} 
                        onMouseLeave={() => leaveHandler()}>
                        <svg className={classes.svgEntity} {...svgProps}>        
                            <image {...imgProps} />
                        </svg>
                    </div>
                </div>
    </Draggable>;
};

export default Image;