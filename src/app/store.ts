import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@rtk-incubator/rtk-query/dist';
import counterReducer from '../features/counter/counterSlice';
import { pokemonApi } from '../services/pokemon';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // middlewareとしてpokemonApiを追加することで、caching、invalidation、pollingなどRTK Queryの提供する多数の機能が有効になります
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
// 追記は任意ですが、refetchOnFocus/refetchOnReconnectという機能を利用するためには下記が必要です
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
