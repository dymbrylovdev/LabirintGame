import {createSlice} from '@reduxjs/toolkit'

export interface CubeState {
    navigateArr: Array<{ value: number, cursor: number, active: boolean }>;
    disableNavigate: boolean;
}

const initialState: CubeState = {
    navigateArr: [
        {value: 0, cursor: 0, active: false},
        {value: 1, cursor: 0, active: false},
        {value: 2, cursor: 0, active: false},
        {value: 3, cursor: 0, active: false},
        {value: 4, cursor: 0, active: false},
        {value: 5, cursor: 0, active: false},
        {value: 6, cursor: 0, active: false},
        {value: 7, cursor: 0, active: false},
        {value: 8, cursor: 0, active: false},
        {value: 9, cursor: 0, active: false},
    ],
    disableNavigate: true
}

export const navigateSLice = createSlice({
    name: 'navigate',
    initialState,
    reducers: {
        changeCursorNav: (state, action) => {
            state.navigateArr.map(item => {
                if (item.value+1 === action.payload.index+1) {
                    item.cursor = action.payload.cursor;
                    return item.active = true;
                }
                return item.active = false;
            });
        },

        clearActiveNav: (state) => {
            for (const stateElement of state.navigateArr) {
                stateElement.active = false;
            }
        },
        addCursorRandom: (state, action) => {
            state.navigateArr.map(item => {
                if (item.value === action.payload.index) {
                    return item.cursor = action.payload.cursor;
                }
                return item;
            })
        },
        reverseNavigate: (state) => {
            state.navigateArr = initialState.navigateArr;
        },
        setDisabledNav: (state, action) => {
            state.disableNavigate = action.payload;
        },
    },
})

export const {
    changeCursorNav,
    clearActiveNav,
    addCursorRandom,
    reverseNavigate,
    setDisabledNav,
} = navigateSLice.actions
export default navigateSLice.reducer