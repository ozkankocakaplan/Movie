import Head from 'next/head';
import React  from 'react'
import Header from '../src/components/Header';
import styles from '../styles/Home.module.css';



export default function Contract() {
    return (
        <div className={styles.archiveBackground}>
            <Head>
                <title>Gizlilik Sözleşmesi</title>
            </Head>
            <Header
                search={'show'}
                notification={'hide'}
                style={{ backgroundColor: '#141414', marginTop: 0, padding: '5px' }} />
            <div className={styles.archiveContainer}>
                <div style={{ height: '100%' }}>
                    <div className={styles.discoverContainer}>
                        a
                    </div>
                </div>
            </div>
        </div>
    )
}
