import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AlbumPlayerService } from './album-player.service';

describe('AlbumPlayerService', () => {
  let service: AlbumPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    //jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
    service = TestBed.inject(AlbumPlayerService);
  });

  // it('Should get the right album', async () => {
    
  //   service.getAlbumList(192580092).then(album => {
  //     console.log(album)
  //     expect(album.title).toEqual('evermore')

  //   }).finally(done)
  // });

});
