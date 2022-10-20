import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styles from '../../styles/Home.module.css';
export type MenuList = "Anime" | "Manga";

interface IButonProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string,
    isactive?: string,
    color?: string,
    icon?: IconProp,
    width?: string,
    marginright?: string,
}
export const BorderButon = (props: IButonProps) => {
    return (
        <div {...props} className={styles.borderButon}>
            {props.name}
        </div>
    )
}
const MenuButon = (props: IButonProps) => {
    return (
        <div {...props} style={{
            width: props.width != undefined ? props.width : "157px",
            marginRight: props.marginright != undefined ? props.marginright : "10px"
        }} className={props.isactive === "T" ?
            styles.menuButon + " " + styles.butonButonShadown : styles.menuButon}>
            {
                props.icon !== undefined ? <FontAwesomeIcon color={props.color} icon={props.icon} /> : props.name
            }
        </div>
    )
}
export default MenuButon;