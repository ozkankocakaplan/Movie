import { faAddressCard, faAngleLeft, faAngleRight, faBan, faBorderAll, faEdit, faEnvelope, faPersonCircleExclamation, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { FanArtCard, ReviewCard } from '../src/components/Card';
import { useAuth } from '../src/hooks/useAuth';
import { handleOpenAddListItemModal, handleOpenAddListModal, handleOpenBackgroundBlur, handleOpenEditListItemModal, handleOpenEditListModal, handleOpenEditUserModal } from '../src/store/features/modalReducer';
import styles from '../styles/Home.module.css';


export default function Profile() {
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useRouter();
  useEffect(() => {
    setLoggedUser(user);
  }, [user])
  if (loggedUser !== null) {
    const LeftContent = () => {
      return (
        <div className={styles.listHeader}>
          <div className={styles.rosetteContainer}>
            <RosetteCard source='http://localhost:3000/rosette.png' />
            <RosetteCard source='http://localhost:3000/rosette2.png' />
            <RosetteCard source='http://localhost:3000/rosette3.png' />
            <RosetteCard source='http://localhost:3000/rosette.png' />
            <RosetteCard source='http://localhost:3000/rosette2.png' />
            <RosetteCard source='http://localhost:3000/rosette3.png' />
            <RosetteCard source='http://localhost:3000/rosette.png' />
            <RosetteCard source='http://localhost:3000/rosette2.png' />
            <RosetteCard source='http://localhost:3000/rosette3.png' />
            <RosetteCard source='http://localhost:3000/rosette.png' />
            <RosetteCard source='http://localhost:3000/rosette2.png' />
            <RosetteCard source='http://localhost:3000/rosette3.png' />
            <RosetteCard source='http://localhost:3000/rosette.png' />
            <RosetteCard source='http://localhost:3000/rosette2.png' />
            <RosetteCard source='http://localhost:3000/rosette3.png' />
            <RosetteCard source='http://localhost:3000/rosette.png' />
          </div>
          <div className={styles.listContainer}>
            <div className={styles.listHeaderTitle + " " + styles.userSelected}>
              <h1 onClick={() => {
                dispatch(handleOpenBackgroundBlur(true));
                dispatch(handleOpenAddListModal(true));
              }}>Listeler</h1>
            </div>
            <div className={styles.listBody}>
              <Slider user={loggedUser} />
              <Slider user={loggedUser} />
              <Slider user={loggedUser} />
              <Slider user={loggedUser} />
            </div>
          </div>
        </div>
      )
    }
    const MiddleContent = () => {
      return (
        <div className={styles.profileMiddle}></div>
      )
    }
    const RightContent = () => {
      const dispatch = useDispatch();
      return (
        <div className={styles.profile}>
          <div className={styles.profileInfoContainer}>
            <div className={styles.profileInfo + " " + styles.userSelected}>erayatmaca</div>
            <div className={styles.profileOptions}>
              {
                loggedUser !== null && Object.keys(loggedUser).length !== 0 && <div onClick={() => {
                  dispatch(handleOpenBackgroundBlur(true))
                  dispatch(handleOpenEditUserModal(true))
                }} className={styles.optionsIcon}><FontAwesomeIcon icon={faEdit} /></div>
              }

              <div className={styles.optionsIcon}><FontAwesomeIcon icon={faAddressCard} /></div>
              <div className={styles.optionsIcon}><FontAwesomeIcon icon={faEnvelope} /></div>
              <div className={styles.optionsIcon}><FontAwesomeIcon icon={faBan} /></div>
              <div className={styles.optionsIcon}><FontAwesomeIcon icon={faPersonCircleExclamation} /></div>
              <div onClick={logout} className={styles.optionsIcon}><FontAwesomeIcon icon={faRightFromBracket} /></div>
            </div>
          </div>
          <div className={styles.statusContainer}>
            <div className={styles.listHeaderTitle + " " + styles.userSelected}>
              <h1>Gönderiler</h1>
            </div>
            <div className={styles.listBody}>
              <ReviewCard user={loggedUser} />
              <ReviewCard user={loggedUser} />
              <FanArtCard user={loggedUser} />
              <FanArtCard user={loggedUser} />
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className={styles.pageContainer}>
        <div className={styles.profileHeaderContainer}>
          <div className={styles.profileHeader}>
            <div className={styles.userImg}>
              <Link href={"/"}>
                <a>
                  <img src='http://localhost:3000/profilePhoto.png' />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.profileContainer}>
          <LeftContent />
          <MiddleContent />
          <RightContent />
        </div>
      </div>
    )
  }
  else {
    navigate.push("/")
  }




}
const Slider = (props: { user: {} }) => {
  const dispatch = useDispatch();
  var scrollRef = useRef<HTMLDivElement>(null);
  const sliderBack = () => {
    if (scrollRef.current?.scrollLeft != undefined) {
      var left = scrollRef.current?.scrollLeft - 151;
      scrollRef.current?.scrollTo({ left: left, behavior: 'smooth' });
    }
  }
  const sliderNext = () => {
    if (scrollRef.current?.scrollLeft != undefined) {
      var right = scrollRef.current?.scrollLeft + 181;
      scrollRef.current?.scrollTo({ left: right, behavior: 'smooth' });
    }
  }
  const CardImg = () => {
    return (
      <img onClick={() => {
        dispatch(handleOpenBackgroundBlur(true));
        dispatch(handleOpenEditListItemModal(true))
      }} className={styles.cardImage + " " + styles.userSelected} src='http://localhost:3000/profileFavori.png' />
    )
  }
  return (
    <div>
      <div className={styles.topLeftBorder}></div>
      <div className={styles.leftBorder}></div>
      <div className={styles.listCard}>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderLeft}>
            <div style={{ padding: '5px', cursor: 'pointer' }} onClick={sliderBack}> <FontAwesomeIcon icon={faAngleLeft} color={"rgba(255,255,255,0.3)"} /></div>
          </div>
          <div ref={scrollRef} className={styles.sliderImages}>
            <CardImg />
            <CardImg />
            <CardImg />
            <CardImg />
            <CardImg />
            <CardImg />
            <CardImg />
            <CardImg />
            <CardImg />
            <CardImg />
            <CardImg />
            <CardImg />
          </div>
          <div className={styles.sliderRight}>
            <div style={{ padding: '5px', cursor: 'pointer' }} onClick={sliderNext}>
              <FontAwesomeIcon icon={faAngleRight} color={"rgba(255,255,255,0.3)"} />
            </div>
          </div>
        </div>
        <div className={styles.listOptions}>
          <div className={styles.listOptionsLeft}>
            {
              props.user !== null && Object.keys(props.user).length !== 0 &&
              <div className={styles.listOptionsLeft}>
                <div onClick={() => {
                  dispatch(handleOpenBackgroundBlur(true));
                  dispatch(handleOpenAddListItemModal(true));
                }} className={styles.addListButon}>
                  <FontAwesomeIcon color='rgba(255,255,255,0.20)' icon={faPlus} />
                </div>
                <div className={styles.changeListButon}>
                  <FontAwesomeIcon color='rgba(255,255,255,0.20)' icon={faBorderAll} />
                </div>
              </div>
            }
          </div>
          <div className={styles.listOptionsRight + " " + styles.topWatchBorder}>
            <span onClick={() => {
              dispatch(handleOpenBackgroundBlur(true));
              dispatch(handleOpenEditListModal(true));
            }} className={styles.userSelected}>
              İzledim
            </span>
          </div>
        </div>
      </div>
      <div className={styles.bottomBorder}></div>
      <div className={styles.rightBorder}></div>
    </div>
  )
}
const RosetteCard = (props: { source: string }) => {
  return (
    <div className={styles.rosette}><img src={props.source} /></div>
  )
}
