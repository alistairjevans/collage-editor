import { FunctionComponent, useState, useEffect } from "react";
import React from 'react';
import Draggable from 'react-draggable';
import { getImageData, getClipPath, getBoundingPolygonPath } from "../ImageProcessing";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    border: {
        fill: 'none',
        strokeWidth: '3px',
        stroke: 'none',
        strokeLineJoin: 'round'
    }
});

export interface ImageProps {
    url: string,
    canvas: HTMLCanvasElement,
    onMovingStart?: (img: string) => void,
    onMovingEnd?: (img: string) => void,
    dragScale?: number
}

const Image : FunctionComponent<ImageProps> = (props) => {

    const classes = useStyles();
    const { url, canvas, onMovingStart, onMovingEnd, dragScale = 1 } = props;
    const [ svgProps, setSvgProps ] = useState({ width: 0, height: 0, style: {} } as React.SVGAttributes<HTMLOrSVGElement>);
    const [ imgProps, setImgProps ] = useState({ width: 0, height: 0, href: "" } as React.SVGAttributes<SVGImageElement>)
    const [ borderPoints, setBorderPoints ] = useState("");

    useEffect(() => {
        
        const load = async () => {
            const imageData = await getImageData(url, canvas)
        
            // Generate clip path.
            const clipPath = getClipPath(imageData);
    
            // Adjust the SVG size.
            setSvgProps({
                 width: imageData.width, 
                 height: imageData.height,
                 style: { clipPath: `polygon(${clipPath})` }
            });

            setImgProps({
                width: imageData.width,
                height: imageData.height,
                href: imageData.dataUrl,
            });

            setBorderPoints(getBoundingPolygonPath(imageData));
        }

        load();
    }, [url, canvas]);

    return <Draggable bounds="parent" scale={dragScale} onStart={() => onMovingStart?.(url)} onStop={() => onMovingEnd?.(url)}>
        <svg {...svgProps} onClick={() => console.log('clicked svg')}>        
            <image {...imgProps} />
            <polygon points={borderPoints} className={classes.border}></polygon>
        </svg>
    </Draggable>;
};

export default Image;