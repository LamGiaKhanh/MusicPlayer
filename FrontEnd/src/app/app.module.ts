import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';


import { CarouselModule } from 'ngx-owl-carousel-o';
import { PlyrModule } from 'ngx-plyr';
import { LoginComponent } from './login/login.component';
import { AlbumsComponent } from './albums/albums.component';
import { TrackPlayerComponent } from './track-player/track-player.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AlbumsComponent,
    TrackPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    PlyrModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
