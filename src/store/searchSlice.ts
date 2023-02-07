import { createSlice, PayloadAction } from '@reduxjs/toolkit'



type Search = {
    value: string
}

const initialState: Search = {
    value: ''
}


export const todoSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        change: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        clear: (state) => {
            state.value = ''

        }
    }
})

// Action creators are generated for each case reducer function
export const { clear, change } = todoSlice.actions

export default todoSlice.reducer