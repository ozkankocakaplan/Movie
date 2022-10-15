import React from 'react'
import styles from '../../styles/Home.module.css';
import Loading from './Loading';
export default function LoadingScreen(props: { children: React.ReactNode, loading: boolean }) {
    return (
        <div className={props.loading ? styles.loadingScreen : undefined}>
            {props.loading && <Loading />}
            {!props.loading && props.children}
        </div>
    )
}
