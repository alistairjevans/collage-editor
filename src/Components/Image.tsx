import { FunctionComponent, useState, useEffect, useRef } from "react";
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
    onMovingStart?: (img: ImageState) => void,
    onMovingEnd?: (img: ImageState) => void,
    onMove?: (img: ImageState) => void,
    onMouseEnter?: (img: ImageState) => void,
    onMouseLeave?: (img: ImageState) => void,
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
    boundingBoxStart: { x: number, y: number }
}

const Image : FunctionComponent<ImageProps> = ({
     url, 
     canvas, 
     onMovingStart, onMovingEnd, onMove, 
     onMouseEnter, onMouseLeave, 
     dragScale = 1 }) => {

    const classes = useStyles();
    const [ svgProps, setSvgProps ] = useState({ width: 0, height: 0, style: {} } as React.SVGAttributes<HTMLOrSVGElement>);
    const [ imgProps, setImgProps ] = useState({ width: 0, height: 0, href: "" } as React.SVGAttributes<SVGImageElement>);
    const [ containerProps, setContainerProps] = useState({} as React.HTMLAttributes<HTMLDivElement>);
    const imageInitData = useRef(null as ImageInitData | null);
    const lastKnownPosition = useRef({ x: 0, y: 0 });

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
        }

        load();
    }, [url, canvas]);

    const moveStartHandler = (dragData: DraggableData) => {
        onMovingStart?.({
            ...imageInitData.current!,
            boundingBoxStart: { x: dragData.x, y: dragData.y }
        })
    }

    const moveEndHandler = (dragData: DraggableData) => {
        onMovingEnd?.({
            ...imageInitData.current!,
            boundingBoxStart: { x: dragData.x, y: dragData.y }
        });

        // Store the last known position.
        lastKnownPosition.current = { x: dragData.x, y: dragData.y };
    }

    const moveHandler = (dragData: DraggableData) => {
        onMove?.({
            ...imageInitData.current!,
            boundingBoxStart: { x: dragData.x, y: dragData.y }
        })
    }

    const enterHandler = () => {
        onMouseEnter?.({
            ...imageInitData.current!,
            boundingBoxStart: lastKnownPosition.current
        });
    }

    const leaveHandler = () => {
        onMouseLeave?.({
            ...imageInitData.current!,
            boundingBoxStart: lastKnownPosition.current
        });
    }

    return <Draggable 
                scale={dragScale} 
                onStart={(_, data) => moveStartHandler(data)}
                onStop={(_, data) => moveEndHandler(data)} 
                onDrag={(_, data) => moveHandler(data)}>
            <div style={containerProps.style} className={classes.container} onMouseEnter={() => enterHandler()} onMouseLeave={() => leaveHandler()}>
                <svg className={classes.svgEntity} {...svgProps} >        
                    <image {...imgProps} />                    
                </svg>
            </div>
    </Draggable>;
};

export default Image;