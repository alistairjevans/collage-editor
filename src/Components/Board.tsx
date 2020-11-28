import React, { useCallback, RefForwardingComponent, useState, useEffect, useRef, forwardRef, useImperativeHandle, ReactNode } from 'react';
import panzoom, { Transform, PanZoom } from 'panzoom';
import Flatten from '@flatten-js/core';
import { createUseStyles } from 'react-jss';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const useStyles = createUseStyles({
    board: {
        position: "fixed",
        left: 0,
        top: 0,
        height: 'calc(100% - 56px)',
        width: '100%',
        touchAction: 'none'
    },

    '@media (min-width: 600px)': {
        board: {
            height: 'calc(100% - 64px)',
        }
    }
});

export interface BoardMethods {
    resetZoom(target?: Flatten.Box): void;
}

export interface BoardProps {
        motionActive?: boolean;
        backgroundColor?: string;
        onTransformChanged?: (transform: Transform) => void;
        onBackgroundClicked?: () => void;
        children?: React.ReactNode;
}

async function resetZoom(panZoom: PanZoom, container: HTMLElement, target?: Flatten.Box)
{
    const parent = container.parentElement!;
    const rectParent = parent.getBoundingClientRect();
  
    const rectScene = target || new Flatten.Box(rectParent.left, rectParent.top, rectParent.right, rectParent.bottom);

    const padding = 60;

    // Expand the rectangle slightly to make it look nicer when we center to it.
    rectScene.xmin -= padding;
    rectScene.xmax += padding;
    rectScene.ymin -= padding;
    rectScene.ymax += padding;

    //we need to cancel current running animations
    panZoom.pause();
    panZoom.resume();

    panZoom.showRectangle({
        left: rectScene.xmin, 
        right: rectScene.xmax,
        top: rectScene.ymin, 
        bottom: rectScene.ymax,
        height: rectScene.ymax - rectScene.ymin,
        width: rectScene.xmax - rectScene.xmin
    });
    
    panZoom.moveBy(
        0,
        0,
        true
    );
}

const Board: RefForwardingComponent<BoardMethods, BoardProps> = ({ motionActive = true, backgroundColor = "#ffffff", onTransformChanged, onBackgroundClicked, children }, ref) =>
{
    const panZoomInstance = useRef<PanZoom | null>(null);
    const mouseDownTransform = useRef<Transform | null>(null);
    const panningNode = useRef<HTMLDivElement | null>(null);
    const [isPanZoomInitialised, setIsPanZoomInitialised] = useState(false);

    useImperativeHandle(ref, () => ({
        resetZoom: (target: Flatten.Box) => {
            if (panZoomInstance.current && panningNode.current)
            {
                resetZoom(panZoomInstance.current, panningNode.current, target);
            }
        }
    }));

    const pannedRef = useCallback((node: HTMLDivElement) => {

        panningNode.current = node;
        panZoomInstance.current = panzoom(node, {
            onTouch: (ev) => {
                var transform = panZoomInstance.current!.getTransform();
                mouseDownTransform.current = {...transform};
            },
            disableKeyboardInteraction: true
        });
        setIsPanZoomInitialised(true);

    }, []);

    useEffect(() => {
        
        if (onTransformChanged && isPanZoomInitialised)
        {
            const panZoom = panZoomInstance.current!;
            panZoom.on('transform', (e) => 
            {
                var transform = panZoom.getTransform();
                onTransformChanged({...transform});
            });
        }

    }, [isPanZoomInitialised, onTransformChanged])

    useEffect(() => {

        if (!panZoomInstance.current)
        {
            return;
        }

        if (motionActive)
        {
            panZoomInstance.current!.resume();
        }
        else 
        {
            panZoomInstance.current!.pause();
        }

    }, [motionActive, panZoomInstance])

    const classes = useStyles();

    const handleMouseDown = (ev: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        
        var transform = panZoomInstance.current!.getTransform();
        mouseDownTransform.current = {...transform};
        
    }

    const handleMouseUp = (ev: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        if(ev.target === ev.currentTarget) {            
            var startTransform = mouseDownTransform.current!;            
            var currentTransform = panZoomInstance.current!.getTransform();

            if (startTransform && currentTransform && 
                startTransform.x === currentTransform.x && 
                startTransform.y === currentTransform.y && 
                startTransform.scale === currentTransform.scale)
            {
                onBackgroundClicked?.();
            }
        }
    }

    const boardStyle : CSSProperties = {};

    if (backgroundColor)
    {
        boardStyle.backgroundColor = backgroundColor;
    }

    return <div className={classes.board} style={boardStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp}>
        <div ref={pannedRef}>
            {children}
        </div>
    </div>
};

export default forwardRef(Board);