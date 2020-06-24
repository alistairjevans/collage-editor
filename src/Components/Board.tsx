import React, { useCallback, FunctionComponent, useState, useEffect, useRef } from 'react';
import panzoom, { PanZoom } from 'panzoom';
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

const Board:FunctionComponent<{ active?: boolean, onScaleChanged?: (scale: number) => void }> = ({ active = true, onScaleChanged, children }) =>
{
    const panZoomInstance = useRef<PanZoom | null>(null);
    const [isPanZoomInitialised, setIsPanZoomInitialised] = useState(false);

    const pannedRef = useCallback((node: HTMLDivElement) => {

        panZoomInstance.current = panzoom(node);
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

        if (active)
        {
            panZoomInstance.current!.resume();
        }
        else 
        {
            panZoomInstance.current!.pause();
        }

    }, [active, panZoomInstance])

    const classes = useStyles();

    return <div className={classes.board}>
        <div ref={pannedRef}>
            {children}
        </div>
    </div>
}

export default Board;