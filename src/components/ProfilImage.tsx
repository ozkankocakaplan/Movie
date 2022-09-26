import Image from 'next/image'
import React, { useEffect, useState } from 'react'
interface IProfilImageProps {
    height: string,
    width: string,
    src: string,
    alt: string

}
export default function ProfilImage(props: IProfilImageProps) {
    return (<Image alt={props.alt} src={props.src} width={props.width} height={props.height} />)
}
