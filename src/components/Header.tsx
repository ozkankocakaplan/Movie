import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import ProfilImage from './ProfilImage';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faBell, faEnvelope, faHome, faArchive, faDiceSix } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Header() {
    const router = useRouter();
    const { user } = useAuth();
    const [loggedUser, setLoggedUser] = useState({});
    useEffect(() => {
        setLoggedUser(user);
    }, [user])
    return (
        <div className={styles.headerContainer}>

            <div className={styles["headerLeft"] + " " + styles["headerLeftContent"]}>
                <ul>
                    <li>
                        <span style={{ cursor: 'pointer' }} onClick={() => router.push("/")}>
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
                        <a><FontAwesomeIcon size="xl" icon={faArchive} /></a>
                    </li>
                    <li>
                        <a><FontAwesomeIcon size="xl" icon={faSearch} /></a>
                    </li>
                </ul>
            </div>
            <div className={styles.headerRight}>
                <ul>
                    <li>
                        <a><FontAwesomeIcon size="xl" icon={faSearch} /></a>
                    </li>
                    <li>
                        <a><FontAwesomeIcon size="xl" icon={faBell} /></a>
                    </li>
                    <li>
                        <a><FontAwesomeIcon size="xl" icon={faEnvelope} /></a>
                    </li>
                    <li>
                        <span>
                            {
                                loggedUser != null && Object.keys(loggedUser).length != 0 ?
                                    <ProfilImage alt={"Profil Resmi"} height='40px' width='40px' src='/profilImage.png' /> :
                                    <a><FontAwesomeIcon icon={faUser} /></a>
                            }
                        </span>
                    </li>
                </ul>
            </div>
        </div >
    )
}
