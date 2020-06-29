

export interface AvailableWorkshopImage {
    url: string;
    inUse: boolean;
}

export interface ImageInitData
{
    url: string,
    imageSize: { width: number, height : number }
    borderPoints: string
}

export interface ImageState extends ImageInitData
{
    inUse: boolean,
    boundingRect: BoundingRect
}

export interface BoundingRect { 
    left: number;
    right: number;
    top: number;
    bottom: number;
}