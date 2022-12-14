import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styles from '../../styles/Home.module.css'
import { setSelectedAnimeModel } from '../store/features/animeReducer';
import { setSelectedMangaModel } from '../store/features/mangaReducer';
import { handleOpenBackgroundBlur } from '../store/features/modalReducer';
interface IMovieProps {
    src: string,
    marginLeft?: string,
    infoContainerLeft?: string,
    handleOpenModal?: () => void,
    anime?: any,
    manga?: any,
    type: 'MODAL' | 'LINK'
}
export default function Movie(props: IMovieProps) {
    const navigate = useRouter();
    const dispatch = useDispatch();
    return (
        <div>
            {
                props.type === 'MODAL' ?
                    <img
                        onClick={() => {
                            if (props.anime) {
                                dispatch(setSelectedAnimeModel(props.anime));
                            }
                            else {
                                dispatch(setSelectedMangaModel(props.manga));
                            }
                            if (props.handleOpenModal) {
                                dispatch(handleOpenBackgroundBlur(true));
                                props.handleOpenModal();
                            }
                        }}
                        src={props.src}
                        className={styles.movieCover}
                        style={{
                            opacity: .95,
                            backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25))',
                            height: '160px',
                            boxShadow: 'inset 10px 10px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '7px',
                            marginLeft: props.marginLeft ? props.marginLeft : "10px", width: '115px', cursor: 'pointer'
                        }} />
                    :
                    <img onClick={() => {
                        if (props.anime) {
                            navigate.push("/anime/" + props.anime.seoUrl)
                        }
                        else {
                            navigate.push("/manga/" + props.manga.seoUrl)
                        }
                    }} src={props.src}
                        className={styles.movieCover}
                        style={{
                            opacity: .95,
                            backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25))',
                            height: '160px',
                            boxShadow: 'inset 10px 10px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '7px',
                            marginLeft: props.marginLeft ? props.marginLeft : "10px", width: '115px', cursor: 'pointer'
                        }} />

            }

        </div>
    )
}
