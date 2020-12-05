import { TestBed } from '@angular/core/testing';

import { PlaylistPlayerService } from './playlist-player.service';

describe('PlaylistPlayerService', () => {
  let service: PlaylistPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
