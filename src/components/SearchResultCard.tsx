import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from '../../styles/Home.module.css';
import { useRouter } from "next/router";
import { AnimeAndMangaModels, Type, VideoType } from "../types/Entites";
import { baseUrl } from '../utils/api';

export const SearchResultCard = (props: { entity: AnimeAndMangaModels }) => {
    var navigate = useRouter();
    return (
        <div className={styles.searchResultCard}>
            <div style={{ cursor: 'pointer' }} onClick={() => {
                if (props.entity.type === Type.Anime) {
                    navigate.push("/anime/" + props.entity.url)
                }
                else {
                    navigate.push("/manga/" + props.entity.url);
                }
            }} className={styles.searchResultImg}>
                {
                    props.entity.img !== null && props.entity.img.length !== 0 ?
                        <img src={baseUrl + props.entity.img} />
                        :
                        <img src={"http://localhost:3000/logo.png"} />
                }

            </div>
            <div className={styles.searchResultContent}>
                <div className={styles.searchContentButon}>Toplam Gönderi: {props.entity.fanArtCount + props.entity.reviewsCount}</div>
                {props.entity.type === Type.Anime && <div className={styles.searchContentButon}>Tür: {props.entity.videoType == VideoType.AnimeSeries ? " Dizi" : "Film"}</div>}
                <div className={styles.searchContentButon}>Eleştiri: {props.entity.reviewsCount}</div>
                <div className={styles.searchContentButon}>Sıralama: {props.entity.arrangement}</div>
                <div className={styles.searchContentButon}>Fan Art: {props.entity.fanArtCount}</div>
                <div className={styles.searchContentButon}>Beğeni: {props.entity.like}</div>
            </div>
        </div>
    )
}
interface IDiscoverSearchContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    entity: AnimeAndMangaModels
}
export const DiscoverSearchContainerCard = (props: IDiscoverSearchContainerProps) => {
    return (
        <div {...props} className={styles.searchResultCard + " " + styles.containerBottom}>
            <div style={{ cursor: 'pointer' }} className={styles.searchResultImg}>
                {
                    props.entity.img !== null && props.entity.img.length !== 0 ?
                        <img src={baseUrl + props.entity.img} />
                        :
                        <img src={"http://localhost:3000/logo.png"} />
                }
            </div>
            <div className={styles.searchResultContent}>
                <div style={{ cursor: 'pointer', color: 'rgba(255, 255, 255, 0.45)', fontSize: 14, lineHeight: 1.5 }}>{props.entity.name}</div>
            </div>
        </div>
    )
}