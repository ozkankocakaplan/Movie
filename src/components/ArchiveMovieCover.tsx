import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Home.module.css';
import { baseUrl } from '../utils/api';
export type DescriptionType = "LEFT" | "RIGHT";
interface IArchiveMovieCoverProps extends React.HTMLAttributes<HTMLDivElement> {
    show?: string,
    blur?: string,
    alt?: string;
    src?: string;
}
export default function ArchiveMovieCover(props: IArchiveMovieCoverProps) {
    return (
        <div  {...props} className={styles.archiveMovieCoverContainer}>
            <img alt={props.alt} src={props.src !== null ? props.src : ""} style={{
                opacity: props.show === "1" ? 1 : 0.4,

            }} className={props.blur === "1" ? styles.archiveMovieCoverImg : styles.archiveMovieCoverImgFilter} />
        </div>
    )
}
