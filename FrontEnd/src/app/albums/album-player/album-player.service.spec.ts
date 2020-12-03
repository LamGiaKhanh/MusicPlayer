import { TestBed } from '@angular/core/testing';

import { AlbumPlayerService } from './album-player.service';

describe('AlbumPlayerService', () => {
  let service: AlbumPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
