import { TestBed } from '@angular/core/testing';

import { PlayersService } from './players.service';
import { AppModule } from 'src/app/app.module';

describe('PlayersService', () => {
  let service: PlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
    });
    service = TestBed.inject(PlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
