import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { AlbumsComponent } from './albums/albums.component';
import { TrackPlayerComponent } from './track-player/track-player.component';


const routes: Routes = [
  { path: 'index',             component: IndexComponent },
  { path: 'login',             component: LoginComponent },
  { path: 'albums',             component: AlbumsComponent },
  { path: 'track-player',             component: TrackPlayerComponent },
  { path: '',             component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
