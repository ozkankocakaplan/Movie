import React from 'react'
import styles from '../../styles/Home.module.css';
const MenuContainer = (props: { children: React.ReactNode }) => {
    return (
        <div className={styles.menuContainer}>
            {props.children}
        </div>
    )
}
export default MenuContainer;
