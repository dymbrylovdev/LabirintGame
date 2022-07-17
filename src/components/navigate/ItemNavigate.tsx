import React from 'react';
import style from "./Navigate.module.scss"
import {cursorValue} from "../../global/globalValue";
import imgTop from "../../assets/img/top.png";
import imgRight from "../../assets/img/right.png";
import imgBottom from "../../assets/img/bottom.png";
import imgLeft from "../../assets/img/left.png";

type ItemNavigateProps = {
    item: { value: number, cursor: number, active: boolean };
}

function ItemNavigate({item}: ItemNavigateProps) {

    function cursorView() {
        switch (item.cursor) {
            case cursorValue.TOP:
                return imgTop;
            case cursorValue.LEFT:
                return imgLeft;
            case cursorValue.BOTTOM:
                return imgBottom;
            case cursorValue.RIGHT:
                return imgRight;
            default:
                return "https://kartinkin.net/uploads/posts/2021-03/1616039982_29-p-fon-dlya-knopki-33.png";
        }
    }

    return (
        <li key={item.value} className={`${style.item_nav} ${item.active ? style.active : ""}`}>
            {
                <img src={cursorView()}/>
            }
        </li>
    );
}

export default ItemNavigate;