import styles from '../../styles/Home.module.css'
import Line from "./Line";

import { faAngleLeft, faBell, faClose, faComment, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Info } from "../../pages/anime/[url]";
import { RootState } from "../store";
import { setSelectedAnimeModel } from "../store/features/animeReducer";
import { setSelectedMangaModel } from "../store/features/mangaReducer";
import { AnimeModels, ContentNotification, MangaModels, Status, Type, VideoType } from "../types/Entites";
import { deleteContentNotification, postContentNotification } from "../utils/api";
import { CommentCard } from "./Card";

const MovieDescriptionModal = (props: { handleCloseModal: () => void, top?: any }) => {
    var navigate = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((x: RootState) => x.userReducer.value.user);
    const { selectedAnimeModel } = useSelector((x: RootState) => x.animeReducer);
    const [type, setType] = useState('DETAIL' || 'COMMENT');
    const ModalTitleContainer = () => {
        return (
            <div className={styles.titleContainer}>
                <div className={styles.detailsHeader}>
                    <h2>{selectedAnimeModel.anime.animeName}</h2>
                    <div
                        onClick={async () => {
                            if (selectedAnimeModel.contentNotification === null) {
                                await postContentNotification({ userID: user.id, contentID: selectedAnimeModel.anime.id, type: Type.Anime } as ContentNotification).then((res) => {
                                    dispatch(setSelectedAnimeModel({ ...selectedAnimeModel, contentNotification: res.data.entity } as AnimeModels));
                                })
                            }
                            else {
                                await deleteContentNotification(selectedAnimeModel.contentNotification.id).then((res) => {
                                    if (res.data.isSuccessful) {
                                        dispatch(setSelectedAnimeModel({ ...selectedAnimeModel, contentNotification: res.data.entity } as AnimeModels));
                                    }
                                })
                            }
                        }}
                        className={styles.movieNotification}>
                        <FontAwesomeIcon fontSize="20px" icon={faBell} color={selectedAnimeModel.contentNotification === null ? "rgba(255,255,255,0.5)" : "rgb(253, 188, 11)"} />
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}></div>
                <Line />
            </div>
        )
    }
    const ModalBodyContainer = () => {
        return (
            <div className={styles.bodyContainer}>
                {
                    type === 'DETAIL' ?
                        selectedAnimeModel.anime.animeDescription
                        :
                        selectedAnimeModel.comments !== undefined && selectedAnimeModel.comments.length !== 0 ?
                            <div className={styles.discoverCommentContainer}>
                                {
                                    selectedAnimeModel.comments.map((item, index) => {
                                        return <CommentCard key={index} item={item} />
                                    })
                                }
                            </div>
                            :
                            <div style={{ display: 'flex', justifyContent: 'center' }}>Yorum bulunamadı</div>
                }
            </div>
        )
    }
    const ModalFooterContainer = () => {
        return (
            <div className={styles.footerContainer}>
                {type === 'DETAIL' ? <a
                    onClick={() => {
                        navigate.push("/anime/" + selectedAnimeModel.anime.seoUrl)
                    }}>
                    <FontAwesomeIcon color='#ffffff60' icon={faPlay} />
                </a>
                    :
                    <a onClick={() => setType('DETAIL')}>
                        <FontAwesomeIcon color='#ffffff60' icon={faAngleLeft} />
                    </a>
                }
                {type !== 'COMMENT' && <a onClick={() => setType('COMMENT')}><FontAwesomeIcon color='#ffffff60' icon={faComment} /></a>}
            </div>
        )
    }
    return (
        <div style={props.top ? { top: props.top, zIndex: '9999' } : undefined} className={styles.infoModalDescriptionModal}>
            <div className={styles.infoModalContent}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <div className={styles.infoModalCloseContainer}
                        onClick={() => {
                            dispatch(setSelectedAnimeModel({}));
                            props.handleCloseModal();

                        }}>
                        <FontAwesomeIcon icon={faClose} color={"#fff"} size={"2x"} />
                    </div>
                </div>
                {type === 'DETAIL' ?
                    <div>
                        <ModalTitleContainer />
                        <div className={styles.infoHeaderContainer}>
                            {
                                selectedAnimeModel.categories !== undefined &&
                                selectedAnimeModel.categories.map((item) => {
                                    return <Info key={item.id} name={item.categories.name} />
                                })
                            }
                            <Info name={'Mal: ' + selectedAnimeModel.anime.malRating} />
                            <Info name={'Bölümler: ' + selectedAnimeModel.animeEpisodes.length} />
                            <Info name={"Yaş Sınırı: " + selectedAnimeModel.anime.ageLimit} />
                            <Info name={'Beğeni: ' + selectedAnimeModel.likeCount} />
                            <Info name={'Site: ' + selectedAnimeModel.anime.siteRating} />
                            <Info name={'Çıkış: ' + selectedAnimeModel.anime.showTime} />
                            <Info name={selectedAnimeModel.anime.videoType === VideoType.AnimeSeries ? "Tür: Dizi" : "Tür: Film"} />
                            <Info name={'Sıralama: ' + selectedAnimeModel.arrangement} />
                            <Info name={'Sezon Sayısı: ' + selectedAnimeModel.anime.seasonCount} />
                            <Info name={'İzlenme: ' + selectedAnimeModel.viewsCount} />
                            <Info name={selectedAnimeModel.anime.status === Status.Continues ? "Durumu: Devam Ediyor" : "Durumu: Bitti"} />
                        </div>
                        <div className={styles.infoLineContainer}>
                            <Line />
                        </div>
                        <ModalBodyContainer />
                    </div>
                    : <ModalBodyContainer />
                }
                <ModalFooterContainer />
            </div>
        </div>
    )
}

const MangaDescriptionModal = (props: { handleCloseModal: () => void, top?: any }) => {
    const dispatch = useDispatch();
    const navigate = useRouter();
    const user = useSelector((x: RootState) => x.userReducer.value.user);
    const { selectedMangaModel } = useSelector((x: RootState) => x.mangaReducer);
    const [type, setType] = useState('DETAIL' || 'COMMENT');
    const ModalTitleContainer = () => {
        return (
            <div className={styles.titleContainer}>
                <div className={styles.detailsHeader}>
                    <h2>{selectedMangaModel.manga.name}</h2>
                    <div
                        onClick={async () => {
                            if (selectedMangaModel.contentNotification === null) {
                                await postContentNotification({ userID: user.id, contentID: selectedMangaModel.manga.id, type: Type.Anime } as ContentNotification).then((res) => {
                                    dispatch(setSelectedMangaModel({ ...selectedMangaModel, contentNotification: res.data.entity } as MangaModels));
                                    console.log("a")
                                }).catch((er) => {
                                    console.log(er)
                                });
                            }
                            else {
                                await deleteContentNotification(selectedMangaModel.contentNotification.id).then((res) => {
                                    if (res.data.isSuccessful) {
                                        dispatch(setSelectedMangaModel({ ...selectedMangaModel, contentNotification: res.data.entity } as MangaModels));
                                    }
                                })
                            }
                        }}
                        className={styles.movieNotification}>
                        <FontAwesomeIcon fontSize="20px" icon={faBell} color={selectedMangaModel.contentNotification === null ? "rgba(255,255,255,0.5)" : "rgb(253, 188, 11)"} />
                    </div>
                </div>


                <div style={{ marginBottom: '10px' }}></div>
                <Line />
            </div>
        )
    }
    const ModalBodyContainer = () => {
        return (
            <div className={styles.bodyContainer}>
                {
                    type === 'DETAIL' ?
                        selectedMangaModel.manga.description
                        :
                        selectedMangaModel.comments !== undefined && selectedMangaModel.comments.length !== 0 ?
                            <div className={styles.discoverCommentContainer}>
                                {
                                    selectedMangaModel.comments.map((item, index) => {
                                        return <CommentCard key={index} item={item} />
                                    })
                                }
                            </div>
                            :
                            <div style={{ display: 'flex', justifyContent: 'center' }}>Yorum bulunamadı</div>
                }
            </div>
        )
    }
    const ModalFooterContainer = () => {
        return (
            <div className={styles.footerContainer}>
                {type === 'DETAIL' ? <a onClick={() => {
                    navigate.push("/manga/" + selectedMangaModel.manga.seoUrl)
                }}><FontAwesomeIcon color='#ffffff60' icon={faPlay} /></a>
                    :
                    <div onClick={() => setType('DETAIL')}><FontAwesomeIcon color='#ffffff60' icon={faAngleLeft} /></div>
                }
                {type !== 'COMMENT' && <div onClick={() => setType('COMMENT')}><FontAwesomeIcon color='#ffffff60' icon={faComment} /></div>}
            </div>
        )
    }
    return (
        <div style={props.top ? { top: props.top, zIndex: '9999' } : undefined} className={styles.infoModalDescriptionModal}>
            <div className={styles.infoModalContent}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <div className={styles.infoModalCloseContainer}
                        onClick={() => {
                            dispatch(setSelectedMangaModel({}));
                            props.handleCloseModal();

                        }}>
                        <FontAwesomeIcon icon={faClose} color={"#fff"} size={"2x"} />
                    </div>
                </div>
                {
                    type === 'DETAIL' &&
                    <div>
                        <ModalTitleContainer />
                        <div className={styles.infoHeaderContainer}>
                            {
                                selectedMangaModel.categories !== undefined &&
                                selectedMangaModel.categories.map((item) => {
                                    return <Info key={item.id} name={item.categories.name} />
                                })
                            }
                            <Info name={'Bölümler: ' + selectedMangaModel.mangaEpisodeCount} />
                            <Info name={"Yaş Sınırı: " + selectedMangaModel.manga.ageLimit} />
                            <Info name={'Beğeni: ' + selectedMangaModel.likeCount} />
                            <Info name={'Sıralama: ' + selectedMangaModel.arrangement} />
                            <Info name={'Sezon Sayısı: ' + selectedMangaModel.mangaEpisodeCount} />
                            <Info name={'İzlenme: ' + selectedMangaModel.viewsCount} />
                            <Info name={selectedMangaModel.manga.status === Status.Continues ? "Durumu: Devam Ediyor" : "Durumu: Bitti"} />
                        </div>
                        <div className={styles.infoLineContainer}>
                            <Line />
                        </div>
                    </div>
                }
                <ModalBodyContainer />
                <ModalFooterContainer />
            </div>
        </div>
    )
}

export { MovieDescriptionModal, MangaDescriptionModal };
