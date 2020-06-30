import React, { FunctionComponent, useState, useRef } from 'react';
import { ImageState, AvailableWorkshopImage } from './CommonTypes';
import { AppBar, Toolbar, Typography, IconButton, CssBaseline, Divider, Drawer, GridList, GridListTile, SwipeableDrawer, Theme, Box, GridListTileBar, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import PaletteIcon from '@material-ui/icons/Palette';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'; 

const useStyles = makeStyles(({ palette }: Theme) => ({

    bar: {
        top: 'auto;',
        bottom: 0,
        boxShadow: "0px -4px 5px 0px rgba(0, 0, 0, 0.21)",
        overflow: 'hidden'
    },

    barTitle: {
        paddingRight: '10px'
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
    
    grow: {
        flexGrow: 1
    },

    swappableSection: {
        position: 'relative',
        alignSelf: 'stretch',
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1
    },

    swappableSet: {
        position: 'absolute',
        left: 0
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

    colorPicker: {
        visibility: 'hidden',
        width: '0px'
    }

}));

export const OptionBar: FunctionComponent<{ 
    activeImage?: ImageState | null,
    workshopName?: string,
    boardBackgroundColor?: string
    allImages: AvailableWorkshopImage[],
    onZoomToFit?: () => void,
    onUpOne?: () => void,
    onDownOne?: () => void,
    onRemoveImage?: () => void,
    onUseImage?: (url : string) => void,
    onBackgroundColorChange?: (color: string) => void,
    onDeleteAll?: () => void
}> = ({ 
    activeImage, workshopName, boardBackgroundColor, allImages, 
    onZoomToFit, onUpOne, onDownOne, onRemoveImage, onUseImage, onBackgroundColorChange, onDeleteAll }) => {

  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const theme = useTheme();
  const isBig = useMediaQuery(theme.breakpoints.up("sm"));
  const colorPicker = useRef<HTMLInputElement>(null);

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

  const promptForColor = () => {
    colorPicker.current?.click();
  }

  const handleDeleteDialogClose = (confirmed: boolean) => {
    
    setDeleteAllDialogOpen(false);

    if (confirmed)
    {
        onDeleteAll?.();
    }

  }

  let heading: React.ReactNode;

  if (workshopName)
  {
    if (isBig)
    {
        heading = <React.Fragment>
            <Typography variant="h6">{workshopName}</Typography>
            <Typography variant="subtitle2">CollageIT</Typography>
        </React.Fragment>;        
    }
    else 
    {
        heading = <Typography variant="subtitle2">{workshopName}</Typography>;
    }
  }
  else
  {
    heading = <Typography variant="h6">CollageIT</Typography>;
  }

  return <React.Fragment>
        <CssBaseline />
        <AppBar className={classes.bar} color="primary" elevation={16} position="fixed">
            <Toolbar>
                <div className={classes.barTitle}>
                    {heading}               
                </div>
                <Divider className={classes.divider} orientation="vertical" flexItem />
                {/* <IconButton edge="end" color="inherit" onClick={onZoomToFit}>
                    <CropFreeRoundedIcon />
                </IconButton> */}
                <div className={classes.swappableSection}>
                    <div className={classes.swappableSet}>
                        <Slide direction="up" in={activeImage !== null} mountOnEnter unmountOnExit>
                            <div>
                                <IconButton edge="end" color="inherit" onClick={onUpOne}>
                                    <ArrowUpwardRoundedIcon />
                                </IconButton>
                                <IconButton edge="end" color="inherit" onClick={onDownOne}>
                                    <ArrowDownwardRoundedIcon />
                                </IconButton>
                                <IconButton edge="end" color="inherit" onClick={onRemoveImage}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Slide>
                    </div>
                    <div className={classes.swappableSet}>
                        <Slide direction="down" in={activeImage === null} mountOnEnter unmountOnExit>
                            <div>
                                <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
                                    <PhotoAlbumIcon />
                                </IconButton>
                                <IconButton edge="end" color="inherit" onClick={promptForColor}>
                                    <PaletteIcon />
                                </IconButton>
                                <input className={classes.colorPicker} type="color" ref={colorPicker} value={boardBackgroundColor ?? "#FFFFFF"} onChange={ev => onBackgroundColorChange?.(ev.target.value)}></input>
                                <IconButton edge="end" color="inherit" onClick={() => setDeleteAllDialogOpen(true)}>
                                    <DeleteSweepIcon />
                                </IconButton>
                            </div>
                        </Slide>
                    </div>
                </div>
            </Toolbar>
        </AppBar>        
        <SwipeableDrawer open={drawerOpen}  anchor="bottom" onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
            <AppBar position="static" color="primary">
                <Toolbar><Typography variant="h4"><PhotoAlbumIcon /> Box</Typography></Toolbar>
            </AppBar>
            <div className={classes.boxDrawer}>
                <GridList className={classes.boxGrid} cellHeight="auto" cols={isBig ? 6 : 2} spacing={10}>
                    {allImages.filter(img => !img.inUse).map(img => (
                            <GridListTile key={img.url} cols={1}>
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
        <Dialog open={deleteAllDialogOpen} onClose={() => handleDeleteDialogClose(false)}>
          <DialogTitle>Delete All Images?</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  This will remove all your images from the collage and start again. Are you sure?
              </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDeleteDialogClose(false)} color="primary" autoFocus>
                No, I'm still using them!
            </Button>
            <Button onClick={() => handleDeleteDialogClose(true)} color="primary">
                Yep, I'm sure, remove my images.
            </Button>
          </DialogActions>
        </Dialog>
        
  </React.Fragment> ;

};
