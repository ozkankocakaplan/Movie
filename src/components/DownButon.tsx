import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styles from '../../styles/Home.module.css';
interface IButonProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string,
    icon?: IconProp,
    show?: 'show' | 'hide',
    children?: React.ReactNode
    type: 'dropdown' | 'buton',
}
const DownButon = (props: IButonProps) => {
    return (<div>
        <div {...props} className={styles.downMenuButon}>
            {
                props.icon !== undefined ? <span style={{ display: 'flex', flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
                    {props.name}
                    {props.type === 'dropdown' && <FontAwesomeIcon icon={props.icon} />}
                </span> : props.name

            }
        </div>
        {props.show === 'show' && <div className={styles.dropdownMenu}>
            {props.children}
        </div>}
    </div>)

}
export default DownButon;
