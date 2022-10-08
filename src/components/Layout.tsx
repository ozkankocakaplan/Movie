import React, { HTMLAttributes, useEffect, useState } from 'react'
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp, faClose, faGear, faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import { handleOpenAddListItemModal, handleOpenAddListModal, handleOpenBackgroundBlur, handleOpenEditListItemModal, handleOpenEditListModal, handleOpenEditUserModal, handleOpenInfoSiteModal, handleOpenLoginModal, handleOpenMessageModal, handleOpenRegisterModal } from '../store/features/modalReducer';
import Line from './Line';
import DatePicker from "react-datepicker";
import styles from '../../styles/Home.module.css';
import "react-datepicker/dist/react-datepicker.css";
import Modal from './Modal';
import StarRating from './StarRating';
import Checkbox from './Checkbox';
import { BorderButon } from './Buton';
import ReadMore from './ReadMore';
import Link from 'next/link';
import { postLogin } from '../utils/api';
import ServiceResponse from '../types/ServiceResponse';
import { UserModel } from '../types/Entites';
import { useAuth } from '../hooks/useAuth';

interface ILayoutProps {
    children: React.ReactNode
}
export default function Layout(props: ILayoutProps) {
    const dispatch = useDispatch();
    const {
        backgroundBlur,
        loginModal,
        registerModal,
        messageModal,
        addListItemModal,
        editListItemModal,
        addListModal,
        editListModal,
        editUserModal,
        siteInfoModal

    } = useSelector((state: RootState) => state.modalReducer.value)
    useEffect(() => {
        if (backgroundBlur) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }, [backgroundBlur])

    return (
        <div>
            {backgroundBlur && <div className={styles.filterBlurBackground}></div>}
            {props.children}


            {siteInfoModal && <SiteInfoModal />}
            {editUserModal && <EditUserModal />}
            {addListModal && <AddListModal />}
            {editListModal && <EditListModal />}
            {addListItemModal && <AddListItemModal />}
            {editListItemModal && <EditListItemModal />}
            {loginModal && <LoginModal />}
            {registerModal && <RegisterModal />}
            {messageModal && <MessageModal />}
        </div>
    )
}
const SiteInfoModal = () => {
    const [steps, setSteps] = useState<number>(1);
    const dispatch = useDispatch();
    const About = () => {
        return (<div className={styles.about}>
            <div className={styles.aboutContainer}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehen-derit in voluptate velit esse cillum dolore eu fugiat nul
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehen-derit in voluptate velit esse cillum dolore eu fugiat nul
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehen-derit in voluptate velit esse cillum dolore eu fugiat nul
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehen-derit in voluptate velit esse cillum dolore eu fugiat nul
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehen-derit in voluptate velit esse cillum dolore eu fugiat nul
            </div>
            <div className={styles.aboutContainer}>
                <AboutSocialCard name='Eray Atmaca' role='Admin' />
                <AboutSocialCard name='Eray Atmaca' role='Admin' />
                <AboutSocialCard name='Eray Atmaca' role='Admin' />
                <AboutSocialCard name='Eray Atmaca' role='Admin' />
                <AboutSocialCard name='Eray Atmaca' role='Admin' />
            </div>
        </div>)
    }
    const AboutSocialCard = (props: { instagramUrl?: string, gmailUrl?: string, role: string, name: string }) => {
        return (
            <div className={styles.aboutSocialCard}>
                <div className={styles.aboutSocialCardBody}>
                    <img height={125} width={125} src='http://localhost:3000/socialProfile.png' />
                    <div className={styles.aboutSocialInfo}>
                        <div className={styles.rowDirection}>
                            <div>{props.name}</div>
                            <Link href={props.instagramUrl !== undefined ? props.instagramUrl : "#"}>
                                <a>
                                    <img height={30} width={30} src='http://localhost:3000/smallGmail.png' />
                                </a>
                            </Link>
                        </div>
                        <div className={styles.rowDirection}>
                            <div className={styles.aboutContainerRoleText}>{props.role}</div>
                            <Link href={props.gmailUrl !== undefined ? props.gmailUrl : "#"}>
                                <a>
                                    <img height={30} width={30} src='http://localhost:3000/smallInstagram.png' />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.aboutSocialCardDivider}></div>
            </div>
        )
    }
    const Contact = () => {
        return (<div className={styles.contact}>
            <div className={styles.contactContainer}>
                <div className={styles.row}>
                    <div className={styles.contactForm}>
                        <input placeholder='Ad' type={"text"} className={styles.defaultInput + " " + styles.contactInput} />
                        <input placeholder='Soyad' type={"text"} className={styles.defaultInput + " " + styles.contactInput} />
                        <input placeholder='E-posta' type={"text"} className={styles.defaultInput + " " + styles.contactInput} /></div>
                    <div className={styles.contactSendButonContainer}>
                        <button className={styles.contactSendButon}>
                            Gönder
                        </button>
                    </div>
                </div>
                <input placeholder='Konu' type={"text"} className={styles.defaultInput + " " + styles.contactInput} />
                <textarea placeholder='Konu' className={styles.defaultInput + " " + styles.defaultTextare} />
            </div>
            <div className={styles.contactContainer}>
                <div className={styles.contactSocialCard}>
                    <Link href="#">
                        <a>
                            <img src='http://localhost:3000/mdInstagram.png' />
                        </a>
                    </Link>
                </div>
                <div className={styles.contactSocialCardDivider}></div>
                <div className={styles.contactSocialCard}>
                    <Link href="#">
                        <a>
                            <img src='http://localhost:3000/mdDiscord.png' />
                        </a>
                    </Link>
                </div>
                <div className={styles.contactSocialCardDivider}></div>
                <div className={styles.contactSocialCard}>
                    <Link href="#">
                        <a>
                            <img src='http://localhost:3000/mdYoutube.png' />
                        </a>
                    </Link>
                </div>
            </div>
        </div>)
    }
    const Downloands = () => {
        return (
            <div>
                indirmeler
            </div>
        )
    }
    const Announcements = () => {
        return (<div className={styles.announcementsContainer}>
            <AnnouncementsCard title="Güncelleme"
                date={new Date().toLocaleDateString()}
                imageSrc="http://localhost:3000/guncelleme.png">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            </AnnouncementsCard>
            <AnnouncementsCard title="Yenilikler"
                date={new Date().toLocaleDateString()}
                imageSrc="http://localhost:3000/yenilik.png">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            </AnnouncementsCard>
            <AnnouncementsCard title="Şikayetler"
                date={new Date().toLocaleDateString()}
                imageSrc="http://localhost:3000/sikayetler.png">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            </AnnouncementsCard>
            <AnnouncementsCard title="Eklenecekler"
                date={new Date().toLocaleDateString()}
                imageSrc="http://localhost:3000/eklenecekler.png">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            </AnnouncementsCard>
            <AnnouncementsCard title="Uyarı"
                date={new Date().toLocaleDateString()}
                imageSrc="http://localhost:3000/uyari.png">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            </AnnouncementsCard>
            <AnnouncementsCard title="Yakında"
                date={new Date().toLocaleDateString()}
                imageSrc="http://localhost:3000/yakinda.png">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            </AnnouncementsCard>
        </div>)
    }
    const AnnouncementsCard = (props: {
        title: string,
        date: string,
        children: any,
        imageSrc: string
    }) => {
        return (
            <div className={styles.announcementsCard}>
                <div className={styles.announcementImg + " " + styles.userSelected}>
                    <div className={styles.announcementTitleContainer}>
                        <div>{props.title}</div>
                        <div className={styles.announcementDateTitle}>{props.date}</div>
                    </div>
                    <img className={styles.siteInfoImg2} src={props.imageSrc} />
                </div>
                <div className={styles.announcementBody + " " + styles.userSelected}>
                    <ReadMore>
                        {props.children}
                    </ReadMore>
                </div>
            </div>
        )
    }
    return (
        <Modal
            onClick={() => {
                dispatch(handleOpenBackgroundBlur(false))
                dispatch(handleOpenInfoSiteModal(false))
            }}
        >
            <div className={styles.siteInfoModalContainer}>
                <div className={styles.siteInfoModalBody}>
                    {steps === 1 && <Announcements />}
                    {steps === 2 && <About />}
                    {steps === 3 && <Contact />}
                    {steps === 4 && <Downloands />}
                </div>
                <div className={styles.siteInfoModalFooter}>
                    <div className={styles.footerNextBackContainer}>
                        <div>
                            {steps != 1 && <FontAwesomeIcon onClick={() => {
                                if (steps != 1) {
                                    setSteps(steps - 1);
                                }
                            }} icon={faAngleLeft} />}
                        </div>
                        <div>
                            {steps !== 3 && <FontAwesomeIcon onClick={() => {
                                if (steps != 3) {
                                    setSteps(steps + 1);
                                }
                            }} icon={faAngleRight} />}
                        </div>

                    </div>
                    <div className={styles.siteInfoModalFooterButonContainer}>
                        <div className={styles.siteInfoModalFooterButon + " " + styles.userSelected + " " + (steps === 1 ? styles.footerButonActive : undefined)}>Duyurular</div>
                        <div className={styles.siteInfoModalFooterButon + " " + styles.userSelected + " " + (steps === 2 ? styles.footerButonActive : undefined)}>Hakkında</div>
                        <div className={styles.siteInfoModalFooterButon + " " + styles.userSelected + " " + (steps === 3 ? styles.footerButonActive : undefined)}>İletişim</div>
                        {/* <div className={styles.siteInfoModalFooterButon + " " + styles.userSelected + " " + (steps === 4 ? styles.footerButonActive : undefined)}>İndirmeler</div> */}
                    </div>
                </div>
            </div>
        </Modal>
    )
}
const EditUserModal = () => {
    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState('');
    return (
        <Modal onClick={() => {
            dispatch(handleOpenBackgroundBlur(false))
            dispatch(handleOpenEditUserModal(false))
        }}>
            <div style={{ margin: '10px', padding: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                    <div style={{ height: '166px', width: '166px', borderRadius: '100%' }}>
                        {
                            selectedUser.length !== 0 ? <img src={selectedUser} height={166} width={166} />
                                : <img src='http://localhost:3000/profilePhoto.png' height={166} width={166} />
                        }

                        <input onChange={(e) => {
                            if (e.target.files != undefined) {
                                setSelectedUser(URL.createObjectURL(e.target.files[0]).toString())
                            }
                        }} type={"file"} className={styles["custom-file-input"]} />
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="text" placeholder='Ad soyad' className={styles.defaultInput} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="text" placeholder='Kullanıcı adı' className={styles.defaultInput} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="text" placeholder='E-posta' className={styles.defaultInput} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input type="password" placeholder='Şifre' className={styles.defaultInput} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <BorderButon name='Kaydet' />
                </div>
            </div>
        </Modal>
    )
}

const AddListModal = () => {
    const dispatch = useDispatch();
    return (
        <Modal width={500} onClick={() => {
            dispatch(handleOpenBackgroundBlur(false));
            dispatch(handleOpenAddListModal(false));
        }}>
            <div style={{ margin: '10px' }}>
                <input type="text" placeholder='Liste adı' className={styles.defaultInput} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <BorderButon name='Kaydet' />
                </div>
            </div>
        </Modal>
    )
}
const EditListModal = () => {
    const dispatch = useDispatch();
    return (
        <Modal width={500} onClick={() => {
            dispatch(handleOpenBackgroundBlur(false));
            dispatch(handleOpenEditListModal(false));
        }}>
            <div style={{ margin: '10px' }}>
                <input type="text" placeholder='Liste adı' className={styles.defaultInput} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <BorderButon name='Kaydet' />
                </div>
            </div>
        </Modal>
    )
}

const EditListItemModal = () => {
    const dispatch = useDispatch();
    return (
        <Modal onClick={() => {
            dispatch(handleOpenBackgroundBlur(false));
            dispatch(handleOpenEditListItemModal(false));
        }}>
            <div className={styles.addListContainer}>
                <div className={styles.resultContainer}>
                    <ResultCard type="EDIT" checked={false} />
                </div>
            </div>
        </Modal>

    )
}
const AddListItemModal = () => {
    const dispatch = useDispatch();
    return (
        <Modal onClick={() => {
            dispatch(handleOpenBackgroundBlur(false));
            dispatch(handleOpenAddListItemModal(false));
        }}>
            <div className={styles.addListContainer}>
                <div className={styles.searchContainer}>
                    <input placeholder='Anime veya manga ara' type={"text"} className={styles.defaultSearch} />
                </div>
                <div className={styles.resultContainer}>
                    <ResultCard type="ADD" checked={false} />
                    <ResultCard type="ADD" checked={false} />
                    <ResultCard type="ADD" checked={false} />
                    <ResultCard type="ADD" checked={false} />
                    <ResultCard type="ADD" checked={false} />
                    <ResultCard type="ADD" checked={false} />
                    <ResultCard type="ADD" checked={false} />
                    <ResultCard type="ADD" checked={false} />
                    <ResultCard type="ADD" checked={false} />
                    <ResultCard type="ADD" checked={false} />
                </div>
            </div>
        </Modal>

    )
}
interface IResultCard extends React.HTMLAttributes<HTMLDivElement> {
    selected: boolean
}
const ResultCard = (props: { isOpen?: boolean, checked: boolean, type: 'EDIT' | 'ADD' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const Card = (props: IResultCard) => {
        return (
            <div {...props} className={styles.resultEpisodeCard}>
                <Checkbox selected={props.selected} />
                <a>Bölüm 1</a>
            </div>
        )
    }
    return (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', }}>
            <div className={styles.resultCard}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className={styles.resultImg}>
                        <img src='http://localhost:3000/profileFavori.png' />
                    </div>
                    <div className={styles.searchBody}>
                        <a>Anime Adı</a>
                        <div className={styles.categoriesList}>
                            <div className={styles.category}>Korku</div>
                            <div className={styles.category}>Korku</div>
                        </div>
                    </div>
                    <div onClick={() => setIsOpen(!isOpen)} className={styles.searchResultOpen}>
                        <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
                    </div>
                </div>
                {isOpen && <div className={styles.resultSeasonsContainer}>
                    <div className={styles.resultSeasonTitle}><h4>Sezon 1</h4></div>
                    <div className={styles.resultEpisodeContainer}>
                        <Card selected={props.checked} />
                        <Card selected={props.checked} />
                    </div>
                </div>}
            </div>
            {props.type === "EDIT" && <div className={styles.deleteListContainer}>
                <FontAwesomeIcon icon={faTrash} />
            </div>}
        </div>
    )
}
const LoginModal = () => {
    const { login } = useAuth();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [result, setResult] = useState<ServiceResponse<UserModel>>({} as ServiceResponse<UserModel>);
    const handleLogin = async () => {
        if (userName.length != 0 && password.length != 0) {
            setResult({} as ServiceResponse<UserModel>);
            await postLogin(userName, password).then((res) => {
                if (res.data.isSuccessful) {
                    console.log(res.data.entity)
                    login(res.data.entity.token);
                }
                setResult(res.data);
            }).catch((er) => {
                console.log(er);
            })
        }
    }
    return (
        <div className={styles.loginModal}>
            <div className={styles.loginContainer}>
                <div className={styles.loginHeader}>
                    <div onClick={() => {
                        dispatch(handleOpenBackgroundBlur(false));
                        dispatch(handleOpenLoginModal(false));
                    }} className={styles.loginClose}>
                        <FontAwesomeIcon fontSize={22} icon={faClose} color="#fff" />
                    </div>
                </div>
                <div className={styles.loginContent}>
                    <div className={styles.logoContainer}>
                        <img src='http://localhost:3000/logo.png' />
                    </div>
                    <input onChange={(e) => setUserName(e.target.value)} value={userName} placeholder='Kullanıcı adı veya eposta' type={"text"} className={styles.textInput} />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Şifre' type={"password"} className={styles.textInput} />
                    {result && result.hasExceptionError && result.exceptionMessage.length !== 0 && <div className={styles.errorText}>{result.exceptionMessage}</div>}
                    <input onClick={handleLogin} type={"button"} value="Giriş Yap" className={styles.loginButon} />
                    <div className={styles.loginOrRegister}>
                        <div><Line /></div>
                        <div className={styles.orText}>veya</div>
                        <div><Line /></div>
                    </div>
                    <input onClick={() => {
                        dispatch(handleOpenLoginModal(false))
                        dispatch(handleOpenRegisterModal(true))
                    }} type={"button"} value="Hesap Oluştur" className={styles.registerButon} />
                </div>
            </div>
        </div>
    )
}
const RegisterModal = () => {
    const dispatch = useDispatch();
    const [birthDay, setBirthDay] = useState(new Date());
    return (
        <div className={styles.registerModal}>
            <div className={styles.registerContainer}>
                <div className={styles.registerHeader}>
                    <div onClick={() => {
                        dispatch(handleOpenBackgroundBlur(false));
                        dispatch(handleOpenRegisterModal(false));
                    }} className={styles.loginClose}>
                        <FontAwesomeIcon fontSize={22} icon={faClose} color="#fff" />
                    </div>
                </div>
                <div className={styles.registerContent}>
                    <div className={styles.logoContainer}>
                        <img src='http://localhost:3000/logo.png' />
                    </div>
                </div>
                <div className={styles.registerBody}>
                    <div className={styles.registerCol}>
                        <div className={styles.registerLeftCol}>
                            <input placeholder='Ad soyad' type={"text"} className={styles.registerInput} />
                        </div>
                    </div>
                    <div className={styles.registerCol}>
                        <div className={styles.registerLeftCol}>
                            <input placeholder='Kullanıcı adı' type={"text"} className={styles.registerInput + " " + styles.smallInput} />
                        </div>
                        <div className={styles.registerRightCol}>
                            <DatePicker className={styles.datePickerInput} selected={birthDay} onChange={(date: Date) => setBirthDay(date)} />
                        </div>
                    </div>
                    <div className={styles.registerCol}>
                        <div className={styles.registerLeftCol}>
                            <input placeholder='Şifre' type={"password"} className={styles.registerInput + " " + styles.smallInput} />
                        </div>
                        <div className={styles.registerRightCol}>
                            <input placeholder='Cinsiyet' type={"text"} className={styles.registerInput + " " + styles.smallInput} />
                        </div>
                    </div>
                    <div className={styles.registerCol}>
                        <div className={styles.registerLeftCol}>
                            <input placeholder='E-posta' type={"text"} className={styles.registerInput + " " + styles.smallInput} />
                        </div>
                        <div className={styles.registerRightCol}>
                            <input placeholder='Onay kodu' type={"text"} className={styles.registerInput + " " + styles.smallInput} />
                        </div>
                    </div>
                    <div className={styles.registerCol}>
                        <div className={styles.registerLeftCol}>
                            <input placeholder='Favori Animeler' type={"text"} className={styles.registerInput + " " + styles.smallInput} />
                        </div>
                        <div className={styles.registerRightCol}>
                            <input placeholder='Referanslar' type={"text"} className={styles.registerInput + " " + styles.smallInput} />
                        </div>
                    </div>
                    <div className={styles.registerCol}>
                        <input type={"button"} value="Kayıt Ol" className={styles.loginButon} />
                    </div>
                </div>

            </div>
        </div>
    )
}
const MessageModal = () => {
    const dispatch = useDispatch();
    return (
        <div className={styles.messageModal}>
            <div className={styles.messageContainer}>
                <div className={styles.messageHeader}>
                    <div onClick={() => {
                        dispatch(handleOpenBackgroundBlur(false));
                        dispatch(handleOpenMessageModal(false));
                    }} className={styles.loginClose}>
                        <FontAwesomeIcon fontSize={22} icon={faClose} color="#fff" />
                    </div>
                </div>
                <div className={styles.messageBody}>
                    <div className={styles.messageUsers}>
                        <div className={styles.searchContainer}>
                            <input placeholder='Kişi ara' type={"text"} className={styles.defaultSearch} />
                        </div>
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                        <UserCard />
                    </div>
                    <div className={styles.messageMainContainer}>
                        <div className={styles.messageOptions}>
                            <div className={styles.messageUserName}>Özkan Kocakaplan</div>
                        </div>
                        <div className={styles.messageContent}>
                            <div className={styles.messages}>
                                <MessageCard whoIsSender='RECEIVED' />
                                <MessageCard whoIsSender='RECEIVED' />
                                <MessageCard whoIsSender='SENDER' />
                                <MessageCard whoIsSender='RECEIVED' />
                                <MessageCard whoIsSender='RECEIVED' />
                                <MessageCard whoIsSender='SENDER' />
                                <MessageCard whoIsSender='RECEIVED' />
                                <MessageCard whoIsSender='RECEIVED' />
                                <MessageCard whoIsSender='SENDER' />
                            </div>
                        </div>
                        <div className={styles.sendTextInputContainer}>
                            <textarea placeholder='Mesaj yazınız'></textarea>
                            <div className={styles.sendButon}>
                                <FontAwesomeIcon icon={faPaperPlane} color="#fff" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const UserCard = () => {
    return (
        <div className={styles.messageUserCard}>
            <div>
                <img className={styles.messageUserCardImg} src="http://localhost:3000/logo.png" />
            </div>
            <div className={styles.messageUserCardInfo}>
                <a>Özkan Kocaplan</a>
                <div className={styles.messageSummary}>naber nasılsın</div>
            </div>
        </div>
    )
}
const MessageCard = (props: { whoIsSender: 'SENDER' | 'RECEIVED' }) => {
    return (
        props.whoIsSender === "RECEIVED" ?
            <div className={styles.messageCard}>
                <div className={styles.messageImg}>
                    <div className={styles.messageCardImgContainer}>
                        <img height={"50px"} width={"50px"} src="http://localhost:3000/logo.png" />
                    </div>
                </div>
                <div className={styles.messageCardContent}>
                    <div className={styles.messageHeaderInfo}>
                        <span>{new Date().toLocaleDateString().substring(0, 16)}</span>
                    </div>
                    <div className={styles.message}>
                        aaasdasdasdaaaasdasdasdaaaasdasdasdaaaasdasdasdaaaasdasdasdaaaasdasdasdaaaasdasdasda
                    </div>
                </div>
            </div>
            :
            <div className={styles.messageCardRight}>
                <div className={styles.messageImg}>
                    <div className={styles.messageCardImgContainerRight}>
                        <img height={"50px"} width={"50px"} src="http://localhost:3000/logo.png" />
                    </div>
                </div>
                <div className={styles.messageCardContentRight}>
                    <div className={styles.messageHeaderInfoRight}>
                        <span>{new Date().toLocaleDateString().substring(0, 16)}</span>
                    </div>
                    <div className={styles.messageRight}>
                        aaasdasdasdaaaasdasdasdaaaasdasdasdaaaasdasdasdaaaasdasdasdaaaasdasdasdaaaasdasdasda
                    </div>
                </div>
            </div>
    )
}