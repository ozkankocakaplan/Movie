import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Home.module.css';
export type DescriptionType = "LEFT" | "RIGHT";
interface IArchiveMovieCoverProps extends React.HTMLAttributes<HTMLDivElement> {
    show?: string,
    blur?: string,
}
export default function ArchiveMovieCover(props: IArchiveMovieCoverProps) {
    return (
        <div  {...props} className={styles.archiveMovieCoverContainer}>
            <img src="http://localhost:3000/movieCover.png" style={{
                opacity: props.show === "1" ? 1 : 0.4,

            }} className={props.blur === "1" ? styles.archiveMovieCoverImg: styles.archiveMovieCoverImgFilter} />
        </div>
    )
}
