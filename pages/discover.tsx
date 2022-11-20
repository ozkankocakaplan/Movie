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
import { AnimeAndMangaModels, AnimeModels, Categories, DiscoverModels, FanArt, MangaModels, Type } from '../src/types/Entites';
import LoadingScreen from '../src/components/LoadingScreen';
import { MemoFanArtCard, MemoReviewCard } from '../src/components/Card';
import ReadMore from '../src/components/ReadMore';
import { handleOpenAddReviews, handleOpenBackgroundBlur, handleOpenDiscoveryReviesModal } from '../src/store/features/modalReducer';
import Loading from '../src/components/Loading';
import { DiscoverSearchContainerCard, SearchResultCard } from '../src/components/SearchResultCard';
import { setSelectedAnimeModel } from '../src/store/features/animeReducer';
import { setSelectedMangaModel } from '../src/store/features/mangaReducer';
import { setDiscoveryReview } from '../src/store/features/userReducer';
import FilterModal from '../src/components/FilterModal';

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

  const [searchResult, setSearchResult] = useState<Array<AnimeAndMangaModels>>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchShow, setSearchShow] = useState(false);

  const [selectedSearchResult, setSelectedSearchResult] = useState<AnimeAndMangaModels>({} as AnimeAndMangaModels);
  const [filterModalIsShow, setFilterModalIsShow] = useState(false);

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
  const loadDiscover = async () => {
    setAnimeList({} as DiscoverModels);
    await getDiscovers(selectedMenu === 'Anime' ? 1 : 0).then((res) => {
      setAnimeList(res.data.entity);
    }).catch((er) => {
      console.log(er);
    });
  }
  const loadCategories = async () => {
    await getCategories().then((res) => {
      setCategories(res.data.list);
    })
  }
  const Top100Card = () => {
    return (
      <div className={styles.top100Card}>
        <div className={styles.top100Img}>
          <img height={53} width={43} src={"http://localhost:3000/movieImg.png"} />
        </div>
        <div className={styles.topBody}>
          <span> Banana Fish</span>
          <span className={styles.topViewCount}>
            49817 görüntülenme
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
                  <MenuButon width='45px' icon={faShuffle} />
                </div>
                <MenuButon id='shuffleButon' icon={faShuffle} />
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
                <DownButon type="buton" icon={faAngleDown} name='Tarih' />
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
                <DownButon type="buton" icon={faAngleDown} name='Popülerite' />
              </div>
            </MenuContainer>
            <div className={styles.discoverContainer}>
              <div className={styles.discoverLeft}>
                <div onClick={() => setSelectedTab('Review')} className={styles.discoverReview}>
                  <img src='http://localhost:3000/Layout.png' />
                </div>
                <div className={styles.discoverDivider}>
                  <span></span>
                </div>
                <div onClick={() => setSelectedTab('Fanart')} className={styles.discoverFanArt}>
                  <img src='http://localhost:3000/Palette.svg' />
                </div>
              </div>
              <div className={styles.discoverMiddle}>
                {
                  selectedTab === 'Fanart' ?
                    animeList.fanArts !== undefined &&
                    animeList.fanArts.map((item) => {
                      return <MemoFanArtCard handleDataChange={(data: any) => setAnimeList({ ...animeList, fanArts: animeList.fanArts.map((i) => i.id === data.id ? data : i) } as any)} entity={item as any} key={item.id} />
                    })
                    :

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                      {
                        animeList.reviews != null &&
                        animeList.reviews.map((item) => {
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
                              {item.anime !== null && <a href={'/anime/' + item.anime.seoUrl}><img alt={item.anime.animeName} className={styles.leftImage} height="100" width="80" src={baseUrl + item.anime.img} /></a>}
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
                              {item.manga != null && <a href={'/manga/' + item.manga.seoUrl}><img alt={item.manga.name} className={styles.leftImage} height="100" width="80" src={baseUrl + item.manga.image} /></a>}
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
                        animeList.topAnimes.map((item) => {
                          return <Top100Card />
                        })
                        :
                        animeList.topMangas != undefined &&
                        animeList.topMangas.map((item) => {
                          return <Top100Card />
                        })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {filterModalIsShow && <FilterModal onClick={() => setFilterModalIsShow(false)}>
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
          <DownButon type="buton" icon={faAngleDown} name='Popülerite' />
          <DownButon type="buton" icon={faAngleDown} name='Tarih' />
        </FilterModal>}
      </div>
    </LoadingScreen >
  )
}
