import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { AlbumsComponent } from './albums/albums.component';
import { TrackPlayerComponent } from './tracks/track-player/track-player.component';
import { RegisterComponent } from './register/register.component';
import { AlbumPlayerComponent } from './albums/album-player/album-player.component';
import { TracksComponent } from './tracks/tracks.component';
import { PlaylistPlayerComponent } from './tracks/playlist-player/playlist-player.component';
import { SearchComponent } from './search/search.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  { path: 'index',             component: IndexComponent },
  { path: 'login',             component: LoginComponent },
  { path: 'register',           component: RegisterComponent },
  { path: 'albums',             component: AlbumsComponent },
  { path: 'album-player',       component: AlbumPlayerComponent },
  { path: 'tracks',             component: TracksComponent },
  { path: 'track-player',       component: TrackPlayerComponent },
  { path: 'playlist-player',             component: PlaylistPlayerComponent },
  { path: 'search',             component: SearchComponent },
  { path: '',             component: IndexComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
