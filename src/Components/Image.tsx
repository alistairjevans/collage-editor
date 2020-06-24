import { FunctionComponent, useState, useEffect, useRef, useCallback } from "react";
import React from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { getImageData, getClipPath, getBoundingPolygonPath } from "../ImageProcessing";
import { createUseStyles } from 'react-jss';
import { relative } from "path";

const useStyles = createUseStyles({
    
    container: {
        display: 'inline-block',
        position: 'absolute',
    },

    svgEntity: {
        position: 'absolute',
        left: 0,
        top: 0
    }
});

export interface ImageProps {
    url: string,
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

export interface ImageInitData
{
    url: string,
    imageSize: { width: number, height : number }
    borderPoints: string
}

export interface ImageState extends ImageInitData
{
    boundingRect: BoundingRect
}

export interface BoundingRect { 
    left: number;
    right: number;
    top: number;
    bottom: number;
}

const Image : FunctionComponent<ImageProps> = ({
     url, 
     canvas, 
     onInitialStateAvailable,
     onMovingStart, onMovingEnd, onMove, 
     onMouseEnter, onMouseLeave, 
     onSelect,
     dragScale = 1 }) => {

    const classes = useStyles();
    const [ svgProps, setSvgProps ] = useState({ width: 0, height: 0, style: {} } as React.SVGAttributes<HTMLOrSVGElement>);
    const [ imgProps, setImgProps ] = useState({ width: 0, height: 0, href: "" } as React.SVGAttributes<SVGImageElement>);
    const [ containerProps, setContainerProps] = useState({} as React.HTMLAttributes<HTMLDivElement>);
    const imageInitData = useRef(null as ImageInitData | null);
    const lastKnownPosition = useRef({ left: 0, right: 0, top: 0, bottom: 0 });
    
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

            setContainerProps({
                style: { clipPath: `polygon(${clipPath})` }
            });

            imageInitData.current = {
                url,
                imageSize: { width: imageData.width, height: imageData.height },
                borderPoints: getBoundingPolygonPath(imageData)
            };

            onInitialStateAvailable?.({
                ...imageInitData.current!,
                boundingRect: lastKnownPosition.current
            });
        }

        load();
    }, [url, canvas]);

    const getStateData = (dragData: DraggableData) : ImageState =>
    {
        var size = imageInitData.current!.imageSize;

        return {
            ...imageInitData.current!,
            boundingRect: { left: dragData.x, top: dragData.y, right: dragData.x + size.width, bottom: dragData.y + size.height }
        }
    }

    const moveStartHandler = (dragData: DraggableData) => {
        onMovingStart?.(getStateData(dragData));
    }

    const moveEndHandler = (dragData: DraggableData) => {

        var state = getStateData(dragData);

        onMovingEnd?.(state);

        // Store the last known position.
        lastKnownPosition.current = state.boundingRect;
    }

    const moveHandler = (dragData: DraggableData) => {
        onMove?.(getStateData(dragData));
    }

    const enterHandler = () => {
        onMouseEnter?.({
            ...imageInitData.current!,
            boundingRect: lastKnownPosition.current
        });
    }

    const leaveHandler = () => {
        onMouseLeave?.({
            ...imageInitData.current!,
            boundingRect: lastKnownPosition.current
        });
    }

    const selectedHandler = () => {
        onSelect?.({            
            ...imageInitData.current!,
            boundingRect: lastKnownPosition.current
        })
    }

    return <Draggable 
                scale={dragScale} 
                onStart={(_, data) => moveStartHandler(data)}
                onStop={(_, data) => moveEndHandler(data)} 
                onDrag={(_, data) => moveHandler(data)}
                onMouseDown={selectedHandler}>
                <div style={containerProps.style} 
                    className={classes.container} 
                    onMouseEnter={() => enterHandler()} 
                    onMouseLeave={() => leaveHandler()}>
                    <svg className={classes.svgEntity} {...svgProps} >        
                        <image {...imgProps} />
                    </svg>
                </div>
    </Draggable>;
};

export default Image;