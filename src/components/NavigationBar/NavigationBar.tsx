import styles from './NavigationBar.module.scss'
import { NAVBAR_CONFIG } from '../../constants/index'
import Link from "next/link"
import Head from "next/head"
import { ReactDOM } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { signIn, signOut, useSession } from 'next-auth/react'
import router from 'next/router'
import { Tweet } from '../../typings'
import { AddingTweetModal } from '../AddingTweetModal'
import { AddingTweet } from '../AddingTweet'
import { fetchTweets } from '../../utils/fetchTweets'
import { Icon } from '@iconify/react'

interface Props {
    tweets: Tweet[]
}

export const NavigationBar = ({ tweets: tweetsProp }: Props) => {
    const navBarItemListRef = useRef(null)
    const signOutModalBgRef = useRef(null)

    const { data: session } = useSession()
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState<boolean>(false)
    const [isAddingTweetModalOpen, setIsAddingTweetModalOpen] = useState<boolean>(false)
    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
    const addingTweetModalBgRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isAddingTweetModalOpen) {
            addingTweetModalBgRef.current.style.zIndex = '999'
            addingTweetModalBgRef.current.style.opacity = '1'
            document.body.style.marginRight = '17px'
            document.body.style.overflow = 'hidden'
            setIsAddingTweetModalOpen(true)
        } else {
            addingTweetModalBgRef.current.style.zIndex = '-1'
            addingTweetModalBgRef.current.style.opacity = '0'
            document.body.style.overflow = 'initial'
            document.body.style.marginRight = ''
        }
    })

    useEffect(() => {
        for (let i = 0; i < navBarItemListRef.current.children.length; i++) {
            if (navBarItemListRef.current.children[i].href == document.location.href) {
                navBarItemListRef.current.children[i].lastChild.lastChild.style.fontWeight = '700';
            } else {
                navBarItemListRef.current.children[i].style.fontWeight = '400'
            }
        }
    })

    useEffect(() => {
        if (isSignOutModalOpen) {
            signOutModalBgRef.current.style.zIndex = '999'
            setIsSignOutModalOpen(true)
        } else {
            signOutModalBgRef.current.style.zIndex = '-1'
        }
    })

    return (
        <>
            <div className={styles.headerNav}>
                <div className={styles.headerNavMenu}>
                    <div className={styles.twitterLogoContainer}>
                        <h1 className={styles.headerNavTitle}>
                            <Link href={'/home'}>
                                <a className={styles.twitterLogoLink}>
                                    <div className={styles.twitterLogoBox}>
                                        <div className={styles.twitterLogo}>
                                            <Icon icon={"ion:logo-twitter"} width='auto' height='auto' color='#1d9bf0' className={'twitterLogo'} />
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </h1>
                    </div>
                    <div className={styles.headerNavMain}>
                        <ul ref={navBarItemListRef} className={styles.navMenuList}>
                            {NAVBAR_CONFIG.map(item => (
                                <Link href={`/${item.link}`} key={item.label}>
                                    <a className={styles.headerNavMenuLink} key={item.label}>
                                        <div className={styles.headerNavMenuItem}>
                                            <span className={styles.headerNavIcon}>{item.img}</span>
                                            <span className={styles.headerNavMenuText}>
                                                {item.label}
                                            </span>
                                        </div>
                                    </a>
                                </Link>
                            ))}
                            <Link href={`/${session?.user?.name.toLocaleLowerCase()}`}>
                                <a className={styles.headerNavMenuLink}>
                                    <div className={styles.headerNavMenuItem}>
                                        <span className={styles.headerNavIcon}>
                                            <Icon icon={"mingcute:user-1-line"} width='28' height='28' />
                                        </span>
                                        <span className={styles.headerNavMenuText}>
                                            Profile
                                        </span>
                                    </div>
                                </a>
                            </Link>
                            <button className={styles.headerNavMenuLink}>
                                <div className={styles.headerNavMenuItem}>
                                    <span className={styles.headerNavIcon}>
                                        <Icon icon={"mdi:more-circle-outline"} width='28' height='28' />
                                    </span>
                                    <span className={styles.headerNavMenuText}>
                                        More
                                    </span>
                                </div>
                            </button>
                            <button className={styles.headerNavTweetBtn}
                                onClick={() => {
                                    setIsAddingTweetModalOpen(true)
                                }}>
                                <span className={styles.headerNavTweetText}>Tweet</span>
                                <Icon icon={"mdi:feather"} width='28' height='28' className={styles.headerNavTweetImg}/>
                            </button>
                        </ul>
                    </div>
                    <button className={styles.accountControl} onClick={() => setIsSignOutModalOpen(true)}>
                        <img className={styles.accountControlImg} src={session?.user?.image || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"} />
                        <div className={styles.accountControlData}>
                            <span className={styles.accountControlName}>
                                {session?.user?.name || 'Unknown user'}
                            </span>
                            <span className={styles.accountControlUserName}>
                                @{session?.user?.name.toLocaleLowerCase().split(" ") || 'Unknown user'}
                            </span>
                        </div>
                        <span className={styles.accountControlTripleDots}>
                            ...
                        </span>
                    </button>
                </div>
            </div>
            <div className={styles.headerNavBg}>
            </div>
            <div ref={signOutModalBgRef} className={styles.signOutBg}
                onClick={() => setIsSignOutModalOpen(false)}>
            </div>
            <div className={classNames(styles.signOutContainer, {
                [styles.signOutModalActive]: isSignOutModalOpen,
            })}>
                <button type='submit' className={styles.signOutBtn}>
                    Add an existing account
                </button>
                <button type='submit' className={styles.signOutBtn} onClick={() => {
                    session ? signOut() : signIn()
                }}>
                    {session ? "Sing out" : "Sign in"}
                </button>
            </div>

            <div ref={addingTweetModalBgRef} className={styles.addingTweetModalBg}
                onClick={() => setIsAddingTweetModalOpen(false)}>
            </div>
            <div className={classNames(styles.addingTweetModal, {
                [styles.addingTweetModalActive]: isAddingTweetModalOpen,
            })}>
                <button className={styles.addingTweetModalCloseBtn} onClick={() => setIsAddingTweetModalOpen(false)}>
                    <Icon icon="material-symbols:close" width='24' height='24' className={'iconSvg'} />
                </button>
                <div className={styles.addingTweetComponent}>
                    <AddingTweetModal setTweets={setTweets} isAddingTweetModalOpen={isAddingTweetModalOpen} setIsAddingTweetModalOpen={setIsAddingTweetModalOpen} />
                </div>
            </div>
        </>
    )
}