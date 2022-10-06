import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styles from '../../styles/Home.module.css';
const ReviewCard = (props: { user: {} }) => {
  const CardImg = () => {
    return (
      <img className={styles.cardImage + " " + styles.userSelected} src='http://localhost:3000/profileFavori.png' />
    )
  }
  return (
    <div>
      <div className={styles.topLeftBorder}></div>
      <div className={styles.leftBorder}></div>
      <div className={styles.listCard2}>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderImages}>
            <CardImg />
            <div className={styles.reviewView + " " + styles.userSelected}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehen-derit in voluptate velit esse cillum dolore eu fugiat nul...
            </div>
          </div>
        </div>
        <div className={styles.listOptions}>
          <div className={styles.listOptionsLeft}>
            {
              props.user !== null && Object.keys(props.user).length !== 0 &&
              <div className={styles.listOptionsLeft}>
                <div className={styles.addListButon}>
                  <FontAwesomeIcon color='rgba(255,255,255,0.20)' icon={faEdit} />
                </div>
                <div className={styles.changeListButon}>
                  <FontAwesomeIcon color='rgba(255,255,255,0.20)' icon={faTrash} />
                </div>
              </div>
            }
          </div>
          <div className={styles.listOptionsRight + " " + styles.topWatchBorder}>
            <span className={styles.userSelected + " " + styles.statusDateText}>
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.bottomBorder}></div>
      <div className={styles.rightBorder}></div>
    </div>
  )
}
const FanArtCard = (props: { user: {} }) => {
  const CardImg = () => {
    return (
      <img className={styles.cardImage + " " + styles.userSelected} src='http://localhost:3000/profileFavori.png' />
    )
  }
  return (
    <div>
      <div className={styles.topLeftBorder}></div>
      <div className={styles.leftBorder}></div>
      <div className={styles.listCard2} >
        <div className={styles.sliderContainer}>
          <div className={styles.sliderImages}>
            <CardImg />
            <div className={styles.fanArtView + " " + styles.userSelected}>
              fan art’ı görüntülemek için tıkla
            </div>
          </div>
        </div>
        <div className={styles.listOptions}>
          <div className={styles.listOptionsLeft}>
            {
              props.user !== null && Object.keys(props.user).length !== 0 &&
              <div className={styles.listOptionsLeft}>
                <div className={styles.changeListButon}>
                  <FontAwesomeIcon color='rgba(255,255,255,0.20)' icon={faTrash} />
                </div>
              </div>
            }
          </div>
          <div className={styles.listOptionsRight + " " + styles.topWatchBorder}>
            <span className={styles.userSelected + " " + styles.statusDateText}>
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.bottomBorder}></div>
      <div className={styles.rightBorder}></div>
    </div>
  )
}
export { ReviewCard, FanArtCard };