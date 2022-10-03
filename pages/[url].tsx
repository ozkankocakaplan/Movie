import { faAngleDown, faBell, faShuffle, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import MenuButon, { MenuList } from '../src/components/Buton'
import DownButon from '../src/components/DownButon'
import Header from '../src/components/Header'
import Line from '../src/components/Line'
import MenuContainer from '../src/components/MenuContainer'
import styles from '../styles/Home.module.css'
export default function Details() {
    const [pageType, setPageType] = useState<'MANGA' | 'ANİME'>('ANİME');
    const [selectedMenu, setSelectedMenu] = useState<MenuList>("Anime");

    const [isWatch, setIsWatch] = useState(false);

    const OptionButon = () => {
        return (
            <div style={{
                background: 'rgba(196, 196, 196, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '100px',
                width: '40px',
                height: '12px',
                marginRight: '10px',
                cursor: 'pointer'
            }}>

            </div>
        )
    }
    return (
        <div className={styles.archiveBackground}>
            <Header
                search={'show'}
                notification={'hide'}
                style={{ backgroundColor: '#141414', marginTop: 0, padding: '5px' }} />
            <div className={styles.archiveContainer}>
                <div style={{ height: '100%' }}>
                    <MenuContainer>
                        <div className={styles.leftMenuContainer} >
                            <MenuButon marginright='10px' onClick={() => setSelectedMenu('Anime')} isactive={selectedMenu == "Anime" ? "T" : "F"} name='Anime' />
                            <MenuButon width='45px' icon={faThumbsUp} />
                        </div>
                        <div className={styles.rightMenuContainer}>
                            <DownButon icon={faAngleDown} name='Oluştur' />
                            <DownButon icon={faAngleDown} name='Puanla' />
                            <DownButon icon={faAngleDown} name='Listele' />
                            <DownButon icon={faAngleDown} name='İndir' />
                            <DownButon onClick={() => setIsWatch(!isWatch)} icon={faAngleDown} name='İzle' />
                        </div>
                    </MenuContainer>
                    <div className={styles.detailsContainer}>
                        <div className={styles.detailsLeft}>
                            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                                <div className={styles.detailsBody}>
                                    <div className={styles.detailsHeader}>
                                        <h2>Attack on Titan</h2>
                                        <div className={styles.movieNotification}>
                                            <FontAwesomeIcon fontSize="20px" icon={faBell} color={"rgba(255,255,255,0.5)"} />
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className={styles.movieInfoSummaryContainer}>
                                        <Info name='Drama' />
                                        <Info name='Mal: 7.89/10' />
                                        <Info name='Bölümler: 230' />
                                        <Info name='Yaş Sınırı: +13' />
                                        <Info name='Beğeni: 4300' />
                                        <Info name='Aksiyon' />
                                        <Info name='Site: 8.2/10' />
                                        <Info name='Çıkış: 01.04.19' />
                                        <Info name='Tür: Dizi' />
                                        <Info name='Sıralama: 128' />
                                        <Info name='Dövüş' />
                                        <Info name='Dövüş' />
                                        <Info name='Dövüş' />
                                        <Info name='Sezon Sayısı: 5' />
                                        <Info name='Durumu: Bitti' />
                                        <Info name='İzlenme: 18300' />
                                    </div>
                                    <Divider />
                                    <div className={styles.movieSummary}>
                                        Takemichi Hanagaki, çaresizliğin dipsiz çukuruna düşmüş bir serbest çalışandır. Ortaokulda tanıştığı ve hayatı boyunca çıktığı tek kız olan Hinata Tachibana’nın acımasız Tokyo Manji Çetesi tarafından öldürüldüğünü öğrenir. Sonraki gün istasyon platformundaki kalabalık tarafından raylara itilir. Öleceğini düşünerek gözlerini kapatır fakat tekrar açtığında zamanda 12 yıl geriye gittiğini fark eder. Hayatının en iyi yıllarına dönen Takemichi, kız arkadaşını kurtarıp sürekli kaçtığı kendisini değiştirerek hayattan intikam almaya karar verir.
                                        Takemichi Hanagaki, çaresizliğin dipsiz çukuruna düşmüş bir serbest çalışandır. Ortaokulda tanıştığı ve hayatı boyunca çıktığı tek kız olan Hinata Tachibana’nın acımasız Tokyo Manji Çetesi tarafından öldürüldüğünü öğrenir. Sonraki gün istasyon platformundaki kalabalık tarafından raylara itilir. Öleceğini düşünerek gözlerini kapatır fakat tekrar açtığında zamanda 12 yıl geriye gittiğini fark eder.
                                    </div>
                                    <div style={{
                                        flex: 1,
                                        marginTop: '15px', marginBottom: '15px',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <OptionButon />
                                        <OptionButon />
                                        <OptionButon />
                                        <OptionButon />
                                    </div>
                                </div>
                                <div>
                                    <VerticalDivider />
                                </div>
                            </div>
                        </div>
                        <div className={styles.detailsRight}>
                            {
                                isWatch ?
                                    <Images />
                                    : <Episodes />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const Divider = () => {
    return (
        <div style={{ flex: 1, marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
            <Line />
        </div>
    )
}
const VerticalDivider = () => {
    return (
        <div style={{ height: '100%', width: '2px', backgroundColor: 'rgba(255,255,255,0.50)' }}></div>
    )
}
const Info = (props: { name: string }) => {
    return (
        <div className={styles.movieInfoSummary}>
            {props.name}
        </div>
    )
}
const Images = () => {
    return (
        <div className={styles.detailsBody}>
            <div className={styles.detailsHeader}>
                <h2>Görseller</h2>
            </div>
            <Divider />
            <div className={styles.detailsImagesContainer}>
                <img src='http://localhost:3000/image1.png' />
            </div>
            <div className={styles.detailsImagesListContainer}>
                <div className={styles.detailsImages}>
                    <img src='http://localhost:3000/viewImage.png' />
                    <img src='http://localhost:3000/viewImage.png' />
                    <img src='http://localhost:3000/viewImage.png' />
                    <img src='http://localhost:3000/viewImage.png' />
                    <img src='http://localhost:3000/viewImage.png' />
                </div>
            </div>
        </div>
    )
}
const Episodes = () => {
    return (
        <div className={styles.detailsBody}>
            <div className={styles.detailsHeader}>
                <h2>Bölüm 1</h2>
            </div>
            <Divider />
            <div className={styles.detailsVideoPlayerContainer}>

            </div>
            <div className={styles.detailsEpidoesContainer}>
                <div className={styles.epidoseSeasons}></div>
                <div className={styles.seasonsMusic}></div>
            </div>
        </div>
    )
}