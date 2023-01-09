import styles from './SideBar.module.scss'
import { WhoToFollow } from '../../components/WhoToFollow/WhoToFollow'
import Link from "next/link"
import Head from "next/head"
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { TrendsForYou } from '../TrendsForYou'
import { Icon } from '@iconify/react'
import db from '../../../db.json'
import ConnectCards from '../ConnectCards/ConnectCards'
import router from 'next/router'
import { SearchTweet } from '../SearchTweet'

export const SideBar = () => {
    return (
        <div className={styles.sideBar}>
            <div className={styles.sideBarScroll}>
                <div className={styles.sideBarContainer}>
                    <header className={styles.sideBarHeader}>
                        <SearchTweet />
                    </header>
                    <div className={styles.sideBarContent}>
                        <div className={styles.trendsForYouContainer}>
                            <TrendsForYou />
                        </div>
                        <WhoToFollow />
                    </div>
                </div>
            </div>
            <div className={styles.sideBarBg}></div>
        </div>
    )
}   