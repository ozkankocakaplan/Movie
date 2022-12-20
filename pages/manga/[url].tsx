import { faAngleDown, faBell, faEye, faEyeSlash, faFilter, faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MenuButon, { MenuList } from '../../src/components/Buton'
import { CommentCard, MemoFanArtCard, MemoReviewCard } from '../../src/components/Card'
import DownButon from '../../src/components/DownButon'
import FilterModal from '../../src/components/FilterModal'
import Header from '../../src/components/Header'
import Line from '../../src/components/Line'
import Loading from '../../src/components/Loading'
import LoadingScreen from '../../src/components/LoadingScreen'
import MenuContainer from '../../src/components/MenuContainer'
import StarRating from '../../src/components/StarRating'

import { RootState } from '../../src/store'
import { setAnimeModel } from '../../src/store/features/animeReducer'
import { setComments } from '../../src/store/features/commentsReducer'
import { setMangaModel, setSelectedEpisode } from '../../src/store/features/mangaReducer'
import { handleOpenAddReviews, handleOpenBackgroundBlur } from '../../src/store/features/modalReducer'
import { setSelectedImage } from '../../src/store/features/userReducer'
import { Comments, ContentNotification, Like, MangaEpisodeContent, MangaEpisodes, MangaList, MangaModels, MangaStatus, Ratings, Status, Type } from '../../src/types/Entites'
import { baseUrl, deleteContentNotification, deleteLike, deleteMangaList, getComments, getManga, postComment, postContentNotification, postLike, postMangaList, postRating, putRating } from '../../src/utils/api'
import styles from '../../styles/Home.module.css'
type TABS = "DETAIL" | "COMMENTS" | "STATUS";
export default function Details() {
    const router = useRouter();
    const { url } = router.query;
    const dispatch = useDispatch();

    const [selectedTab, setSelectedTab] = useState<TABS>("DETAIL");
    const [selectedMenu, setSelectedMenu] = useState<MenuList>("Manga");

    const [rating, setRating] = useState(0);
    const [pointPanelShow, setPointPanelShow] = useState<"show" | "hide">("hide");
    const [listPanelShow, setListPanelShow] = useState<"show" | "hide">("hide");

    const [isRead, setIsRead] = useState(false);
    const [loading, setLoading] = useState(true);

    const user = useSelector((x: RootState) => x.userReducer.value.user);
    const [isFilterShow, setIsFilterShow] = useState(false);
    const { mangaModel, selectedEpisode, selectedEpisodes } = useSelector((x: RootState) => x.mangaReducer);
    var contentImagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
        loadmanga();
    }, [url])
    const loadmanga = async () => {
        dispatch(setAnimeModel({}));
        if (url != undefined) {
            await getManga(url as any).then((res) => {
                if (res.data.entity != null) {
                    dispatch(setMangaModel(res.data.entity));
                    if (res.data.entity.mangaRating != null) {
                        setRating(res.data.entity.mangaRating.rating);
                    }
                }
                else {
                    console.log(res.data);
                }

            }).catch((er: AxiosError) => {
                // router.push("/");
                console.log(er);
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
                        <h2>{mangaModel.manga.name}</h2>
                        <div
                            onClick={async () => {
                                if (mangaModel.contentNotification === null) {
                                    await postContentNotification({ userID: user.id, contentID: mangaModel.manga.id, type: Type.Manga } as ContentNotification).then((res) => {
                                        dispatch(setMangaModel({ ...mangaModel, contentNotification: res.data.entity } as MangaModels));
                                    })
                                }
                                else {
                                    await deleteContentNotification(mangaModel.contentNotification.id).then((res) => {
                                        if (res.data.isSuccessful) {
                                            dispatch(setMangaModel({ ...mangaModel, contentNotification: res.data.entity } as MangaModels));
                                        }
                                    })
                                }
                            }}
                            className={styles.movieNotification}>
                            <FontAwesomeIcon fontSize="20px" icon={faBell} color={mangaModel.contentNotification === null ? "rgba(255,255,255,0.5)" : "rgb(253, 188, 11)"} />
                        </div>
                    </div>
                    <Divider />
                    <div className={styles.movieInfoSummaryContainer}>
                        {
                            mangaModel.categories !== undefined &&
                            mangaModel.categories.map((item) => {
                                return <Info key={item.id} name={item.categories.name} />
                            })
                        }
                        <Info name={'Mal: ' + mangaModel.manga.malRating} />
                        <Info name={'Bölümler: ' + mangaModel.mangaEpisodes.length} />
                        <Info name={"Yaş Sınırı: " + mangaModel.manga.ageLimit} />
                        <Info name={'Beğeni: ' + mangaModel.likeCount} />
                        <Info name={'Site: ' + mangaModel.manga.siteRating} />
                        <Info name={'Sıralama: ' + mangaModel.arrangement} />
                        <Info name={'İzlenme: ' + mangaModel.viewsCount} />
                        <Info name={mangaModel.manga.status === Status.Continues ? "Durumu: Devam Ediyor" : "Durumu: Bitti"} />
                    </div>
                    <Divider />
                    <div className={styles.movieSummary}>
                        {mangaModel.manga.description}
                    </div>
                </div>
                <div>
                    <VerticalDivider />
                </div>
            </div>
        )
    }
    const addmangaList = async (type: MangaStatus) => {
        if (selectedEpisode !== null && Object.keys(selectedEpisode).length !== 0) {
            var check = mangaModel.mangaLists.find((y) => y.mangaID == mangaModel.manga.id && y.episodeID == selectedEpisode.id);
            if (!check) {
                await postMangaList({ userID: user.id, mangaID: mangaModel.manga.id, episodeID: selectedEpisode.id, status: type } as MangaList).then((res) => {
                    dispatch(setMangaModel({
                        ...mangaModel,
                        mangaLists: [...mangaModel.mangaLists, res.data.entity]
                    } as MangaModels));
                });
            }
            else {
                await deleteMangaList(check.id).then(async (res) => {
                    await loadmanga();
                });
            }
        }
    }

    return (
        <LoadingScreen loading={loading}>
            {
                mangaModel.manga != null &&
                <div className={styles.archiveBackground}>
                    <Header
                        search={'show'}
                        notification={'hide'}
                        style={{ backgroundColor: '#141414', marginTop: 0, padding: '5px' }} />
                    <div className={styles.archiveContainer + " " + (Object.keys(selectedEpisode).length !== 0 && styles.heightInherit)}>
                        <div>
                            <MenuContainer>
                                <div className={styles.leftMenuContainer} >

                                    <MenuButon marginright='10px' onClick={() => {
                                        if (mangaModel.anime != null) {
                                            router.push("/anime/" + mangaModel.anime.seoUrl);
                                        }
                                    }} name='Anime' />
                                    <MenuButon marginright='10px' onClick={() => setSelectedMenu('Manga')} isactive={selectedMenu == "Manga" ? "T" : "F"} name='Manga' />
                                    <MenuButon
                                        width='50px'
                                        color={mangaModel.like === null ? "rgba(255,255,255,0.5)" : "rgb(253, 188, 11)"}
                                        marginright='10px' onClick={async () => {

                                            if (mangaModel.like === null) {
                                                await postLike({ userID: user.id, contentID: mangaModel.manga.id, type: Type.Manga, episodeID: 0 } as Like).then((res) => {
                                                    if (res.data.isSuccessful) {
                                                        dispatch(setMangaModel({ ...mangaModel, like: res.data.entity } as MangaModels));
                                                    }
                                                })
                                            }
                                            else {
                                                await deleteLike(mangaModel.manga.id, Type.Manga).then((res) => {
                                                    if (res.data.isSuccessful) {
                                                        dispatch(setMangaModel({ ...mangaModel, like: null as any } as MangaModels));
                                                    }
                                                })
                                            }
                                        }} icon={faThumbsUp} />
                                    <MenuButon
                                        id="headerFilterButon"
                                        width='50px'
                                        color={"rgba(255,255,255,0.5)"}
                                        marginright='10px' onClick={() => {
                                            setIsRead(!isRead);
                                            if (isRead) {
                                                dispatch(setSelectedEpisode({}));
                                            }
                                            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                                        }} icon={!isRead ? faEye : faEyeSlash} />
                                    <MenuButon
                                        id="headerFilterButon"
                                        width='50px'
                                        color={"rgba(255,255,255,0.5)"}
                                        marginright='0px' onClick={async () => {
                                            setIsFilterShow(true);
                                        }} icon={faFilter} />
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
                                                if (mangaModel.mangaRating === null) {
                                                    await postRating({ userID: user.id, animeID: mangaModel.manga.id, rating: val, type: Type.Manga } as Ratings).then((res) => {
                                                        dispatch(setMangaModel({ ...mangaModel, mangaRating: null as any } as MangaModels));
                                                    });
                                                }
                                                else {
                                                    await putRating({ ...mangaModel.mangaRating, rating: val, type: Type.Manga } as Ratings).then((res) => {
                                                        dispatch(setMangaModel({ ...mangaModel, mangaRating: res.data.entity } as MangaModels));
                                                    });
                                                }
                                                setRating(val);
                                            }} />
                                        </div>
                                    </DownButon>
                                    {selectedEpisode !== undefined && Object.keys(selectedEpisode).length !== 0 && <DownButon
                                        onClick={() => {
                                            if (listPanelShow === "hide") {
                                                setListPanelShow('show')
                                            }
                                            else {
                                                setListPanelShow('hide')
                                            }
                                        }}
                                        show={listPanelShow} type='dropdown' icon={faAngleDown} name='Listele'>
                                        <div className={styles.mangaListContainer}>
                                            <div onClick={() => {
                                                addmangaList(MangaStatus.IRead);
                                            }} className={styles.listButons + " " + styles.userSelected + " " + (Object.keys(selectedEpisode).length !== 0 && mangaModel.mangaLists.find((y) => y.mangaID === mangaModel.manga.id && y.episodeID === selectedEpisode.id && y.status === MangaStatus.IRead) !== undefined && styles.listButonsActive)}>Okudum</div>
                                            <div onClick={() => {
                                                addmangaList(MangaStatus.IWillRead);
                                            }} className={styles.listButons + " " + styles.userSelected + " " + (Object.keys(selectedEpisode).length !== 0 && mangaModel.mangaLists.find((y) => y.mangaID === mangaModel.manga.id && y.episodeID === selectedEpisode.id && y.status === MangaStatus.IWillRead) !== undefined && styles.listButonsActive)}>Okuyacağım</div>
                                            <div onClick={() => {
                                                addmangaList(MangaStatus.Reading);
                                            }} className={styles.listButons + " " + styles.userSelected + " " + (Object.keys(selectedEpisode).length !== 0 && mangaModel.mangaLists.find((y) => y.mangaID === mangaModel.manga.id && y.episodeID === selectedEpisode.id && y.status === MangaStatus.Reading) !== undefined && styles.listButonsActive)}>Okuyorum</div>
                                        </div>
                                    </DownButon>}

                                    <DownButon type='buton' onClick={() => {
                                        setIsRead(!isRead);
                                        if (isRead) {
                                            dispatch(setSelectedEpisode({}));
                                        }
                                    }} icon={faAngleDown} name='Oku' />
                                </div>
                            </MenuContainer>
                            <div className={styles.detailsMangaContainer + " " + styles.heightInherit}>
                                <div className={styles.detailsContent}>
                                    <div className={styles.detailsLeft}>
                                        {selectedTab === "DETAIL" && <Detail />}
                                        {selectedTab === "COMMENTS" && <Comments type={Type.Manga} contentID={mangaModel.manga.id} />}
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
                                            !isRead ?
                                                <Images />
                                                : <Episodes />
                                        }
                                    </div>
                                </div>
                                <div ref={contentImagesRef} className={styles.mangaContentImages}>
                                    {
                                        Object.keys(selectedEpisode).length !== 0 &&
                                        [...mangaModel.mangaEpisodeContents].sort((a, b) => a.contentOrder > b.contentOrder ? -1 : 1).map((item) => {
                                            return <MangaImageContent key={item.id} {...item} />
                                        })
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    {isFilterShow && <FilterModal onClick={() => setIsFilterShow(false)}>
                        <div style={{ marginBottom: '10px' }}>
                            <DownButon onClick={() => {
                                dispatch(handleOpenBackgroundBlur(true));
                                dispatch(handleOpenAddReviews(true));
                            }} type='buton' icon={faAngleDown} name='Oluştur' />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
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
                                        if (mangaModel.mangaRating === null) {
                                            await postRating({ userID: user.id, animeID: mangaModel.manga.id, rating: val, type: Type.Manga } as Ratings).then((res) => {
                                                dispatch(setMangaModel({ ...mangaModel, mangaRating: null as any } as MangaModels));
                                            });
                                        }
                                        else {
                                            await putRating({ ...mangaModel.mangaRating, rating: val, type: Type.Manga } as Ratings).then((res) => {
                                                dispatch(setMangaModel({ ...mangaModel, mangaRating: res.data.entity } as MangaModels));
                                            });
                                        }
                                        setRating(val);
                                    }} />
                                </div>
                            </DownButon>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            {selectedEpisode !== undefined && Object.keys(selectedEpisode).length !== 0 && <DownButon
                                onClick={() => {
                                    if (listPanelShow === "hide") {
                                        setListPanelShow('show')
                                    }
                                    else {
                                        setListPanelShow('hide')
                                    }
                                }}
                                show={listPanelShow} type='dropdown' icon={faAngleDown} name='Listele'>
                                <div className={styles.mangaListContainer}>
                                    <div onClick={() => {
                                        addmangaList(MangaStatus.IRead);
                                    }} className={styles.listButons + " " + styles.userSelected + " " + (Object.keys(selectedEpisode).length !== 0 && mangaModel.mangaLists.find((y) => y.mangaID === mangaModel.manga.id && y.episodeID === selectedEpisode.id && y.status === MangaStatus.IRead) !== undefined && styles.listButonsActive)}>Okudum</div>
                                    <div onClick={() => {
                                        addmangaList(MangaStatus.IWillRead);
                                    }} className={styles.listButons + " " + styles.userSelected + " " + (Object.keys(selectedEpisode).length !== 0 && mangaModel.mangaLists.find((y) => y.mangaID === mangaModel.manga.id && y.episodeID === selectedEpisode.id && y.status === MangaStatus.IWillRead) !== undefined && styles.listButonsActive)}>Okuyacağım</div>
                                    <div onClick={() => {
                                        addmangaList(MangaStatus.Reading);
                                    }} className={styles.listButons + " " + styles.userSelected + " " + (Object.keys(selectedEpisode).length !== 0 && mangaModel.mangaLists.find((y) => y.mangaID === mangaModel.manga.id && y.episodeID === selectedEpisode.id && y.status === MangaStatus.Reading) !== undefined && styles.listButonsActive)}>Okuyorum</div>
                                </div>
                            </DownButon>}
                        </div>
                    </FilterModal>}
                </div>}
        </LoadingScreen>
    )
}
const MangaImageContent = (item: MangaEpisodeContent) => {
    return (
        <div className={styles.mangaContentImage}>
            <img style={{ height: '100%', width: '100%' }} key={item.id} src={baseUrl + item.contentImage} />
        </div>
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
    const dispatch = useDispatch();
    const { mangaModel } = useSelector((x: RootState) => x.mangaReducer);
    const { user } = useSelector((x: RootState) => x.userReducer.value);
    return (
        <div className={styles.statussContainer}>
            {
                mangaModel.discoverModels.fanArts.map((item) => {
                    return <MemoFanArtCard handleDataChange={(data: any) => {
                        dispatch(setMangaModel({ ...mangaModel, discoverModels: { ...mangaModel.discoverModels, fanArts: mangaModel.discoverModels.fanArts.map((i) => i.id === data.id ? data : i) } }));
                    }} entity={item as any} key={item.id} />
                })
            }
            {
                mangaModel.discoverModels.reviews.map((item) => {
                    return <MemoReviewCard handleDataChange={(data: any) => {
                        dispatch(setAnimeModel({ ...mangaModel, discoverModels: { ...mangaModel.discoverModels, reviews: mangaModel.discoverModels.fanArts.map((i) => i.id === data.id ? data : i) } }));

                    }} key={item.id} user={user} item={item as any} />
                })
            }
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
        <div className={styles.verticalDivider}></div>
    )
}
export const Info = (props: { name: string }) => {
    return (
        <div className={styles.movieInfoSummary}>
            {props.name}
        </div>
    )
}
const Images = () => {
    const { mangaModel } = useSelector((x: RootState) => x.mangaReducer);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch();
    return (
        <div className={styles.detailsBody}>
            <div className={styles.detailsHeader}>
                <h2>Görseller</h2>
            </div>
            <Divider />
            {
                mangaModel.mangaImages !== null && mangaModel.mangaImages.length !== 0 &&
                <div>
                    <div className={styles.detailsImagesContainer}>
                        {
                            <img onClick={() => dispatch(setSelectedImage(baseUrl + mangaModel.mangaImages[selectedIndex].img))} src={baseUrl + mangaModel.mangaImages[selectedIndex]?.img} />
                        }
                    </div>
                    <div className={styles.detailsImagesListContainer}>
                        <div className={styles.detailsImages}>
                            {
                                mangaModel.mangaImages.map((item, index) => {
                                    return <img key={index} onClick={() => setSelectedIndex(index)} src={baseUrl + item.img} />
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
const Episodes = () => {
    const dispatch = useDispatch();
    const { mangaModel, selectedEpisode } = useSelector((x: RootState) => x.mangaReducer)

    useEffect(() => {
        dispatch(setSelectedEpisode(mangaModel.mangaEpisodes[mangaModel.mangaEpisodes.length - 1]));
    }, [])


    console.log(mangaModel);
    return (
        <div className={styles.detailsBody}>
            <div className={styles.detailsHeader}>
                <h2>{selectedEpisode.name}</h2>
            </div>
            <Divider />
            <div className={styles.detailsEpidoesContainer}>
                <div className={styles.epidoseSeasons}>
                    <div className={styles.episodesBody}>
                        {
                            mangaModel.mangaEpisodes !== null &&
                            mangaModel.mangaEpisodes.map((item) => {
                                return <EpisodeCard onClick={() => {
                                    dispatch(setSelectedEpisode(item));

                                }} key={item.id} name={item.name} />
                            })
                        }
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
        <div {...props} className={styles.episode + " " + styles.userSelected}>
            <div className={styles.episdeCardname}><a>{props.name}</a></div>
        </div>
    )
}