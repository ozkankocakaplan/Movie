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

    useEffect(() => {
        setLoggedUser(user);
    }, [user]);

    const handleSearch = (e: string) => {

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
                            setSearchShow(!searchShow);
                        }}><FontAwesomeIcon size="xl" icon={faSearch} /></a>
                        {searchShow && <input autoFocus
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            type={"text"} className={styles.headerSearchText} />}
                        {searchShow && <div className={styles.headerSearchResultContainer}>
                            <SearchResultCard />
                            <SearchResultCard />
                            <SearchResultCard />
                            <SearchResultCard />
                            <SearchResultCard />
                        </div>}
                    </li>}
                    {props.notification && <li style={{ position: 'relative', zIndex: 15 }}>
                        <a onClick={() => setNotificationShow(!notificationShow)}><FontAwesomeIcon size="xl" icon={faBell} /></a>
                        {notificationShow && <NotificationsContainer />}
                    </li>
                    }
                    {loggedUser !== null && <li>
                        <div>
                            <a onClick={() => {
                                dispatch(handleOpenBackgroundBlur(true))
                                dispatch(handleOpenMessageModal(true))
                            }}><FontAwesomeIcon size="xl" icon={faEnvelope} /></a>
                        </div>
                    </li>}
                    <li>
                        {
                            loggedUser !== null ?
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
        </div >
    )
}
const SearchResultCard = () => {
    return (
        <div className={styles.searchResultCard}>
            <div className={styles.searchResultImg}>
                <img src='http://localhost:3000/movieCover.png' />
            </div>
            <div className={styles.searchResultContent}>
                <div className={styles.searchContentButon}>Toplam Gönderi:85</div>
                <div className={styles.searchContentButon}>Tür: Dizi</div>
                <div className={styles.searchContentButon}>Eleştiri: 85</div>
                <div className={styles.searchContentButon}>Sıralama: 85</div>
                <div className={styles.searchContentButon}>Fan Art: 85</div>
                <div className={styles.searchContentButon}>Beğeni: 85</div>
            </div>
        </div>
    )
}
export const NotificationsContainer = () => {
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
                        <div className={styles.headerNotificationIcons}>
                            <FontAwesomeIcon size={"lg"} icon={faComment} />
                        </div>
                        <div className={styles.headerNotificatonIconLine}></div>
                    </div>
                    <div className={styles.headerNotificationIconContainer}>
                        <div className={styles.headerNotificationIcons}>
                            <FontAwesomeIcon size={"lg"} icon={faWarning} />
                        </div>
                        <div className={styles.headerNotificatonIconLine}></div>
                    </div>
                    <div className={styles.headerNotificationIconContainer}>
                        <div className={styles.headerNotificationIcons}>
                            <FontAwesomeIcon size={"lg"} icon={faFilm} />
                        </div>
                        <div className={styles.headerNotificatonIconLine}></div>
                    </div>
                    <div className={styles.headerNotificationIconContainer}>
                        <div className={styles.headerNotificationIcons}>
                            <FontAwesomeIcon size={"lg"} icon={faBell} />
                        </div>
                        <div className={styles.headerNotificatonIconLine}></div>
                    </div>
                </div>
                <div className={styles.headerNotificationRightCol}>

                </div>
            </div>
        </div>
    )
}