import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account } from '../register/model'
import { ActivityStorage } from './model';
import { StorageService } from '../storage.service';

@Injectable({
    providedIn: 'root',
})

export class AuthenticationService 
{
   private currentAccountSubject: BehaviorSubject<Account>;
   private remember: boolean = false;
   private currentAccount: Observable<Account>;
   public activityStorage: ActivityStorage;

   private account_storage: string = StorageService.accountStorage;
   private activity_storage: string = StorageService.activityStorage;

   constructor(private http: HttpClient) 
   {
       let account = localStorage.getItem(this.account_storage);
       if (account == null) 
       {
           account = sessionStorage.getItem(this.account_storage);
           this.remember = false;
       }
       else this.remember = true;
       
       this.currentAccountSubject = new BehaviorSubject<Account>(
           account == null? null: JSON.parse(account)
       );
       this.currentAccount = this.currentAccountSubject.asObservable();

       let activities = localStorage.getItem(this.activity_storage)? localStorage.getItem(this.activity_storage): sessionStorage.getItem(this.activity_storage);
       this.activityStorage = activities? JSON.parse(activities): {albumsIds: [], trackIds: [], likedPlaylistIds: [], ownedPlaylistIds: []};
   }
  
   public get currentAccountValue(): Account 
   {
       return this.currentAccountSubject.value;
   }

   public saveAccount(account: Account, remember: boolean, activities: ActivityStorage)
   {
       this.remember = remember;
       this.activityStorage = activities;

       if (this.remember) 
       {
           localStorage.setItem(this.account_storage, JSON.stringify(account));
           localStorage.setItem(this.activity_storage, JSON.stringify(this.activityStorage));
       }
       else {
           sessionStorage.setItem(this.account_storage, JSON.stringify(account));
           sessionStorage.setItem(this.activity_storage, JSON.stringify(this.activityStorage));
       }
       
       this.currentAccountSubject.next(account);
   }
   public logout()
   {
       if (this.remember)
       {
           localStorage.removeItem(this.account_storage);
           localStorage.removeItem(this.activity_storage);
           this.remember = false;
       }
       else 
       {
           sessionStorage.removeItem(this.account_storage); 
           sessionStorage.removeItem(this.activity_storage);
       }
       this.currentAccountSubject.next(null);
   }

   private setActivityStorage()
   {
       if (this.remember) localStorage.setItem(this.activity_storage, JSON.stringify(this.activityStorage));
       else sessionStorage.setItem(this.activity_storage, JSON.stringify(this.activityStorage));
   }
   public updateAlbum(albumsId: number, isAdded: boolean)
   {
       if (isAdded) this.activityStorage.albumsIds.push(albumsId);
       else this.activityStorage.albumsIds = this.activityStorage.albumsIds.filter(m => m != albumsId);
       this.setActivityStorage();      
   }

   public updateTrack(trackId: number, isAdded: boolean)
   {
       if (isAdded) this.activityStorage.trackIds.push(trackId);
       else this.activityStorage.trackIds = this.activityStorage.trackIds.filter(m => m != trackId);
       this.setActivityStorage();
   }
   public updateLikedPlaylist(playlistId: number, isAdded: boolean)
   {
       if (isAdded) this.activityStorage.likedPlaylistIds.push(playlistId);
       else this.activityStorage.likedPlaylistIds = this.activityStorage.likedPlaylistIds.filter(m => m != playlistId);
       this.setActivityStorage();
   }
   
   
   public isAuthenticated(): boolean 
   {
       if (this.currentAccountSubject.value) return true;
       return false; 
   }
}