import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Header from '../src/components/Header'
import Line from '../src/components/Line'
import Movie from '../src/components/Movie'
import { handleOpenBackgroundBlur } from '../src/store/features/modalReducer'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>Ana sayfa</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HomePage />
        <MoviesPage />
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
  const [type, setType] = useState<"Manga" | "Anime">("Anime");
  const [imgHover, setImgHover] = useState(false);
  const dispatch = useDispatch();
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
    <div>
      <div style={{ position: 'absolute' }} className={styles.pageContainer + " " + styles.homePage2}>
        <div className={styles.leftContainer}><h4>Popüler Seriler</h4></div>
        <div className={styles.rightContainer}><h4>Yeni Bölümler</h4></div>
        <div style={{ position: "absolute", left: 0 }}>
          <div ref={leftTopScroll} className={styles.topEpisodeContainer}>
            <Movie infoContainerLeft='135px' marginLeft='20px' src="http://localhost:3000/movieImg1.png" />
            <Movie infoContainerLeft='135px' marginLeft='27px' src="http://localhost:3000/movieImg.png" />
            <Movie infoContainerLeft='135px' marginLeft='27px' src="http://localhost:3000/movieImg1.png" />
            <Movie infoContainerLeft='135px' marginLeft='27px' src="http://localhost:3000/movieImg.png" />
            <Movie infoContainerLeft='135px' marginLeft='27px' src="http://localhost:3000/movieImg.png" />
            <Movie infoContainerLeft='135px' marginLeft='27px' src="http://localhost:3000/movieImg.png" />
          </div>
          <div ref={leftBottomScroll} className={styles.top2EpisodeContainer}>
            <Movie infoContainerLeft='125px' src="http://localhost:3000/movieImg.png" />
            <Movie infoContainerLeft='125px' src="http://localhost:3000/movieImg1.png" />
            <Movie infoContainerLeft='125px' src="http://localhost:3000/movieImg.png" />
            <Movie infoContainerLeft='125px' src="http://localhost:3000/movieImg1.png" />
            <Movie infoContainerLeft='125px' src="http://localhost:3000/movieImg1.png" />
          </div>
        </div>
        <div style={{ position: "absolute", right: 0 }}>
          <div ref={rightTopScroll} className={styles.newEpisodesContainer}>
            <Movie infoContainerLeft='-290px' src="http://localhost:3000/movieImg1.png" />
            <Movie infoContainerLeft='-290px' src="http://localhost:3000/movieImg.png" />
            <Movie infoContainerLeft='-290px' src="http://localhost:3000/movieImg1.png" />
            <Movie infoContainerLeft='-290px' src="http://localhost:3000/movieImg1.png" />
            <Movie infoContainerLeft='-290px' src="http://localhost:3000/movieImg1.png" />
            <Movie infoContainerLeft='-290px' src="http://localhost:3000/movieImg.png" />
          </div>
          <div ref={rightBottomScroll} className={styles.new2EpisodesContainer}>
            <Movie infoContainerLeft='-290px' src="http://localhost:3000/movieImg.png" />
            <Movie infoContainerLeft='-290px' src="http://localhost:3000/movieImg.png" />
            <Movie infoContainerLeft='-290px' src="http://localhost:3000/movieImg1.png" />
            <Movie infoContainerLeft='-290px' src="http://localhost:3000/movieImg.png" />
            <Movie infoContainerLeft='-290px' src="http://localhost:3000/movieImg1.png" />
          </div>
        </div>

        <div className={styles.homePage2Footer}>
          <div className={styles.leftFooter}>

            <div className={styles.leftFooterInfo}>
              <div className={styles.footerContentInfo}>
                <div className={styles.contentText}>
                  <h4>Gönderi</h4>
                  <div style={{ marginBottom: '10px' }}>  <Line /></div>
                  <div className={styles.contenText}>
                    <h5>1400 eleştiri</h5>
                    <h5>800 fanart</h5>
                  </div>
                </div>
              </div>
              <div className={styles.footerSocialInfo}>
                <span>
                  <Link href={""}>
                    <a>
                      <img src="http://localhost:3000/instagram.png" />
                    </a>
                  </Link>
                </span>
                <span>
                  <Link href={""}>
                    <a>
                      <img src="http://localhost:3000/youtube.png" />
                    </a>
                  </Link>
                </span>
                <span>
                  <Link href={""}>
                    <a>
                      <img src="http://localhost:3000/discord.png" />
                    </a>
                  </Link>
                </span>
              </div>
            </div>
            <div className={styles.row}>
              <div onClick={leftBack} className={styles.nextBackButon}><FontAwesomeIcon icon={faAngleLeft} /></div>
              <div onClick={leftNext} className={styles.nextBackButon}><FontAwesomeIcon icon={faAngleRight} /></div>
            </div>
          </div>
          <div className={styles.rightFooter}>
            <div className={styles.rightFooterInfo}>a</div>
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
        {/* <img
          src='http://localhost:3000/children.png' /> */}
      </div>

    </div>

  )
}
const HomeSlider = (props: { children: React.ReactNode }) => {
  const SliderDescription = () => {
    return (
      <div className={styles.homeSliderDescription}>
        <div className={styles.homeSliderDescriptionContainer}>
          <div className={styles.homeSliderDescriptionTitle}>
            <h2>Shingeki no Kyojin</h2>
          </div>
          <span><img src="/playButons.png" className={styles.playButons} /></span>
        </div>
        <div className={styles.homeSliderDescriptionContent}>
          Yüzyıllar evvel insanoğlu devler tarafından yok olmanın eşiğine getirilmiştir. Devler tıpkı anlatılagelmiş hikayelerdeki gibi, uzun, zekadan yoksun görünen, insanları yiyen ve de en kötüsü bunu beslenmek için değil zevk için yapan varlıklardır.
        </div>
      </div>
    )
  }
  const SliderButons = () => {
    return (
      <div className={styles.sliderButonsContainer}>
        <div className={styles.sliderButons}></div>
        <div className={styles.sliderButons}></div>
        <div className={styles.sliderButons}></div>
        <div className={styles.sliderButons}></div>
        <div className={styles.sliderButons}></div>
      </div>
    )
  }
  return (
    <div className={styles.homeBg} style={{
      background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(90.16deg, rgba(0, 0, 0, 0.5) 50.68%, rgba(0, 0, 0, 0) 70.09%),url("http://localhost:3000/bgImage.png")',
    }}>
      {props.children}
      <SliderDescription />
      <SliderButons />
    </div >
  )
}