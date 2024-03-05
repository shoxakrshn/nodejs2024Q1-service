import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/album.model';
import { Artist } from 'src/artist/artist.model';
import { Favs } from 'src/favs/favs.model';
import { Track } from 'src/track/track.model';
import { User } from 'src/user/user.model';
// import { userDb, artistDb, albumDb, trackDb, favoriteDb } from './data';

@Injectable()
export class DatabaseService {
  public readonly users = new Map<string, User>();
  public readonly artists = new Map<string, Artist>();
  public readonly albums = new Map<string, Album>();
  public readonly tracks = new Map<string, Track>();
  public readonly favs = new Favs();

  // public readonly users = userDb;
  // public readonly artists = artistDb;
  // public readonly albums = albumDb;
  // public readonly tracks = trackDb;
  // public readonly favs = favoriteDb;
}
