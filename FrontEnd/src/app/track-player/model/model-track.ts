import { Album } from "./model-album";
import { Artist } from "./model-artist";

export class Track {
    Id: string;
    Title: string;
    Link: string;
    Preview: string;
    md5image: string;
    tracksArtist: Artist;
    tracksAlbum: Album;
}