import React, { useEffect, useState } from 'react'
import { faAngleDown, faAngleLeft, faBell, faClose, faComment, faFilter, faPlay, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import Head from 'next/head'
import MenuButon, { BorderButon, MenuList } from '../src/components/Buton'
import DownButon from '../src/components/DownButon'
import Header from '../src/components/Header'
import styles from '../styles/Home.module.css'
import ArchiveMovieCover from '../src/components/ArchiveMovieCover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Line from '../src/components/Line'
import MenuContainer from '../src/components/MenuContainer'
import { deleteContentNotification, getAnimes, getCategories, getMangas, postContentNotification } from '../src/utils/api'
import { AnimeFilter, AnimeModels, Categories, CategoryType, ContentNotification, MangaFilter, MangaModels, Status, Type, VideoType } from '../src/types/Entites'
import { useDispatch, useSelector } from 'react-redux'
import { setAnimeFilter, setAnimeModels, setSelectedAnimeModel } from '../src/store/features/animeReducer'
import { RootState } from '../src/store'
import { Info } from './anime/[url]'
import StarRating from '../src/components/StarRating'
import { setMangaFilter, setMangaModels, setSelectedMangaModel } from '../src/store/features/mangaReducer'
import { useRouter } from 'next/router'
import LoadingScreen from '../src/components/LoadingScreen'
import FilterModal from '../src/components/FilterModal'
import { CommentCard } from '../src/components/Card'
import { MangaDescriptionModal, MovieDescriptionModal } from '../src/components/DescriptionModal'
import { handleOpenBackgroundBlur, handleWarningModal } from '../src/store/features/modalReducer'


const Archive: NextPage = () => {
  const dispatch = useDispatch();


  const [movieInfoShow, setMovieInfoShow] = useState(false);
  const [mangaInfoShow, setMangaInfoShow] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuList>("Anime");
  const user = useSelector((x: RootState) => x.userReducer.value.user);
  const { animeModels, selectedAnimeModel, animeFilter } = useSelector((x: RootState) => x.animeReducer);
  const { mangaModels, selectedMangaModel, mangaFilter } = useSelector((x: RootState) => x.mangaReducer);
  const [typeIsOpen, setTypeIsOpen] = useState<'show' | 'hide'>('hide');
  const [ratingIsOpen, setRatingIsOpen] = useState<'show' | 'hide'>('hide');
  const [rating, setRating] = useState(1);

  const [categoryIsOpen, setCategoryIsOpen] = useState<'show' | 'hide'>('hide');
  const [categories, setCategories] = useState<Array<Categories>>([]);

  const [loading, setLoading] = useState(true);
  const [filterModalIsShow, setFilterModalIsShow] = useState(false);
  const [animePageNo, setAnimePageNo] = useState(1);
  const [mangaPageNo, setMangaPageNo] = useState(1);
  useEffect(() => {
    setLoading(true);
    setMovieInfoShow(false);
    if (selectedMenu === 'Anime') {
      loadAnimes();
    }
    else {
      loadMangas();
    }
    loadCategories();
    setLoading(false);
    return () => {
      setLoading(true);
    }
  }, [selectedMenu])
  useEffect(() => {
    setLoading(true);
    setMovieInfoShow(false);
    if (selectedMenu === 'Anime') {
      loadAnimes();
    }
    else {
      loadMangas();
    }
    setLoading(false);
    return () => {
      setLoading(true);
    }
  }, [animePageNo, mangaPageNo])


  const loadAnimes = async () => {
    await getAnimes(animePageNo === 0 ? 1 : animePageNo, 48).then((res) => {
      if (res.data.list.length === 0) {
        setAnimePageNo(0);
      }
      dispatch(setAnimeModels(res.data.list));
    }).catch((er) => {
      console.log(er);
    });
  }
  const loadMangas = async () => {
    await getMangas(mangaPageNo === 0 ? 1 : mangaPageNo, 48).then((res) => {
      if (res.data.list.length === 0) {
        setMangaPageNo(0)
      }
      dispatch(setMangaModels(res.data.list));
    })
  }
  const loadCategories = async () => {
    await getCategories().then((res) => {
      setCategories(res.data.list);
    })
  }
  return (
    <LoadingScreen loading={loading}>
      <div className={styles.archiveBackground}>
        <Head>
          <title>Arşiv</title>
        </Head>
        <Header
          search={'show'}
          notification={'hide'}
          style={{ backgroundColor: '#141414', marginTop: 0, padding: '5px' }} />
        <div className={styles.archiveContainer}>
          <div style={{ height: '100%' }}>
            <MenuContainer>
              <div className={styles.leftMenuContainer} >
                <MenuButon marginright='10px' onClick={() => setSelectedMenu('Anime')} isactive={selectedMenu == "Anime" ? "T" : "F"} name='Anime' />
                <MenuButon marginright='10px' onClick={() => setSelectedMenu('Manga')} isactive={selectedMenu == "Manga" ? "T" : "F"} name='Manga' />
                <MenuButon onClick={() => {
                  if (selectedMenu === 'Anime') {
                    setAnimePageNo(animePageNo + 1)
                  }
                  else {
                    setMangaPageNo(mangaPageNo + 1);
                  }
                }} width='45px' icon={faShuffle} />
                <MenuButon id="headerFilterButon" onClick={() => setFilterModalIsShow(true)} marginright='0px' width='45px' icon={faFilter} />
              </div>
              <div className={styles.rightMenuContainer}>
                <MenuButon marginright='10px' onClick={() => {
                  if (animeFilter.order === 'AZ') {
                    dispatch(setAnimeFilter({ ...animeFilter, order: null } as AnimeFilter))
                  }
                  else {
                    dispatch(setAnimeFilter({ ...animeFilter, order: 'AZ' } as AnimeFilter))
                  }
                }} isactive={animeFilter.order !== null ? "T" : "F"} name='A-Z' />
                <DownButon
                  show={categoryIsOpen} onClick={() => {
                    if (categoryIsOpen === "hide") {
                      setCategoryIsOpen('show')
                    }
                    else {
                      setCategoryIsOpen('hide')
                    }
                  }}
                  type="dropdown" icon={faAngleDown} name='Kategori'>
                  <div
                    onClick={() => {
                      if (selectedMenu === 'Anime') {
                        dispatch(setAnimeFilter({ ...animeFilter, category: { id: 0 } } as AnimeFilter));
                      }
                      else {
                        dispatch(setMangaFilter({ ...mangaFilter, category: { id: 0 } } as MangaFilter));
                      }
                      setCategoryIsOpen('hide')
                    }}
                    className={styles.listButons + " " + styles.userSelected + " " + (selectedMenu === 'Anime' ? animeFilter.category.id === 0 && styles.listButonsActive : mangaFilter.category.id === 0 && styles.listButonsActive)}>Tümü</div>
                  {
                    categories.length !== 0 &&
                    categories.map((item) => {
                      return <div
                        onClick={() => {
                          if (selectedMenu === 'Anime') {
                            dispatch(setAnimeFilter({ ...animeFilter, category: item } as AnimeFilter));
                          }
                          else {
                            dispatch(setMangaFilter({ ...mangaFilter, category: item } as MangaFilter));
                          }
                          setCategoryIsOpen('hide');
                        }}
                        key={item.id}
                        className={styles.listButons + " " + styles.userSelected + " " + (selectedMenu === 'Anime' ? animeFilter.category.id === item.id && styles.listButonsActive : mangaFilter.category.id === item.id && styles.listButonsActive)}>{item.name}</div>
                    })
                  }
                </DownButon>
                {selectedMenu === 'Anime' && <DownButon show={typeIsOpen} onClick={() => {
                  if (typeIsOpen === "hide") {
                    setTypeIsOpen('show')
                  }
                  else {
                    setTypeIsOpen('hide')
                  }
                }} type="dropdown" icon={faAngleDown} name='Tür'>
                  <div onClick={() => {
                    dispatch(setAnimeFilter({ ...animeFilter, type: 0 } as AnimeFilter))
                    setTypeIsOpen('hide');
                  }} className={styles.listButons + " " + styles.userSelected + " " + (animeFilter.type === 0 && styles.listButonsActive)}>Tümü</div>
                  <div onClick={() => {
                    dispatch(setAnimeFilter({ ...animeFilter, type: VideoType.AnimeMovie } as AnimeFilter))
                    setTypeIsOpen('hide');
                  }} className={styles.listButons + " " + styles.userSelected + " " + (animeFilter.type === VideoType.AnimeMovie && styles.listButonsActive)}>Film</div>
                  <div onClick={() => {
                    dispatch(setAnimeFilter({ ...animeFilter, type: VideoType.AnimeSeries } as AnimeFilter))
                    setTypeIsOpen('hide');
                  }} className={styles.listButons + " " + styles.userSelected + " " + (animeFilter.type === VideoType.AnimeSeries && styles.listButonsActive)}>Dizi</div>
                </DownButon>}
                <DownButon show={ratingIsOpen} onClick={() => {
                  if (ratingIsOpen === "hide") {
                    setRatingIsOpen('show')
                  }
                  else {
                    setRatingIsOpen('hide')
                  }
                }} type="dropdown" icon={faAngleDown} name='Puan'>
                  <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                    <StarRating rating={rating} handleRating={async (val: number) => {
                      if (selectedMenu === 'Anime') {
                        dispatch(setAnimeFilter({ ...animeFilter, point: val } as AnimeFilter));
                      }
                      else {
                        dispatch(setMangaFilter({ ...mangaFilter, point: val } as MangaFilter));
                      }
                      setRating(val);
                      setRatingIsOpen('hide');
                    }} />
                  </div>
                </DownButon>
              </div>
            </MenuContainer>
            <div className={styles.contentContainer}>
              {
                selectedMenu === 'Anime' ?
                  [...animeModels].sort((a, b) => {
                    if (animeFilter.order == 'AZ') {
                      if (a.anime.animeName < b.anime.animeName) {
                        return 1;
                      }
                      return -1;
                    }
                    return -1;

                  }).filter((y) => {
                    if (animeFilter.category.id !== 0) {
                      var check = y.categories.find((y) => y.categoryID === animeFilter.category.id);
                      if (check && animeFilter.point >= y.rating) {
                        if (animeFilter.type !== 0 && animeFilter.type === y.anime.videoType) {
                          return y;
                        }
                        else {
                          return y;
                        }
                      }
                      else {
                        if (animeFilter.type !== 0 && animeFilter.type === y.anime.videoType) {
                          return y;
                        }
                      }
                    }
                    else {
                      if (animeFilter.type != 0) {
                        if (animeFilter.type === y.anime.videoType) {
                          return y;
                        }
                      }
                      else {
                        return y;
                      }

                    }
                  }).map((item) => {
                    return <ArchiveMovieCover
                      alt={item.anime.animeName}
                      src={item.anime.img}
                      blur={Object.keys(selectedAnimeModel).length === 0 ? "1" : selectedAnimeModel.anime.id !== item.anime.id ? "0" : "1"}
                      onClick={() => {
                        if (user !== undefined && Object.keys(user).length !== 0) {
                          setMovieInfoShow(true)
                          dispatch(setSelectedAnimeModel(item));
                        }
                        else {
                          dispatch(handleOpenBackgroundBlur(true));
                          dispatch(handleWarningModal({ isOpen: true, text: 'İçeriği görüntülemek için giriş yapmalısınız' }));
                        }
                      }}
                      show={Object.keys(selectedAnimeModel).length != 0 && selectedAnimeModel.anime.id === item.anime.id ? "1" : undefined} key={item.anime.id} />
                  })
                  :
                  [...mangaModels].sort((a, b) => {
                    if (mangaFilter.order == 'AZ') {
                      if (a.manga.name < b.manga.name) {
                        return 1;
                      }
                      return -1;
                    }
                    return -1;

                  }).filter((y) => {
                    if (mangaFilter.category.id !== 0) {
                      var check = y.categories.find((y) => y.categoryID === mangaFilter.category.id);
                      if (check && mangaFilter.point >= y.rating) {
                        return y;
                      }
                      else {
                        if (check) {
                          return y;
                        }
                      }
                    }
                    else {
                      return y;
                    }
                  }).map((item) => {
                    return <ArchiveMovieCover
                      alt={item.manga.name}
                      src={item.manga.image}
                      blur={Object.keys(selectedMangaModel).length === 0 ? "1" : selectedMangaModel.manga.id !== item.manga.id ? "0" : "1"}
                      onClick={() => {
                        if (user !== undefined && Object.keys(user).length !== 0) {
                          setMangaInfoShow(true)
                          dispatch(setSelectedMangaModel(item));
                        }
                        else {
                          dispatch(handleOpenBackgroundBlur(true));
                          dispatch(handleWarningModal({ isOpen: true, text: 'İçeriği görüntülemek için giriş yapmalısınız' }));
                        }
                      }}
                      show={Object.keys(selectedMangaModel).length != 0 && selectedMangaModel.manga.id === item.manga.id ? "1" : undefined} key={item.manga.id} />
                  })
              }
            </div>
          </div>

        </div>
        {filterModalIsShow && <FilterModal onClick={() => setFilterModalIsShow(false)}>
          <DownButon
            show={categoryIsOpen} onClick={() => {
              if (categoryIsOpen === "hide") {
                setCategoryIsOpen('show')
              }
              else {
                setCategoryIsOpen('hide')
              }
            }}
            type="dropdown" icon={faAngleDown} name='Kategori'>
            <div
              onClick={() => {
                dispatch(setAnimeFilter({ ...animeFilter, category: { id: 0 } } as AnimeFilter));
                setCategoryIsOpen('hide');
              }}
              className={styles.listButons + " " + styles.userSelected + " " + (animeFilter.category.id === 0 && styles.listButonsActive)}>Tümü</div>
            {
              categories.length !== 0 &&
              categories.map((item) => {
                return <div
                  onClick={() => {
                    dispatch(setAnimeFilter({ ...animeFilter, category: item } as AnimeFilter))
                  }}
                  key={item.id} className={styles.listButons + " " + styles.userSelected + " " + (animeFilter.category.id === item.id && styles.listButonsActive)}>{item.name}</div>
              })
            }
          </DownButon>
          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <DownButon show={typeIsOpen} onClick={() => {
              if (typeIsOpen === "hide") {
                setTypeIsOpen('show')
              }
              else {
                setTypeIsOpen('hide')
              }
            }} type="dropdown" icon={faAngleDown} name='Tür'>
              <div onClick={() => {
                dispatch(setAnimeFilter({ ...animeFilter, type: 0 } as AnimeFilter))
              }} className={styles.listButons + " " + styles.userSelected + " " + (animeFilter.type === 0 && styles.listButonsActive)}>Tümü</div>
              <div onClick={() => {
                dispatch(setAnimeFilter({ ...animeFilter, type: VideoType.AnimeMovie } as AnimeFilter))
              }} className={styles.listButons + " " + styles.userSelected + " " + (animeFilter.type === VideoType.AnimeMovie && styles.listButonsActive)}>Film</div>
              <div onClick={() => {
                dispatch(setAnimeFilter({ ...animeFilter, type: VideoType.AnimeSeries } as AnimeFilter))
              }} className={styles.listButons + " " + styles.userSelected + " " + (animeFilter.type === VideoType.AnimeSeries && styles.listButonsActive)}>Dizi</div>
            </DownButon>
          </div>
          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <DownButon show={ratingIsOpen} onClick={() => {
              if (ratingIsOpen === "hide") {
                setRatingIsOpen('show')
              }
              else {
                setRatingIsOpen('hide')
              }
            }} type="dropdown" icon={faAngleDown} name='Puan'>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                <StarRating rating={rating} handleRating={async (val: number) => {
                  setRating(val);
                }} />
              </div>
            </DownButon>
          </div>
          <div style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '5px' }}>
            <MenuButon marginright='0px' onClick={() => {
              if (animeFilter.order === 'AZ') {
                dispatch(setAnimeFilter({ ...animeFilter, order: null } as AnimeFilter))
              }
              else {
                dispatch(setAnimeFilter({ ...animeFilter, order: 'AZ' } as AnimeFilter))
              }
            }} isactive={animeFilter.order !== null ? "T" : "F"} name='A-Z' />
          </div>
        </FilterModal>}
        {movieInfoShow && <MovieDescriptionModal handleCloseModal={() => setMovieInfoShow(false)} />}
        {mangaInfoShow && <MangaDescriptionModal handleCloseModal={() => setMangaInfoShow(false)} />}
      </div>
    </LoadingScreen>
  )
}
export default Archive;

