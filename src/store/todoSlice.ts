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

type UpdateObjectPayload = {
    id: string;
    data: ToDo

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

        },
        markComplete: (state, action: PayloadAction<string>) => {
            const index = state.list.findIndex(el => el.id === action.payload);
            state.list[index].isComplete = !state.list[index].isComplete
        },
        updateTodo: (state, action: PayloadAction<UpdateObjectPayload>) => {
            const index = state.list.findIndex(el => el.id === action.payload.id);
            state.list[index] = action.payload.data
        }
    }
})

// Action creators are generated for each case reducer function
export const { add, remove, markFavourite, markComplete, updateTodo } = todoSlice.actions

export default todoSlice.reducer