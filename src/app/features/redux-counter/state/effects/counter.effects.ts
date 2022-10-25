import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectCounterBranch } from '..';
import { CounterComponentEvents } from '../actions/counter.actions';

@Injectable()
export class CounterEffects {
  saveCountState$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CounterComponentEvents.incremented,
          CounterComponentEvents.decremented,
          CounterComponentEvents.reset,
          CounterComponentEvents.by,
        ),
        concatLatestFrom(() => this.store.select(selectCounterBranch)), // (Actions) => [action, result]
        tap(
          // prettier-ignore
          ([ ,countData,]) => localStorage.setItem('count-data', JSON.stringify(countData)),
        ),
      );
    },
    { dispatch: false },
  );
  logThemAll$ = createEffect(
    () => {
      return this.actions$.pipe(
        tap((a) => console.log(`Got an actions of ${a.type}`)),
      );
    },
    { dispatch: false },
  );
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
  ) {}
}
