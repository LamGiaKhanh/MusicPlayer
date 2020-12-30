import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './login/login.component';
import { AlbumsComponent } from './albums/albums.component';
import { TrackPlayerComponent } from './tracks/track-player/track-player.component';
import { RegisterComponent } from './register/register.component';
import { VimeModule } from 'node_modules/@vime/angular';
//Services
import { ApiService } from './api.service';
import { TapSidesToSeekComponent } from './tap-sides-to-seek/tap-sides-to-seek.component';
import { AlbumPlayerComponent } from './albums/album-player/album-player.component';
import { TracksComponent } from './tracks/tracks.component';
import { PlaylistPlayerComponent } from './tracks/playlist-player/playlist-player.component';
import { SearchComponent } from './search/search.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AlbumsComponent,
    TrackPlayerComponent,
    RegisterComponent,
    TapSidesToSeekComponent,
    AlbumPlayerComponent,
    TracksComponent,
    PlaylistPlayerComponent,
    SearchComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CarouselModule,
    FormsModule,    
    BrowserAnimationsModule,
    VimeModule
  ],
  providers: [
    ApiService, 
    // AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
