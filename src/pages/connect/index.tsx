import styles from '../../../styles/suggested.module.scss'
import { SUGGESDET_CONFIG } from '../../constants/index'
import Link from "next/link"
import Head from "next/head"
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { NavigationBar } from '../../components/NavigationBar'
import { SideBar } from '../../components/SideBar'
import ConnectCards from '../../components/ConnectCards/ConnectCards'
import { Tweet } from "../../typings"
import { Icon } from '@iconify/react'

interface Props {
    tweets: Tweet[]
}

export default function Suggested({ tweets }: Props) {
    const router = useRouter()
    return (
        <div className={styles.suggestedPageContainer}>
            <Head>
                <title>
                    Connect / Twitter
                </title>
            </Head>
            <NavigationBar tweets={tweets} />
            <div className={styles.suggestedContainer}>
                <div className={styles.suggestedHeader}>
                    <div className={styles.suggestedHeaderBackBtnContainer}>
                        <button className={styles.suggestedHeaderBackBtn} onClick={() => {
                            { history.back() }
                        }}>
                            <Icon icon="material-symbols:arrow-back" width='24' height='24'/>
                        </button>
                    </div>
                    <div className={styles.suggestedTitle}>
                        <div className={styles.suggestedTitleContainer}>
                            <h2 className={styles.suggestedTitleText}>
                                Connect
                            </h2>
                        </div>
                    </div>
                </div>
                <ConnectCards componentTitle={"Suggested for you"} configName={SUGGESDET_CONFIG} />
            </div>
            <SideBar />
        </div>
    )
}