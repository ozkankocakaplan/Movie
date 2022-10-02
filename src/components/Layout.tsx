import React, { useEffect, useState } from 'react'
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { handleOpenBackgroundBlur, handleOpenLoginModal, handleOpenRegisterModal } from '../store/features/modalReducer';
import Line from './Line';
import DatePicker from "react-datepicker";
import styles from '../../styles/Home.module.css';
import "react-datepicker/dist/react-datepicker.css";

interface ILayoutProps {
    children: React.ReactNode
}
export default function Layout(props: ILayoutProps) {
    const { backgroundBlur, loginModal, registerModal } = useSelector((state: RootState) => state.modalReducer.value)
    useEffect(() => {
        if (backgroundBlur) {
            document.body.style.overflow = 'hidden';
        }
    }, [backgroundBlur])

    return (
        <div>
            {backgroundBlur && <div className={styles.filterBlurBackground}></div>}
            {props.children}
            {loginModal && <LoginModal />}
            {registerModal && <RegisterModal />}
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