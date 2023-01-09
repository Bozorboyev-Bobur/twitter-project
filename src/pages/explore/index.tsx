import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import { NavigationBar } from "../../components/NavigationBar/NavigationBar"
import styles from '../../../styles/explore.module.scss'
import React, { useEffect, useState } from 'react'
import { Tweet } from '../../typings'
import { AddingTweet } from "../../components/AddingTweet"
import { WhoToFollow } from "../../components/WhoToFollow"
import { SearchTweet } from "../../components/SearchTweet"
import { TrendsForYou } from "../../components/TrendsForYou"
import TweetComponent from '../../components/Post/Post'
import { fetchTweets } from '../../utils/fetchTweets'

interface Props {
    tweets: Tweet[]
}

export default function Explore({ tweets: tweetsProp }: Props) {
    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)

    const refreshTweets = async () => {
        const tweets: Tweet[] = await fetchTweets()
        setTweets(tweets)
    }

    useEffect(() => {
        refreshTweets()
    }, [])

    return (
        <div className={styles.explorePageContainer}>
            <Head>
                <title>
                    Explore / Twitter
                </title>
            </Head>
            <NavigationBar tweets={tweets} />
            <div className={styles.exploreContent}>
                <div className={styles.exploreHeader}>
                    <SearchTweet />
                </div>
                <div className={styles.exploreTrendsCardsContainer}>
                    <TrendsForYou />
                    <Link href={'/connect'}>
                        <a className={styles.trendsForYouShowMoreLink}>
                            <div className={styles.trendsForYouShowMoreText}>
                                Show more
                            </div>
                        </a>
                    </Link>
                </div>
                <div className={styles.explorePosts}>
                    {tweets?.map(tweet => (
                        <TweetComponent key={tweet._id} tweet={tweet} tweets={tweets} />
                    ))}
                </div>
            </div>
            <div className={styles.whoToFollowContainer}>
                <div className={styles.whoToFollowContent}>
                    <WhoToFollow />
                </div>
            </div>
            <div className={styles.whoToFollowBg}></div>
        </div>
    )
}