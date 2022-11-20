import React from 'react'
import Modal from './Modal'
import styles from '../../styles/Home.module.css'
import { BorderButon } from './Buton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

interface IFilterModal extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode,
}
export default function FilterModal(props: IFilterModal) {
    return (
        <div className={styles.filterModal}>
            <div className={styles.filterModalContainer}>
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
