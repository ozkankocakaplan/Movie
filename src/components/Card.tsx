import React, { memo, useEffect } from 'react'
import { faComment, faEdit, faThumbsUp, faTrash, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Comments, FanArt, Like, Review, ReviewsModels, Type, UserFullModels, Users } from '../types/Entites';

import styles from '../../styles/Home.module.css';
import { baseUrl, deleteComment, deleteFanArt, deleteLike, deleteReview, getLike, postLike } from '../utils/api';
import { IDeleteModal, handleDeleteModal, handleOpenBackgroundBlur, handleOpenEditReviews } from '../store/features/modalReducer';
import { setSelectedReview } from '../store/features/animeReducer';
import { setViewUser } from '../store/features/userReducer';
import { setCommentLike, setCommentLikes, setComments } from '../store/features/commentsReducer';
const ReviewCard = (props: { user: Users, item: ReviewsModels }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((x: RootState) => x.userReducer.value.user);
  const viewUser = useSelector((x: RootState) => x.userReducer.value.viewUser);
  const CardImg = (props: { image: string }) => {
    return (
      <img className={styles.cardImage + " " + styles.userSelected} src={props.image} />
    )
  }
  return (
    <div>
      <div className={styles.topLeftBorder}></div>
      <div className={styles.leftBorder}></div>
      <div className={styles.listCard2}>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderImages}>
            {props.item.type === Type.Anime ? <CardImg image={baseUrl + props.item.anime.img} /> : <CardImg image={baseUrl + props.item.manga.image} />}
            <div className={styles.reviewView + " " + styles.userSelected}>
              {props.item.message}
            </div>
          </div>
        </div>
        <div className={styles.listOptions}>
          <div className={styles.listOptionsLeft}>
            {
              props.user.id === userInfo.id && Object.keys(props.user).length !== 0 &&
              <div className={styles.listOptionsLeft}>
                <div onClick={() => {
                  dispatch(setSelectedReview(props.item));
                  dispatch(handleOpenBackgroundBlur(true));
                  dispatch(handleOpenEditReviews(true));
                }} className={styles.addListButon}>
                  <FontAwesomeIcon color='rgba(255,255,255,0.20)' icon={faEdit} />
                </div>
                <div
                  onClick={() => {
                    dispatch(handleOpenBackgroundBlur(true));
                    var deleteModals = {
                      text: "Silmek istiyor musunuz ?", isOpen: true,
                      handleDelete: async () => {
                        await deleteReview(props.item.id);
                        dispatch(setViewUser({
                          ...viewUser,
                          reviews: viewUser.reviews.filter((y) => y.id !== props.item.id)
                        } as UserFullModels));
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
                  }}
                  className={styles.changeListButon}>
                  <FontAwesomeIcon color='rgba(255,255,255,0.20)' icon={faTrash} />
                </div>
              </div>
            }
          </div>
          <div className={styles.listOptionsRight + " " + styles.topWatchBorder}>
            <span className={styles.userSelected + " " + styles.statusDateText}>
              {new Date(props.item.createTime).toLocaleDateString()}
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
  const viewUser = useSelector((x: RootState) => x.userReducer.value.viewUser);
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
                      dispatch(setViewUser({
                        ...viewUser,
                        fanArts: viewUser.fanArts.filter((y) => y.id !== props.entity.id)
                      } as UserFullModels))
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
const CommentCard = (props: { item: Comments }) => {
  const dispatch = useDispatch();
  const user = useSelector((x: RootState) => x.userReducer.value.user);
  const { commentLikes, comments } = useSelector((x: RootState) => x.commentReducer);
  useEffect(() => {
    loadLike();
  }, [])
  const loadLike = async () => {
    await getLike(props.item.id, Type.Comment).then((res) => {
      if (res.data.entity != null) {
        dispatch(setCommentLike(res.data.entity));
      }
    });
  }
  const likeButon = async () => {
    var check = commentLikes.find((y) => y.contentID === props.item.id);
    if (check === undefined) {
      await postLike({ contentID: props.item.id, userID: user.id, type: Type.Comment } as Like).then((res) => {
        if (res.data.entity != null) {
          dispatch(setCommentLike(res.data.entity));
        }
      });

    }
    else {
      await deleteLike(props.item.id, Type.Comment);
      dispatch(setCommentLikes(commentLikes.filter((y) => y.id !== check?.id)))
    }
  }
  const deleteButon = async () => {
    await deleteComment(props.item.id, Type.Anime);
    dispatch(setComments(comments.filter((y) => y.id !== props.item.id)))
  }
  return (
    <div className={styles.fanArtContainer + " " + styles.commentsCard}>
      <div className={styles.fanArtContainerImg}>
        <div className={styles.fanArtImg}>
          <div className={styles.shareUserName}><a>{props.item.users.userName}</a></div>
          <img src={baseUrl + props.item.users.image} />
        </div>
        <div className={styles.ImgDivider}></div>
      </div>
      <div className={styles.fanArtBody}>
        {
          props.item.comment
        }
      </div>
      <div className={styles.fanArtRight}>
        <div style={{ paddingRight: '10px' }}>
          <div className={styles.ImgDivider}></div>
        </div>
        <div>
          <div className={styles.fanArtIconButons}>
            <FontAwesomeIcon fontSize={15} color='rgba(255, 255, 255, 0.50)' icon={faWarning} />
          </div>
          <div onClick={async () => {
            likeButon();
          }} className={styles.fanArtIconButons}>
            <FontAwesomeIcon fontSize={15}
              color={commentLikes.find((y) => y.contentID === props.item.id) === undefined ? 'rgba(255, 255, 255, 0.50)' : 'rgb(253, 188, 11)'}
              icon={faThumbsUp} />
          </div>
          {props.item.userID === user.id && <div onClick={deleteButon} className={styles.fanArtIconButons}>
            <FontAwesomeIcon fontSize={15} color='rgba(255, 255, 255, 0.50)' icon={faTrash} />
          </div>}
        </div>
      </div>
    </div>
  )
}
const MemoFanArtCard = React.memo(FanArtCard);
const MemoReviewCard = React.memo(ReviewCard);
const MemoCommentCard = React.memo(ReviewCard);
export { ReviewCard, FanArtCard, MemoFanArtCard, MemoReviewCard, MemoCommentCard, CommentCard };