import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPlayerComponent } from './album-player.component';

describe('AlbumPlayerComponent', () => {
  let component: AlbumPlayerComponent;
  let fixture: ComponentFixture<AlbumPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
