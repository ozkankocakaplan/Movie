import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from '../../styles/Home.module.css';
import ProfilImage from './ProfilImage';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faBell, faEnvelope, faHome, faArchive, faComment, faWarning, faFilm, faCompass } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { handleOpenBackgroundBlur, handleOpenInfoSiteModal, handleOpenLoginModal, handleOpenMessageModal } from '../store/features/modalReducer';
import Link from 'next/link';
import Line from './Line';
import { RootState } from '../store';
import { baseUrl, getNotifications, getSearchAnimeAndManga } from '../utils/api';
import { AnimeAndMangaModels, Notification, NotificationType, Type, VideoType } from '../types/Entites';
import Loading from './Loading';
import { useRouter } from 'next/router';
import { SearchResultCard } from './SearchResultCard';
import FilterModal from './FilterModal';
import useWindowSize from './useWindowSize';



interface IHeaderProps {
    style?: CSSProperties,
    search?: 'show' | 'hide',
    notification?: 'show' | 'hide',
}
export default function Header(props: IHeaderProps) {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [loggedUser, setLoggedUser] = useState({});
    const userInfo = useSelector((x: RootState) => x.userReducer.value.user)
    const [searchShow, setSearchShow] = useState(false);
    const [notificationShow, setNotificationShow] = useState(false);

    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<Array<AnimeAndMangaModels>>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchShowModal, setSearchShowModal] = useState(false);

    const [notificationShowModal, setNotificationShowModal] = useState(false);
    useEffect(() => {
        setLoggedUser(user);
    }, [user]);
    const { width } = useWindowSize()
    const handleSearch = async (e: string) => {
        setSearch(e);
        if (e.length >= 1) {
            setSearchLoading(true);
            await getSearchAnimeAndManga(e).then((res) => {
                setSearchResult(res.data.list);
            }).catch((er) => {
                console.log(er);
            });
            setSearchLoading(false);
        }
        else {
            setSearchLoading(false);
            setSearchResult([]);
        }

    }
    return (
        <div className={styles.headerContainer} {...props}>
            <div className={styles["headerLeft"] + " " + styles["headerLeftContent"]}>
                <ul>
                    <li>
                        <span style={{ cursor: 'pointer' }} onClick={() => {
                            dispatch(handleOpenBackgroundBlur(true))
                            dispatch(handleOpenInfoSiteModal(true))
                        }}>
                            <ProfilImage alt='Logo' height='60px' width='60px' src='/logo.png' />
                        </span>
                    </li>
                    <li>
                        <Link href={"/"}>
                            <a>
                                <FontAwesomeIcon size="xl" icon={faHome} />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/archive"}>
                            <a><FontAwesomeIcon size="xl" icon={faArchive} /></a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/discover"}>
                            <a><FontAwesomeIcon size="xl" icon={faCompass} /></a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.headerRight}>
                <ul>
                    {props.search && <li style={{ position: 'relative', zIndex: 10 }} className={searchShow ? styles.headerSearchContainer : ""}>
                        <a onClick={() => {
                            if (width < 768) {
                                setSearchShowModal(true)
                            }
                            else {
                                setSearchShow(!searchShow);
                            }
                        }}><FontAwesomeIcon size="xl" icon={faSearch} /></a>
                        {searchShow && <input autoFocus
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            type={"text"} className={styles.headerSearchText} />}
                        {searchShow && <div className={styles.headerSearchResultContainer}>
                            {
                                searchLoading ? <Loading />
                                    :
                                    searchResult.map((item) => {
                                        return <SearchResultCard key={item.id} entity={item} />
                                    })
                            }
                        </div>}
                    </li>}
                    {props.notification && loggedUser !== null && userInfo !== null && <li style={{ position: 'relative', zIndex: 15 }}>
                        <a onClick={() => {
                            if (width < 768) {
                                setNotificationShowModal(true);
                            }
                            else {
                                setNotificationShow(!notificationShow)
                            }
                        }}><FontAwesomeIcon size="xl" icon={faBell} /></a>
                        {notificationShow && <NotificationsContainer />}
                    </li>
                    }
                    {/* {loggedUser !== null && <li>
                        <div>
                            <a onClick={() => {
                                dispatch(handleOpenBackgroundBlur(true))
                                dispatch(handleOpenMessageModal(true))
                            }}><FontAwesomeIcon size="xl" icon={faEnvelope} /></a>
                        </div>
                    </li>} */}
                    <li>

                        {
                            loggedUser !== null && userInfo !== null ?
                                <Link href={"/" + userInfo.seoUrl}>
                                    <a>
                                        <ProfilImage alt={userInfo.nameSurname} height='40px' width='40px' src='/profilImage.png' />
                                    </a>
                                </Link> :
                                <a onClick={() => {
                                    dispatch(handleOpenBackgroundBlur(true));
                                    dispatch(handleOpenLoginModal(true));
                                }}><FontAwesomeIcon fontSize={"20px"} icon={faUser} /></a>
                        }
                    </li>
                </ul>
            </div>
            {searchShowModal && <FilterModal onClick={() => {
                setSearchShowModal(false)
            }}>
                <input autoFocus
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    type={"text"} className={styles.headerSearchTextFromModal} />
                <div className={styles.headerSearchResultContainerFromModal}>
                    {
                        searchLoading ? <Loading />
                            :
                            searchResult.map((item) => {
                                return <SearchResultCard key={item.id} entity={item} />
                            })
                    }
                </div>
            </FilterModal>}
            {notificationShowModal && <FilterModal onClick={() => {
                setNotificationShowModal(false);
            }}>
                <NotificationsContainer />
            </FilterModal>}
        </div>
    )
}

export const NotificationsContainer = () => {
    const [selectedTabs, setSelectedTabs] = useState<number>(1);
    const notifications = useSelector((x: RootState) => x.notificationReducer.notifications);
    return (
        <div className={styles.headerNotificationContainer}>
            <div className={styles.headerLeftNotificationTitle}>
                <div>
                    <h3>Bildirimler</h3>
                    <Line />
                </div>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <div className={styles.headerNotificationLeftCol}>
                    <div className={styles.headerNotificationIconContainer}>
                        <div onClick={() => setSelectedTabs(1)} className={styles.headerNotificationIcons}>
                            <FontAwesomeIcon size={"lg"} icon={faComment} />
                        </div>
                        <div className={styles.headerNotificatonIconLine}></div>
                    </div>
                    <div className={styles.headerNotificationIconContainer}>
                        <div onClick={() => setSelectedTabs(2)} className={styles.headerNotificationIcons}>
                            <FontAwesomeIcon size={"lg"} icon={faWarning} />
                        </div>
                        <div className={styles.headerNotificatonIconLine}></div>
                    </div>
                    <div className={styles.headerNotificationIconContainer}>
                        <div onClick={() => setSelectedTabs(3)} className={styles.headerNotificationIcons}>
                            <FontAwesomeIcon size={"lg"} icon={faFilm} />
                        </div>
                        <div className={styles.headerNotificatonIconLine}></div>
                    </div>
                    <div className={styles.headerNotificationIconContainer}>
                        <div onClick={() => setSelectedTabs(4)} className={styles.headerNotificationIcons}>
                            <FontAwesomeIcon size={"lg"} icon={faBell} />
                        </div>
                        <div className={styles.headerNotificatonIconLine}></div>
                    </div>
                </div>
                <div className={styles.headerNotificationRightCol}>
                    {
                        selectedTabs === 1 && notifications.filter((x) => x.notificationType === NotificationType.Comments).map((item) => {
                            return <NotificatonCard key={item.id} notificationMessage={item.notificationMessage} />
                        })
                    }
                    {
                        selectedTabs === 2 && notifications.filter((x) => x.notificationType === NotificationType.UserWarning).map((item) => {
                            return <NotificatonCard key={item.id} notificationMessage={item.notificationMessage} />
                        })
                    }
                    {
                        selectedTabs === 3 && notifications.filter((x) => x.notificationType === NotificationType.Review).map((item) => {
                            return <NotificatonCard key={item.id} notificationMessage={item.notificationMessage} />
                        })
                    }
                    {
                        selectedTabs === 4 && notifications.filter((x) => x.notificationType === NotificationType.Anime || x.notificationType === NotificationType.Manga).map((item) => {
                            return <NotificatonCard key={item.id} notificationMessage={item.notificationMessage} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
interface INotificationCard extends React.HTMLAttributes<HTMLDivElement> {
    notificationMessage: string
}
export const NotificatonCard = (props: INotificationCard) => {
    return (
        <div {...props} className={styles.userSelected} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#181818',
            flex: 1,
            padding: '0px 5px',
            height: '45px', fontSize: '15px', color: 'rgba(255,255,255,0.5)'
        }}>
            {props.notificationMessage}
        </div>
    )
}