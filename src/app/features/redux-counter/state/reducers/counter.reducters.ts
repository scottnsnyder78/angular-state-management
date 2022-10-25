import { createReducer, on } from '@ngrx/store';
import { CounterComponentEvents } from '../actions/counter.actions';
export interface CounterState {
  current: number;
}

const initialState: CounterState = {
  current: 0,
};

export const reducer = createReducer(
  initialState,
  on(
    CounterComponentEvents.incremented,
    (currentState: CounterState): CounterState => ({
      ...currentState,
      current: currentState.current + 1,
    }),
  ),
  on(CounterComponentEvents.decremented, (s) => ({
    ...s,
    current: s.current - 1,
  })),
);
