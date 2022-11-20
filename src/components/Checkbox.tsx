import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import styles from '../../styles/Home.module.css';
interface ICheckBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    selected: boolean
}
export default function Checkbox(props: ICheckBoxProps) {
    return (
        <div {...props} className={styles.checkBox}>
            {
                props.selected && <FontAwesomeIcon fontSize={12} color='#fff' icon={faCheck} />
            }
        </div>
    )
}
