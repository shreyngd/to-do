import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Priority } from '../utils'

export type ToDo = {
    id: string,
    title?: string,
    description?: string,
    endTime?: number,
    priority?: Priority | null,
    isFavourite: boolean,
    isComplete: boolean
}

type ToDoList = {
    list: Array<ToDo>
}

const initialState: ToDoList = {
    list: []
}

export const todoSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<ToDo>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.list.unshift(action.payload)
        },
        remove: (state, action: PayloadAction<string>) => {
            const index = state.list.findIndex(el => el.id === action.payload);
            state.list.splice(index, 1)
        },
        markFavourite: (state, action: PayloadAction<string>) => {
            const index = state.list.findIndex(el => el.id === action.payload);
            state.list[index].isFavourite = !state.list[index].isFavourite
        }
    }
})

// Action creators are generated for each case reducer function
export const { add, remove, markFavourite } = todoSlice.actions

export default todoSlice.reducer