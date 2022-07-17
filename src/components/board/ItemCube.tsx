import React, {RefObject, useEffect, useRef} from 'react';
import style from "./Cube.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {ICube} from "../../global/model";
import {changeDisable} from "../../store/reducers/cubeSlice";

type ItemCubeProps = {
    cubes: { value: number, isRight: boolean }[];
    selectedRef: RefObject<HTMLLIElement> | undefined;
}

function ItemCube({cubes, selectedRef}: ItemCubeProps) {
    const startingPoint = useSelector((state: RootState) => state.cubes.startingPoint);
    const finish = useSelector((state: RootState) => state.cubes.finish);
    const disable = useSelector((state: RootState) => state.cubes.disableCubes);
    const level = useSelector((state: RootState) => state.cubes.level);
    const dispatch = useDispatch();

    const refDefault = useRef<HTMLLIElement | null>(null);
    const refUl = useRef<HTMLUListElement | null>(null);

    function openResult(item: ICube, event: any) {
        if (disable) {
            if (item.isRight) {
                event.target.classList.add(style.ready);
            } else {
                event.target.classList.add(style.fail);
                selectedRef?.current?.classList.add(style.ready);
            }
        }
        dispatch(changeDisable(false))
    }

    useEffect(() => {
        // @ts-ignore
        [...refUl.current?.children].map((child) => {
            child.classList.remove(style.ready);
            child.classList.remove(style.fail);
            selectedRef?.current?.classList.remove(style.ready);
            return child;
        });
    }, [finish, startingPoint, cubes])

    useEffect(() => {
        // @ts-ignore
        [...refUl.current?.children].map((child) => {
            child.classList.remove(style.starting);
            return child;
        });
    }, [level])

    return (
        <ul className={style.wrap} ref={refUl}>
            {cubes.map((item) => {
                const refElem = item.value === finish.value ? selectedRef : refDefault;
                return <li
                    key={item.value}
                    className={`
                        ${style.item_cube}
                        ${item.value === startingPoint.value ? style.starting : ""}
                        `}
                    ref={refElem}
                    onClick={(event) => openResult(item, event)}
                />
            })}
        </ul>
    );
}

export default ItemCube;