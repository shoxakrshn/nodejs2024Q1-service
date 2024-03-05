import { Album } from 'src/album/album.model';
import { Artist } from 'src/artist/artist.model';
import { Track } from 'src/track/track.model';

export class Favs {
  constructor(
    protected artists: Artist[] = [],
    protected albums: Album[] = [],
    protected tracks: Track[] = [],
  ) {}

  addArtist(artist: Artist) {
    this.artists.push(artist);
  }

  addAlbum(album: Album) {
    this.albums.push(album);
  }

  addTrack(track: Track) {
    this.tracks.push(track);
  }

  deleteArtist(id: string) {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }

  deleteAlbum(id: string) {
    this.albums = this.albums.filter((album) => album.id !== id);
  }

  deleteTrack(id: string) {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  has(id: string, type: string) {
    return this[type].find((item) => item.id === id);
  }
}

export const enum eFavs {
  artists = 'artists',
  albums = 'albums',
  tracks = 'tracks',
}
