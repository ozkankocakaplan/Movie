import React, { memo, useEffect, useState } from 'react'
import { faComment, faEdit, faPaperPlane, faThumbsUp, faTrash, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Comments, ComplaintType, ContentComplaint, FanArtModel, Like, ReviewsModels, Type, UserFullModels, Users } from '../types/Entites';

import styles from '../../styles/Home.module.css';
import { deleteComment, deleteFanArt, deleteLike, deleteReview, getLike, postLike } from '../utils/api';
import { IDeleteModal, handleDeleteModal, handleOpenBackgroundBlur, handleOpenEditReviews, handleOpenContentComplaintModal, handleWarningModal } from '../store/features/modalReducer';
import { setSelectedReview } from '../store/features/animeReducer';
import { setContentComplaint, setSelectedImage, setViewUser } from '../store/features/userReducer';
import { setCommentLike, setCommentLikes, setComments } from '../store/features/commentsReducer';
import Line from './Line';
import SendComment from './SendComment';
const ReviewCard = (props: { user: Users, item: any, handleDataChange?: (data: any) => void }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((x: RootState) => x.userReducer.value.user);
  const viewUser = useSelector((x: RootState) => x.userReducer.value.viewUser);
  const [commentView, setCommentView] = useState(false);
  const CardImg = (props: { image: string }) => {
    return (
      <img className={styles.cardImage + " " + styles.userSelected} src={props.image} />
    )
  }
  const likeButon = async () => {
    if (Object.keys(userInfo).length !== 0) {
      var likes = props.item.likes as Array<Like>;
      var check = likes != null ? likes.find((y) => y.contentID === props.item.id) : undefined;
      if (check === undefined) {
        await postLike({ contentID: props.item.id, userID: userInfo.id, type: Type.Review } as Like).then((res) => {
          if (res.data.entity != null) {
            dispatch(setCommentLike(res.data.entity));
            if (props.handleDataChange) {
              let entity = props.item as ReviewsModels;
              props.handleDataChange({ ...entity, likes: [...entity.likes, res.data.entity] } as ReviewsModels)
            }
            else {
              dispatch(setViewUser({ ...viewUser, reviews: viewUser.reviews.map(item => item.id == props.item.id ? { ...item, likes: [...item.likes, res.data.entity] } : item) } as UserFullModels));
            }
          }
        }).catch((er) => {
          console.log(er);
        });

      }
      else {
        await deleteLike(props.item.id, Type.Review);
        if (props.handleDataChange) {
          var entity = props.item as ReviewsModels;
          props.handleDataChange({ ...entity, likes: entity.likes.filter((y) => y.id !== check?.id) } as ReviewsModels)
        }
        else {
          dispatch(setViewUser({ ...viewUser, reviews: viewUser.reviews.map(item => item.id == props.item.id ? { ...item, likes: likes.filter((y) => y.id !== check?.id) } : item) } as UserFullModels));
        }
        dispatch(setCommentLikes(likes.filter((y) => y.id !== check?.id)))
      }
    }
  }
  return (
    <div style={{ width: '100%' }}>
      <div className={styles.topLeftBorder}></div>
      <div className={styles.leftBorder}></div>
      <div className={styles.listCard2}>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderImages}>
            {props.item.type === Type.Anime ? <CardImg image={props.item.anime?.img != null ? props.item.anime.img : "/logo.png"} /> : <CardImg image={props.item.manga.image} />}
            <div style={{ flex: 1, display: 'flex' }} className={styles.userSelected + " " + styles.fdirectionColumn}>
              <div className={styles.reviewView + " " + styles.userSelected}>
                {props.item.message ? props.item.message : props.item.description}
              </div>
            </div>
            <div className={styles.options}>
              <div onClick={() => {
                if (userInfo !== undefined && Object.keys(userInfo).length !== 0) {
                  dispatch(handleOpenBackgroundBlur(true));
                  dispatch(setContentComplaint({ contentID: props.item.id, type: Type.Review, complaintType: props.item.type === Type.Anime ? ComplaintType.ContentAnime : ComplaintType.ContentManga } as ContentComplaint));
                  dispatch(handleOpenContentComplaintModal(true));
                }
                else {
                  dispatch(handleOpenBackgroundBlur(true));
                  dispatch(handleWarningModal({ isOpen: true, text: 'İçeriği şikayet etmek için giriş yapmalısınız' }))
                }

              }} className={styles.fanArtIconButons}>
                <FontAwesomeIcon fontSize={15} color='rgba(255, 255, 255, 0.50)' icon={faWarning} />
              </div>
              <div onClick={() => setCommentView(!commentView)} className={styles.fanArtIconButons}>
                <FontAwesomeIcon fontSize={15} color='rgba(255, 255, 255, 0.50)' icon={faComment} />
              </div>
              <div onClick={likeButon} className={styles.fanArtIconButons}>
                <FontAwesomeIcon fontSize={15}
                  color={props.item.likes !== undefined && props.item.likes !== null ? props.item.likes.find((y: any) => y.contentID === props.item.id && y.userID === userInfo.id) === undefined ? 'rgba(255, 255, 255, 0.50)' : 'rgb(253, 188, 11)' : 'rgba(255, 255, 255, 0.50)'}
                  icon={faThumbsUp} />
              </div>
            </div>
          </div>
        </div>
        {commentView && <div >
          <div className={styles.discoverCommentContainer}>
            {
              props.item.comments !== null && props.item.comments.length !== 0 &&
              props.item.comments.map((item: Comments) => {
                return <div key={item.id} className={styles.discoverComment + " " + styles.userSelected}>
                  <div className={styles.commentUser}>
                    {item.users.userName}
                  </div>
                  <Line />
                  <div>
                    {
                      item.comment
                    }
                  </div>
                </div>
              })
            }</div>

          <div className={styles.discoverComment + " " + styles.userSelected}>
            <SendComment contentID={props.item.id} type={Type.Review} handleData={(data: any) => {
              var entity = props.item as ReviewsModels;
              if (props.handleDataChange) {
                props.handleDataChange({ ...entity, comments: [...entity.comments, data] } as ReviewsModels)
              }
            }} />
          </div>
        </div>}

        <div className={styles.listOptions}>
          <div className={styles.listOptionsLeft}>
            {
              userInfo.id === props.item.userID && Object.keys(props.user).length !== 0 &&
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
const FanArtCard = (props: { entity: any, handleDataChange?: (data: any) => void }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((x: RootState) => x.userReducer.value.user);
  const viewUser = useSelector((x: RootState) => x.userReducer.value.viewUser);
  const [commentView, setCommentView] = useState(false);
  const CardImg = (props: { img: string, alt: string }) => {
    return (
      <picture><img alt={props.alt} className={styles.cardImage + " " + styles.userSelected} src={props.img} /></picture>
    )
  }
  const likeButon = async () => {
    if (Object.keys(userInfo).length !== 0) {
      var likes = props.entity.likes as Array<Like>;
      var check = likes.find((y) => y.contentID === props.entity.id);
      if (check === undefined) {
        await postLike({ contentID: props.entity.id, userID: userInfo.id, type: Type.FanArt } as Like).then((res) => {
          if (res.data.entity != null) {
            if (props.handleDataChange) {
              props.entity.likes = [...props.entity.likes, res.data.entity];
              props.handleDataChange(props.entity);
            }
          }
        }).catch((er) => {
          console.log(er);
        });

      }
      else {
        await deleteLike(props.entity.id, Type.FanArt);
        if (props.handleDataChange) {
          props.entity.likes = props.entity.likes.filter((y: any) => y.contentID !== props.entity.id && y.type === Type.FanArt);
          props.handleDataChange(props.entity);
        }
      }
    }
  }
  return (
    <div style={{ width: '100%' }}>
      <div className={styles.topLeftBorder}></div>
      <div className={styles.leftBorder}></div>
      <div className={styles.listCard2} >
        <div className={styles.sliderContainer}>
          <div className={styles.sliderImages}>
            <CardImg alt={props.entity.description} img={props.entity.users.image} />
            <div onClick={() => {
              dispatch(setSelectedImage(props.entity.image));
            }} className={styles.fanArtView + " " + styles.userSelected}>
              fan art’ı görüntülemek için tıkla
            </div>
            <div className={styles.options}>
              <div
                onClick={() => {

                  if (userInfo !== undefined && Object.keys(userInfo).length !== 0) {
                    dispatch(setContentComplaint({ contentID: props.entity.id, type: Type.FanArt, complaintType: props.entity.type === Type.Anime ? ComplaintType.ContentAnime : ComplaintType.ContentManga } as ContentComplaint));
                    dispatch(handleOpenBackgroundBlur(true));
                    dispatch(handleOpenContentComplaintModal(true));
                  }
                  else {
                    dispatch(handleOpenBackgroundBlur(true));
                    dispatch(handleWarningModal({ isOpen: true, text: 'İçeriği şikayet etmek için giriş yapmalısınız' }))
                  }
                }}
                className={styles.fanArtIconButons}>
                <FontAwesomeIcon fontSize={15} color='rgba(255, 255, 255, 0.50)' icon={faWarning} />
              </div>
              <div onClick={() => setCommentView(!commentView)}
                className={styles.fanArtIconButons}>
                <FontAwesomeIcon fontSize={15} color='rgba(255, 255, 255, 0.50)' icon={faComment} />
              </div>

              <div onClick={likeButon} className={styles.fanArtIconButons}>
                <FontAwesomeIcon fontSize={15}
                  color={props.entity.likes !== undefined && props.entity.likes.find((y: any) => y.contentID === props.entity.id && y.userID === userInfo.id) === undefined ? 'rgba(255, 255, 255, 0.50)' : 'rgb(253, 188, 11)'}
                  icon={faThumbsUp} />
              </div>
              {userInfo != null && userInfo.id !== props.entity.userID && props.entity && <div className={styles.fanArtIconButons}>
                <FontAwesomeIcon fontSize={15} color='rgba(255, 255, 255, 0.50)' icon={faTrash} />
              </div>}
            </div>
          </div>
        </div>
        {commentView && <div>
          <div className={styles.discoverCommentContainer}>
            {
              props.entity.comments !== null && props.entity.comments.length !== 0 &&
              props.entity.comments.map((item: Comments) => {
                return <div key={item.id} className={styles.discoverComment + " " + styles.userSelected}>
                  <div className={styles.commentUser}>
                    {item.users.userName}
                  </div>
                  <Line />
                  <div>
                    {
                      item.comment
                    }
                  </div>
                </div>
              })
            }
          </div>
          <div className={styles.discoverComment + " " + styles.userSelected}>
            <SendComment contentID={props.entity.id} type={Type.FanArt} handleData={(data: any) => {
              var entity = props.entity as FanArtModel;
              if (props.handleDataChange) {
                props.handleDataChange({ ...entity, comments: [...entity.comments, data] } as FanArtModel)
              }
            }} />
          </div>
        </div>}

        <div className={styles.listOptions}>
          <div className={styles.listOptionsLeft}>
            {
              props.entity.userID === userInfo.id &&
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
  const [isSpoiler, setIsSpoiler] = useState(props.item.isSpoiler);
  useEffect(() => {
    loadLike();
    setIsSpoiler(props.item.isSpoiler);
  }, [props.item])
  const loadLike = async () => {
    if (Object.keys(user).length !== 0) {
      await getLike(props.item.id, Type.Comment).then((res) => {
        if (res.data.entity != null) {
          dispatch(setCommentLike(res.data.entity));
        }
      });
    }
  }
  const likeButon = async () => {
    if (Object.keys(user).length !== 0) {
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

  }
  const deleteButon = async () => {
    if (Object.keys(user).length !== 0) {
      await deleteComment(props.item.id, Type.Anime);
      dispatch(setComments(comments.filter((y) => y.id !== props.item.id)))
    }
  }
  return (
    <div className={styles.fanArtContainer + " " + styles.commentsCard}>
      <div className={styles.fanArtContainerImg}>
        <div className={styles.fanArtImg}>
          <div className={styles.shareUserName}><a>{props.item.users.userName}</a></div>
          {
            props.item.users.image !== null && props.item.users.image.length !== 0 ?
              <img src={props.item.users.image} />
              :
              <img src={"/profilePhoto.png"} />
          }

        </div>
        <div className={styles.ImgDivider}></div>
      </div>
      <div className={styles.fanArtBody}>
        {
          !isSpoiler ?
            props.item.comment
            :
            <div onClick={() => setIsSpoiler(!isSpoiler)} className={styles.isSpoiler}>Spoiler alan görüntülemek için tıklayınız</div>

        }
      </div>
      <div className={styles.fanArtRight}>
        <div style={{ paddingRight: '10px' }}>
          <div className={styles.ImgDivider}></div>
        </div>
        <div>
          <div onClick={() => {
            dispatch(handleOpenBackgroundBlur(true));
            dispatch(setContentComplaint({ contentID: props.item.id, type: Type.Comment, complaintType: ComplaintType.Content } as ContentComplaint));
            dispatch(handleOpenContentComplaintModal(true));
          }} className={styles.fanArtIconButons}>
            <FontAwesomeIcon fontSize={15} color='rgba(255, 255, 255, 0.50)' icon={faWarning} />
          </div>
          <div onClick={async () => {
            likeButon();
          }} className={styles.fanArtIconButons}>
            <FontAwesomeIcon fontSize={15}
              color={commentLikes.find((y) => y.contentID === props.item.id && y.userID === user.id) === undefined ? 'rgba(255, 255, 255, 0.50)' : 'rgb(253, 188, 11)'}
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