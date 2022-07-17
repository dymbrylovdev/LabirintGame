import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import ItemCube from "./ItemCube";
import style from "./Cube.module.scss";

function Container() {
   const cubes = useSelector((state: RootState) => state.cubes.cubesArr);
    const selectedRef = useRef<HTMLLIElement | null>(null);
    const [massage, setMassage] = useState(true);

    useEffect(()=> {
        if (massage) alert("Следите за указателями и найдите выход из лабиринта");
        setMassage(false);
    },[])

    return (
        <div className={style.container}>
            {
                cubes.map((cubes, index) => {
                    return <ItemCube
                        cubes={cubes}
                        key={index}
                        selectedRef={selectedRef}
                    />
                })
            }
        </div>
    );
}

export default Container;