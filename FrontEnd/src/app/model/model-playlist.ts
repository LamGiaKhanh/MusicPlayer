import { Track } from "./model-track";
import { User } from "./model-user";

export class Playlist
{
    Id: number;
    Title: string;
    numberTrack: number;
    Picture: string;
    pictureSmall: string;
    pictureMedium: string;
    pictureBig: string;
    pictureXL: string;
    Creator: User;
    trackList: Array<Track>;
}