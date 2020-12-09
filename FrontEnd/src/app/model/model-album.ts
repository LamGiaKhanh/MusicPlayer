import { Artist } from "./model-artist";
import { Track } from "./model-track";

export class Album
{
    Id: number;
    Name: string;
    Cover: string;
    coverSmall: string;
    coverMedium: string;
    coverBig: string;
    coverXL: string;
    albumArtist: Artist;
    trackList: Array<Track>;
}