import {createSlice} from '@reduxjs/toolkit'
import {ICube} from "../../global/model";
import {changeArr} from "../../global/globalFunc";
import {mathOperation} from "../../global/globalValue";

export interface CubeState {
    cubesArr: Array<ICube>[];
    startingPoint: ICube;
    finish: ICube;
    disableCubes: boolean;
    level: number;
}

const initialState: CubeState = {
    cubesArr: [
        [{value: 1, isRight: false}, {value: 2, isRight: false}, {value: 3, isRight: false}],
        [{value: 4, isRight: false}, {value: 5, isRight: false}, {value: 6, isRight: false}],
        [{value: 7, isRight: false}, {value: 8, isRight: false}, {value: 9, isRight: false}],
    ],
    startingPoint: {value: 0, isRight: false},
    finish: {value: 0, isRight: false},
    disableCubes: false,
    level: 1,
}

export const cubeSlice = createSlice({
    name: 'cube',
    initialState,
    reducers: {
        setStartingPoint: (state, action) => {
            state.startingPoint = action.payload;
        },
        setFinishPoint: (state, action) => {
            state.cubesArr.map((item1) => {
                return item1.map((item2 => {
                    if (item2.value === action.payload.value) {
                        item2.isRight = true;
                        return item2;
                    }
                    return item2;
                }))
            })
            state.finish = action.payload;
        },
        changeDisable: (state, action) => {
            state.disableCubes = action.payload;
        },
        incLevelGame: (state) => {
            if (state.level !== 4) {
                state.cubesArr = changeArr(mathOperation.increment, state.cubesArr, state.level);
                state.level += 1;
            }
        },
        decLevelGame: (state) => {
            if (state.level !== 1) {
                state.level -= 1;
                state.cubesArr = changeArr(mathOperation.decrement, state.cubesArr, state.level);
            }
        }

    },
})

export const {
    setStartingPoint,
    setFinishPoint,
    changeDisable,
    incLevelGame,
    decLevelGame,
} = cubeSlice.actions;
export default cubeSlice.reducer;