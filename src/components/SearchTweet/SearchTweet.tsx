import styles from '../SearchTweet/SearchTweet.module.scss'
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

export const SearchTweet = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchFocus, setSearchFocus] = useState(false)

    return (
        <div className={styles.sideBarSearchContainer}>
            <div className={classNames(styles.sideBarSearchBox, {
                [styles.sideBarSeachBoxActive]: searchFocus,
            })}>
                <div className={styles.sideBarSearchImg}>
                    <Icon icon="ri:search-line" color="#71767b" />
                </div>
                <input type="search"
                    className={styles.sideBarSearchInput}
                    placeholder='Search Twitter'
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }}
                    onFocus={() => {
                        setSearchFocus(true)
                    }}
                    onBlur={() => {
                        setTimeout(() => {
                            setSearchFocus(false)
                        }, 300)
                    }}
                />
                {searchFocus && !searchTerm && (
                    <div className={styles.searchEmptyResult}>
                        <div className={styles.searchEmptyResultText}>
                            Try searching for people, topics, or keywords
                        </div>
                    </div>
                )}
                {searchFocus && searchTerm && (
                    <div className={styles.searchResultBox}>
                        <ul className={styles.searchResultList}>
                            {
                                searchTerm && db.users.filter((val) => {
                                    if (searchTerm == '') {
                                        return val
                                    }
                                    else if (val.nick.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                        return val;
                                    }
                                }).map((user) => {
                                    return (
                                        <li className={styles.searchResultCards} key={user.numId}>
                                            <div tabIndex={0} className={styles.searchResultCard} onClick={() => {
                                                router.push({
                                                    pathname: `${user.nick}`
                                                });
                                            }}>
                                                <div className={styles.searchResultDataHeader}>
                                                    <div tabIndex={-1} className={styles.searchResultImg}>
                                                        <img src={`${user.img || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}`} alt="" />
                                                    </div>
                                                    <div className={styles.searchResultData}>
                                                        <Link href={`${user.nick}`}>
                                                            <a className={styles.searchResultName}>
                                                                <p className={styles.searchResultNameText}>
                                                                    {user.name}
                                                                </p>
                                                                <div className={classNames(styles.searchResultVerifiedImg, {
                                                                    [styles.verified]: user.verified,
                                                                })}>
                                                                </div>
                                                            </a>
                                                        </Link>
                                                        <div className={styles.searchResultUserName}>
                                                            {`@${user.nick}`}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.searchResultAbout}>
                                                    {user.about}
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            <>
                                <div className={styles.searchOtherResult}>
                                    <div className={styles.searchOtherResultText}>
                                        Search for "{searchTerm}"
                                    </div>
                                </div>
                                <Link href={`${searchTerm}`}>
                                    <a className={styles.searchOtherResult}>
                                        <div className={styles.searchOtherResultText}>
                                            Go to @{searchTerm}
                                        </div>
                                    </a>
                                </Link>
                            </>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}   