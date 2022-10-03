import React, { useEffect, useState } from 'react'
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faGear, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { handleOpenBackgroundBlur, handleOpenLoginModal, handleOpenMessageModal, handleOpenRegisterModal } from '../store/features/modalReducer';
import Line from './Line';
import DatePicker from "react-datepicker";
import styles from '../../styles/Home.module.css';
import "react-datepicker/dist/react-datepicker.css";

interface ILayoutProps {
    children: React.ReactNode
}
export default function Layout(props: ILayoutProps) {
    const { backgroundBlur, loginModal, registerModal, messageModal } = useSelector((state: RootState) => state.modalReducer.value)
    useEffect(() => {
        if (backgroundBlur) {
            document.body.style.overflow = 'hidden';
        }
        else{
            document.body.style.overflow = 'auto';
        }
    }, [backgroundBlur])

    return (
        <div>
            {backgroundBlur && <div className={styles.filterBlurBackground}></div>}
            {props.children}
            {loginModal && <LoginModal />}
            {registerModal && <RegisterModal />}
            {messageModal && <MessageModal />}
        </div>
    )
}
const LoginModal = () => {
    const dispatch = useDispatch();
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
                    <input placeholder='Kullanıcı adı veya eposta' type={"text"} className={styles.textInput} />
                    <input placeholder='Şifre' type={"password"} className={styles.textInput} />
                    <input type={"button"} value="Giriş Yap" className={styles.loginButon} />
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
                        <div className={styles.messageUserSearchContainer}>
                            <input placeholder='Kişi ara' type={"text"} className={styles.messageUserSearch} />
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
                            <div><FontAwesomeIcon icon={faGear} color="rgba(255,255,255,0.60)" /></div>
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