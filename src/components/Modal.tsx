import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styles from '../../styles/Home.module.css';
interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode,
    width?: number,
    id?: string
}
export default function Modal(props: IModalProps) {
    return (
        <div id={props.id ? props.id : "modal-" + Math.floor(Math.random() * 11)} className={styles.modal}>
            <div style={props.width ? { width: props.width + "px" } : undefined} className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <div {...props} className={styles.modalClose}>
                        <FontAwesomeIcon
                            fontSize={22} icon={faClose} color="#fff" />
                    </div>
                </div>
                {
                    props.children
                }
            </div>
        </div>
    )
}
