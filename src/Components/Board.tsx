import React, { useCallback, RefForwardingComponent, useState, useEffect, useRef, forwardRef, Component, useImperativeHandle, PropsWithChildren } from 'react';
import panzoom, { Transform, PanZoom } from 'panzoom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    board: {
        position: "fixed",
        left: 0,
        top: 0,
        height: '100%',
        width: '100%'
    }
});

export interface BoardMethods {
    resetZoom(): void;
}

export interface BoardProps {
        motionActive?: boolean;
        onScaleChanged?: (scale: number) => void;
        onBackgroundClicked?: () => void;
        children?: React.ReactNode;
}
const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function resetZoom(panZoom: PanZoom, container: HTMLElement)
{
    const parent = container.parentElement!;
    const rectParent = parent.getBoundingClientRect();
    const rectScene = container.getBoundingClientRect();

    const xys = panZoom.getTransform();
    const originWidth = rectScene.width / xys.scale;
    const originHeight = rectScene.height / xys.scale;
    const zoomX = (rectParent.width - 20) / originWidth;
    const zoomY = (rectParent.height - 20) / originHeight;

    let targetScale = zoomX < zoomY ? zoomX : zoomY;

    //when target scale is the same as currently, we reset back to 100%, so it acts as toggle.
    if (Math.abs(targetScale - xys.scale) < 0.005) {
        //reset to 100%
        targetScale = 1;
    }

    const targetWidth = originWidth * xys.scale;
    const targetHeight = originHeight * xys.scale;
    const newX = targetWidth > rectParent.width ? -(targetWidth / 2) + rectParent.width / 2 : (rectParent.width / 2) - (targetWidth / 2);
    const newY = targetHeight > rectParent.height ? -(targetHeight / 2) + rectParent.height / 2 : (rectParent.height / 2) - (targetHeight / 2);

    //we need to cancel current running animations
    panZoom.pause();
    panZoom.resume();

    const xDiff = Math.abs(newX - xys.x);
    const yDiff = Math.abs(newX - xys.x);
    if (xDiff > 5 || yDiff > 5) {
        //overything over 5px change will be animated
        panZoom.moveBy(
            newX - xys.x,
            newY - xys.y,
            true
        );
        await sleep(0.25);
    } else {
        panZoom.moveBy(
            newX - xys.x,
            newY - xys.y,
            false
        );
    }

    //correct way to zoom with center of graph as origin when scaled
    panZoom.smoothZoomAbs(
        xys.x + originWidth * xys.scale / 2,
        xys.y + originHeight * xys.scale / 2,
        targetScale,
    );
}

const Board: RefForwardingComponent<BoardMethods, BoardProps> = ({ motionActive = true, onScaleChanged, onBackgroundClicked, children }, ref) =>
{
    const panZoomInstance = useRef<PanZoom | null>(null);
    const mouseDownTransform = useRef<Transform | null>(null);
    const panningNode = useRef<HTMLDivElement | null>(null);
    const [isPanZoomInitialised, setIsPanZoomInitialised] = useState(false);

    useImperativeHandle(ref, () => ({
        resetZoom: () => {
            if (panZoomInstance.current && panningNode.current)
            {
                resetZoom(panZoomInstance.current, panningNode.current);
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
        
        if (onScaleChanged && isPanZoomInitialised)
        {
            const panZoom = panZoomInstance.current!;
            panZoom.on('zoom', (e) => 
            {
                onScaleChanged(panZoom.getTransform().scale);
            });
        }

    }, [isPanZoomInitialised, onScaleChanged])

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

            if (startTransform && currentTransform && startTransform.x === currentTransform.x && startTransform.y === currentTransform.y && startTransform.scale == currentTransform.scale)
            {
                onBackgroundClicked?.();
            }
        }
    }

    return <div className={classes.board} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp}>
        <div ref={pannedRef}>
            {children}
        </div>
    </div>
};

export default forwardRef(Board);