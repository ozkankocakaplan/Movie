import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styles from '../../styles/Home.module.css'
import { handleOpenBackgroundBlur } from '../store/features/modalReducer';
interface IMovieProps {
    src: string,
    marginLeft?: string,
    infoContainerLeft?: string
}
export default function Movie(props: IMovieProps) {
    const dispatch = useDispatch();
    const [movieInfo, setMovieInfo] = useState(false);
    return (
        <div onMouseOver={() => {
            setMovieInfo(true);
        }} onMouseLeave={() => {
            setMovieInfo(false);
        }}>
            <img src={props.src}
                className={styles.movieCover}
                style={{
                    opacity: .95,
                    backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25))',
                    height: '160px',
                    boxShadow: 'inset 10px 10px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '7px',
                    marginLeft: props.marginLeft ? props.marginLeft : "10px", width: '115px', cursor: 'pointer'
                }} />
            {movieInfo && <div style={{
                padding: '10px', width: '300px',
                height: '160px',
                marginLeft: props.infoContainerLeft ? props.infoContainerLeft : '-135px',
                zIndex: 300,
                position: 'absolute', background: 'rgba(24, 24, 24, 0.95)', top: 0,
                color: '#fff'
            }}>
            </div>}
        </div>
    )
}
