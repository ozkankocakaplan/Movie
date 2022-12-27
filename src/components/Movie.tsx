import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Home.module.css'
import { RootState } from '../store';
import { setSelectedAnimeModel } from '../store/features/animeReducer';
import { setSelectedMangaModel } from '../store/features/mangaReducer';
import { handleOpenBackgroundBlur, handleWarningModal } from '../store/features/modalReducer';
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
    const user = useSelector((state: RootState) => state.userReducer.value.user);
    const navigate = useRouter();
    const dispatch = useDispatch();
    return (
        <div>
            {
                props.type === 'MODAL' ?
                    <img
                        onClick={() => {
                            if (user !== undefined && Object.keys(user).length !== 0) {
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
                            }
                            else {
                                dispatch(handleOpenBackgroundBlur(true));
                                dispatch(handleWarningModal({ text: 'İçeriği görüntülemek için giriş yapmalısınız', isOpen: true }));
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
                        if (user !== undefined && Object.keys(user).length !== 0) {
                            if (props.anime) {
                                navigate.push("/anime/" + props.anime.seoUrl)
                            }
                            else {
                                navigate.push("/manga/" + props.manga.seoUrl)
                            }
                        }
                        else {
                            dispatch(handleOpenBackgroundBlur(true));
                            dispatch(handleWarningModal({ text: 'İçeriği görüntülemek için giriş yapmalısınız', isOpen: true }));
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
