import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css';
interface IProfilImageProps {
    height: string,
    width: string,
    src: string,
    alt: string

}
export default function ProfilImage(props: IProfilImageProps) {
    return (<Image className={styles.userSelected} alt={props.alt} src={props.src} width={props.width} height={props.height} />)
}
