import React, {useState} from 'react';
import ItemNavigate from "./ItemNavigate";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import style from "./Navigate.module.scss"
import {
    addCursorRandom,
    changeCursorNav,
    clearActiveNav,
    reverseNavigate,
    setDisabledNav
} from "../../store/reducers/navigateSLice";
import {rand, randomArr} from "../../global/globalFunc";
import {cursorValue} from "../../global/globalValue";
import {
    changeDisable,
    decLevelGame,
    incLevelGame,
    setFinishPoint,
    setStartingPoint
} from "../../store/reducers/cubeSlice";
import {ICube} from "../../global/model";
import upImg from "../../assets/img/up-arrow.png";
import downImg from "../../assets/img/down-arrow.png";

function Navigate() {
    const arr = useSelector((state: RootState) => state.navigate.navigateArr);
    const disableNavigate = useSelector((state: RootState) => state.navigate.disableNavigate);
    const cubes = useSelector((state: RootState) => state.cubes.cubesArr)
    const level = useSelector((state: RootState) => state.cubes.level)

    const [start, setStart] = useState<boolean>(false);
    const dispatch = useDispatch();

    function coordinatesInit(randomItem: ICube): { resultCube: ICube, resultCoordinates: number } {
        let coordinates: number[] = []; // массив возможных ходов (вверх, влево, вниз, вправо)
        let resultCube: ICube = {value: 0, isRight: false};

        for (const arrElement of cubes) { // определяет возможный ход лево или право и добавляет в coordinates
            if (arrElement.includes(randomItem)) {
                if (arrElement[0] === randomItem) {
                    coordinates.push(cursorValue.RIGHT);
                } else if (arrElement[arrElement.length - 1] === randomItem) {
                    coordinates.push(cursorValue.LEFT);
                } else if (randomItem != arrElement[0] && randomItem != arrElement[arrElement.length - 1]) {
                    coordinates.push(cursorValue.RIGHT);
                    coordinates.push(cursorValue.LEFT);
                }
                for (let i = 0; i < cubes.length; i++) {// определяет возможный ход вверх или вниз и добавляет coordinates
                    if (cubes[i] === arrElement) {
                        if (cubes[i] === cubes[0]) {
                            coordinates.push(cursorValue.BOTTOM);
                        } else if (cubes[i] === cubes[cubes.length - 1]) {
                            coordinates.push(cursorValue.TOP);
                        } else if (cubes[i] != cubes[0] && cubes[i] != cubes[cubes.length - 1]) {
                            coordinates.push(cursorValue.BOTTOM);
                            coordinates.push(cursorValue.TOP);
                        }
                    }
                }
            }
        }
        let resultCoordinates = randomArr(coordinates); // из массива возможных ходов выбирает один

        for (let j = 0; j < cubes.length; j++) {
            if (cubes[j].includes(randomItem)) {
                if (resultCoordinates === cursorValue.LEFT) {
                    resultCube = cubes[j][cubes[j].indexOf(randomItem) - 1];
                } else if (resultCoordinates === cursorValue.RIGHT) {
                    resultCube = cubes[j][cubes[j].indexOf(randomItem) + 1];
                } else if (resultCoordinates === cursorValue.TOP) {
                    resultCube = cubes[j - 1][cubes[j].indexOf(randomItem)];
                } else if (resultCoordinates === cursorValue.BOTTOM) {
                    resultCube = cubes[j + 1][cubes[j].indexOf(randomItem)];
                }
            }
        }
        return {resultCube, resultCoordinates};
    }

    const changeItemNav = () => {
        dispatch(reverseNavigate());// очищаем поле
        dispatch(setDisabledNav(false))

        let randomCube: ICube = {value: 0, isRight: false};// рандомный куб который меняется в зависимости от координатов
        let coordinates: number[] = [];// массив всех сгенерированных ходов

        let len = cubes[0].length;
        let randomItem = rand(cubes[0][0].value, len * len);

        cubes.forEach((item1) => {
            item1.forEach((item2 => {
                if (item2.value === randomItem) {
                    dispatch(setStartingPoint(item2))// запись начальной точки в стор
                    randomCube = item2;
                }
            }))
        })
        for (const argument of arr) {
            let {resultCube, resultCoordinates} = coordinatesInit(randomCube);
            coordinates.push(resultCoordinates)// запись хода куба в масив
            randomCube = resultCube;// передвижение куба на один шаг
        }
        setStart(true);

        dispatch(setFinishPoint(randomCube))// запись финиша в stor

        coordinates.forEach((el, i) => {// вывод всех ходов на панель
            setTimeout(() => {
                if (arr[arr.length - 1].value === i) {
                    setStart(false)
                    dispatch(changeDisable(true))
                    dispatch(setDisabledNav(true))
                    setTimeout(() => {
                        dispatch(clearActiveNav())
                    }, 1000)
                }
                dispatch(changeCursorNav({index: i, cursor: el}))
                dispatch(addCursorRandom({index: i, cursor: el}))
            }, (i + 1) * 1000)
        })

    }

    function changeLevel(int: number) {
        if (disableNavigate) {
            dispatch(reverseNavigate());// очищаем поле
            dispatch(changeDisable(false));
            int === 1 ? dispatch(incLevelGame()) : dispatch(decLevelGame())
        }
    }
    return (
        <>
            <ul className={style.container}>
                {
                    arr.map((item) => <ItemNavigate item={item} key={item.value}/>)
                }
                <ul className={style.level}>
                    <li className={style.level_item}>
                        <img src={upImg} onClick={() => changeLevel(1)}/>
                    </li>
                    <li className={style.number}>
                        {level} <span>УРОВЕНЬ</span>
                    </li>
                    <li className={style.level_item}>
                        <img src={downImg} onClick={() => changeLevel(2)}/>
                    </li>
                </ul>
            </ul>

            <div className={style.wrap}>
                <button
                    className={style.btn}
                    onClick={() => changeItemNav()}
                    disabled={start}
                >START</button>
            </div>
        </>
    );
}

export default Navigate;