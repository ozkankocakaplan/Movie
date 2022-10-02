import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styles from '../../styles/Home.module.css';
interface IButonProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string,
    icon?: IconProp,
}
const DownButon = (props: IButonProps) => {
    return (<div {...props} className={styles.downMenuButon}>
        {
            props.icon !== undefined ? <span style={{ display: 'flex', flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
                {props.name}
                <FontAwesomeIcon icon={props.icon} />
            </span> : props.name
        }
    </div>)
}
export default DownButon;
