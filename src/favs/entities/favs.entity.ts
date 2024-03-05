import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

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
