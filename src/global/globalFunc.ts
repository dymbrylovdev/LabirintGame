import {mathOperation} from "./globalValue";
import {ICube} from "./model";

export function rand(min: number, max: number) {
    let offset = min;
    let range = (max - min) + 1;

    return Math.floor(Math.random() * range) + offset;
}

export function randomArr(arr: number[]) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}


export function changeArr(CODE: string, arr: Array<ICube>[], level: number): Array<ICube>[] {
    let newArr: Array<ICube>[] = [];
    let arrCube: ICube[] = [];
    let firstItemArr: ICube = {value: arr[0][0].value, isRight: false};
    if (CODE === mathOperation.increment) {
        for (let i = 0; i < arr.length + 1; i++) {
            let j = 0;
            arrCube = [];
            for (j; j < arr.length + 1; j++) {
                arrCube.push(firstItemArr);
                firstItemArr = {value: firstItemArr.value+1, isRight: false};
            }
            newArr.push(arrCube);
        }
    } else if (CODE === mathOperation.decrement) {
        for (let i = 0; i < arr.length - 1; i++) {
            let j = 0;
            arrCube = [];
            for (j; j < arr.length - 1; j++) {
                arrCube.push(firstItemArr);
                firstItemArr = {value: firstItemArr.value+1, isRight: false};
            }
            newArr.push(arrCube);
        }
    }
    return newArr;
}