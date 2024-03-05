import { Album } from 'src/album/album.model';
import { Artist } from 'src/artist/artist.model';
import { Favs } from 'src/favs/favs.model';
import { Track } from 'src/track/track.model';
import { User } from 'src/user/user.model';
import { albums, artists, tracks, users } from './data';

export const userDb = new Map<string, User>(
  users.map((user) => [user.id, user]),
);

export const artistDb = new Map<string, Artist>(
  artists.map((artist) => [artist.id, artist]),
);

export const albumDb = new Map<string, Album>(
  albums.map((album) => [album.id, album]),
);

export const trackDb = new Map<string, Track>(
  tracks.map((track) => [track.id, track]),
);

export const favoriteDb: Favs = new Favs();

export const DbService = {
  users: userDb,
  artists: artistDb,
  albums: albumDb,
  tracks: trackDb,
  favs: favoriteDb,
};

// class Db {
//   users = new Map<string, User>();
//   artists = new Map<string, Artist>();
//   albums = new Map<string, Album>();
//   tracks = new Map<string, Track>();
//   favs = new Favs();
// }
