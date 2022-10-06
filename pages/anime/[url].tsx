import { faAngleDown, faBell, faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { HTMLAttributes, useState } from 'react'
import MenuButon, { MenuList } from '../../src/components/Buton'
import DownButon from '../../src/components/DownButon'
import Header from '../../src/components/Header'
import Line from '../../src/components/Line'
import MenuContainer from '../../src/components/MenuContainer'
import StarRating from '../../src/components/StarRating'
import styles from '../../styles/Home.module.css'
type TABS = "DETAIL" | "COMMENTS" | "STATUS";
export default function Details() {
    const [selectedTab, setSelectedTab] = useState<TABS>("DETAIL");


    const [pageType, setPageType] = useState<'MANGA' | 'ANİME'>('ANİME');
    const [selectedMenu, setSelectedMenu] = useState<MenuList>("Anime");

    const [rating, setRating] = useState(0);
    const [pointPanelShow, setPointPanelShow] = useState<"show" | "hide">("hide");
    const [listPanelShow, setListPanelShow] = useState<"show" | "hide">("hide");
    const [downloadPanelShow, setDownloadPanelShow] = useState<"show" | "hide">("hide");
    const [isWatch, setIsWatch] = useState(false);


    const Detail = () => {
        return (
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
                </div>
                <div>
                    <VerticalDivider />
                </div>
            </div>
        )
    }
    const Comments = () => {
        return (
            <div>yorumlar</div>
        )
    }
    const Status = () => {
        return (
            <div>
                gönderiler
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
                            <MenuButon marginright='10px' onClick={() => setSelectedMenu('Manga')} isactive={selectedMenu == "Manga" ? "T" : "F"} name='Manga' />
                        </div>
                        <div className={styles.rightMenuContainer}>
                            <DownButon type='buton' icon={faAngleDown} name='Oluştur' />
                            <DownButon
                                onClick={() => {
                                    if (pointPanelShow === "hide") {
                                        setPointPanelShow('show')
                                    }
                                    else {
                                        setPointPanelShow('hide')
                                    }
                                }}
                                show={pointPanelShow}
                                type='dropdown' icon={faAngleDown} name='Puanla'>
                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <StarRating rating={rating} handleRating={(val: number) => setRating(val)} />
                                </div>
                            </DownButon>
                            <DownButon
                                onClick={() => {
                                    if (listPanelShow === "hide") {
                                        setListPanelShow('show')
                                    }
                                    else {
                                        setListPanelShow('hide')
                                    }
                                }}
                                show={listPanelShow} type='dropdown' icon={faAngleDown} name='Listele'>
                                <div className={styles.listButons + " " + styles.userSelected}>İzledim</div>
                                <div className={styles.listButons + " " + styles.userSelected}>İzleyeceğim</div>
                                <div className={styles.listButons + " " + styles.userSelected}>İzliyorum</div>
                            </DownButon>
                            <DownButon onClick={() => {
                                if (downloadPanelShow === "hide") {
                                    setDownloadPanelShow('show')
                                }
                                else {
                                    setDownloadPanelShow('hide')
                                }

                            }} show={downloadPanelShow} type='dropdown' icon={faAngleDown} name='İndir'>
                                <div className={styles.listButons + " " + styles.userSelected}>Mega</div>
                            </DownButon>
                            <DownButon type='buton' onClick={() => setIsWatch(!isWatch)} icon={faAngleDown} name='İzle' />
                        </div>
                    </MenuContainer>
                    <div className={styles.detailsContainer}>
                        <div className={styles.detailsLeft}>
                            {selectedTab === "DETAIL" && <Detail />}
                            {selectedTab === "COMMENTS" && <Comments />}
                            {selectedTab === "STATUS" && <Status />}
                            <div style={{
                                flex: 1,
                                marginTop: '15px', marginBottom: '15px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'end'
                            }}>
                                <OptionButon onClick={() => setSelectedTab('DETAIL')} />
                                <OptionButon onClick={() => setSelectedTab('COMMENTS')} />
                                <OptionButon onClick={() => setSelectedTab('STATUS')} />
                            </div>
                        </div>
                        <div className={styles.detailsRight}>
                            {
                                !isWatch ?
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
interface IOptionButonProps extends HTMLAttributes<HTMLDivElement> { }
const OptionButon = (props: IOptionButonProps) => {
    return (
        <div {...props} style={{
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
    const SeasonButon = (props: { name: string }) => {
        return (
            <div className={styles.seasonButon + " " + styles.userSelected}>
                {props.name}
            </div>
        )
    }
    return (
        <div className={styles.detailsBody}>
            <div className={styles.detailsHeader}>
                <h2>Bölüm 1</h2>
            </div>
            <Divider />
            <div className={styles.detailsVideoPlayerContainer}>

            </div>
            <div className={styles.detailsEpidoesContainer}>
                <div className={styles.epidoseSeasons}>
                    <div>
                        <div className={styles.seasonContainer}>
                            <SeasonButon name='Sezon 1' />
                            <SeasonButon name='Sezon 2' />
                            <SeasonButon name='Sezon 3' />
                            <SeasonButon name='Sezon 3' />
                            <SeasonButon name='Sezon 3' />
                        </div>
                    </div>
                    <div className={styles.episodesBody}>
                        <EpisodeCard name="Bölüm 1: Titanların İntikamı" />
                        <EpisodeCard name="Bölüm 1: Titanların İntikamı" />
                        <EpisodeCard name="Bölüm 1: Titanların İntikamı" />
                        <EpisodeCard name="Bölüm 1: Titanların İntikamı" />
                        <EpisodeCard name="Bölüm 1: Titanların İntikamı" />
                        <EpisodeCard name="Bölüm 1: Titanların İntikamı" />
                    </div>
                </div>
                <div className={styles.seasonsMusic}>
                    <div className={styles.seasonMusicBody}>
                        <div style={{ marginBottom: '10px' }}><SeasonButon name='Sezon 1 Müzikleri' /></div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', padding: '5px' }}>
                            <SeasonMusicCard name='Ateş Adamın Dansı' />
                            <SeasonMusicCard name='Ateş Adamın Dansı' />
                            <SeasonMusicCard name='Ateş Adamın Dansı' />
                            <SeasonMusicCard name='Ateş Adamın Dansı' />
                            <SeasonMusicCard name='Ateş Adamın Dansı' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const EpisodeCard = (props: { name: string }) => {
    return (
        <div className={styles.episode + " " + styles.episodeCardWith + " " + styles.userSelected}>
            <div className={styles.episdeCardname}><a>{props.name}</a></div>
        </div>
    )
}
const SeasonMusicCard = (props: { name: string }) => {
    return (
        <div className={styles.episode + " " + styles.userSelected}>
            <a>{props.name}</a>
            <FontAwesomeIcon icon={faDownload} color="rgba(255, 255, 255, 0.35)" />
        </div>
    )
}
