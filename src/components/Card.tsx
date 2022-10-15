import React, { memo } from 'react'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { FanArt, Users } from '../types/Entites';

import styles from '../../styles/Home.module.css';
import { baseUrl, deleteFanArt } from '../utils/api';
import { IDeleteModal, handleDeleteModal, handleOpenBackgroundBlur } from '../store/features/modalReducer';
const ReviewCard = (props: { user: Users }) => {
  const userInfo = useSelector((x: RootState) => x.userReducer.value.user);
  const CardImg = () => {
    return (
      <img className={styles.cardImage + " " + styles.userSelected} src='http://localhost:3000/profileFavori.png' />
    )
  }
  return (
    <div>
      <div className={styles.topLeftBorder}></div>
      <div className={styles.leftBorder}></div>
      <div className={styles.listCard2}>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderImages}>
            <CardImg />
            <div className={styles.reviewView + " " + styles.userSelected}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehen-derit in voluptate velit esse cillum dolore eu fugiat nul...
            </div>
          </div>
        </div>
        <div className={styles.listOptions}>
          <div className={styles.listOptionsLeft}>
            {
              props.user.id === userInfo.id && Object.keys(props.user).length !== 0 &&
              <div className={styles.listOptionsLeft}>
                <div className={styles.addListButon}>
                  <FontAwesomeIcon color='rgba(255,255,255,0.20)' icon={faEdit} />
                </div>
                <div className={styles.changeListButon}>
                  <FontAwesomeIcon color='rgba(255,255,255,0.20)' icon={faTrash} />
                </div>
              </div>
            }
          </div>
          <div className={styles.listOptionsRight + " " + styles.topWatchBorder}>
            <span className={styles.userSelected + " " + styles.statusDateText}>
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.bottomBorder}></div>
      <div className={styles.rightBorder}></div>
    </div>
  )
}
const FanArtCard = (props: { user: Users, entity: FanArt }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((x: RootState) => x.userReducer.value.user);
  const CardImg = (props: { img: string, alt: string }) => {
    return (
      <img alt={props.alt} className={styles.cardImage + " " + styles.userSelected} src={baseUrl + props.img} />
    )
  }
  return (
    <div>
      <div className={styles.topLeftBorder}></div>
      <div className={styles.leftBorder}></div>
      <div className={styles.listCard2} >
        <div className={styles.sliderContainer}>
          <div className={styles.sliderImages}>
            <CardImg alt={props.entity.description} img={props.entity.image} />
            <div className={styles.fanArtView + " " + styles.userSelected}>
              fan art’ı görüntülemek için tıkla
            </div>
          </div>
        </div>
        <div className={styles.listOptions}>
          <div className={styles.listOptionsLeft}>
            {
              props.user.id === userInfo.id &&
              <div className={styles.listOptionsLeft}>
                <div onClick={() => {
                  dispatch(handleOpenBackgroundBlur(true));
                  var deleteModals = {
                    text: "Silmek istiyor musunuz ?", isOpen: true,
                    handleDelete: async () => {
                      await deleteFanArt(props.entity.id);
                      dispatch(handleOpenBackgroundBlur(false));
                      var deleteModals = {
                        text: "",
                        isOpen: false,
                        handleDelete() { },
                        handleClose() { },
                      } as IDeleteModal;
                      dispatch(handleDeleteModal(deleteModals))
                    },
                    handleClose: () => {
                      dispatch(handleOpenBackgroundBlur(false));
                      var deleteModals = {
                        text: "",
                        isOpen: false,
                        handleDelete() { },
                        handleClose() { },
                      } as IDeleteModal;
                      dispatch(handleDeleteModal(deleteModals))
                    },
                  } as IDeleteModal;
                  dispatch(handleDeleteModal(deleteModals))
                }} className={styles.changeListButon}>
                  <FontAwesomeIcon color='rgba(255,255,255,0.20)' icon={faTrash} />
                </div>
              </div>
            }
          </div>
          <div className={styles.listOptionsRight + " " + styles.topWatchBorder}>
            <span className={styles.userSelected + " " + styles.statusDateText}>
              {new Date(props.entity.createTime).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.bottomBorder}></div>
      <div className={styles.rightBorder}></div>
    </div >
  )
}
const MemoFanArtCard = React.memo(FanArtCard);
const MemoReviewCard = React.memo(ReviewCard);
export { ReviewCard, FanArtCard, MemoFanArtCard, MemoReviewCard };