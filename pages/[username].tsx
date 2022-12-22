import React, { useEffect, useRef, useState } from 'react'
import { faAddressCard, faAngleLeft, faAngleRight, faBan, faBorderAll, faEdit, faEnvelope, faPersonCircleExclamation, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { MemoFanArtCard, MemoReviewCard } from '../src/components/Card';
import { useAuth } from '../src/hooks/useAuth';
import { RootState } from '../src/store';
import { handleOpenAboutModal, handleOpenAddListItemModal, handleOpenAddListModal, handleOpenBackgroundBlur, handleOpenBlockModal, handleOpenComplaintModal, handleOpenEditDynamicListModal, handleOpenEditListItemModal, handleOpenEditListModal, handleOpenEditUserModal, handleOpenMessageModal, handleOpenRosetteModal } from '../src/store/features/modalReducer';
import { Anime, AnimeList, AnimeListModels, AnimeStatus, Manga, MangaList, MangaListModels, MangaStatus, Rosette, Type, UserFullModels, UserList, UserListModels, Users } from '../src/types/Entites';

import LoadingScreen from '../src/components/LoadingScreen';
import ServiceResponse from '../src/types/ServiceResponse';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { setIsUserBlock, setSelectedRosette, setUserMessageSend, setViewUser } from '../src/store/features/userReducer';
import { baseUrl, getUserBlockList, getSearchUserByID } from '../src/utils/api';
import { setEditAnimeList, setEditMangaList, setSelectedAnimeListType, setSelectedList, setSelectedMangaListType } from '../src/store/features/listReducer';

export async function getServerSideProps(context: any) {
  const { params } = context;
  var data = null;
  try {
    const response = await fetch(baseUrl + "/getUserBySeoUrl/" + params.username);
    data = await response.json() as ServiceResponse<UserFullModels>;
  } catch (error) {

  }

  return {
    props: {
      serviceResponse: data
    }
  }

}

export default function Profile(props: { serviceResponse: ServiceResponse<UserFullModels> }) {
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const userInfo = useSelector((x: RootState) => x.userReducer.value.user);
  const userProfile = useSelector((x: RootState) => x.userReducer.value.viewUser);
  const [loggedUser, setLoggedUser] = useState({} as Users);
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();
  useEffect(() => {
    document.body.style.backgroundColor = "#161616";
    if (props.serviceResponse === null) {
      navigate.push("/")
    }
    else {
      dispatch(setViewUser(props.serviceResponse.entity));
      setLoggedUser(user);
      if (userInfo.id !== undefined) {
        if (userInfo.id !== props.serviceResponse.entity.user.id) {
          loadBlockInfo();
        }
      }
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [user]);
  const loadBlockInfo = async () => {
    await getUserBlockList(userInfo.id, props.serviceResponse.entity.user.id).then((res) => {
      var check = res.data.list.find((y) => y.blockID === userInfo.id && y.isBlocked == true)
      if (check === undefined) {
        dispatch(setIsUserBlock(true))
      }
      else {
        navigate.push("/")
      }
    }).catch((er) => {
      console.log(er)
    });
  }
  if (loggedUser !== null) {
    const LeftContent = () => {
      return (
        <div className={styles.listHeader}>
          <div className={styles.rosetteContainer}>
            {
              userProfile.rosettes.map((item, index) => {
                return <RosetteCard key={index} onClick={() => {
                  dispatch(setSelectedRosette(item.rosette));
                  dispatch(handleOpenBackgroundBlur(true));
                  dispatch(handleOpenRosetteModal(true));
                }} source={item.rosette.img} />
              })
            }
          </div>
          <div className={styles.listContainer}>
            <div className={styles.listHeaderTitle + " " + styles.userSelected}>
              <h1 onClick={() => {
                dispatch(handleOpenBackgroundBlur(true));
                dispatch(handleOpenAddListModal(true));
              }}>Listeler</h1>
            </div>
            <div className={styles.listBody}>
              <Slider listType='STATIC' data={userProfile.animeListModels.filter((y) => y.animeList.animeStatus === AnimeStatus.IWatched)} user={userProfile.user} listName="İzledim" />
              <Slider listType='STATIC' data={userProfile.animeListModels.filter((y) => y.animeList.animeStatus === AnimeStatus.Watching)} user={userProfile.user} listName="İzliyorum" />
              <Slider listType='STATIC' data={userProfile.animeListModels.filter((y) => y.animeList.animeStatus === AnimeStatus.IWillWatch)} user={userProfile.user} listName="İzleyeceğim" />
              <Slider listType='STATIC' data={userProfile.mangaListModels.filter((y) => y.mangaList.status === MangaStatus.IRead)} user={userProfile.user} listName="Okudum" />
              <Slider listType='STATIC' data={userProfile.mangaListModels.filter((y) => y.mangaList.status === MangaStatus.Reading)} user={userProfile.user} listName="Okuyorum" />
              <Slider listType='STATIC' data={userProfile.mangaListModels.filter((y) => y.mangaList.status === MangaStatus.IWillRead)} user={userProfile.user} listName="Okuyacağım" />
              {
                userProfile.userLists.map((item) => {
                  return <Slider userList={item} entity={userProfile.userListModels.filter((y) => y.listID == item.id)} key={item.id} listType='DYNAMIC' data={[]} user={userProfile.user} listName={item.listName} />
                })
              }
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
            <div className={styles.profileInfo + " " + styles.userSelected}>{userProfile.user.userName}</div>
            <div className={styles.profileOptions}>
              {
                userInfo.id === userProfile.user.id && <div onClick={() => {
                  dispatch(handleOpenBackgroundBlur(true))
                  dispatch(handleOpenEditUserModal(true))
                }} className={styles.optionsIcon}><FontAwesomeIcon icon={faEdit} /></div>
              }
              {
                userInfo.id !== userProfile.user.id && <>
                  <div onClick={() => {
                    dispatch(handleOpenBackgroundBlur(true));
                    dispatch(handleOpenAboutModal(true));
                  }} className={styles.optionsIcon}><FontAwesomeIcon icon={faAddressCard} /></div>
                  {/* <div onClick={async () => {
                    await getSearchUserByID(userProfile.user.id).then((res) => {
                      console.log(res.data);
                      dispatch(setUserMessageSend(res.data.entity));
                      dispatch(handleOpenMessageModal(true));
                    })

                  }} className={styles.optionsIcon}><FontAwesomeIcon icon={faEnvelope} /></div> */}
                  <div onClick={() => {
                    dispatch(handleOpenBackgroundBlur(true))
                    dispatch(handleOpenBlockModal(true));
                  }} className={styles.optionsIcon}><FontAwesomeIcon icon={faBan} /></div>
                  <div
                    onClick={() => {
                      dispatch(handleOpenBackgroundBlur(true))
                      dispatch(handleOpenComplaintModal(true));
                    }}
                    className={styles.optionsIcon}><FontAwesomeIcon icon={faPersonCircleExclamation} /></div>
                </>
              }

              {userInfo.id === userProfile.user.id &&
                <div onClick={logout} className={styles.optionsIcon}><FontAwesomeIcon icon={faRightFromBracket} /></div>
              }
            </div>
          </div>
          <div className={styles.statusContainer}>
            <div className={styles.listHeaderTitle + " " + styles.userSelected}>
              <h1>Gönderiler</h1>
            </div>
            <div className={styles.listBody}>
              {
                userProfile.fanArts.length === 0 && userProfile.reviews.length === 0 ?
                  <div>
                    {/* <h2 className={styles["h2"]}>Gönderi bulunamadı</h2> */}
                  </div>
                  :
                  <div>
                    {
                      userProfile.fanArts.map((item) => {
                        return <MemoFanArtCard entity={item} key={item.id} />
                      })
                    }
                    {
                      userProfile.reviews.map((item) => {
                        return <MemoReviewCard item={item} key={item.id} user={userProfile.user} />
                      })
                    }
                  </div>
              }
            </div>
          </div>
        </div>
      )
    }
    return (
      <LoadingScreen loading={loading}>

        {
          userProfile !== null && Object.keys(userProfile).length !== 0 &&
          <div className={styles.pageContainer}>
            <div className={styles.profileHeaderContainer}>
              <div className={styles.profileHeader}>
                <div className={styles.userImg}>
                  <Link href={"/"}>
                    <a>
                      {
                        userProfile.user.image != null && userProfile.user.image.length !== 0 ?
                          <img src={baseUrl + userProfile.user.image} />
                          : <img src={"/logo.png"} />
                      }

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
        }

      </LoadingScreen>
    )
  }
  else {
    navigate.push("/")
  }
}






const Slider = (props: { user: Users, entity?: Array<UserListModels>, userList?: UserList, listName: string, data: Array<AnimeListModels | MangaListModels>, listType: 'DYNAMIC' | 'STATIC' }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((x: RootState) => x.userReducer.value.user);
  const { selectedList } = useSelector((x: RootState) => x.listReducer);
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
  const CardImg = (entity: AnimeListModels | MangaListModels | UserListModels) => {
    return (
      <img onClick={() => {
        if (props.listType === 'STATIC') {
          if (props.listName === "İzledim" || props.listName === "İzliyorum" || props.listName === "İzleyeceğim") {
            dispatch(setEditMangaList({} as MangaListModels));
            dispatch(setEditAnimeList(entity as AnimeListModels));
          }
          if (props.listName === "Okudum" || props.listName === "Okuyorum" || props.listName === "Okuyacağım") {
            dispatch(setEditAnimeList({} as AnimeListModels));
            dispatch(setEditMangaList(entity as MangaListModels));
          }
          dispatch(handleOpenBackgroundBlur(true));
          dispatch(handleOpenEditListItemModal(true));
        }
        else {
          var userListModel = entity as UserListModels;
          if (userListModel.type === Type.Anime) {
            var animeListModels = {
              ...userListModel,
              categories: userListModel.categories,
              animeSeasons: userListModel.animeSeasons,
              animeEpisodes: userListModel.animeEpisodes,
              anime: userListModel.anime
            } as AnimeListModels;
            dispatch(setEditMangaList({} as MangaListModels));
            dispatch(setEditAnimeList(animeListModels));
          }
          else {
            var mangaListModels = {
              ...userListModel,
              categories: userListModel.categories,
              mangaEpisodes: userListModel.mangaEpisodes,
              manga: userListModel.manga
            } as MangaListModels;
            dispatch(setEditAnimeList({} as AnimeListModels));
            dispatch(setEditMangaList(mangaListModels));
          }
          dispatch(handleOpenBackgroundBlur(true));
          dispatch(handleOpenEditDynamicListModal(true));
        }

      }} className={styles.cardImage + " " + styles.userSelected} src='/profileFavori.png' />
    )
  }
  return (
    <div>
      <div className={styles.topLeftBorder}></div>
      <div className={styles.leftBorder}></div>
      <div className={styles.listCard}>
        <div className={styles.sliderContainer}>
          {
            props.listType === 'STATIC' ?
              props.data.length !== 0 || props.entity && <div className={styles.sliderLeft}>
                <div style={{ padding: '5px', cursor: 'pointer' }} onClick={sliderBack}> <FontAwesomeIcon icon={faAngleLeft} color={"rgba(255,255,255,0.3)"} /></div>
              </div> :
              props.data.length !== 0 || props.entity?.length !== 0 && <div className={styles.sliderLeft}>
                <div style={{ padding: '5px', cursor: 'pointer' }} onClick={sliderBack}> <FontAwesomeIcon icon={faAngleLeft} color={"rgba(255,255,255,0.3)"} /></div>
              </div>
          }
          <div ref={scrollRef} className={styles.sliderImages}>
            {
              props.listType === 'STATIC' ?
                props.listName === "İzledim" || props.listName === "İzliyorum" || props.listName === "İzleyeceğim" ?
                  props.data.map((item) => {
                    var entity = item as AnimeListModels;

                    return <CardImg {...entity} key={entity.anime.id} />
                  })
                  :
                  props.data.map((item) => {
                    var entity = item as MangaListModels;
                    return <CardImg {...entity} key={entity.manga.id} />
                  })
                :
                props.entity &&
                props.entity.map((item) => {
                  if (item.type === Type.Anime) {
                    var animeEntity = item;
                    return <CardImg {...animeEntity} key={animeEntity.id} />
                  }
                  else {
                    var mangaEntity = item;
                    return <CardImg {...mangaEntity} key={mangaEntity.id} />
                  }

                })
            }
          </div>
          {
            props.listType === 'STATIC' ?
              props.data.length !== 0 || props.entity && <div className={styles.sliderRight}>
                <div style={{ padding: '5px', cursor: 'pointer' }} onClick={sliderNext}>
                  <FontAwesomeIcon icon={faAngleRight} color={"rgba(255,255,255,0.3)"} />
                </div>
              </div> :
              props.data.length !== 0 || props.entity?.length != 0 && <div className={styles.sliderRight}>
                <div style={{ padding: '5px', cursor: 'pointer' }} onClick={sliderNext}>
                  <FontAwesomeIcon icon={faAngleRight} color={"rgba(255,255,255,0.3)"} />
                </div>
              </div>}
        </div>
        <div className={styles.listOptions}>
          <div className={styles.listOptionsLeft}>
            {
              props.user.id === userInfo.id &&
              <div className={styles.listOptionsLeft}>
                <div onClick={() => {
                  dispatch(setSelectedAnimeListType(null));
                  dispatch(setSelectedMangaListType(null));
                  if (props.listType === 'STATIC') {
                    if (props.listName === "İzledim")
                      dispatch(setSelectedAnimeListType(AnimeStatus.IWatched));
                    if (props.listName === "İzliyorum")
                      dispatch(setSelectedAnimeListType(AnimeStatus.Watching));
                    if (props.listName === "İzleyeceğim")
                      dispatch(setSelectedAnimeListType(AnimeStatus.IWillWatch));
                    if (props.listName === "Okudum")
                      dispatch(setSelectedMangaListType(MangaStatus.IRead));
                    if (props.listName === "Okuyorum")
                      dispatch(setSelectedMangaListType(MangaStatus.Reading));
                    if (props.listName === "Okuyacağım")
                      dispatch(setSelectedMangaListType(MangaStatus.IWillRead));
                  }
                  else {
                    dispatch(setSelectedList(props.userList));
                  }
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
              if (props.listType === "DYNAMIC") {
                dispatch(setSelectedList(props.entity));
                dispatch(handleOpenBackgroundBlur(true));
                dispatch(handleOpenEditListModal(true));
              }
            }} style={{ cursor: 'pointer' }} className={styles.userSelected}>
              {props.listName}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.bottomBorder}></div>
      <div className={styles.rightBorder}></div>
    </div>
  )
}
interface IRosetteCardProps extends React.HTMLAttributes<HTMLDivElement> {
  source: string
}
const RosetteCard = (props: IRosetteCardProps) => {
  return (
    <div {...props} className={styles.rosette}><img src={props.source} /></div>
  )
}
