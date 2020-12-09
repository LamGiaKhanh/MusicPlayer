import { Album } from "./model-album";
import { Artist } from "./model-artist";

export class Track {
    Id: number;
    Title: string;
    Link: string;
    Preview: string;
    md5image: string;
    tracksArtist: Artist;
    tracksAlbum: Album;
}