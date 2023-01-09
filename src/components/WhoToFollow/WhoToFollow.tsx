import styles from './WhoToFollow.module.scss'
import { WHOTOFOLLOW_CONFIG, SIDEBAR_CONFIG } from '../../constants/index'
import Link from "next/link"
import Head from "next/head"
import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'

export const WhoToFollow = () => {
    const date: Date = new Date
    const router = useRouter()
    return (
        <>
            <div className={styles.whoToFollow}>
                <div className={styles.whoToFollowContainer}>
                    <h3 className={styles.whoToFollowTitle}>Who to follow</h3>
                    <div className={styles.whoToFollowBox}>
                        {WHOTOFOLLOW_CONFIG.map(user => (
                            <div tabIndex={0} key={user.id} className={styles.whoToFollowCard} onClick={() => {
                                router.push({
                                    pathname: `${user.nick}`
                                });
                            }}>
                                <div tabIndex={-1} className={styles.whoToFollowImg}>
                                    <img src={`${user.img || 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'}`} alt="" />
                                </div>
                                <div className={styles.whoToFollowData}>
                                    <Link href={`${user.nick}`}>
                                        <a className={styles.whoToFollowName}>
                                            <p className={styles.whoToFollowNameText}>
                                                {user.name}
                                            </p>
                                            <div className={classNames(styles.whoToFollowVerifiedImg, {
                                                [styles.verified]: user.verified,
                                            })}>
                                            </div>
                                        </a>
                                    </Link>
                                    <div className={styles.whoToFollowUserName}>
                                        {`@${user.nick}`}
                                    </div>
                                </div>
                                <button className={styles.whoToFollowFollowBtn}>
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                    <Link href={'/connect'}>
                        <a className={styles.whoToFollowShowMoreLink}>
                            <div className={styles.whoToFollowShowMoreText}>
                                Show more
                            </div>
                        </a>
                    </Link>
                </div>
                <footer className={styles.whoToFollowFooter}>
                    <ul className={styles.whoToFollowFooterLinks}>
                        {SIDEBAR_CONFIG.map(item => (
                            <li key={item.label}
                                className={styles.whoToFollowFooterlinksItem}
                            >
                                <a href={`${item.link}`}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        <button className={styles.whoToFollowFooterlinksItem}>
                            <span className={styles.whoToFollowFooterMoreText}>
                                More...
                            </span>
                        </button>
                        <li tabIndex={-1} className={styles.whoToFollowFooterlinksItem}>
                            © Twitter, Inc., {date.getFullYear()}.
                        </li>
                    </ul>
                </footer>
            </div>
        </>
    )
}