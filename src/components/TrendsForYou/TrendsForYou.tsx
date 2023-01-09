import styles from '../TrendsForYou/TrendsForYou.module.scss'
import { WHOTOFOLLOW_CONFIG, SIDEBAR_CONFIG } from '../../constants/index'
import Link from "next/link"
import Head from "next/head"
import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'

export const TrendsForYou = () => {
    const date: Date = new Date
    const router = useRouter()
    return (
        <>
            {/* <div className={styles.trendsForYou}> */}
            {/* <div className={styles.trendsForYouContainer}> */}
            <h3 className={styles.trendsForYouTitle}>Trends for you</h3>
            <div className={styles.trendsForYouBox}>
                <div tabIndex={0} className={styles.trendsForYouCard} onClick={() => {
                }}>
                    <div className={styles.trendsForYouData}>
                        <p className={styles.trendsForYouCountryName}>
                            Trending in Uzbekistan
                        </p>
                        <div className={styles.trendsForYouTrendName}>
                            #Raxmat
                        </div>
                        <div className={styles.trendsForYouTweetsCount}>
                            2,402 tweets
                        </div>
                    </div>
                    <button className={styles.trendsForYouFollowBtn}>
                        ···
                    </button>
                </div>
                <div tabIndex={0} className={styles.trendsForYouCard} onClick={() => {
                }}>
                    <div className={styles.trendsForYouData}>
                        <p className={styles.trendsForYouCountryName}>
                            Trending in Uzbekistan
                        </p>
                        <div className={styles.trendsForYouTrendName}>
                            #Raxmat
                        </div>
                        <div className={styles.trendsForYouTweetsCount}>
                            2,402 tweets
                        </div>
                    </div>
                    <button className={styles.trendsForYouFollowBtn}>
                        ···
                    </button>
                </div>
                <div tabIndex={0} className={styles.trendsForYouCard} onClick={() => {
                }}>
                    <div className={styles.trendsForYouData}>
                        <p className={styles.trendsForYouCountryName}>
                            Trending in Uzbekistan
                        </p>
                        <div className={styles.trendsForYouTrendName}>
                            #Raxmat
                        </div>
                        <div className={styles.trendsForYouTweetsCount}>
                            2,402 tweets
                        </div>
                    </div>
                    <button className={styles.trendsForYouFollowBtn}>
                        ···
                    </button>
                </div>
            </div>
            {/* <Link href={'/connect'}>
                    <a className={styles.trendsForYouShowMoreLink}>
                        <div className={styles.trendsForYouShowMoreText}>
                            Show more
                        </div>
                    </a>
                </Link>
            </div> */}
            {/* </div>
            <div className={styles.trendsForYouBg}>
            </div> */}
        </>
    )
}