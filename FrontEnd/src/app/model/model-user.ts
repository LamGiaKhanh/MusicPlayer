import { Playlist } from "./model-playlist";

export class User
{
    Id: string;
    Name: string;
    Country: string;
    Picture: string;
    pictureSmall: string;
    pictureMedium: string;
    pictureBig: string;
    pictureXL: string;
    trackList: Array<Playlist>;
}