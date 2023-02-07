import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import searchReducer from './searchSlice';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    todos: todoReducer,
    search: searchReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)




export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch