import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import MenuButon, { MenuList } from '../src/components/Buton';
import DownButon from '../src/components/DownButon';
import Header from '../src/components/Header';
import MenuContainer from '../src/components/MenuContainer';
import styles from '../styles/Home.module.css';
import Line from '../src/components/Line';

import { faAngleDown, faAngleLeft, faAngleRight, faComment, faFilter, faSearch, faShuffle, faThumbsUp, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../src/store';
import { baseUrl, getCategories, getDiscovers, getSearchAnimeAndManga } from '../src/utils/api';
import { Anime, AnimeAndMangaModels, AnimeFilter, AnimeModels, Categories, DiscoverModels, FanArt, Manga, MangaFilter, MangaModels, Type, VideoType } from '../src/types/Entites';
import LoadingScreen from '../src/components/LoadingScreen';
import { MemoFanArtCard, MemoReviewCard } from '../src/components/Card';
import ReadMore from '../src/components/ReadMore';
import { handleOpenBackgroundBlur, handleOpenDiscoveryReviesModal } from '../src/store/features/modalReducer';
import Loading from '../src/components/Loading';
import { DiscoverSearchContainerCard, SearchResultCard } from '../src/components/SearchResultCard';
import { setDiscoveryReview } from '../src/store/features/userReducer';
import FilterModal from '../src/components/FilterModal';
import { setAnimeFilter } from '../src/store/features/animeReducer';
import { setMangaFilter } from '../src/store/features/mangaReducer';

export default function Discover() {
  const dispatch = useDispatch();
  const backgroundBlur = useSelector((x: RootState) => x.modalReducer.value.backgroundBlur);
  const { user, discoveryReview } = useSelector((x: RootState) => x.userReducer.value);
  const [selectedMenu, setSelectedMenu] = useState<MenuList>("Anime");
  const [selectedTab, setSelectedTab] = useState<"Review" | "Fanart">("Review");
  const [animeList, setAnimeList] = useState<DiscoverModels>({} as DiscoverModels);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Array<Categories>>([]);
  const [categoryIsOpen, setCategoryIsOpen] = useState<'show' | 'hide'>('hide');
  const [typeIsOpen, setTypeIsOpen] = useState<'show' | 'hide'>('hide');

  const [search, setSearch] = useState('');

  const [selectedAnimeWeekIndex, setSelectedAnimeWeekIndex] = useState(0);
  const [selectedMangaWeekIndex, setSelectedMangaWeekIndex] = useState(0);
  const { animeFilter } = useSelector((x: RootState) => x.animeReducer);
  const { mangaFilter } = useSelector((x: RootState) => x.mangaReducer);
  const [searchResult, setSearchResult] = useState<Array<AnimeAndMangaModels>>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchShow, setSearchShow] = useState(false);

  const [selectedSearchResult, setSelectedSearchResult] = useState<AnimeAndMangaModels>({} as AnimeAndMangaModels);
  const [filterModalIsShow, setFilterModalIsShow] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    loadData();
    setSearch('');
    setSearchShow(false);
  }, [selectedMenu]);
  const loadData = async () => {
    setLoading(true);
    loadDiscover();
    loadCategories();
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }
  useEffect(() => {
    setLoading(true);
    loadDiscover();
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [pageNo])

  const loadDiscover = async () => {
    setAnimeList({} as DiscoverModels);
    await getDiscovers(selectedMenu === 'Anime' ? 1 : 0, pageNo === 0 ? 1 : pageNo, 48).then((res) => {
      setAnimeList(res.data.entity);
      if (res.data.entity.reviews.length === 0 && res.data.entity.fanArts.length === 0) {
        setPageNo(0)
      }
    }).catch((er) => {
      console.log(er);
    });
  }
  const loadCategories = async () => {
    await getCategories().then((res) => {
      setCategories(res.data.list);
    })
  }
  const Top100Card = (props: { anime?: AnimeModels, manga?: MangaModels }) => {
    return (
      <div className={styles.top100Card}>
        <div className={styles.top100Img}>
          <img height={53} width={43} src={"/movieImg.png"} />
        </div>
        <div className={styles.topBody}>
          <span>{
            props.anime ? props.anime.anime.animeName : props.manga ? props.manga.manga.name : ''
          }</span>
          <span className={styles.topViewCount}>
            {props.anime ? props.anime.viewsCount : props.manga ? props.manga.viewsCount : 0} görüntülenme
          </span>
        </div>
        <div className={styles.topNumber}>
          <h1>1</h1>
        </div>
      </div>
    )
  }
  const handleSearch = async (e: string) => {
    setSearch(e);
    if (e.length >= 1) {
      setSearchShow(true);
      setSearchLoading(true);
      await getSearchAnimeAndManga(e).then((res) => {
        setSearchResult(res.data.list);
      }).catch((er) => {
        console.log(er);
      });
      setSearchLoading(false);
    } else {
      setSelectedSearchResult({} as AnimeAndMangaModels);
      dispatch(setDiscoveryReview({}));
      setSearchLoading(false);
      setSearchResult([]);
      setSearchShow(false);
    }
  }
  return (
    <LoadingScreen loading={loading}>
      <div className={styles.archiveBackground}>
        <Head>
          <title>Keşfet</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
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
                <div className={styles.headerSuffleButon}>
                  <MenuButon onClick={() => setPageNo(pageNo + 1)} width='45px' icon={faShuffle} />
                </div>
                <MenuButon id='shuffleButon' onClick={() => setPageNo(pageNo + 1)} icon={faShuffle} />
                <MenuButon id="headerFilterButon" onClick={() => setFilterModalIsShow(true)} marginright='0px' width='45px' icon={faFilter} />
                <div className={styles.discoverSearchContainer}>
                  <div className={styles.searchIcon}>
                    <FontAwesomeIcon fontSize={14} icon={faSearch} color={"rgba(255,255,255,0.50)"} />
                  </div>
                  <input
                    onFocus={() => {
                      setSearchShow(true);
                      dispatch(handleOpenBackgroundBlur(true));
                    }} type={"text"} value={search} onChange={(e) => {
                      handleSearch(e.target.value)
                    }} />
                  {searchShow && <div className={styles.discoverSearchResultContainer}>
                    {
                      searchLoading ? <Loading />
                        :
                        searchResult.map((item) => {
                          return <DiscoverSearchContainerCard onClick={() => {
                            setSearchShow(false);
                            setSelectedSearchResult(item);
                            dispatch(setDiscoveryReview(item));
                            setSearch(item.name);
                            dispatch(handleOpenBackgroundBlur(false));
                          }} key={item.id} entity={item} />
                        })
                    }
                  </div>}
                </div>
              </div>
              <div className={styles.rightMenuContainer}>
                <DownButon onClick={() => {
                  if (Object.keys(discoveryReview).length !== 0) {
                    setFilterModalIsShow(false);
                    dispatch(handleOpenBackgroundBlur(true));
                    dispatch(handleOpenDiscoveryReviesModal(true));
                  }
                }} type="buton" icon={faAngleDown} name='Oluştur' />
                <DownButon
                  onClick={() => {
                    if (animeFilter.order === 'AZ') {
                      dispatch(setAnimeFilter({ ...animeFilter, order: null } as AnimeFilter))
                    }
                    else {
                      dispatch(setAnimeFilter({ ...animeFilter, order: 'AZ' } as AnimeFilter))
                    }
                  }}
                  type="buton" isactive={animeFilter.order !== null ? 'show' : 'hide'} icon={faAngleDown} name='Tarih' />
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
                <DownButon
                  onClick={() => {
                    if (animeFilter.point === 1) {
                      dispatch(setAnimeFilter({ ...animeFilter, point: 0 } as AnimeFilter))
                    }
                    else {
                      dispatch(setAnimeFilter({ ...animeFilter, point: 1 } as AnimeFilter))
                    }
                  }}
                  type="buton" isactive={animeFilter.point === 0 ? "show" : "hide"} icon={faAngleDown} name='Popülerite' />
              </div>
            </MenuContainer>
            <div className={styles.discoverContainer}>
              <div className={styles.discoverLeft}>
                <div onClick={() => setSelectedTab('Review')} className={styles.discoverReview}>
                  <img src='/Layout.png' />
                </div>
                <div className={styles.discoverDivider}>
                  <span></span>
                </div>
                <div onClick={() => setSelectedTab('Fanart')} className={styles.discoverFanArt}>
                  <img src='/Palette.svg' />
                </div>
              </div>
              <div className={styles.discoverMiddle}>
                {
                  selectedTab === 'Fanart' ?
                    animeList.fanArts !== undefined &&
                    animeList.fanArts.sort((a, b) => {
                      return -1;
                    }).filter((y) => {
                      return y;
                    }).map((item) => {
                      return <MemoFanArtCard handleDataChange={(data: any) => setAnimeList({ ...animeList, fanArts: animeList.fanArts.map((i) => i.id === data.id ? data : i) } as any)} entity={item as any} key={item.id} />
                    })
                    :
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                      {
                        animeList.reviews != null &&
                        animeList.reviews.sort((a, b) => {
                          if (animeFilter.order === 'AZ') {
                            return b.id - a.id;
                          }
                          else {
                            if (animeFilter.point === 0) {
                              return a.likes.length - b.likes.length;
                            }
                            else {
                              return a.id - b.id;
                            }
                          }
                        }).filter((y) => {
                          if (selectedMenu === 'Anime') {
                            if (Object.keys(selectedSearchResult).length !== 0) {
                              if (selectedSearchResult.id === y.anime.id && selectedSearchResult.type === Type.Anime) {
                                if (animeFilter.type === 0) {
                                  return y;
                                }
                                else {
                                  if (animeFilter.type === y.anime.videoType) {
                                    return y;
                                  }
                                }
                              }
                            }
                            if (animeFilter.category.id !== 0) {
                              let check = y.categories.find((y) => y.id == animeFilter.category.id);
                              if (check) {
                                if (animeFilter.type === 0) {
                                  return y;
                                }
                                else {
                                  if (animeFilter.type === y.anime.videoType) {
                                    return y;
                                  }
                                }
                              }
                            }
                            else {
                              if (animeFilter.type === 0) {
                                return y;
                              }
                              else {
                                if (animeFilter.type === y.anime.videoType) {
                                  return y;
                                }
                              }
                            }
                          }
                          else {
                            return y;
                          }
                        }).map((item) => {
                          return <MemoReviewCard handleDataChange={(data: any) => setAnimeList({ ...animeList, reviews: animeList.reviews.map((i) => i.id === data.id ? data : i) } as any)} key={item.id} user={user} item={item as any} />
                        })
                      }
                    </div>
                }

              </div>
              <div className={styles.discoverRight}>
                {
                  selectedMenu === 'Anime' ?
                    animeList.movieTheWeeks !== undefined && animeList.movieTheWeeks.length !== 0 &&
                    <div className={styles.weekAnime}>
                      <div className={styles.weekAnimeHeader}>
                        <h3>Haftanın Animesi</h3>
                        <Line />
                      </div>
                      {
                        animeList.movieTheWeeks.map((item, index) => {
                          return index === selectedAnimeWeekIndex && <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                            key={index}>
                            <div className={styles.weekAnimeBody}>
                              {item.anime !== null && <a href={'/anime/' + item.anime.seoUrl}><img alt={item.anime.animeName} className={styles.leftImage} height="100" width="80" src={item.anime.img} /></a>}
                              {
                                item.anime !== null && <ReadMore>{item.anime.animeDescription}</ReadMore>
                              }
                            </div>
                            <div className={styles.weekAnimeFooter}>
                              <div style={{ marginLeft: '10px', display: 'flex' }}>
                                {selectedAnimeWeekIndex !== 0 && <div
                                  onClick={() => {
                                    setSelectedAnimeWeekIndex(selectedAnimeWeekIndex - 1);
                                  }}
                                  style={{ padding: '0px 5px', cursor: 'pointer' }}>
                                  <FontAwesomeIcon icon={faAngleLeft} />
                                </div>}
                                {selectedAnimeWeekIndex !== animeList.movieTheWeeks.length - 1 && <div onClick={() => {
                                  setSelectedAnimeWeekIndex(selectedAnimeWeekIndex + 1);
                                }} style={{ padding: '0px 5px', cursor: 'pointer' }}>
                                  <FontAwesomeIcon icon={faAngleRight} />
                                </div>}
                              </div>
                              {
                                item.users.userName
                              }
                            </div>
                          </div>
                        })
                      }
                    </div>
                    :
                    animeList.movieTheWeeks !== undefined && animeList.movieTheWeeks.length !== 0 &&
                    <div className={styles.weekAnime}>
                      <div className={styles.weekAnimeHeader}>
                        <h3>Haftanın Mangası</h3>
                        <Line />
                      </div>
                      {
                        animeList.movieTheWeeks.map((item, index) => {
                          return index === selectedMangaWeekIndex && <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                            key={index}>
                            <div className={styles.weekAnimeBody}>
                              {item.manga != null && <a href={'/manga/' + item.manga.seoUrl}><img alt={item.manga.name} className={styles.leftImage} height="100" width="80" src={item.manga.image} /></a>}
                              {item.manga != null && item.manga.description}
                            </div>
                            <div className={styles.weekAnimeFooter}>
                              <div style={{ marginLeft: '10px', display: 'flex' }}>
                                {selectedMangaWeekIndex !== 0 && <div
                                  onClick={() => {
                                    setSelectedAnimeWeekIndex(selectedMangaWeekIndex - 1);
                                  }}
                                  style={{ padding: '0px 5px', cursor: 'pointer' }}>
                                  <FontAwesomeIcon icon={faAngleLeft} />
                                </div>}
                                {selectedMangaWeekIndex !== animeList.movieTheWeeks.length - 1 && <div onClick={() => {
                                  setSelectedAnimeWeekIndex(selectedMangaWeekIndex + 1);
                                }} style={{ padding: '0px 5px', cursor: 'pointer' }}>
                                  <FontAwesomeIcon icon={faAngleRight} />
                                </div>}
                              </div>
                              {
                                item.users.userName
                              }
                            </div>
                          </div>
                        })
                      }
                    </div>
                }
                <div className={styles.top100}>
                  <div className={styles.top100Header}>
                    <h3>Top 100</h3>
                    <Line />
                  </div>
                  <div className={styles.top100Body}>
                    {
                      selectedMenu === 'Anime' ?
                        animeList.topAnimes != undefined &&
                        animeList.topAnimes.map((item, key) => {
                          return <Top100Card anime={item} key={key} />
                        })
                        :
                        animeList.topMangas != undefined &&
                        animeList.topMangas.map((item, key) => {
                          return <Top100Card key={key} manga={item} />
                        })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {filterModalIsShow && <FilterModal onClick={() => {
          dispatch(handleOpenBackgroundBlur(false));
          setFilterModalIsShow(false);
        }}>
          <div className={styles.discoverFilterSearchContainer}>
            <div style={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
              <div className={styles.searchIcon}>
                <FontAwesomeIcon fontSize={14} icon={faSearch} color={"rgba(255,255,255,0.50)"} />
              </div>
              <input
                onFocus={() => {
                  setSearchShow(true);
                  dispatch(handleOpenBackgroundBlur(true));
                }} type={"text"} value={search} onChange={(e) => {
                  handleSearch(e.target.value)
                }} />
              <div className={styles.discoverFilterCreateButon} onClick={() => {
                if (Object.keys(discoveryReview).length !== 0) {
                  setFilterModalIsShow(false);
                  dispatch(handleOpenBackgroundBlur(true));
                  dispatch(handleOpenDiscoveryReviesModal(true));
                }
              }}>
                Oluştur
              </div>
            </div>
            {searchShow && <div className={styles.discoverFilterSearchResultContainer}>
              {
                searchLoading ? <Loading />
                  :
                  searchResult.map((item) => {
                    return <DiscoverSearchContainerCard onClick={() => {
                      setSearchShow(false);
                      setSelectedSearchResult(item);
                      dispatch(setDiscoveryReview(item));
                      setSearch(item.name);
                      dispatch(handleOpenBackgroundBlur(false));
                    }} key={item.id} entity={item} />
                  })
              }
            </div>}
          </div>
          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
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
                className={styles.listButons + " " + styles.userSelected + " "}>Tümü</div>
              {
                categories.length !== 0 &&
                categories.map((item) => {
                  return <div
                    onClick={() => {

                    }}
                    key={item.id} className={styles.listButons + " " + styles.userSelected + " "}>{item.name}</div>
                })
              }
            </DownButon>
          </div>
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

              }} className={styles.listButons + " " + styles.userSelected + " "}>Tümü</div>
              <div onClick={() => {

              }} className={styles.listButons + " " + styles.userSelected + " "}>Film</div>
              <div onClick={() => {

              }} className={styles.listButons + " " + styles.userSelected + " "}>Dizi</div>
            </DownButon>
          </div>
          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <DownButon type="buton" icon={faAngleDown} name='Popülerite' />
          </div>
          <DownButon type="buton" icon={faAngleDown} name='Tarih' />
        </FilterModal>}
      </div>
    </LoadingScreen >
  )
}
