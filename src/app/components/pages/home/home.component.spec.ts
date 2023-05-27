import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { AppModule } from 'src/app/app.module';
import { HttpService } from 'src/app/services/http/http.service';
import { BoardComponent } from '../board/board.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const httpServiceSpy : any = jasmine.createSpyObj('HttpService', ["createGame"]);

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        { provide: HttpService, useValue: httpServiceSpy }
      ],
      declarations: [
        HomeComponent,
        MockComponent(BoardComponent)
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`shouldn't show board on start but should display button`, () => {
    component.isGameStarted = false;
    expect(fixture.nativeElement.querySelector('app-board')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('app-button')).toBeTruthy();
  });

  it('should display board on startGame event', () => {
    httpServiceSpy.createGame.and.returnValue(of({id: "1"}));
    const callsCount : number = httpServiceSpy.createGame.calls.count();
    component.startGame();

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-board')).toBeTruthy();
    expect(httpServiceSpy.createGame).toHaveBeenCalledTimes(callsCount + 1);
    expect(component.isGameStarted).toBeTruthy();
    expect(component.gameId).toEqual("1");
    expect(component.loading).toBeFalsy();
  });

  it('should go back to home on quitGame event', () => {
    component.goBack();
    expect(component.isGameStarted).toBeFalsy();
  });

});
