import { faAngleDown, faBell, faDownload, faEye, faEyeSlash, faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MenuButon, { MenuList } from '../../src/components/Buton'
import { CommentCard } from '../../src/components/Card'
import DownButon from '../../src/components/DownButon'
import Header from '../../src/components/Header'
import Line from '../../src/components/Line'
import Loading from '../../src/components/Loading'
import LoadingScreen from '../../src/components/LoadingScreen'
import MenuContainer from '../../src/components/MenuContainer'
import StarRating from '../../src/components/StarRating'
import { useAuth } from '../../src/hooks/useAuth'
import { RootState } from '../../src/store'
import { setAnimeModels, setSelectedEpisode, setSelectedEpisodes } from '../../src/store/features/animeReducer'
import { setComment, setComments } from '../../src/store/features/commentsReducer'
import { handleOpenAddReviews, handleOpenBackgroundBlur } from '../../src/store/features/modalReducer'
import { AnimeModels, VideoType, Status, AnimeSeason, AnimeEpisodes, ContentNotification, Type, Like, Ratings, AnimeList, AnimeStatus, Comments } from '../../src/types/Entites'
import { deleteAnimeList, deleteContentNotification, deleteLike, getAnime, getComments, postAnimeList, postComment, postContentNotification, postLike, postRating, putRating } from '../../src/utils/api'
import styles from '../../styles/Home.module.css'
type TABS = "DETAIL" | "COMMENTS" | "STATUS";
export default function Details() {
    const router = useRouter();
    const { url } = router.query;
    const dispatch = useDispatch();

    const [selectedTab, setSelectedTab] = useState<TABS>("DETAIL");
    const [pageType, setPageType] = useState<'MANGA' | 'ANİME'>('ANİME');
    const [selectedMenu, setSelectedMenu] = useState<MenuList>("Anime");

    const [rating, setRating] = useState(0);
    const [pointPanelShow, setPointPanelShow] = useState<"show" | "hide">("hide");
    const [listPanelShow, setListPanelShow] = useState<"show" | "hide">("hide");
    const [downloadPanelShow, setDownloadPanelShow] = useState<"show" | "hide">("hide");
    const [isWatch, setIsWatch] = useState(false);
    const [loading, setLoading] = useState(true);

    const user = useSelector((x: RootState) => x.userReducer.value.user);

    const { animeModels, selectedEpisodes, selectedEpisode } = useSelector((x: RootState) => x.animeReducer);


    useEffect(() => {
        loadAnime();
    }, [url])
    const loadAnime = async () => {
        if (url != undefined) {
            await getAnime(url?.toString()).then((res) => {
                if (res.data.entity != null) {
                    dispatch(setAnimeModels(res.data.entity));
                    if (res.data.entity.animeRating != null) {
                        setRating(res.data.entity.animeRating.rating);
                    }
                }
                else {
                    router.push("/");
                }

            }).catch((er: AxiosError) => {
                router.push("/");
            })
        }
        setTimeout(() => {
            setLoading(false);
        }, 400);

    }


    const Detail = () => {
        return (
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <div className={styles.detailsBody}>
                    <div className={styles.detailsHeader}>
                        <h2>{animeModels.anime.animeName}</h2>
                        <div
                            onClick={async () => {
                                if (animeModels.contentNotification === null) {
                                    await postContentNotification({ userID: user.id, contentID: animeModels.anime.id, type: Type.Anime } as ContentNotification).then((res) => {
                                        dispatch(setAnimeModels({ ...animeModels, contentNotification: res.data.entity } as AnimeModels));
                                    })
                                }
                                else {
                                    await deleteContentNotification(animeModels.contentNotification.id).then((res) => {
                                        if (res.data.isSuccessful) {
                                            dispatch(setAnimeModels({ ...animeModels, contentNotification: res.data.entity } as AnimeModels));
                                        }
                                    })
                                }
                            }}
                            className={styles.movieNotification}>
                            <FontAwesomeIcon fontSize="20px" icon={faBell} color={animeModels.contentNotification === null ? "rgba(255,255,255,0.5)" : "rgb(253, 188, 11)"} />
                        </div>
                    </div>
                    <Divider />
                    <div className={styles.movieInfoSummaryContainer}>
                        {
                            animeModels.categories !== undefined &&
                            animeModels.categories.map((item) => {
                                return <Info key={item.id} name={item.categories.name} />
                            })
                        }
                        <Info name={'Mal: ' + animeModels.anime.malRating} />
                        <Info name={'Bölümler: ' + animeModels.animeEpisodes.length} />
                        <Info name={"Yaş Sınırı: " + animeModels.anime.ageLimit} />
                        <Info name={'Beğeni: ' + animeModels.likeCount} />
                        <Info name={'Site: ' + animeModels.anime.siteRating} />
                        <Info name={'Çıkış: ' + animeModels.anime.showTime} />
                        <Info name={animeModels.anime.videoType === VideoType.AnimeSeries ? "Tür: Film" : "Tür: Dizi"} />
                        <Info name={'Sıralama: ' + animeModels.arrangement} />
                        <Info name={'Sezon Sayısı: ' + animeModels.anime.seasonCount} />
                        <Info name={'İzlenme: ' + animeModels.viewsCount} />
                        <Info name={animeModels.anime.status === Status.Continues ? "Durumu: Devam Ediyor" : "Durumu: Bitti"} />
                    </div>
                    <Divider />
                    <div className={styles.movieSummary}>
                        {animeModels.anime.animeDescription}
                    </div>
                </div>
                <div>
                    <VerticalDivider />
                </div>
            </div>
        )
    }
    const addAnimeList = async (type: AnimeStatus) => {
        if (selectedEpisode !== null && Object.keys(selectedEpisode).length !== 0) {
            var check = animeModels.animeLists.find((y) => y.animeID == animeModels.anime.id && y.episodeID == selectedEpisode.id);
            if (!check) {
                await postAnimeList({ userID: user.id, animeID: animeModels.anime.id, episodeID: selectedEpisode.id, animeStatus: type } as AnimeList).then((res) => {
                    dispatch(setAnimeModels({
                        ...animeModels,
                        animeLists: [...animeModels.animeLists, res.data.entity]
                    } as AnimeModels));
                });
            }
            else {
                await deleteAnimeList(check.id).then(async (res) => {
                    await loadAnime();
                });




            }
        }
    }
    return (
        <LoadingScreen loading={loading}>
            {
                animeModels.anime != null &&
                <div className={styles.archiveBackground}>
                    <Header
                        search={'show'}
                        notification={'hide'}
                        style={{ backgroundColor: '#141414', marginTop: 0, padding: '5px' }} />
                    <div className={styles.archiveContainer}>
                        <div style={{ height: '100%' }}>
                            <MenuContainer>
                                <div className={styles.leftMenuContainer} >
                                    <MenuButon marginright='10px' onClick={() => setSelectedMenu('Anime')} isactive={selectedMenu == "Anime" ? "T" : "F"} name='Anime' />
                                    <MenuButon marginright='10px' onClick={() => {
                                        if (animeModels.manga != null) {
                                            router.push("/manga/" + animeModels.manga.seoUrl);
                                        }
                                    }} name='Manga' />
                                    <MenuButon

                                        width='50px'
                                        color={animeModels.like === null ? "rgba(255,255,255,0.5)" : "rgb(253, 188, 11)"}
                                        marginright='10px' onClick={async () => {

                                            if (animeModels.like === null) {
                                                await postLike({ userID: user.id, contentID: animeModels.anime.id, type: Type.Anime, episodeID: 0 } as Like).then((res) => {
                                                    if (res.data.isSuccessful) {
                                                        dispatch(setAnimeModels({ ...animeModels, like: res.data.entity } as AnimeModels));
                                                    }
                                                })
                                            }
                                            else {
                                                await deleteLike(animeModels.anime.id, Type.Anime).then((res) => {
                                                    if (res.data.isSuccessful) {
                                                        dispatch(setAnimeModels({ ...animeModels, like: null as any } as AnimeModels));
                                                    }
                                                })
                                            }
                                        }} icon={faThumbsUp} />
                                </div>
                                <div className={styles.rightMenuContainer}>
                                    <DownButon onClick={() => {
                                        dispatch(handleOpenBackgroundBlur(true));
                                        dispatch(handleOpenAddReviews(true));
                                    }} type='buton' icon={faAngleDown} name='Oluştur' />
                                    <DownButon
                                        onClick={() => {
                                            if (pointPanelShow === "hide") {
                                                setPointPanelShow('show')
                                            }
                                            else {
                                                setPointPanelShow('hide')
                                            }
                                        }}
                                        show={pointPanelShow}
                                        type='dropdown' icon={faAngleDown} name='Puanla'>
                                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                                            <StarRating rating={rating} handleRating={async (val: number) => {
                                                if (animeModels.animeRating === null) {
                                                    await postRating({ userID: user.id, animeID: animeModels.anime.id, rating: val } as Ratings).then((res) => {
                                                        dispatch(setAnimeModels({ ...animeModels, animeRating: null as any } as AnimeModels));
                                                    });
                                                }
                                                else {
                                                    await putRating({ ...animeModels.animeRating, rating: val } as Ratings).then((res) => {
                                                        dispatch(setAnimeModels({ ...animeModels, animeRating: res.data.entity } as AnimeModels));
                                                    });
                                                }
                                                setRating(val);
                                            }} />
                                        </div>
                                    </DownButon>
                                    {Object.keys(selectedEpisode).length !== 0 && <DownButon
                                        onClick={() => {
                                            if (listPanelShow === "hide") {
                                                setListPanelShow('show')
                                            }
                                            else {
                                                setListPanelShow('hide')
                                            }
                                        }}
                                        show={listPanelShow} type='dropdown' icon={faAngleDown} name='Listele'>
                                        <div className={styles.animeListContainer}>
                                            <div onClick={() => {
                                                addAnimeList(AnimeStatus.IWatched);
                                            }} className={styles.listButons + " " + styles.userSelected + " " + (Object.keys(selectedEpisode).length !== 0 && animeModels.animeLists.find((y) => y.animeID === animeModels.anime.id && y.episodeID === selectedEpisode.id && y.animeStatus === AnimeStatus.IWatched) !== undefined && styles.listButonsActive)}>İzledim</div>
                                            <div onClick={() => {
                                                addAnimeList(AnimeStatus.IWillWatch);
                                            }} className={styles.listButons + " " + styles.userSelected + " " + (Object.keys(selectedEpisode).length !== 0 && animeModels.animeLists.find((y) => y.animeID === animeModels.anime.id && y.episodeID === selectedEpisode.id && y.animeStatus === AnimeStatus.IWillWatch) !== undefined && styles.listButonsActive)}>İzleyeceğim</div>
                                            <div onClick={() => {
                                                addAnimeList(AnimeStatus.Watching);
                                            }} className={styles.listButons + " " + styles.userSelected + " " + (Object.keys(selectedEpisode).length !== 0 && animeModels.animeLists.find((y) => y.animeID === animeModels.anime.id && y.episodeID === selectedEpisode.id && y.animeStatus === AnimeStatus.Watching) !== undefined && styles.listButonsActive)}>İzliyorum</div>
                                        </div>
                                    </DownButon>}
                                    {selectedEpisodes.length !== 0 && <DownButon onClick={() => {
                                        if (downloadPanelShow === "hide") {
                                            setDownloadPanelShow('show')
                                        }
                                        else {
                                            setDownloadPanelShow('hide')
                                        }

                                    }} show={downloadPanelShow} type='dropdown' icon={faAngleDown} name='İndir'>
                                        {
                                            selectedEpisodes.length !== 0 &&
                                            selectedEpisodes.map((item) => {
                                                return <div onClick={() => {
                                                    router.push(item.alternativeVideoDownloadUrl);
                                                }} className={styles.listButons + " " + styles.userSelected}>{item.alternativeName}</div>
                                            })
                                        }
                                    </DownButon>}
                                    <DownButon type='buton' onClick={() => {
                                        setIsWatch(!isWatch);
                                        if (isWatch) {
                                            dispatch(setSelectedEpisode({}));
                                        }
                                    }} icon={faAngleDown} name='İzle' />
                                </div>
                            </MenuContainer>
                            <div className={styles.detailsContainer}>
                                <div className={styles.detailsLeft}>
                                    {selectedTab === "DETAIL" && <Detail />}
                                    {selectedTab === "COMMENTS" && <Comments type={Type.Anime} contentID={animeModels.anime.id} />}
                                    {selectedTab === "STATUS" && <Statuss />}
                                    <div style={{
                                        marginTop: '15px', marginBottom: '15px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'end'
                                    }}>
                                        <OptionButon onClick={() => setSelectedTab('DETAIL')} />
                                        <OptionButon onClick={() => setSelectedTab('COMMENTS')} />
                                        <OptionButon onClick={() => setSelectedTab('STATUS')} />
                                    </div>
                                </div>
                                <div className={styles.detailsRight}>
                                    {
                                        !isWatch ?
                                            <Images />
                                            : <Episodes />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </LoadingScreen>
    )
}
const Comments = (props: { contentID: number, type: Type }) => {
    const user = useSelector((x: RootState) => x.userReducer.value.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const [isVisible, setIsVisible] = useState(false);
    const [form, setForm] = useState({ userID: user.id, comment: '', contentID: props.contentID, type: props.type } as Comments);
    const { comments } = useSelector((x: RootState) => x.commentReducer);

    useEffect(() => {
        loadComments();
    }, [])

    const loadComments = async () => {
        await getComments(props.contentID, props.type).then((res) => {
            dispatch(setComments(res.data.list));
        });
        setTimeout(() => {
            setLoading(false);
        }, 400);
    }
    const saveButon = async () => {
        await postComment({ ...form, isSpoiler: isVisible }).then((res) => {
            loadComments();
        });
    }
    return (
        <div className={styles.commentsContainer}>
            {loading ?
                <Loading></Loading> :
                <div className={styles.commentsContent}>
                    <div className={styles.commentsBody}>
                        {
                            comments.map((item) => {
                                return <CommentCard key={item.id} item={item} />
                            })
                        }
                    </div>
                    <div className={styles.commentsText}>
                        <div className={styles.sendTextInputContainer + " " + styles.commentTextInput}>
                            <textarea
                                value={form.comment}
                                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                                placeholder='Yorum yazınız'></textarea>
                            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 5 }}>
                                <div onClick={saveButon} className={styles.sendButon}>
                                    <FontAwesomeIcon icon={faPaperPlane} color="#fff" />
                                </div>
                                <div onClick={() => setIsVisible(!isVisible)} className={styles.sendButon}>
                                    <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} color="#fff" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
const Statuss = () => {
    return (
        <div className={styles.statussContainer}>
            gönderiler
        </div>
    )
}





interface IOptionButonProps extends HTMLAttributes<HTMLDivElement> { }
const OptionButon = (props: IOptionButonProps) => {
    return (
        <div {...props} style={{
            background: 'rgba(196, 196, 196, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            borderRadius: '100px',
            width: '40px',
            height: '12px',
            marginRight: '10px',
            cursor: 'pointer'
        }}>

        </div>
    )
}
const Divider = () => {
    return (
        <div style={{ flex: 1, marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
            <Line />
        </div>
    )
}
const VerticalDivider = () => {
    return (
        <div style={{ height: '100%', width: '2px', backgroundColor: 'rgba(255,255,255,0.50)' }}></div>
    )
}
const Info = (props: { name: string }) => {
    return (
        <div className={styles.movieInfoSummary}>
            {props.name}
        </div>
    )
}
const Images = () => {
    return (
        <div className={styles.detailsBody}>
            <div className={styles.detailsHeader}>
                <h2>Görseller</h2>
            </div>
            <Divider />
            <div className={styles.detailsImagesContainer}>
                <img src='http://localhost:3000/image1.png' />
            </div>
            <div className={styles.detailsImagesListContainer}>
                <div className={styles.detailsImages}>
                    <img src='http://localhost:3000/viewImage.png' />
                    <img src='http://localhost:3000/viewImage.png' />
                    <img src='http://localhost:3000/viewImage.png' />
                    <img src='http://localhost:3000/viewImage.png' />
                    <img src='http://localhost:3000/viewImage.png' />
                </div>
            </div>
        </div>
    )
}
const Episodes = () => {
    const dispatch = useDispatch();
    const { animeModels } = useSelector((x: RootState) => x.animeReducer)
    const [selectedSeasons, setSelectedSeasons] = useState<AnimeSeason>({} as AnimeSeason);
    const [selectedEpisodes, setSelectedAnimeEpisodes] = useState<AnimeEpisodes>({} as AnimeEpisodes);
    useEffect(() => {
        var firstSeasons = animeModels.animeSeasons[0];
        setSelectedSeasons(firstSeasons);
        var firstEpisode = animeModels.animeEpisodes[0];
        dispatch(setSelectedEpisode(firstEpisode));
        setSelectedAnimeEpisodes(firstEpisode);
        dispatch(setSelectedEpisodes(animeModels.episodes.filter((y) => y.episodeID == firstEpisode.id)))
    }, [])

    const SeasonButon = (props: { name: string, handleSelected?: () => void }) => {
        return (
            <div onClick={props.handleSelected} className={styles.seasonButon + " " + styles.userSelected}>
                {props.name}
            </div>
        )
    }
    return (
        <div className={styles.detailsBody}>
            <div className={styles.detailsHeader}>
                <h2>{selectedEpisodes.episodeName}</h2>
            </div>
            <Divider />
            <div className={styles.detailsVideoPlayerContainer}>

            </div>
            <div className={styles.detailsEpidoesContainer}>
                <div className={styles.epidoseSeasons}>
                    <div>
                        <div className={styles.seasonContainer}>
                            {
                                animeModels.animeSeasons !== null &&
                                animeModels.animeSeasons.map((item) => {
                                    return <SeasonButon handleSelected={() => {
                                        setSelectedSeasons(item);
                                    }} key={item.id} name={item.seasonName} />
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.episodesBody}>
                        {
                            animeModels.animeEpisodes !== null &&
                            animeModels.animeEpisodes.filter((y) => y.seasonID === selectedSeasons.id).map((item) => {
                                return <EpisodeCard onClick={() => {
                                    dispatch(setSelectedEpisode(item));
                                    setSelectedAnimeEpisodes(item);
                                    dispatch(setSelectedEpisodes(animeModels.episodes.filter((y) => y.episodeID == item.id)))
                                }} key={item.id} name={item.episodeName} />
                            })
                        }
                    </div>
                </div>
                <div className={styles.seasonsMusic}>
                    <div className={styles.seasonMusicBody}>
                        <div style={{ marginBottom: '10px' }}><SeasonButon name={selectedSeasons.seasonName + ' Müzikleri'} /></div>
                        <div className={styles.seasonsMusicContainer + " " + styles.musicContainerOverflowY}>
                            {
                                animeModels.animeSeasonMusics !== null &&
                                animeModels.animeSeasonMusics.map((item) => {
                                    return <SeasonMusicCard key={item.id} name={item.musicName} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
interface IEpisodeCard extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
}
const EpisodeCard = (props: IEpisodeCard) => {
    return (
        <div {...props} className={styles.episode + " " + styles.episodeCardWith + " " + styles.userSelected}>
            <div className={styles.episdeCardname}><a>{props.name}</a></div>
        </div>
    )
}
const SeasonMusicCard = (props: { name: string }) => {
    return (
        <div className={styles.episode + " " + styles.userSelected}>
            <a>{props.name}</a>
            <FontAwesomeIcon icon={faDownload} color="rgba(255, 255, 255, 0.35)" />
        </div>
    )
}
