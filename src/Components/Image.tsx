import { FunctionComponent, useState, useEffect, useRef, useCallback } from "react";
import React from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { getImageData, getClipPath, getBoundingPolygonPath } from "../ImageProcessing";
import { ImageState, ImageInitData } from "../CommonTypes";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    
    container: {
        display: 'inline-block',
        position: 'absolute',
        cursor: 'pointer'
    },

    svgEntity: {
        position: 'absolute',
        left: 0,
        top: 0
    }
});

export interface ImageProps {
    url: string,
    initialX?: number,
    initialY?: number,
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
     initialX = 0, initialY = 0,
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
    const lastKnownPosition = useRef({ left: initialX, right: 0, top: initialY, bottom: 0 });
    
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
                inUse: true,
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
            inUse: true,
            boundingRect: { left: initialX + dragData.x, top: initialY + dragData.y, right: dragData.x + size.width, bottom: dragData.y + size.height }
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
            inUse: true,
            boundingRect: lastKnownPosition.current
        });
    }

    const leaveHandler = () => {
        onMouseLeave?.({
            ...imageInitData.current!,
            inUse: true,
            boundingRect: lastKnownPosition.current
        });
    }

    const selectedHandler = () => {
        onSelect?.({            
            ...imageInitData.current!,
            inUse: true,
            boundingRect: lastKnownPosition.current
        })
    }

    return <Draggable 
                scale={dragScale} 
                positionOffset={{x: initialX, y: initialY}}
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