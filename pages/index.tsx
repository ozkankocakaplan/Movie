import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MangaDescriptionModal, MovieDescriptionModal } from '../src/components/DescriptionModal'

import Header from '../src/components/Header'
import Line from '../src/components/Line'

import Movie from '../src/components/Movie'
import { RootState } from '../src/store'
import { handleOpenBackgroundBlur } from '../src/store/features/modalReducer'
import { setSelectedIndex } from '../src/store/features/sliderReducer'
import { Anime, AnimeModels, HomeSlider, Manga, MangaModels } from '../src/types/Entites'
import { getHomePageMovie } from '../src/utils/api'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { sliders } = useSelector((x: RootState) => x.sliderReducer);
  return (
    <div className={styles.HomePageContainer}>
      <div className={styles.container}>
        <Head>
          <title>Ana sayfa</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HomePage />
        <MoviesPage />
        <MobileViewMoviesPage1 />
        <MobileViewMoviesPage2 />
      </div>
    </div>
  )
}
export default Home;



const HomePage = () => {
  return (
    <div className={styles.pageContainer}>
      <HomeSlider>
        <Header />
      </HomeSlider>
    </div>
  )
}
const MoviesPage = () => {
  const { siteInfo } = useSelector((x: RootState) => x.userReducer.value);
  const [type, setType] = useState<"Manga" | "Anime">("Anime");
  const [imgHover, setImgHover] = useState(false);
  const dispatch = useDispatch();
  const [ratingAnimeList, setRatingAnimeList] = useState<Array<AnimeModels>>([]);
  const [ratingMangaList, setRatingMangaList] = useState<Array<MangaModels>>([]);
  const [newEpisodeAnime, setNewEpisodeAnime] = useState<Array<Anime>>([]);
  const [newEpisodeManga, setNewEpisodeManga] = useState<Array<Manga>>([]);
  const [movieInfoShow, setMovieInfoShow] = useState(false);
  const [mangaInfoShow, setMangaInfoShow] = useState(false);
  useEffect(() => {
    getHomePageMovie(1, 20).then((res) => {
      setRatingAnimeList(res.data.entity.ratingAnimes);
      setRatingMangaList(res.data.entity.ratingMangas);
      setNewEpisodeAnime(res.data.entity.newEpisodeAnimes);
      setNewEpisodeManga(res.data.entity.newEpisodeManga);
    })
  }, [])


  var leftTopScroll = useRef<HTMLDivElement>(null);
  var leftBottomScroll = useRef<HTMLDivElement>(null);

  var rightTopScroll = useRef<HTMLDivElement>(null);
  var rightBottomScroll = useRef<HTMLDivElement>(null);
  const leftBack = () => {
    if (leftTopScroll.current?.scrollLeft != undefined) {
      var left = leftTopScroll.current?.scrollLeft - 151;
      leftTopScroll.current?.scrollTo({ left: left, behavior: 'smooth' });
    }
    if (leftBottomScroll.current?.scrollLeft != undefined) {
      var left = leftBottomScroll.current?.scrollLeft - 151;
      leftBottomScroll.current?.scrollTo({ left: left, behavior: 'smooth' });
    }
  }
  const leftNext = () => {
    if (leftTopScroll.current?.scrollLeft != undefined) {
      var right = leftTopScroll.current?.scrollLeft + 181;
      leftTopScroll.current?.scrollTo({ left: right, behavior: 'smooth' });
    }
    if (leftBottomScroll.current?.scrollLeft != undefined) {
      var right = leftBottomScroll.current?.scrollLeft + 181;
      leftBottomScroll.current?.scrollTo({ left: right, behavior: 'smooth' });
    }
  }

  const rightBack = () => {
    if (rightTopScroll.current?.scrollLeft != undefined) {
      var left = rightTopScroll.current?.scrollLeft - 151;
      rightTopScroll.current?.scrollTo({ left: left, behavior: 'smooth' });
    }
    if (rightBottomScroll.current?.scrollLeft != undefined) {
      var left = rightBottomScroll.current?.scrollLeft - 151;
      rightBottomScroll.current?.scrollTo({ left: left, behavior: 'smooth' });
    }
  }
  const rightNext = () => {
    if (rightTopScroll.current?.scrollLeft != undefined) {
      var right = rightTopScroll.current?.scrollLeft + 181;
      rightTopScroll.current?.scrollTo({ left: right, behavior: 'smooth' });
    }
    if (rightBottomScroll.current?.scrollLeft != undefined) {
      var right = rightBottomScroll.current?.scrollLeft + 181;
      rightBottomScroll.current?.scrollTo({ left: right, behavior: 'smooth' });
    }
  }
  return (
    <div className={styles.homePage2Desktop}>
      <div className={styles.pageContainer + " " + styles.homePage2}>
        <div className={styles.homePage2Col1}>
          <div className={styles.leftContainer}><h4>Popüler Seriler</h4></div>
          <div className={styles.rightContainer}><h4>Yeni Bölümler</h4></div>
        </div>
        <div className={styles.homePage2Col2}>
          <div ref={leftTopScroll} className={styles.topEpisodeContainer}>
            {
              type === 'Anime' ?
                ratingAnimeList.length !== 0 &&
                ratingAnimeList.slice(0, 9).map((item, index) => {
                  return <Movie handleOpenModal={() => setMovieInfoShow(true)} type='MODAL' key={index} anime={item} infoContainerLeft='135px' src={item.anime.img} />
                })
                :
                ratingMangaList.length !== 0 &&
                ratingMangaList.slice(0, 9).map((item, index) => {
                  return <Movie type='MODAL' key={index} manga={item} infoContainerLeft='135px' src={item.manga.image} />
                })
            }
          </div>
          <div ref={rightTopScroll} className={styles.newEpisodesContainer}>
            {
              type === 'Anime' ?
                newEpisodeAnime.length !== 0 &&
                newEpisodeAnime.map((item, index) => {
                  return <Movie type='LINK' key={index} anime={item} infoContainerLeft='-290px' src={item.img} />
                })
                :
                newEpisodeManga.length !== 0 &&
                newEpisodeManga.map((item, index) => {
                  return <Movie type='LINK' key={index} manga={item} infoContainerLeft='-290px' src={item.image} />
                })
            }
          </div>
        </div>
        <div className={styles.homePage2Col3}>
          <div ref={leftBottomScroll} className={styles.top2EpisodeContainer}>
            {
              type === 'Anime' ?
                ratingAnimeList.length !== 0 &&
                ratingAnimeList.slice(10, 20).map((item, index) => {
                  return <Movie type='MODAL' key={index} anime={item} infoContainerLeft='135px' src={item.anime.img} />
                })
                :
                ratingMangaList.length !== 0 &&
                ratingMangaList.slice(10, 20).map((item, index) => {
                  return <Movie type='MODAL' key={index} manga={item} infoContainerLeft='135px' src={item.manga.image} />
                })
            }
          </div>
          <div ref={rightBottomScroll} className={styles.new2EpisodesContainer}>
            {
              type === 'Anime' ?
                newEpisodeAnime.length !== 0 &&
                newEpisodeAnime.slice(10, 20).map((item, index) => {
                  return <Movie type='LINK' key={index} anime={item} infoContainerLeft='135px' src={item.img} />
                })
                :
                newEpisodeManga.length !== 0 &&
                newEpisodeManga.slice(10, 20).map((item, index) => {
                  return <Movie type='LINK' key={index} manga={item} infoContainerLeft='135px' src={item.image} />
                })
            }
          </div>
        </div>
        <div className={styles.homePage2Col4}>

          <div className={styles.homePage2Footer}>
            <div className={styles.leftFooter}>
              <div className={styles.leftFooterInfo}>
                <div className={styles.footerContentInfo}>
                  <div className={styles.contentText}>
                    <h4>Gönderi</h4>
                    <div style={{ marginBottom: '10px' }}>  <Line /></div>
                    <div className={styles.contenText}>
                      <h5>{siteInfo.animeReviewCount + siteInfo.mangaReviewCount} eleştiri</h5>
                      <h5>{siteInfo.animeFanArtCount + siteInfo.mangaFanArtCount} fanart</h5>
                    </div>
                  </div>
                </div>
                <div className={styles.footerSocialInfo}>
                  <span>
                    <Link href={""}>
                      <a>
                        <picture><img src="/instagram.png" /></picture>
                      </a>
                    </Link>
                  </span>
                  <span>
                    <Link href={""}>
                      <a>
                        <picture><img src="/youtube.png" /></picture>
                      </a>
                    </Link>
                  </span>
                  <span>
                    <Link href={""}>
                      <a>
                        <picture><img src="/discord.png" /></picture>
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.rightFooter}>
              <div className={styles.rightFooterInfo}>
                <div className={styles.footerInfoContainer}>
                  <div className={styles.footerInfo + " " + styles.animeInfoContainer}>
                    <span>Anime</span>
                    <label>{siteInfo.animeCount} seri</label>
                    <label>{siteInfo.animeEpisodeCount} bölüm</label>
                  </div>
                  <div className={styles.footerInfo}>
                    <span>Manga</span>
                    <label>{siteInfo.mangaCount} seri</label>
                    <label>{siteInfo.mangaEpisodeCount} bölüm</label>
                  </div>
                </div>
                <div className={styles.footerInfo + " " + styles.onlinePeople}>
                  <label>Üye: {siteInfo.peopleCount}</label>
                </div>
                <div style={{ marginBottom: '40px' }} className={styles.footerInfo}>
                  <label>Çevrimiçi Üye: {siteInfo.onlinePeopleCount}</label>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footerScroll}>
            <div className={styles.row}>
              <div onClick={leftBack} className={styles.nextBackButon}><FontAwesomeIcon icon={faAngleLeft} /></div>
              <div onClick={leftNext} className={styles.nextBackButon}><FontAwesomeIcon icon={faAngleRight} /></div>
            </div>
            <div className={styles.row + " " + styles.rightFooterContainer}>
              <div onClick={rightBack} className={styles.nextBackButon}><FontAwesomeIcon icon={faAngleLeft} /></div>
              <div onClick={rightNext} className={styles.nextBackButon}><FontAwesomeIcon icon={faAngleRight} /></div>
            </div>
          </div>
        </div>
      </div>
      <div
        onMouseOver={() => {
          dispatch(handleOpenBackgroundBlur(true))
          setImgHover(true);
        }}
        onMouseLeave={() => {
          dispatch(handleOpenBackgroundBlur(false));
          setImgHover(false);
        }}
        className={styles.childrenContainer + " " + styles.userSelected}>
        {imgHover && <div
          onClick={() => {
            if (type === "Anime") {
              setType("Manga");
            }
            else {
              setType("Anime");
            }
          }}
          className={styles.childrenMangaText + " " + styles.userSelected}>{
            type === "Anime" ? "Anime" : "Manga"
          }</div>}
        <picture>  <img
          src='/children.png' /></picture>
      </div>
      {movieInfoShow && <MovieDescriptionModal top={'130vh'} handleCloseModal={() => {
        setMovieInfoShow(false);
        dispatch(handleOpenBackgroundBlur(false));
      }} />}
      {mangaInfoShow && <MangaDescriptionModal top={'130vh'} handleCloseModal={() => {
        setMangaInfoShow(false);
        dispatch(handleOpenBackgroundBlur(false));
      }} />}
    </div>

  )
}
const MobileViewMoviesPage1 = () => {
  const dispatch = useDispatch();
  const [ratingAnimeList, setRatingAnimeList] = useState<Array<AnimeModels>>([]);
  const [ratingMangaList, setRatingMangaList] = useState<Array<MangaModels>>([]);
  const [movieInfoShow, setMovieInfoShow] = useState(false);
  const [mangaInfoShow, setMangaInfoShow] = useState(false);
  useEffect(() => {
    getHomePageMovie(1, 20).then((res) => {
      setRatingAnimeList(res.data.entity.ratingAnimes);
      setRatingMangaList(res.data.entity.ratingMangas);
    })
  }, [])
  var leftTopScroll = useRef<HTMLDivElement>(null);
  var leftBottomScroll = useRef<HTMLDivElement>(null);
  const leftBack = () => {
    if (leftTopScroll.current?.scrollLeft != undefined) {
      var left = leftTopScroll.current?.scrollLeft - 151;
      leftTopScroll.current?.scrollTo({ left: left, behavior: 'smooth' });
    }
    if (leftBottomScroll.current?.scrollLeft != undefined) {
      var left = leftBottomScroll.current?.scrollLeft - 151;
      leftBottomScroll.current?.scrollTo({ left: left, behavior: 'smooth' });
    }
  }
  const leftNext = () => {
    if (leftTopScroll.current?.scrollLeft != undefined) {
      var right = leftTopScroll.current?.scrollLeft + 181;
      leftTopScroll.current?.scrollTo({ left: right, behavior: 'smooth' });
    }
    if (leftBottomScroll.current?.scrollLeft != undefined) {
      var right = leftBottomScroll.current?.scrollLeft + 181;
      leftBottomScroll.current?.scrollTo({ left: right, behavior: 'smooth' });
    }
  }
  return (
    <div>
      <div className={styles.pageContainer + " " + styles.homePage2 + " " + styles.homePage2Mobile}>
        <div className={styles.homePage2Col1}>
          <div className={styles.leftContainer}><h4>Popüler Seriler</h4></div>
        </div>
        <div className={styles.homePage2Col2}>
          <div ref={leftTopScroll} className={styles.topEpisodeContainer}>
            {
              ratingAnimeList.length !== 0 &&
              ratingAnimeList.map((item, index) => {
                return <Movie handleOpenModal={() => setMovieInfoShow(true)} type='MODAL' key={index} anime={item} infoContainerLeft='135px' src={item.anime.img} />
              })
            }
          </div>
        </div>
        <div className={styles.homePage2Col3}>
          <div ref={leftBottomScroll} className={styles.top2EpisodeContainer}>
            {
              ratingMangaList.length !== 0 &&
              ratingMangaList.map((item, index) => {
                return <Movie type='MODAL' key={index} manga={item} infoContainerLeft='135px' src={item.manga.image} />
              })
            }
          </div>
        </div>
        <div className={styles.homePage2Col4}>
          <div className={styles.footerScroll}>
            <div className={styles.row}>
              <div onClick={leftBack} className={styles.nextBackButon}><FontAwesomeIcon icon={faAngleLeft} /></div>
              <div onClick={leftNext} className={styles.nextBackButon}><FontAwesomeIcon icon={faAngleRight} /></div>
            </div>
          </div>
        </div>
      </div>
      {movieInfoShow && <MovieDescriptionModal top={'130vh'} handleCloseModal={() => {
        setMovieInfoShow(false);
        dispatch(handleOpenBackgroundBlur(false));
      }} />}
      {mangaInfoShow && <MangaDescriptionModal top={'130vh'} handleCloseModal={() => {
        setMangaInfoShow(false);
        dispatch(handleOpenBackgroundBlur(false));
      }} />}
    </div>
  )
}
const MobileViewMoviesPage2 = () => {
  const { siteInfo } = useSelector((x: RootState) => x.userReducer.value);
  const dispatch = useDispatch();
  const [newEpisodeAnime, setNewEpisodeAnime] = useState<Array<Anime>>([]);
  const [newEpisodeManga, setNewEpisodeManga] = useState<Array<Manga>>([]);
  const [movieInfoShow, setMovieInfoShow] = useState(false);
  const [mangaInfoShow, setMangaInfoShow] = useState(false);
  useEffect(() => {
    getHomePageMovie(1, 20).then((res) => {
      setNewEpisodeAnime(res.data.entity.newEpisodeAnimes);
      setNewEpisodeManga(res.data.entity.newEpisodeManga);
    })
  }, [])


  var leftTopScroll = useRef<HTMLDivElement>(null);
  var leftBottomScroll = useRef<HTMLDivElement>(null);

  var rightTopScroll = useRef<HTMLDivElement>(null);
  var rightBottomScroll = useRef<HTMLDivElement>(null);
  const rightBack = () => {
    if (rightTopScroll.current?.scrollLeft != undefined) {
      var left = rightTopScroll.current?.scrollLeft - 151;
      rightTopScroll.current?.scrollTo({ left: left, behavior: 'smooth' });
    }
    if (rightBottomScroll.current?.scrollLeft != undefined) {
      var left = rightBottomScroll.current?.scrollLeft - 151;
      rightBottomScroll.current?.scrollTo({ left: left, behavior: 'smooth' });
    }
  }
  const rightNext = () => {
    if (rightTopScroll.current?.scrollLeft != undefined) {
      var right = rightTopScroll.current?.scrollLeft + 181;
      rightTopScroll.current?.scrollTo({ left: right, behavior: 'smooth' });
    }
    if (rightBottomScroll.current?.scrollLeft != undefined) {
      var right = rightBottomScroll.current?.scrollLeft + 181;
      rightBottomScroll.current?.scrollTo({ left: right, behavior: 'smooth' });
    }
  }
  return (
    <div className={styles.homePage2Mobile}>
      <div className={styles.pageContainer + " " + styles.homePage2}>
        <div className={styles.homePage2Col1}>
          <div className={styles.leftContainer}><h4>Yeni Bölümler</h4></div>
        </div>
        <div className={styles.homePage2Col2}>
          <div ref={leftTopScroll} className={styles.topEpisodeContainer}>
            {
              newEpisodeAnime.length !== 0 &&
              newEpisodeAnime.map((item, index) => {
                return <Movie type='LINK' key={index} anime={item} infoContainerLeft='-290px' src={item.img} />
              })
            }
          </div>
        </div>
        <div className={styles.homePage2Col3}>
          <div ref={leftBottomScroll} className={styles.top2EpisodeContainer}>
            {
              newEpisodeManga.length !== 0 &&
              newEpisodeManga.map((item, index) => {
                return <Movie type='LINK' key={index} manga={item} infoContainerLeft='-290px' src={item.image} />
              })
            }
          </div>
        </div>
        <div className={styles.homePage2Col4}>
          <div className={styles.homePage2Footer}>
            <div className={styles.leftFooter}>
              <div className={styles.leftFooterInfo}>
                <div className={styles.footerContentInfo}>
                  <div className={styles.contentText}>
                    <h4>Gönderi</h4>
                    <div style={{ marginBottom: '10px' }}>  <Line /></div>
                    <div className={styles.contenText}>
                      <h5>{siteInfo.animeReviewCount + siteInfo.mangaReviewCount} eleştiri</h5>
                      <h5>{siteInfo.animeFanArtCount + siteInfo.mangaFanArtCount} fanart</h5>
                    </div>
                  </div>
                </div>
                <div className={styles.footerSocialInfo}>
                  <span>
                    <Link href={""}>
                      <a>
                        <picture>  <img src="/instagram.png" /></picture>
                      </a>
                    </Link>
                  </span>
                  <span>
                    <Link href={""}>
                      <a>
                        <picture>  <img src="/youtube.png" /></picture>
                      </a>
                    </Link>
                  </span>
                  <span>
                    <Link href={""}>
                      <a>
                        <picture>  <img src="/discord.png" /></picture>
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.rightFooter}>
              <div className={styles.rightFooterInfo}>
                <div className={styles.footerInfoContainer}>
                  <div className={styles.footerInfo + " " + styles.animeInfoContainer}>
                    <span>Anime</span>
                    <label>{siteInfo.animeCount} seri</label>
                    <label>{siteInfo.animeEpisodeCount} bölüm</label>
                  </div>
                  <div className={styles.footerInfo}>
                    <span>Manga</span>
                    <label>{siteInfo.mangaCount} seri</label>
                    <label>{siteInfo.mangaEpisodeCount} bölüm</label>
                  </div>
                </div>
                <div className={styles.footerInfo + " " + styles.onlinePeople}>
                  <label>Üye: {siteInfo.peopleCount}</label>
                </div>
                <div style={{ marginBottom: '40px' }} className={styles.footerInfo}>
                  <label>Çevrimiçi Üye: {siteInfo.onlinePeopleCount}</label>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footerScroll}>
            <div className={styles.row + " " + styles.rightFooterContainer}>
              <div onClick={rightBack} className={styles.nextBackButon}><FontAwesomeIcon icon={faAngleLeft} /></div>
              <div onClick={rightNext} className={styles.nextBackButon}><FontAwesomeIcon icon={faAngleRight} /></div>
            </div>
          </div>
        </div>
      </div>

      {movieInfoShow && <MovieDescriptionModal top={'130vh'} handleCloseModal={() => {
        setMovieInfoShow(false);
        dispatch(handleOpenBackgroundBlur(false));
      }} />}
      {mangaInfoShow && <MangaDescriptionModal top={'130vh'} handleCloseModal={() => {
        setMangaInfoShow(false);
        dispatch(handleOpenBackgroundBlur(false));
      }} />}
    </div>

  )
}













const HomeSlider = (props: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { sliders, selectedIndex } = useSelector((x: RootState) => x.sliderReducer);
  const time = 6000;
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(setSelectedIndex((selectedIndex + 1) === sliders.length ? 0 : selectedIndex + 1));
    }, time);

    return () => {
      clearTimeout(timeOut);
    }
  }, [selectedIndex])


  const SliderDescription = (entity: HomeSlider) => {
    return (
      <div className={styles.homeSliderDescription}>
        <div className={styles.homeSliderDescriptionContainer}>
          <div className={styles.homeSliderDescriptionTitle}>
            <h2>{entity.sliderTitle}</h2>
          </div>
          <span>
            <a href={entity.url}>
              <picture> <img src="/playButons.png" className={styles.playButons} /></picture>
            </a>
          </span>
        </div>
        <div className={styles.homeSliderDescriptionContent}>
          {
            entity.description
          }
        </div>
      </div>
    )
  }
  const SliderButons = () => {
    return (
      <div className={styles.sliderButonsContainer}>
        {
          sliders !== null && sliders.length !== 0 &&
          sliders.map((item, index) => {
            return <div onClick={() => {
              dispatch(setSelectedIndex(index));
            }} key={item.id} className={styles.sliderButons}></div>
          })
        }

      </div>
    )
  }
  const image = sliders != undefined && sliders.length !== 0 ? sliders[selectedIndex].image : "";
  return (
    <div className={styles.homeBg} style={{
      background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(90.16deg, rgba(0, 0, 0, 0.5) 50.68%, rgba(0, 0, 0, 0) 70.09%),url(' + image + ')',
    }}>
      {props.children}
      {
        sliders !== null && sliders.length !== 0 &&
        <SliderDescription {...sliders[selectedIndex]} />
      }
      <SliderButons />
    </div >
  )
}