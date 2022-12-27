import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useRef, useState } from 'react'
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp, faCamera, faClose, faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IDeleteModal, handleDeleteModal, handleOpenAddListItemModal, handleOpenBackgroundBlur, handleOpenEditListItemModal, handleOpenEditListModal, handleOpenEditUserModal, handleOpenInfoSiteModal, handleOpenLoginModal, handleOpenMessageModal, handleOpenRegisterModal, handleOpenBlockModal, handleOpenComplaintModal, handleOpenEditDynamicListModal, handleOpenRosetteModal, handleOpenAddReviews, handleOpenEditReviews, handleOpenAboutModal, handleOpenContentComplaintModal, handleOpenDiscoveryReviesModal, handleWarningModal } from '../store/features/modalReducer';
import { addContact, baseUrl, deleteAnimeList, deleteMangaList, deleteUserBlockList, deleteUserList, deleteUserListContent, getAnnouncements, getContactSubject, getHomeSliders, getMessages, getNotifications, getSearchAnime, getSearchAnimeAndManga, getSearchUser, getSiteInfo, getSocialMediaAccounts, getUser, getUserBySeoUrl, postAddUser, postAgainUserEmailVertification, postAnimeList, postAnimeLists, postComplaintList, postContentComplaint, postLogin, postMangaList, postMangaLists, postMessage, postReviews, postUserBlockList, postUserList, postUserListContent, postUserListContents, putEmailChange, putPassword, putReviews, putUserImg, putUserInfo, putUserList } from '../utils/api';
import { Anime, AnimeAndMangaModels, AnimeEpisodes, AnimeList, AnimeListModels, AnimeStatus, ComplaintList, Contact, ContactSubject, ContentComplaint, MangaList, MangaListModels, MangaStatus, Review, RoleType, Type, UserBlockList, UserEmailVertification, UserFullModels, UserList, UserListContents, UserMessage, UserMessageModel, UserModel, Users } from '../types/Entites';
import { useAuth } from '../hooks/useAuth';
import { BorderButon } from './Buton';
import { setAnnouncement, setIsUserBlock, setMessageUser, setMessageUsers, setSelectedImage, setSignalR, setSiteInfo, setSocialMediaAccounts, setUser, setViewUser } from '../store/features/userReducer';

import { setSearchListResult, setSelectedAnimeEpisode, setSelectedAnimeEpisodes, setSelectedMangaEpisode, setSelectedMangaEpisodes, setselectedUserListContent, setSelectedUserListContents } from '../store/features/listReducer';
import { setNotifications } from '../store/features/notificationReducer';
import { setSliders } from '../store/features/sliderReducer';
import { HubConnectionBuilder, HttpTransportType, LogLevel } from '@aspnet/signalr';

import Line from './Line';
import DatePicker from "react-datepicker";
import styles from '../../styles/Home.module.css';
import Modal from './Modal';
import Checkbox from './Checkbox';
import ReadMore from './ReadMore';
import Link from 'next/link';
import ServiceResponse from '../types/ServiceResponse';
import Loading from './Loading';

interface ILayoutProps {
    children: React.ReactNode
}
export default function Layout(props: ILayoutProps) {
    const dispatch = useDispatch();
    const { user, logout } = useAuth();
    const selectedImg = useSelector((x: RootState) => x.userReducer.value.selectedImage);
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
        siteInfoModal,
        deleteModal,
        blockModal,
        complaintModal,
        editDynamicListModal,
        rosetteInfoModal,
        addReviews,
        editReviews,
        aboutModal,
        contentComplaintModal,
        discoveryReviewModal,
        warningModal


    } = useSelector((state: RootState) => state.modalReducer.value);
    const { signalR, messageUser } = useSelector((state: RootState) => state.userReducer.value);
    useEffect(() => {
        setupOnlineUser();
        if (user !== null) {
            loadUser();
            loadNotifications();
            // setupSignalR();

        }


        loadHomeSlider();
        loadAnnouncement();
        loadSocialMediaAccount();
        loadSiteInfo();
    }, []);
    // useEffect(() => {
    //     if (Object.keys(signalR).length !== 0) {
    //         console.log(signalR);
    //         signalR.on("messageSent", (data: UserMessage) => {
    //             console.log(data);
    //             // dispatch(setMessageUsers(messageUser.map((i) => i. === selectedMessage.id ? { ...i, userMessages: [...i.userMessages, data] } : i)));
    //         });
    //     }
    // }, [signalR])

    useEffect(() => {
        if (backgroundBlur) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }, [backgroundBlur])
    const loadAnnouncement = async () => {
        await getAnnouncements().then((res) => {
            dispatch(setAnnouncement(res.data.list[0]));
        }).catch((er) => {
            console.log(er);
        })
    }
    const loadSocialMediaAccount = async () => {
        await getSocialMediaAccounts().then((res) => {
            dispatch(setSocialMediaAccounts(res.data.list));
        }).catch((er) => {
            console.log(er);
        })
    }
    const loadSiteInfo = async () => {
        await getSiteInfo().then((res) => {
            dispatch(setSiteInfo(res.data.entity));
        })
    }
    const setupSignalR = async () => {
        const date = new Date().getTime();
        var storage = localStorage.getItem("token");
        await configureSignalr();
        // if (storage !== null && Object.keys(storage).length === 0) {

        //     await configureSignalr();
        // }
        // else {
        //     // if (storage !== null && date > JSON.parse(storage).expiry) {

        //     // }
        //     localStorage.removeItem("token");
        //     await configureSignalr();
        // }
    }
    const configureSignalr = async () => {
        const date = new Date().getTime();
        var connection = new HubConnectionBuilder()
            .withUrl(baseUrl + "/userHubs", {
                accessTokenFactory() {
                    return user.token
                },
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .configureLogging(LogLevel.None)
            .build();
        await connection.start().then((res) => {
            connection.on("getID", data => {
                var item = {
                    token: data,
                    expiry: date + 5000
                }
                localStorage.setItem("token", JSON.stringify(item));
            })
        }).catch((er) => {
            console.log(er);
        });
        dispatch(setSignalR(connection));
    }
    const setupOnlineUser = async () => {

        var connection = new HubConnectionBuilder()
            .withUrl(baseUrl + "/users", {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .configureLogging(LogLevel.None)
            .build();
        await connection.start().then((res) => {

        }).catch((er) => {

        });
    }

    const loadUser = async () => {
        await getUser()
            .then((res) => {
                if (res.data.isSuccessful) {
                    dispatch(setUser(res.data.entity));
                }
            }).catch((er) => {
                logout();
            })
    }
    const loadHomeSlider = async () => {
        await getHomeSliders().then((res) => {
            dispatch(setSliders(res.data.list));
        }).catch((er) => {
            console.log(er);
        });
    }
    const loadNotifications = async () => {
        await getNotifications().then((res) => {
            dispatch(setNotifications(res.data.list));
        }).catch((er) => {
            console.log(er)
        })
    }
    return (
        <div>
            {backgroundBlur && <div onClick={() => dispatch(handleOpenBackgroundBlur(false))} className={styles.filterBlurBackground}></div>}
            {selectedImg.length !== 0 && <SelectedImageShow />}
            {props.children}
            {discoveryReviewModal && <AddDiscoveryReviewsModal />}
            {contentComplaintModal && <ContentComplaintModal />}
            {aboutModal && <UserAboutModal />}
            {editReviews && <EditReviewsModal />}
            {addReviews && <AddReviewsModal />}
            {rosetteInfoModal && <RosetteInfoModal />}
            {editDynamicListModal && <EditListDynamicItemModal />}
            {complaintModal && <ComplaintModal />}
            {blockModal && <BlockModal />}
            {deleteModal.isOpen && <DeleteModal text={deleteModal.text} handleClose={deleteModal.handleClose} handleDelete={deleteModal.handleDelete} />}
            {siteInfoModal && <SiteInfoModal />}
            {editUserModal && <EditUserModal />}
            {addListModal && <AddListModal />}
            {editListModal && <EditListModal />}
            {addListItemModal && <AddListItemModal />}
            {editListItemModal && <EditListItemModal />}
            {loginModal && <LoginModal />}
            {registerModal && <RegisterModal />}
            {messageModal && <MessageModal />}
            {warningModal.isOpen && <WarningModal />}
        </div>
    )
}

const SelectedImageShow = () => {
    const dispatch = useDispatch();
    const selectedImg = useSelector((x: RootState) => x.userReducer.value.selectedImage);
    return (
        <div onClick={() => dispatch(setSelectedImage(''))} className={styles.imageShowContainer}>
            <div className={styles.imgShowBody}>
                <div className={styles.imgShow}>
                    <img src={selectedImg} />
                </div>
            </div>
        </div>
    )
}
const RosetteInfoModal = () => {
    const dispatch = useDispatch();
    const rosetteInfo = useSelector((x: RootState) => x.userReducer.value.selectedRosette);
    return (
        <Modal width={300} onClick={() => {
            dispatch(handleOpenBackgroundBlur(false));
            dispatch(handleOpenRosetteModal(false));
        }}>
            <div className={styles.addListContainer}>
                <div className={styles.resultContainer}>
                    {rosetteInfo.name}
                </div>
            </div>
        </Modal>
    )
}
const AddDiscoveryReviewsModal = () => {
    const dispatch = useDispatch();
    const { user, discoveryReview } = useSelector((x: RootState) => x.userReducer.value);
    const [form, setForm] = useState<Review>({ userID: user.id, contentID: discoveryReview.id, message: '', type: discoveryReview.type } as Review);
    const [isSuccess, setIsSuccess] = useState(false);
    const saveButon = async () => {
        await postReviews(form).then((res) => {
            if (res.data.isSuccessful) {
                setIsSuccess(true);
                window.location.reload();
            }
        });
    }
    return (
        <Modal width={600} onClick={() => {
            dispatch(handleOpenBackgroundBlur(false))
            setIsSuccess(false);
            dispatch(handleOpenDiscoveryReviesModal(false));

        }}>
            {!isSuccess ? <div style={{ marginLeft: '10px', marginRight: '10px', }}>
                <div className={styles.registerCol}>
                    <div className={styles.registerLeftCol} style={{ flex: 1 }}>
                        <textarea
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            style={{ color: 'rgba(255, 255, 255, 0.50)' }}
                            placeholder='Eleştiri' className={styles["pr"] + " " + styles.registerInput + " " + styles.smallInput}
                            rows={4}></textarea>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <BorderButon onClick={saveButon} name='Kaydet' />
                </div>
            </div>
                : <div style={{ marginLeft: '10px', marginRight: '10px', textAlign: 'center', paddingBottom: '20px', color: 'rgba(255, 255, 255, 0.50)' }}>
                    Eleştiriniz oluşturulmuştur.
                </div>
            }
        </Modal>
    )
}
const AddReviewsModal = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((x: RootState) => x.userReducer.value);
    const { animeModel } = useSelector((x: RootState) => x.animeReducer);
    const { mangaModel } = useSelector((x: RootState) => x.mangaReducer);
    const [form, setForm] = useState<Review>({ userID: user.id, contentID: Object.keys(animeModel).length !== 0 ? animeModel.anime.id : mangaModel.manga.id, message: '', type: Type.Anime } as Review);
    const [isSuccess, setIsSuccess] = useState(false);
    const saveButon = async () => {
        await postReviews(form).then((res) => {
            if (res.data.isSuccessful) {
                setIsSuccess(true);
                console.log(res.data);
            }
        });
    }
    return (
        <Modal width={600} onClick={() => {
            dispatch(handleOpenBackgroundBlur(false))
            setIsSuccess(false);
            dispatch(handleOpenAddReviews(false));

        }}>
            {!isSuccess ? <div style={{ marginLeft: '10px', marginRight: '10px', }}>
                <div className={styles.registerCol}>
                    <div className={styles.registerLeftCol} style={{ flex: 1 }}>
                        <textarea
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            style={{ color: 'rgba(255, 255, 255, 0.50)' }}
                            placeholder='Eleştiri' className={styles["pr"] + " " + styles.registerInput + " " + styles.smallInput}
                            rows={4}></textarea>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <BorderButon onClick={saveButon} name='Kaydet' />
                </div>
            </div>
                : <div style={{ marginLeft: '10px', marginRight: '10px', textAlign: 'center', paddingBottom: '20px', color: 'rgba(255, 255, 255, 0.50)' }}>
                    Eleştiriniz oluşturulmuştur.
                </div>
            }
        </Modal>
    )
}
const EditReviewsModal = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((x: RootState) => x.userReducer.value.viewUser);
    const reviews = useSelector((x: RootState) => x.animeReducer.selectedReview);
    const [isSuccess, setIsSuccess] = useState(false);
    const [form, setForm] = useState<Review>({ ...reviews });
    const saveButon = async () => {
        await putReviews(form).then((res) => {
            if (res.data.isSuccessful) {
                setIsSuccess(true);
                dispatch(setViewUser({ ...userInfo, reviews: userInfo.reviews.map((item) => item.id === res.data.entity.id ? { ...item, message: res.data.entity.message } : item) }));
            }
        });
    }
    return (
        <Modal width={600} onClick={() => {
            setIsSuccess(false);
            dispatch(handleOpenBackgroundBlur(false));
            dispatch(handleOpenEditReviews(false));
        }}>
            {
                !isSuccess ? <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <div className={styles.registerCol}>
                        <div className={styles.registerLeftCol} style={{ flex: 1 }}>
                            <textarea
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                style={{ color: 'rgba(255, 255, 255, 0.50)' }}
                                placeholder='Eleştiri' className={styles["pr"] + " " + styles.registerInput + " " + styles.smallInput}
                                rows={4}></textarea>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <BorderButon onClick={saveButon} name='Kaydet' />
                    </div>
                </div>
                    :
                    <div style={{ marginLeft: '10px', marginRight: '10px', textAlign: 'center', paddingBottom: '20px', color: 'rgba(255, 255, 255, 0.50)' }}>
                        Eleştiriniz kaydedilmiştir.
                    </div>
            }
        </Modal>
    )
}


const SiteInfoModal = () => {
    const [steps, setSteps] = useState<number>(1);
    const dispatch = useDispatch();
    const { announcement, socialMediaAccounts } = useSelector((x: RootState) => x.userReducer.value);
    const About = () => {
        return (<div className={styles.about}>
            <div className={styles.aboutContainer}>
                {announcement.about}
            </div>
            <div className={styles.aboutContainer}>
                {
                    socialMediaAccounts.length !== 0 &&
                    socialMediaAccounts.map((item) => {
                        return <AboutSocialCard instagramUrl={item.instagramUrl} gmailUrl={item.gmailUrl} key={item.id} name={item.users.nameSurname} role={item.users.roleType === RoleType.Admin ? "Admin" : "Moderatör"} />
                    })
                }
            </div>
        </div>)
    }
    const AboutSocialCard = (props: { img?: string, instagramUrl?: string, gmailUrl?: string, role: string, name: string }) => {
        return (
            <div className={styles.aboutSocialCard}>
                <div className={styles.aboutSocialCardBody}>
                    <img height={125} width={125} src={props.img !== undefined && props.img.length !== 0 ? props.img : '/socialProfile.png'} />
                    <div className={styles.aboutSocialInfo}>
                        <div className={styles.rowDirection}>
                            <div>{props.name}</div>
                            <Link target={"_blank"} href={props.gmailUrl !== undefined ? props.gmailUrl : "#"}>
                                <a>
                                    <img height={30} width={30} src='/smallGmail.png' />
                                </a>
                            </Link>
                        </div>
                        <div className={styles.rowDirection}>
                            <div className={styles.aboutContainerRoleText}>{props.role}</div>
                            <Link target={"_blank"} href={props.instagramUrl !== undefined ? props.instagramUrl : "#"}>
                                <a>
                                    <img height={30} width={30} src='/smallInstagram.png' />
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
        const [sendInfo, setSendInfo] = useState('');
        const [form, setForm] = useState<Contact>({ nameSurname: '', email: '', subject: '', message: '' } as Contact);
        const [subjectList, setSubjectList] = useState<Array<ContactSubject>>([]);
        const [name, setName] = useState('');
        const [surName, setSurName] = useState('');
        const [check, setCheck] = useState(false);
        useEffect(() => {
            loadSubject();
        }, [])
        const loadSubject = async () => {
            await getContactSubject().then((res) => {
                setSubjectList(res.data.list);
            });
        }
        const sendButon = async () => {
            if (name.length !== 0 && surName.length !== 0 && form.subject.length !== 0 && form.email.length !== 0) {
                setCheck(false);
                await addContact({ ...form, nameSurname: name + " " + surName }).then((res) => {
                    setSendInfo("İletildi");
                }).catch((er) => {
                    setSendInfo("Bir hata oluştu tekrar deneyiniz");
                });
            }
            else {
                setCheck(true);
            }

        }
        return (<div className={styles.contact}>
            <div className={styles.contactContainer}>
                {sendInfo.length !== 0 && <span className={styles.sendInfo}>{sendInfo}</span>}
                <div className={styles.row}>
                    <div className={styles.contactForm}>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Ad' type={"text"} className={styles.defaultInput + " " + styles.contactInput + " " + (check && name.length === 0 ? styles.errorBorder : undefined)} />
                        <input
                            value={surName}
                            onChange={(e) => setSurName(e.target.value)}
                            placeholder='Soyad' type={"text"} className={styles.defaultInput + " " + styles.contactInput + " " + (check && surName.length === 0 ? styles.errorBorder : undefined)} />
                        <input
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder='E-posta' type={"text"} className={styles.defaultInput + " " + styles.contactInput + " " + (check && form.email.length === 0 ? styles.errorBorder : undefined)} /></div>
                    <div className={styles.contactSendButonContainer}>
                        <button onClick={sendButon} className={styles.contactSendButon}>
                            Gönder
                        </button>
                    </div>
                </div>
                <select className={styles.subjectSelect + " " + (check && form.subject.length === 0 ? styles.errorBorder : undefined)}>
                    <option value={0}>Konu</option>
                    {
                        subjectList.length !== 0 &&
                        subjectList.map((item) => {
                            return <option onClick={() => setForm({ ...form, subject: item.subject })} key={item.id}>{item.subject}</option>
                        })
                    }
                </select>
                <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder='Mesajınız' className={styles.defaultInput + " " + styles.defaultTextare + " " + (check && form.message.length === 0 ? styles.errorBorder : undefined)} />
            </div>
            <div className={styles.contactContainer}>
                <div className={styles.contactSocialCard}>
                    <Link href="#">
                        <a>
                            <img src='/mdInstagram.png' />
                        </a>
                    </Link>
                </div>
                <div className={styles.contactSocialCardDivider}></div>
                <div className={styles.contactSocialCard}>
                    <Link href="#">
                        <a>
                            <img src='/mdDiscord.png' />
                        </a>
                    </Link>
                </div>
                <div className={styles.contactSocialCardDivider}></div>
                <div className={styles.contactSocialCard}>
                    <Link href="#">
                        <a>
                            <img src='/mdYoutube.png' />
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
        const announcement = useSelector((x: RootState) => x.userReducer.value.announcement);
        return (<div className={styles.announcementsContainer}>
            <AnnouncementsCard title="Güncelleme"
                date={new Date(announcement.updateDate).toLocaleDateString()}
                imageSrc="/guncelleme.png">
                {announcement.updateInformation}
            </AnnouncementsCard>
            <AnnouncementsCard title="Yenilikler"
                date={new Date(announcement.innovationDate).toLocaleDateString()}
                imageSrc="/yenilik.png">
                {announcement.innovationInformation}
            </AnnouncementsCard>
            <AnnouncementsCard title="Şikayetler"
                date={new Date(announcement.complaintsDate).toLocaleDateString()}
                imageSrc="/sikayetler.png">
                {announcement.complaintsInformation}
            </AnnouncementsCard>
            <AnnouncementsCard title="Eklenecekler"
                date={new Date(announcement.addDate).toLocaleDateString()}
                imageSrc="/eklenecekler.png">
                {announcement.addToInformation}
            </AnnouncementsCard>
            <AnnouncementsCard title="Uyarı"
                date={new Date(announcement.warningDate).toLocaleDateString()}
                imageSrc="/uyari.png">
                {announcement.warningInformation}
            </AnnouncementsCard>
            <AnnouncementsCard title="Yakında"
                date={new Date(announcement.comingSoonDate).toLocaleDateString()}
                imageSrc="/yakinda.png">
                {announcement.comingSoonInfo}
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
                    <img className={styles.siteInfoImg2} src={props.imageSrc} />
                </div>
                <div className={styles.announcementTitleContainer}>
                    <div>{props.title}</div>
                    <div className={styles.announcementDateTitle}>{props.date}</div>
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
        </Modal>
    )
}
const EditUserModal = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userReducer.value.user);

    const [selectedUser, setSelectedUser] = useState('');
    const [nameSurname, setNameSurname] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [about, setAbout] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [checkUserInfo, setCheckUserInfo] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);


    const [passwordResult, setPasswordResult] = useState<ServiceResponse<Users>>({} as ServiceResponse<Users>);
    const [userInfoResult, setUserInfoResult] = useState<ServiceResponse<Users>>({} as ServiceResponse<Users>);
    const [emailResult, setEmailResult] = useState<ServiceResponse<Users>>({} as ServiceResponse<Users>);

    const [vertificationResult, setVertificationResult] = useState<ServiceResponse<UserEmailVertification | Users>>({} as ServiceResponse<UserEmailVertification | Users>);
    var fileUploadRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        setNameSurname(userInfo.nameSurname);
        setUserName(userInfo.userName);
        setEmail(userInfo.email);
        console.log(userInfo.image);
        if (userInfo.image != null && userInfo.image.length !== 0) {
            setSelectedUser(userInfo.image);
        }
        setAbout(userInfo.about != null ? userInfo.about : '');
    }, [userInfo])

    const saveUserInfoButon = async () => {
        setUserInfoResult({} as ServiceResponse<Users>);
        setEmailResult({} as ServiceResponse<Users>);
        setVertificationResult({} as ServiceResponse<UserEmailVertification | Users>);
        if (nameSurname.length !== 0 && userName.length !== 0 && email.length !== 0) {
            setCheckUserInfo(false);
            if (nameSurname !== userInfo.nameSurname || userName !== userInfo.nameSurname || about !== userInfo.about) {
                await putUserInfo(nameSurname, userName, about)
                    .then((res) => {
                        setUserInfoResult(res.data)
                    }).catch((er) => {
                        console.log(er);
                    })
            }
            if (email !== userInfo.email && code.length !== 0) {
                setCheckUserInfo(false);
                await putEmailChange(email, code)
                    .then((res) => {
                        console.log(res.data);
                        setEmailResult(res.data);
                    }).catch((er) => {
                        console.log(er)
                    })
            }
            else {
                setCheckUserInfo(true);
            }
        }
        else {
            setCheckUserInfo(true);
        }
    }
    const savePasswordButon = async () => {
        setPasswordResult({} as ServiceResponse<Users>);
        if (currentPassword.length !== 0 && newPassword.length !== 0) {
            setCheckPassword(false);
            await putPassword(currentPassword, newPassword)
                .then((res) => {
                    setPasswordResult(res.data);
                }).catch((er) => {
                    console.log(er)
                })
        }
        else {
            setCheckPassword(true);
        }
    }
    const handleSendEmailCode = async () => {
        setVertificationResult({} as ServiceResponse<UserEmailVertification | Users>);
        if (email !== userInfo.email) {
            await postAgainUserEmailVertification(email)
                .then((res) => {
                    setVertificationResult(res.data);
                    console.log(res.data);
                })
                .catch((er) => {
                    console.log(er);
                })
        }
    }
    return (
        <Modal onClick={() => {
            dispatch(handleOpenBackgroundBlur(false))
            dispatch(handleOpenEditUserModal(false))
        }}>
            <div style={{ margin: '10px', padding: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                    <div style={{ height: '166px', width: '166px', borderRadius: '100%', display: 'flex' }}>
                        {
                            selectedUser.length !== 0 ? <img src={selectedUser} height={166} width={166} />
                                : <img src='/profilePhoto.png' style={{ borderRadius: '100%' }} height={166} width={166} />
                        }
                        <div onClick={() => fileUploadRef.current?.click()} className={styles["p-Image"]}>
                            <FontAwesomeIcon icon={faCamera} />
                            <input
                                onChange={async (e) => {
                                    if (e.target.files != undefined) {
                                        setSelectedUser(URL.createObjectURL(e.target.files[0]).toString());
                                        var form = new FormData();
                                        form.append("file", e.target.files[0] as any);
                                        await putUserImg(form).then((res) => {
                                            console.log(res.data);
                                        }).catch((er) => {
                                            console.log(er)
                                        });
                                    }
                                }}
                                ref={fileUploadRef} className={styles["file-upload"]} type="file" accept="image/*" />
                        </div>
                    </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        value={nameSurname}
                        onChange={(e) => setNameSurname(e.target.value)}
                        type="text" placeholder='Ad soyad' className={styles.defaultInput} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        type="text" placeholder='Kullanıcı adı' className={styles.defaultInput} />
                </div>
                <div className={styles.registerCol}>
                    <div className={styles.registerLeftCol} style={{ flex: 2 }}>
                        <input
                            style={{ color: 'rgba(255, 255, 255, 0.50)' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='E-posta' type={"text"} className={styles["pr"] + " " + styles.registerInput + " " + styles.smallInput} />
                        <div onClick={handleSendEmailCode} className={styles.sendEmailCodeContainer}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                    </div>
                    <div className={styles.registerRightCol}>
                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder='Onay kodu' type={"text"} className={styles.registerInput + " " + styles.smallInput} />
                    </div>
                </div>
                <div className={styles.registerCol}>
                    <div className={styles.registerLeftCol} style={{ flex: 1 }}>
                        <textarea
                            style={{ color: 'rgba(255, 255, 255, 0.50)' }}
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            placeholder='Hakkımda' className={styles["pr"] + " " + styles.registerInput + " " + styles.smallInput}
                            rows={4}></textarea>


                    </div>
                </div>
                {
                    userInfoResult !== null && userInfoResult.isSuccessful ?
                        <div className={styles.successText}>Bilgileriniz güncellenmiştir</div>
                        :
                        <div className={styles.errorText}>{userInfoResult.exceptionMessage}</div>
                }

                {
                    emailResult !== null && emailResult.isSuccessful ?
                        <div className={styles.successText}>Epostanız değiştirildi</div>
                        :
                        <div className={styles.errorText}>{emailResult.exceptionMessage}</div>
                }
                {
                    vertificationResult.isSuccessful ?
                        <div className={styles.successText}>E-postanıza onay kodu gönderildi</div>
                        :
                        <div className={styles.errorText}>{vertificationResult.exceptionMessage}</div>
                }
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <BorderButon onClick={saveUserInfoButon} name='Kaydet' />
                </div>
                <div><h2 className={styles["h2"] + " " + styles.userSelected}>Şifremi Değiştir</h2></div>
                <div style={{ marginBottom: '10px', marginTop: '20px' }}>
                    <input
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        type="password" placeholder='Mevcut Şifre' className={styles.defaultInput} />
                </div>
                <div style={{ marginBottom: '10px', }}>
                    <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        type="password" placeholder='Yeni Şifre' className={styles.defaultInput} />
                </div>
                {
                    passwordResult !== null && passwordResult.isSuccessful ?
                        <div className={styles.successText}>Şifreniz değiştirildi</div>
                        :
                        <div className={styles.errorText}>{passwordResult.exceptionMessage}</div>
                }
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <BorderButon onClick={savePasswordButon} name='Kaydet' />
                </div>
            </div>
        </Modal>
    )
}

const AddListModal = () => {
    const dispatch = useDispatch();
    const user = useSelector((x: RootState) => x.userReducer.value.user);
    const userInfo = useSelector((x: RootState) => x.userReducer.value.viewUser);
    const [form, setForm] = useState({ listName: '', userID: user.id } as UserList);
    const saveButon = async () => {
        await postUserList(form).then((res) => {
            dispatch(setViewUser({ ...userInfo, userLists: [...userInfo.userLists, res.data.entity] } as UserFullModels))
        }).catch((er) => {
            console.log(er);
        });
        close();
    }
    const close = () => {
        dispatch(handleOpenBackgroundBlur(false));
        dispatch(handleOpenEditListModal(false));
    }
    return (
        <Modal width={500} onClick={close}>
            <div style={{ margin: '10px' }}>
                <input value={form.listName}
                    onChange={(e) => setForm({ ...form, listName: e.target.value })}
                    type="text" placeholder='Liste adı' className={styles.defaultInput} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <BorderButon onClick={saveButon} name='Kaydet' />
                </div>
            </div>
        </Modal>
    )
}
const EditListModal = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector((x: RootState) => x.userReducer.value.viewUser);
    const editList = useSelector((x: RootState) => x.listReducer.selectedList);
    const [form, setForm] = useState(editList as UserList);
    const saveButon = async () => {
        await putUserList(form)
            .then((res) => {
                dispatch(setViewUser({ ...userProfile, userLists: userProfile.userLists.map((y) => y.id === form.id ? res.data.entity : y) } as UserFullModels))
            }).catch(er => {
                console.log(er)
            });
        close();
    }
    const deleteButon = async () => {
        await deleteUserList(form.id).then((res) => {
            if (res.data.isSuccessful) {
                dispatch(setViewUser({ ...userProfile, userLists: userProfile.userLists.filter((y) => y.id !== form.id) } as UserFullModels))
            }
        }).catch((er) => {
            console.log(er);
        });
        close();
    }
    const close = () => {
        dispatch(handleOpenBackgroundBlur(false));
        dispatch(handleOpenEditListModal(false));
    }
    return (
        <Modal width={500} onClick={close}>
            <div style={{ margin: '10px' }}>
                <input
                    value={form.listName}
                    onChange={(e) => setForm({ ...form, listName: e.target.value })}
                    type="text" placeholder='Liste adı' className={styles.defaultInput} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <BorderButon onClick={deleteButon} name='Sil' />
                    <BorderButon onClick={saveButon} name='Kaydet' />
                </div>
            </div>
        </Modal>
    )
}

const EditListItemModal = () => {
    const dispatch = useDispatch();
    const { editAnimeList, editMangaList } = useSelector((x: RootState) => x.listReducer);
    return (
        <Modal onClick={() => {
            dispatch(handleOpenBackgroundBlur(false));
            dispatch(handleOpenEditListItemModal(false));
        }}>
            <div className={styles.addListContainer}>
                <div className={styles.resultContainer}>
                    <EditStaticListCard animelist={editAnimeList} mangaList={editMangaList} />
                </div>
            </div>
        </Modal>

    )
}
const EditListDynamicItemModal = () => {
    const dispatch = useDispatch();
    const { editAnimeList, editMangaList } = useSelector((x: RootState) => x.listReducer);
    return (
        <Modal onClick={() => {
            dispatch(handleOpenBackgroundBlur(false));
            dispatch(handleOpenEditDynamicListModal(false));
        }}>
            <div className={styles.addListContainer}>
                <div className={styles.resultContainer}>
                    <EditDynamicListCard animelist={editAnimeList} mangaList={editMangaList} />
                </div>
            </div>
        </Modal>
    )
}
const AddListItemModal = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const userInfo = useSelector((x: RootState) => x.userReducer.value.viewUser);
    const searchResult = useSelector((x: RootState) => x.listReducer.searchListResult);
    const { selectedAnimeEpisodes, selectedMangaEpisodes, selectedAnimeListType, selectedMangaListType, selectedList } = useSelector((x: RootState) => x.listReducer);
    const [searchLoading, setSearchLoading] = useState(false);
    const handleSearch = async (e: string) => {
        setSearch(e);
        if (e.length >= 1) {
            setSearchLoading(true);
            await getSearchAnimeAndManga(e).then((res) => {
                if (res.data.count !== 0) {
                    if (selectedAnimeListType == null && selectedMangaListType == null) {
                        dispatch(setSearchListResult(res.data.list))
                    }
                    else {
                        if (selectedAnimeListType != null) {
                            dispatch(setSearchListResult(res.data.list.filter((y) => y.type === Type.Anime)))
                        }
                        if (selectedMangaListType != null) {
                            dispatch(setSearchListResult(res.data.list.filter((y) => y.type === Type.Manga)))
                        }
                    }
                }
            }).catch((er) => {
                console.log(er)
            });
            setSearchLoading(false);
        }
        else {
            dispatch(setSearchListResult([]))
        }
    }
    const saveButon = async () => {
        if (selectedAnimeListType == null && selectedMangaListType == null) {
            var contentList = Array<UserListContents>();
            if (selectedAnimeEpisodes.length !== 0) {
                selectedAnimeEpisodes.map((item) => {
                    contentList.push({
                        userID: item.userID,
                        contentID: item.animeID,
                        episodeID: item.episodeID,
                        type: Type.Anime,
                        listID: selectedList.id
                    } as UserListContents);
                });
            }
            if (selectedMangaEpisodes.length !== 0) {
                selectedMangaEpisodes.map((item) => {
                    contentList.push({
                        userID: item.userID,
                        contentID: item.mangaID,
                        episodeID: item.episodeID,
                        type: Type.Manga,
                        listID: selectedList.id
                    } as UserListContents);
                })
            }
            await postUserListContents(contentList)
                .then((res) => {
                    console.log(res.data);
                }).catch((er) => {
                    console.log(er);
                });
            window.location.reload();
        }
        else {
            if (selectedAnimeListType != null) {
                var newAnimeList = selectedAnimeEpisodes.map((item) => {
                    var temp = Object.assign({}, item);
                    temp.animeStatus = selectedAnimeListType as AnimeStatus;
                    return temp;
                });
                await postAnimeLists(newAnimeList);
                window.location.reload();
            }
            if (selectedMangaListType != null) {
                var newMangaList = selectedMangaEpisodes.map((item) => {
                    var temp = Object.assign({}, item);
                    temp.status = selectedMangaListType as MangaStatus;
                    return temp;
                });
                await postMangaLists(newMangaList);
                window.location.reload();
            }
        }
    }
    return (
        <Modal onClick={() => {
            dispatch(handleOpenBackgroundBlur(false));
            dispatch(handleOpenAddListItemModal(false));
        }}>
            <div className={styles.addListContainer}>
                <div className={styles.searchContainer}>
                    <input
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder={
                            selectedAnimeListType != null ? "Anime ara" : selectedMangaListType != null ? "Manga ara" : "Anime veya manga ara"
                        } type={"text"} className={styles.defaultSearch} />
                </div>
                <div className={styles.resultContainer}>
                    {
                        !searchLoading ?
                            searchResult.map((item) => {
                                return <ResultCard entity={item} key={item.id} type="ADD" />
                            })
                            :
                            <Loading />
                    }
                </div>
                {selectedAnimeEpisodes.length !== 0 || selectedMangaEpisodes.length !== 0 ?
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <BorderButon onClick={saveButon} name='Kaydet' />
                    </div> : null}
            </div>
        </Modal>

    )
}
interface IResultCard extends React.HTMLAttributes<HTMLDivElement> {
    name: string,
    selected: boolean,

}
const ResultCard = (props: { isOpen?: boolean, type: 'EDIT' | 'ADD', entity: AnimeAndMangaModels }) => {
    const dispatch = useDispatch();
    const { viewUser, user } = useSelector((state: RootState) => state.userReducer.value);
    const { selectedAnimeEpisodes, selectedMangaEpisodes } = useSelector((state: RootState) => state.listReducer);
    const [isOpen, setIsOpen] = useState(false);
    const Card = (props: IResultCard) => {
        return (
            <div {...props} className={styles.resultEpisodeCard}>
                <Checkbox selected={props.selected} />
                <a>{props.name}</a>
            </div>
        )
    }
    return (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', }}>
            <div className={styles.resultCard}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className={styles.resultImg}>
                        <img src='/profileFavori.png' />
                    </div>
                    <div className={styles.searchBody}>
                        <a>{props.entity.name}</a>
                        <div className={styles.categoriesList}>
                            {
                                props.entity.categories !== undefined &&
                                props.entity.categories.map((item) => {
                                    return <div key={item.id} className={styles.category}>{item.categories.name}</div>
                                })
                            }
                        </div>
                    </div>
                    <div onClick={() => setIsOpen(!isOpen)} className={styles.searchResultOpen}>
                        <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
                    </div>
                </div>
                {isOpen && props.entity.type == Type.Anime ?
                    <div>
                        {
                            props.entity.animeSeasons.map((item) => {
                                return <div key={item.id} className={styles.resultSeasonsContainer}>
                                    <div className={styles.resultSeasonTitle}><h4>{item.seasonName}</h4></div>
                                    <div className={styles.resultEpisodeContainer}>
                                        {
                                            props.entity.animeEpisodes.filter((y) => y.seasonID == item.id).map((el) => {
                                                var check = selectedAnimeEpisodes.find((y) => {
                                                    var entity = y as AnimeList;
                                                    if (entity.episodeID == el.id && entity.animeID == el.animeID) {
                                                        return true;
                                                    }
                                                    return false;
                                                });
                                                return <Card onClick={() => {
                                                    if (!check) {
                                                        dispatch(setSelectedAnimeEpisode({
                                                            userID: user.id,
                                                            animeID: el.animeID,
                                                            episodeID: el.id,
                                                            animeStatus: AnimeStatus.IWatched,
                                                        } as AnimeList))
                                                    }
                                                    else {

                                                        dispatch(setSelectedAnimeEpisodes(selectedAnimeEpisodes.filter((y) => {
                                                            var entity = y as AnimeList;
                                                            if (entity.animeID !== el.animeID) {
                                                                if (entity.episodeID !== el.id) {
                                                                    return false;
                                                                }
                                                            }
                                                        })))
                                                    }
                                                }} name={el.episodeName} key={el.id} selected={check !== undefined ? true : false} />
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    :
                    <div>
                        {
                            isOpen &&
                            props.entity.mangaEpisodes !== undefined &&
                            props.entity.mangaEpisodes.map((item) => {
                                return <div key={item.id} className={styles.resultSeasonsContainer}>
                                    <div className={styles.resultEpisodeContainer}>
                                        {
                                            props.entity.mangaEpisodes.map((m) => {
                                                var check = selectedMangaEpisodes.find((y) => {
                                                    var entity = y as MangaList;
                                                    if (entity.mangaID == m.mangaID && entity.episodeID == m.id) {
                                                        return true;
                                                    }
                                                    return false;
                                                });
                                                return <Card
                                                    onClick={() => {
                                                        if (!check) {
                                                            dispatch(setSelectedMangaEpisode({
                                                                userID: user.id,
                                                                mangaID: m.mangaID,
                                                                episodeID: m.id,
                                                                status: MangaStatus.IRead
                                                            } as MangaList))
                                                        }
                                                        else {
                                                            dispatch(setSelectedMangaEpisodes(selectedMangaEpisodes.filter((y: MangaList | any) => y.episodeID !== m.id && y.mangaID !== m.mangaID)))
                                                        }
                                                    }}
                                                    name={m.name} key={m.id} selected={check !== undefined ? true : false} />
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }
            </div>
            {props.type === "EDIT" && viewUser.user.id === user.id && <div className={styles.deleteListContainer}>
                <FontAwesomeIcon icon={faTrash} />
            </div>}
        </div>
    )
}
const EditDynamicListCard = (props: { animelist?: AnimeListModels, mangaList?: MangaListModels }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.userReducer.value);
    const { selectedUserListContents } = useSelector((state: RootState) => state.listReducer);
    const [isOpen, setIsOpen] = useState(true);

    const convertArray = () => {
        var listContents = Array<UserListContents>();
        if (props.animelist != undefined && Object.keys(props.animelist).length !== 0) {
            props.animelist?.animeEpisodes.map((item) => {
                listContents.push({ ...props.animelist } as UserListContents)
            });
        }
        if (props.mangaList != undefined && Object.keys(props.mangaList).length !== 0) {
            props.mangaList?.mangaEpisodes.map((item) => {
                listContents.push({ ...props.mangaList } as UserListContents);
            })
        }
        return listContents;
    }

    useEffect(() => {
        dispatch(setSelectedUserListContents(convertArray()));
    }, []);
    const Card = (props: IResultCard) => {
        return (
            <div {...props} className={styles.resultEpisodeCard}>
                <Checkbox selected={props.selected} />
                <a>{props.name}</a>
            </div>
        )
    }
    return (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', }}>
            <div className={styles.resultCard}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className={styles.resultImg}>
                        <img src='/profileFavori.png' />
                    </div>
                    {props.animelist && Object.keys(props.animelist).length !== 0 ?
                        <div className={styles.searchBody}>
                            <a>{props.animelist.anime.animeName}</a>
                            <div className={styles.categoriesList}>
                                {
                                    props.animelist.categories !== undefined &&
                                    props.animelist.categories.map((item) => {
                                        return <div key={item.id} className={styles.category}>{item.categories.name}</div>
                                    })
                                }
                            </div>
                        </div>
                        :
                        <div className={styles.searchBody}>
                            <a>{props.mangaList?.manga.name}</a>
                            <div className={styles.categoriesList}>
                                {
                                    props.mangaList &&
                                    props.mangaList.categories !== undefined &&
                                    props.mangaList.categories.map((item) => {
                                        return <div key={item.id} className={styles.category}>{item.categories.name}</div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    <div onClick={() => setIsOpen(!isOpen)} className={styles.searchResultOpen}>
                        <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
                    </div>
                </div>
                {isOpen && props.animelist && Object.keys(props.animelist).length !== 0 ?
                    <div>
                        {
                            props.animelist.animeSeasons.map((item) => {
                                return <div key={item.id} className={styles.resultSeasonsContainer}>
                                    <div className={styles.resultSeasonTitle}><h4>{item.seasonName}</h4></div>
                                    <div className={styles.resultEpisodeContainer}>
                                        {
                                            props.animelist &&
                                            props.animelist.animeEpisodes.filter((y) => y.seasonID == item.id).map((el) => {
                                                var check = selectedUserListContents.find((y) => y.episodeID == el.id && y.contentID == el.animeID);
                                                return <Card onClick={async () => {
                                                    if (check === undefined) {
                                                        await postUserListContent(props.animelist as UserListContents);
                                                        dispatch(setselectedUserListContent(props.animelist));
                                                    }
                                                    else {
                                                        await deleteUserListContent(props.animelist?.id as any).then((res) => {
                                                            if (res.data.isSuccessful) {
                                                                dispatch(setSelectedUserListContents(selectedUserListContents.filter((y) => y.id !== props.animelist?.id)))
                                                                if (selectedUserListContents.length - 1 === 0) {
                                                                    window.location.reload();
                                                                }
                                                            }
                                                        });
                                                    }
                                                }}
                                                    name={el.episodeName}
                                                    key={el.id}
                                                    selected={check !== undefined ? true : false} />
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    :
                    <div>
                        {
                            isOpen &&
                            props.mangaList &&
                            props.mangaList.mangaEpisodes !== undefined &&
                            props.mangaList.mangaEpisodes.map((item) => {
                                return <div key={item.id} className={styles.resultSeasonsContainer}>
                                    <div className={styles.resultEpisodeContainer}>
                                        {
                                            props.mangaList &&
                                            props.mangaList.mangaEpisodes.map((m) => {
                                                var check = selectedUserListContents.find((y) => y.episodeID == m.id && y.contentID == m.mangaID);
                                                return <Card
                                                    onClick={async () => {
                                                        if (check === undefined) {
                                                            await postUserListContent(props.mangaList as UserListContents);
                                                            dispatch(setselectedUserListContent(props.mangaList));
                                                        }
                                                        else {
                                                            await deleteUserListContent(props.mangaList?.id as any).then((res) => {
                                                                if (res.data.isSuccessful) {
                                                                    dispatch(setSelectedUserListContents(selectedUserListContents.filter((y) => y.id !== props.mangaList?.id)))
                                                                    if (selectedUserListContents.length - 1 === 0) {
                                                                        window.location.reload();
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }}
                                                    name={m.name} key={m.id} selected={check !== undefined ? true : false} />
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}
const EditStaticListCard = (props: { animelist?: AnimeListModels, mangaList?: MangaListModels }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.userReducer.value);
    const { selectedAnimeEpisodes, selectedMangaEpisodes, selectedAnimeListType, selectedMangaListType } = useSelector((state: RootState) => state.listReducer);
    const [isOpen, setIsOpen] = useState(true);
    const convertArrayAnime = () => {
        var animeList = Array<AnimeList>();
        props.animelist?.animeEpisodes.map(item => {
            if (props.animelist?.animeList.animeEpisode.id === item.id) {
                animeList.push({
                    id: props.animelist?.animeList.id,
                    animeID: item.animeID,
                    userID: user.id,
                    episodeID: item.id,
                    animeStatus: props.animelist?.animeList.animeStatus
                } as AnimeList);
            }
        })
        return animeList;
    }
    const convertArrayManga = () => {
        var mangaList = Array<MangaList>();
        props.mangaList?.mangaEpisodes.map(item => {
            mangaList.push({
                id: props.mangaList?.mangaList.id,
                mangaID: item.mangaID,
                userID: user.id,
                episodeID: item.id,
                status: props.mangaList?.mangaList.status
            } as MangaList);
        })
        return mangaList;
    }
    useEffect(() => {
        if (props.animelist !== undefined && Object.keys(props.animelist).length !== 0) {
            dispatch(setSelectedAnimeEpisodes(convertArrayAnime()));
        }
        if (props.mangaList !== undefined && Object.keys(props.mangaList).length !== 0) {
            dispatch(setSelectedMangaEpisodes(convertArrayManga()));
        }
    }, []);
    const Card = (props: IResultCard) => {
        return (
            <div {...props} className={styles.resultEpisodeCard}>
                <Checkbox selected={props.selected} />
                <a>{props.name}</a>
            </div>
        )
    }
    return (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', }}>
            <div className={styles.resultCard}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className={styles.resultImg}>
                        <img src='/profileFavori.png' />
                    </div>
                    {props.animelist && Object.keys(props.animelist).length !== 0 ?
                        <div className={styles.searchBody}>
                            <a>{props.animelist.anime.animeName}</a>
                            <div className={styles.categoriesList}>
                                {
                                    props.animelist.categories !== undefined &&
                                    props.animelist.categories.map((item) => {
                                        return <div key={item.id} className={styles.category}>{item.categories.name}</div>
                                    })
                                }
                            </div>
                        </div>
                        :
                        <div className={styles.searchBody}>
                            <a>{props.mangaList?.manga.name}</a>
                            <div className={styles.categoriesList}>
                                {
                                    props.mangaList &&
                                    props.mangaList.categories !== undefined &&
                                    props.mangaList.categories.map((item) => {
                                        return <div key={item.id} className={styles.category}>{item.categories.name}</div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    <div onClick={() => setIsOpen(!isOpen)} className={styles.searchResultOpen}>
                        <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
                    </div>
                </div>
                {isOpen && props.animelist && Object.keys(props.animelist).length !== 0 ?
                    <div>
                        {
                            props.animelist.animeSeasons.map((item) => {
                                return <div key={item.id} className={styles.resultSeasonsContainer}>
                                    <div className={styles.resultSeasonTitle}><h4>{item.seasonName}</h4></div>
                                    <div className={styles.resultEpisodeContainer}>
                                        {
                                            props.animelist &&
                                            props.animelist.animeEpisodes.filter((y) => y.seasonID == item.id).map((el) => {
                                                var check = selectedAnimeEpisodes.find((y) => {
                                                    var entity = y as AnimeList;
                                                    if (entity.episodeID == el.id && entity.animeID == el.animeID) {
                                                        return true;
                                                    }
                                                    return false;
                                                });
                                                return <Card onClick={async () => {
                                                    if (!check) {
                                                        var entity = {
                                                            userID: user.id,
                                                            animeID: el.animeID,
                                                            episodeID: el.id,
                                                            animeStatus: selectedAnimeListType as any,
                                                        } as AnimeList;
                                                        await postAnimeList(entity);
                                                        dispatch(setSelectedAnimeEpisode(entity))
                                                    }
                                                    else {
                                                        await deleteAnimeList(check.id);
                                                        dispatch(setSelectedAnimeEpisodes(selectedAnimeEpisodes.filter((y) => {
                                                            var entity = y as AnimeList;
                                                            if (entity.animeID !== el.animeID) {
                                                                if (entity.episodeID !== el.id) {
                                                                    return false;
                                                                }
                                                            }
                                                        })));

                                                        if (selectedAnimeEpisodes.length - 1 === 0) {
                                                            window.location.reload();
                                                        }
                                                    }
                                                }} name={el.episodeName} key={el.id} selected={check !== undefined ? true : false} />
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    :
                    <div>
                        {
                            isOpen &&
                            props.mangaList &&
                            props.mangaList.mangaEpisodes !== undefined &&
                            props.mangaList.mangaEpisodes.map((item) => {
                                return <div key={item.id} className={styles.resultSeasonsContainer}>
                                    <div className={styles.resultEpisodeContainer}>
                                        {
                                            props.mangaList &&
                                            props.mangaList.mangaEpisodes.map((m) => {
                                                var check = selectedMangaEpisodes.find((y) => {
                                                    var entity = y as MangaList;
                                                    if (entity.mangaID == m.mangaID && entity.episodeID == m.id) {
                                                        return true;
                                                    }
                                                    return false;
                                                });
                                                return <Card
                                                    onClick={async () => {
                                                        if (!check) {
                                                            var entity = {
                                                                userID: user.id,
                                                                mangaID: m.mangaID,
                                                                episodeID: m.id,
                                                                status: selectedMangaListType as any,
                                                            } as MangaList;
                                                            await postMangaList(entity);
                                                            dispatch(setSelectedMangaEpisode(entity))
                                                        }
                                                        else {
                                                            await deleteMangaList(check.id);
                                                            dispatch(setSelectedMangaEpisodes(selectedMangaEpisodes.filter((y: MangaList | any) => y.episodeID !== m.id && y.mangaID !== m.mangaID)))
                                                            if (selectedMangaEpisodes.length - 1 === 0) {
                                                                window.location.reload();
                                                            }
                                                        }
                                                    }}
                                                    name={m.name} key={m.id} selected={check !== undefined ? true : false} />
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

const LoginModal = () => {
    const { login } = useAuth();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [result, setResult] = useState<ServiceResponse<UserModel>>({} as ServiceResponse<UserModel>);
    const [check, setCheck] = useState(false);
    const handleLogin = async () => {
        if (userName.length != 0 && password.length != 0) {
            setCheck(false);
            setResult({} as ServiceResponse<UserModel>);
            await postLogin(userName, password).then((res) => {
                if (res.data.isSuccessful) {
                    login({ token: res.data.entity.token } as UserModel);
                }
                setResult(res.data);
            }).catch((er) => {
                console.log(er);
            })
        }
        else {
            setCheck(true);
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
                        <img src='/logo.png' />
                    </div>
                    <input
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName} placeholder='Kullanıcı adı veya eposta'
                        type={"text"}
                        className={styles.textInput + " " + (check && userName.length === 0 ? styles.errorBorder : undefined)} />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder='Şifre'
                        type={"password"}
                        className={styles.textInput + " " + (check && password.length === 0 ? styles.errorBorder : undefined)} />
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
    const [form, setForm] = useState<Users>({ nameSurname: '', userName: '', birthDay: new Date().toLocaleString(), password: '', email: '', discover: '', gender: '' } as Users);
    const [code, setCode] = useState('');
    const [birthDay, setBirthDay] = useState(new Date());
    const [check, setCheck] = useState(false);

    const [Tabs, setTabs] = useState<'REGISTER' | 'FAVORIANIME'>('REGISTER');

    const [selectedAnime, setSelectedAnime] = useState<Array<Anime>>([]);
    const [searchAnime, setSearchAnime] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResult, setSearchResult] = useState<Array<Anime>>([]);


    const [registerResult, setRegisterResult] = useState<ServiceResponse<Users>>({} as ServiceResponse<Users>);
    const [vertificationResult, setVertificationResult] = useState<ServiceResponse<UserEmailVertification | Users>>({} as ServiceResponse<UserEmailVertification | Users>);
    const [selectedContract, setSelectedContract] = useState(false);

    const saveButon = async () => {
        setRegisterResult({} as ServiceResponse<Users>);
        setVertificationResult({} as ServiceResponse<UserEmailVertification | Users>);
        if (form.nameSurname.length !== 0 && form.userName.length !== 0 && form.birthDay.length !== 0 && form.password.length !== 0 && form.gender.length != 0 && form.email.length !== 0 && form.discover.length !== 0 && code.length !== 0) {
            setCheck(false);
            await postAddUser(form, code)
                .then((res) => {
                    if (res.data.isSuccessful) {
                        setSelectedAnime([]);
                        setCode("");
                        setBirthDay(new Date());
                        setForm({ nameSurname: '', userName: '', birthDay: new Date().toLocaleString(), password: '', email: '', discover: '', gender: '' } as Users);
                    }
                    setRegisterResult(res.data);
                }).catch((er) => {
                    console.log(er);
                })
        }
        else {
            setCheck(true);
        }
    }
    const handleSendEmailCode = async () => {
        setVertificationResult({} as ServiceResponse<UserEmailVertification | Users>);
        setRegisterResult({} as ServiceResponse<Users>);
        await postAgainUserEmailVertification(form.email)
            .then((res) => {
                setVertificationResult(res.data);
            })
            .catch((er) => {
                console.log(er);
            })
    }
    const handleSearch = async (value: string) => {
        setSearchAnime(value);
        if (value.length >= 2) {
            setSearchLoading(true);
            await getSearchAnime(searchAnime)
                .then((res) => {
                    setSearchResult(res.data.list);
                }).catch((er) => {

                });
            setSearchLoading(false);
        }
        else {
            if (value.length === 0) {
                setSearchResult([]);
                setSearchLoading(false);
            }
        }
    }
    const FavoriAnimeCard = (props: { isSelected: boolean, entity: Anime, handleCheck: () => void }) => {
        return (
            <div onClick={() => props.handleCheck()}
                className={styles.row + " " + styles.favoriSelectedCard + " " + styles.userSelected}>
                <Checkbox selected={props.isSelected} />
                <a>{props.entity.animeName}</a>
            </div>
        )
    }
    return (
        <div className={styles.registerModal}>
            <div className={styles.registerContainer}>
                <div className={styles.registerHeader}>
                    <div onClick={() => {
                        if (Tabs === "FAVORIANIME") {
                            setSearchResult([]);
                            setSearchAnime("");
                            setTabs("REGISTER");
                        }
                        else {
                            dispatch(handleOpenBackgroundBlur(false));
                            dispatch(handleOpenRegisterModal(false));
                        }
                    }} className={styles.loginClose}>
                        <FontAwesomeIcon fontSize={22} icon={faClose} color="#fff" />
                    </div>
                </div>
                {Tabs === 'REGISTER' && <div className={styles.registerContent}>
                    <div className={styles.logoContainer}>
                        <img src='/logo.png' />
                    </div>
                </div>}
                {Tabs === 'REGISTER' ? <div className={styles.registerBody}>
                    <div className={styles.registerCol}>
                        <div className={styles.registerLeftCol}>
                            <input
                                value={form.nameSurname}
                                onChange={(e) => setForm({ ...form, nameSurname: e.target.value })}
                                placeholder='Ad soyad' type={"text"} className={styles.registerInput + " " + (check && form.nameSurname.length === 0 ? styles.errorBorder : undefined)} />
                        </div>
                    </div>
                    <div className={styles.registerCol}>
                        <div className={styles.registerLeftCol}>
                            <input
                                value={form.userName}
                                onChange={(e) => setForm({ ...form, userName: e.target.value })}
                                placeholder='Kullanıcı adı' type={"text"}
                                className={styles.registerInput + " " + styles.smallInput + " " + (check && form.userName.length === 0 ? styles.errorBorder : undefined)} />
                        </div>
                        <div className={styles.registerRightCol}>
                            <DatePicker dateFormat={"dd/MM/yyyy"} className={styles.datePickerInput} selected={birthDay} onChange={(date: Date) => {
                                setBirthDay(date)
                                setForm({ ...form, birthDay: date.toLocaleString() })
                            }} />
                        </div>
                    </div>
                    <div className={styles.registerCol}>
                        <div className={styles.registerLeftCol}>
                            <input
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder='Şifre' type={"password"} className={styles.registerInput + " " + styles.smallInput + " " + (check && form.password.length === 0 ? styles.errorBorder : undefined)} />
                        </div>
                        <div className={styles.registerRightCol}>
                            <input
                                value={form.gender}
                                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                                placeholder='Cinsiyet'
                                type={"text"}
                                className={styles.registerInput + " " + styles.smallInput + " " + (check && form.password.length === 0 ? styles.errorBorder : undefined)} />
                        </div>
                    </div>
                    <div className={styles.registerCol}>
                        <div className={styles.registerLeftCol} style={{ flex: 2 }}>
                            <input
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder='E-posta' type={"text"} className={styles["pr"] + " " + styles.registerInput + " " + styles.smallInput + " " + (check && form.email.length === 0 ? styles.errorBorder : undefined)} />
                            <div onClick={handleSendEmailCode} className={styles.sendEmailCodeContainer}>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </div>
                        </div>
                        <div className={styles.registerRightCol}>
                            <input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder='Onay kodu' type={"text"} className={styles.registerInput + " " + styles.smallInput + " " + (check && code.length === 0 ? styles.errorBorder : undefined)} />
                        </div>
                    </div>
                    <div className={styles.registerCol}>
                        <div className={styles.registerLeftCol}>
                            <div className={(selectedAnime.length !== 0 ? styles["selectedAnime-jc-ai"] : undefined) + " " + styles["pr"] + " " + styles["selectedFavoriContainer"] + " " + styles.registerInput + " " + styles.smallInput + " " + styles.favoriSelected + " " + (check && selectedAnime.length === 0 ? styles.errorBorder : undefined) + " " + styles.userSelected}>
                                {selectedAnime.length === 0 ? <a>Favori Animeler</a>
                                    :
                                    selectedAnime.map((item, key) => {
                                        return <div key={key} className={styles.selectedAnimeCard}>
                                            {item.animeName}
                                            <FontAwesomeIcon onClick={() => {
                                                setSelectedAnime(selectedAnime.filter((y) => y.id !== item.id))
                                            }} icon={faTrash} />
                                        </div>
                                    })
                                }
                            </div>
                            <button className={styles.selectedFavoriAnimeButon} onClick={() => setTabs('FAVORIANIME')} >
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                        </div>
                        <div className={styles.registerRightCol}>
                            <input
                                value={form.discover}
                                onChange={(e) => setForm({ ...form, discover: e.target.value })}
                                placeholder='Referans' type={"text"} className={styles.registerInput + " " + styles.smallInput + " " + (check && form.discover.length === 0 ? styles.errorBorder : undefined)} />
                        </div>
                    </div>
                    {
                        vertificationResult.isSuccessful ?
                            <div className={styles.successText}>E-postanıza onay kodu gönderildi</div>
                            :
                            <div className={styles.errorText}>{vertificationResult.exceptionMessage}</div>
                    }
                    {
                        registerResult.isSuccessful ?
                            <div className={styles.successText}>Başarılı şekilde kayıt oldunuz</div>
                            :
                            <div className={styles.errorText}>{registerResult.exceptionMessage}</div>
                    }
                    <div className={styles.contractContainer}>
                        <Checkbox onClick={() => setSelectedContract(!selectedContract)} selected={selectedContract} />
                        <span><Link href={"/contract"}><a target={"_blank"} style={{ textDecoration: 'underline', color: 'rgba(255, 255, 255, 0.55)', cursor: 'pointer' }}>Gizlilik sözleşmesini</a></Link> okudum ve kabul ediyorum</span>
                    </div>
                    <div className={styles.registerCol}>
                        <input
                            onClick={saveButon}
                            type={"button"} value="Kayıt Ol" className={styles.loginButon} />
                    </div>
                </div> : <div className={styles.registerBody}>
                    <div className={styles.registerCol}>
                        <div className={styles.registerLeftCol}>
                            <input
                                value={searchAnime}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder='Anime ara' type={"text"} className={styles.registerInput} />
                        </div>
                    </div>
                    <div style={{ maxHeight: '300px' }}>
                        {
                            searchLoading ? <Loading />
                                :
                                searchResult.map((item) => {
                                    return <FavoriAnimeCard
                                        key={item.id}
                                        isSelected={selectedAnime.find((y) => y.id === item.id) ? true : false}
                                        handleCheck={() => {
                                            if (selectedAnime.length !== 5) {
                                                var check = selectedAnime.find((y) => y.id == item.id);
                                                if (check) {
                                                    setSelectedAnime(selectedAnime.filter((y) => y.id !== item.id))
                                                }
                                                else {
                                                    setSelectedAnime([...selectedAnime, item]);
                                                    setSelectedAnime([...selectedAnime, item]);
                                                    setSelectedAnime([...selectedAnime, item]);
                                                }
                                            }
                                        }} entity={item} />
                                })
                        }
                    </div>
                </div>}
            </div>
        </div>
    )
}




const MessageModal = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { messageUser, user, signalR, userMessageSend } = useSelector((x: RootState) => x.userReducer.value);
    const [selectedMessage, setSelectedMessage] = useState({} as UserMessageModel);
    const [messageText, setMessageText] = useState('');
    const [searchUser, setSearchUser] = useState('');
    const [searchResult, setSearchResult] = useState<Array<UserMessageModel>>([]);
    var ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (userMessageSend !== null && Object.keys(userMessageSend).length !== 0) {
            setSelectedMessage(userMessageSend);
        }
        loadGetMessages();
    }, []);
    const loadGetMessages = async () => {
        await getMessages().then((res) => {
            dispatch(setMessageUsers(res.data.list));
        }).catch((er) => {
            console.log(er);
        });
        setTimeout(() => {
            setLoading(false);
        }, 300);

    }

    const sendButon = async () => {
        var check = messageUser.find((y) => y.id === selectedMessage.id);
        if (!check) {
            dispatch(setMessageUsers([...messageUser, selectedMessage]));
        }
        if (signalR !== undefined && Object.keys(signalR).length !== 0 && messageText.length != 0) {
            var message = { senderID: user.id, receiverID: selectedMessage.id, message: messageText } as UserMessage;
            signalR.invoke("sendUserMessage", message);
            signalR.on("messageSent", (data: UserMessage) => {
                console.log(data);
                dispatch(setMessageUsers(messageUser.map((i) => i.id === selectedMessage.id ? { ...i, userMessages: [...i.userMessages, data] } : i)));
            });
            setMessageText('');
            setTimeout(() => {
                ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
            }, 100);
        }
        else {
            await postMessage({ senderID: user.id, receiverID: selectedMessage.id, message: messageText } as UserMessage).then((res) => {
                setMessageText('');
                setTimeout(() => {
                    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
                }, 100);
                dispatch(setMessageUsers(messageUser.map((i) => i.id === selectedMessage.id ? { ...i, userMessages: [...i.userMessages, res.data.entity] } : i)));
            }).catch((er) => {
                console.log(er);
            })
        }
    }
    const handleSearchUser = async (e: string) => {
        setSearchUser(e);
        if (e.length >= 2) {
            await getSearchUser(e).then((res) => {
                setSearchResult(res.data.list);
            }).catch((er) => {
                console.log(er)
            })
        }
        else {
            setSearchResult([]);
        }
    }
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
                {
                    !loading ?
                        <div className={styles.messageBody}>
                            <div className={styles.messageUsers}>
                                <div className={styles.searchContainer}>
                                    <input placeholder='Kişi ara' value={searchUser} onChange={(e) => handleSearchUser(e.target.value)} type={"text"} className={styles.defaultSearch} />
                                </div>
                                {
                                    searchResult.length != 0 &&
                                    searchResult.map((item) => {
                                        return <UserCard handleClick={() => {
                                            setSearchResult([]);
                                            setSearchUser('');
                                            setSelectedMessage(item);
                                            setTimeout(() => {
                                                ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
                                            }, 100);
                                        }} key={item.id} item={item} />
                                    })
                                }
                                {
                                    messageUser !== undefined && messageUser.length !== 0 &&
                                    messageUser.map((item) => {
                                        return <UserCard handleClick={() => {
                                            setSelectedMessage(item);
                                            setTimeout(() => {
                                                ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
                                            }, 100);
                                        }} key={item.id} item={item} />
                                    })
                                }
                            </div>
                            <div className={styles.messageMainContainer}>
                                {
                                    Object.keys(selectedMessage).length !== 0 ?
                                        <div className={styles.selectedMessageContainer}>
                                            <div className={styles.messageOptions}>
                                                <div className={styles.messageUserName}>{selectedMessage.userName}</div>
                                            </div>
                                            <div ref={ref} className={styles.messageContent}>
                                                <div className={styles.messages}>
                                                    {
                                                        messageUser !== undefined && messageUser.length !== 0 &&
                                                        messageUser.filter((y) => y.id === selectedMessage.id)[0].userMessages.map((item) => {
                                                            return <MessageCard key={item.id} entity={item} whoIsSender={user.id === item.senderID ? 'SENDER' : 'RECEIVED'} />
                                                        })
                                                    }

                                                </div>
                                            </div>
                                            <div className={styles.sendTextInputContainer}>
                                                <textarea
                                                    value={messageText}
                                                    onChange={(e) => setMessageText(e.target.value)}
                                                    onKeyUp={(e) => {
                                                        if (e.key === "Enter") {
                                                            sendButon();
                                                        }
                                                    }} placeholder='Mesaj yazınız'></textarea>
                                                <div onClick={sendButon} className={styles.sendButon}>
                                                    <FontAwesomeIcon icon={faPaperPlane} color="#fff" />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        :
                        <Loading />
                }
            </div>
        </div>
    )
}
const UserCard = (props: { item: UserMessageModel, handleClick: () => void }) => {
    return (
        <div onClick={props.handleClick} className={styles.messageUserCard}>
            <div>
                <img className={styles.messageUserCardImg} src="/logo.png" />
            </div>
            <div className={styles.messageUserCardInfo}>
                <a>{props.item.userName}</a>
                <div className={styles.messageSummary}>{props.item.userMessages.length === 0 ? "Yeni mesaj atınız" : props.item.userMessages[props.item.userMessages.length - 1].message}</div>
            </div>
        </div>
    )
}
const MessageCard = (props: { whoIsSender: 'SENDER' | 'RECEIVED', entity: UserMessage }) => {
    return (
        props.whoIsSender === "RECEIVED" ?
            <div className={styles.messageCard}>
                <div className={styles.messageImg}>
                    <div className={styles.messageCardImgContainer}>
                        <img height={"50px"} width={"50px"} src="/logo.png" />
                    </div>
                </div>
                <div className={styles.messageCardContent}>
                    <div className={styles.messageHeaderInfo}>
                        <span>{new Date(props.entity.createTime).toLocaleString().substring(0, 16)}</span>
                    </div>
                    <div className={styles.message}>
                        {props.entity.message}
                    </div>
                </div>
            </div>
            :
            <div className={styles.messageCardRight}>
                <div className={styles.messageImg}>
                    <div className={styles.messageCardImgContainerRight}>
                        <img height={"50px"} width={"50px"} src="/logo.png" />
                    </div>
                </div>
                <div className={styles.messageCardContentRight}>
                    <div className={styles.messageHeaderInfoRight}>
                        <span>{new Date(props.entity.createTime).toLocaleString().substring(0, 16)}</span>
                    </div>
                    <div className={styles.messageRight}>
                        {props.entity.message}
                    </div>
                </div>
            </div>
    )
}

const DeleteModal = (props: { text: string, handleClose: () => void, handleDelete: () => void }) => {
    const dispatch = useDispatch();
    return (
        <Modal width={500} onClick={() => {
            dispatch(handleOpenBackgroundBlur(false));
            var deleteModals = {
                text: "",
                isOpen: false,
                handleDelete() { },
                handleClose() { },
            } as IDeleteModal;
            dispatch(handleDeleteModal(deleteModals))
        }}>
            <div style={{ margin: '10px' }}>
                <div className={styles.deleteModalContainer}><label>{props.text}</label></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <BorderButon onClick={props.handleClose} name='İptal' />
                    <BorderButon onClick={props.handleDelete} name='Sil' />
                </div>
            </div>
        </Modal>
    )
}
const BlockModal = () => {
    const { user, viewUser, isUserBlock } = useSelector((x: RootState) => x.userReducer.value)

    const dispatch = useDispatch();
    const addBlockButon = async () => {
        await postUserBlockList({ userID: user.id, blockID: viewUser.user.id } as UserBlockList).then((res) => {
            console.log(res.data);
        }).catch((er) => {
            console.log(er);
        })
    }
    const deleteBlockButon = async () => {
        await deleteUserBlockList(viewUser.user.id).then((res) => {
            console.log(res.data);
        }).catch((er) => {
            console.log(er);
        })
    }
    const buton = async () => {
        if (isUserBlock) {
            await deleteBlockButon();
            dispatch(setIsUserBlock(false));
            close();
        }
        else {
            await addBlockButon();
            dispatch(setIsUserBlock(true));
            close();
        }
    }
    const close = () => {
        dispatch(handleOpenBackgroundBlur(false));
        dispatch(handleOpenBlockModal(false))
    }
    return (
        <Modal width={500} onClick={close}>
            <div style={{ margin: '10px' }}>
                <div className={styles.deleteModalContainer}>
                    <label>{
                        isUserBlock ? "Engeli kaldırmak istiyor musunuz?" : "Bu profili engellemek istiyor musunuz?"
                    }</label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <BorderButon onClick={buton} name={isUserBlock ? 'Engelli kaldır' : 'Engelle'} />
                </div>
            </div>
        </Modal>
    )
}
const ComplaintModal = () => {
    const dispatch = useDispatch();
    const { user, viewUser } = useSelector((x: RootState) => x.userReducer.value);
    const [description, setDescription] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const saveButon = async () => {
        await postComplaintList({ userID: viewUser.user.id, complainantID: user.id, description: description } as ComplaintList);
        setIsSuccess(true);
    }
    const close = () => {
        dispatch(handleOpenBackgroundBlur(false));
        dispatch(handleOpenComplaintModal(false))
    }
    return (
        <Modal width={500} onClick={close}>
            <div style={{ margin: '10px' }}>
                {!isSuccess ? <div>
                    <div className={styles.standartModalContainer}><label>Şikayetinizi yazınız</label></div>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.complaintTextInput}></textarea>
                </div>
                    : <div>
                        <div className={styles.deleteModalContainer}><label>Şikayetiniz iletilmiştir</label></div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <BorderButon onClick={close} name='Kapat' />
                        </div>
                    </div>
                }

                {!isSuccess && <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <BorderButon onClick={saveButon} name='Gönder' />
                </div>}
            </div>
        </Modal>
    )
}
const ContentComplaintModal = () => {
    const dispatch = useDispatch();
    const { user, contentComplaint } = useSelector((x: RootState) => x.userReducer.value);
    const [description, setDescription] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const saveButon = async () => {
        await postContentComplaint({ message: description, userID: user.id, contentID: contentComplaint.contentID, type: contentComplaint.type, complaintType: contentComplaint.complaintType } as ContentComplaint);
        setIsSuccess(true);
    }
    const close = () => {
        dispatch(handleOpenBackgroundBlur(false));
        dispatch(handleOpenContentComplaintModal(false))
    }
    return (
        <Modal width={500} onClick={close}>
            <div style={{ margin: '10px' }}>
                {!isSuccess ? <div>
                    <div className={styles.standartModalContainer}><label>Şikayetinizi yazınız</label></div>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.complaintTextInput}></textarea>
                </div>
                    : <div>
                        <div className={styles.deleteModalContainer}><label>Şikayetiniz iletilmiştir</label></div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <BorderButon onClick={close} name='Kapat' />
                        </div>
                    </div>
                }

                {!isSuccess && <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <BorderButon onClick={saveButon} name='Gönder' />
                </div>}
            </div>
        </Modal>
    )
}
const UserAboutModal = () => {
    const dispatch = useDispatch();
    const userView = useSelector((x: RootState) => x.userReducer.value.viewUser);
    return (
        <Modal
            onClick={() => {
                dispatch(handleOpenBackgroundBlur(false));
                dispatch(handleOpenAboutModal(false));
            }}
            width={500} >
            <div style={{ margin: '10px' }}>
                <div className={styles.aboutModalContainer}><label>Hakkında</label></div>
                <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                    <Line />
                </div>
                <div className={styles.aboutModalBody}>
                    {userView.user.about}
                </div>
            </div>
        </Modal>
    )
}
const WarningModal = () => {
    const dispatch = useDispatch();
    const { warningModal } = useSelector((x: RootState) => x.modalReducer.value);
    return (
        <Modal onClick={() => {
            dispatch(handleWarningModal({ text: "", isOpen: false }));
            dispatch(handleOpenBackgroundBlur(false));
        }}>
            <div style={{ margin: '10px' }}>

                <div className={styles.deleteModalContainer}><label>{warningModal.text}</label></div>
            </div>
        </Modal>
    )

}