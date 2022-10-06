import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import styles from '../../styles/Home.module.css';
export default function Checkbox(props: { selected: boolean }) {
    return (
        <div className={styles.checkBox}>
            {
                props.selected && <FontAwesomeIcon fontSize={12} color='#fff' icon={faCheck} />
            }
        </div>
    )
}
