import React, { FunctionComponent, useState } from 'react';
import { ImageState, AvailableWorkshopImage } from './CommonTypes';
import { AppBar, Toolbar, Typography, IconButton, CssBaseline, Divider, Drawer, GridList, GridListTile, SwipeableDrawer, Theme, Box, GridListTileBar } from '@material-ui/core';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'; 

const useStyles = makeStyles(({ palette }: Theme) => ({

    bar: {
        top: 'auto;',
        bottom: 0,
        boxShadow: "0px -4px 5px 0px rgba(0, 0, 0, 0.21)"
    },

    divider: {
        marginLeft: '10px',
    },

    buttonContainer: {
        marginLeft: '10px'
    },

    boxGrid: {
        height: '600px',
    },

    boxImage: {
        //height: '200px'
    },

    imgBoundingBox: {
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',        
        backgroundPosition: 'center',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        borderColor: 'transparent',
        cursor: 'pointer',

        '&:active': {
            borderColor: palette.primary.main,
         },
        '&:focus': {
            borderColor: palette.primary.main,
        },
        '&:hover': {
            borderColor: palette.primary.main,
        }
    },

    imgTileBar: {
        background: 'none',
        padding: '5px',
        boxSizing: 'content-box'
    },

    imgActionUsePhoto: {
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
        color: 'white'
    },

    boxDrawer: {
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        padding: '10px',
        userSelect: 'none'
    },

    boxHeadingBackground: {
        backgroundColor: palette.primary.main
    }

}));

export const OptionBar: FunctionComponent<{ 
    activeImage?: ImageState | null,
    allImages: AvailableWorkshopImage[],
    onZoomToFit?: () => void,
    onUpOne?: () => void,
    onDownOne?: () => void,
    onUseImage?: (url : string) => void,
}> = ({ activeImage, allImages, onZoomToFit, onUpOne, onDownOne, onUseImage }) => {

  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isBig = useMediaQuery(theme.breakpoints.up("sm"));

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const setImageStateAndCloseDrawer = (url: string) => {
    onUseImage?.(url);
    setDrawerOpen(false);
  }

  return <React.Fragment>
        <CssBaseline />
        <AppBar className={classes.bar} color="primary" elevation={16} position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    CollageIt
                </Typography>
                <Divider className={classes.divider} orientation="vertical" flexItem />
                {/* <IconButton edge="end" color="inherit" onClick={onZoomToFit}>
                    <CropFreeRoundedIcon />
                </IconButton> */}
                <IconButton edge="end" color="inherit" disabled={activeImage === null} onClick={onUpOne}>
                    <ArrowUpwardRoundedIcon />
                </IconButton>
                <IconButton edge="end" color="inherit" disabled={activeImage === null} onClick={onDownOne}>
                    <ArrowDownwardRoundedIcon />
                </IconButton>
                <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
                    <PhotoAlbumIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
        <SwipeableDrawer open={drawerOpen}  anchor="bottom" onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
            <Toolbar className={classes.boxHeadingBackground}><Typography variant="h4"><PhotoAlbumIcon /> Box</Typography></Toolbar>
            <div className={classes.boxDrawer}>
                <GridList className={classes.boxGrid} cellHeight="auto" cols={isBig ? 6 : 2} spacing={10}>
                    {allImages.filter(img => !img.inUse).map(img => (
                            <GridListTile key={img.url} cols={1} >
                                <Box className={classes.imgBoundingBox} style={{backgroundImage: `url(${img.url})`}} border={2} onDoubleClick={() => setImageStateAndCloseDrawer(img.url)}>                                    
                                    <GridListTileBar
                                    titlePosition="top"
                                    actionIcon={
                                        <IconButton aria-label="use image" className={classes.imgActionUsePhoto} onClick={() => setImageStateAndCloseDrawer(img.url)}>
                                            <AddPhotoAlternateIcon />
                                        </IconButton>
                                    }
                                    actionPosition="right"
                                    className={classes.imgTileBar}
                                    />
                                </Box>                                
                            </GridListTile>
                    ))}
                </GridList>
            </div>
        </SwipeableDrawer>
  </React.Fragment> ;

};
