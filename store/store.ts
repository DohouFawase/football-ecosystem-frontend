import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/slice/authSlice';
import orgReducer from '@/slice/orgSlice';
import { 
  persistStore, 
  persistReducer, 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Utilise le localStorage par défaut

// 1. On combine les reducers (utile si tu en ajoutes d'autres plus tard)
const rootReducer = combineReducers({
  auth: authReducer,
  org: orgReducer,
});

// 2. Configuration de la persistance
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // On ne veut persister que la partie 'auth'
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Création du store avec le middleware corrigé
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ✅ On ignore les actions internes de redux-persist pour éviter l'erreur de sérialisation
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 4. Exportation des types et du persistor
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);