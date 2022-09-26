import React, { useState } from 'react'
import styles from '../../styles/Home.module.css'
interface IMovieProps {
    src: string,
    marginLeft?: string
}
export default function Movie(props: IMovieProps) {
    const [movieInfo, setMovieInfo] = useState(false);
    return (
        <div onMouseOver={() => setMovieInfo(true)} onMouseLeave={() => setMovieInfo(false)}>
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
            <div style={{
                display: movieInfo ? "block" : "none",
                padding: '10px', width: '300px',
                height: '160px',
                marginLeft: '135px',
                zIndex: 200,
                position: 'absolute', background: 'rgba(24, 24, 24, 0.95)', top: 0,
                color: '#fff'
            }}>
                Adam olana çok bile
            </div>
        </div>
    )
}
