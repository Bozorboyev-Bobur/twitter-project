import React, { useEffect, useRef, useState } from 'react'
import styles from "../../components/Feed/Feed.module.scss"
import { AddingTweet } from '../AddingTweet'
import TweetComponent from '../Post/Post'
import { Tweet } from '../../typings'
import { fetchTweets } from '../../utils/fetchTweets'
import { Icon } from '@iconify/react'

interface Props {
    tweets: Tweet[]
}

function Feed({ tweets: tweetsProp }: Props) {
    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
    const [isAddingTweetModalOpen, setIsAddingTweetModalOpen] = useState(false)

    const refreshTweets = async () => {
        const tweets: Tweet[] = await fetchTweets()
        setTweets(tweets)
    }

    useEffect(() => {
        refreshTweets()
    }, [])

    return (
        <div className={styles.feedContent}>
            <div className={styles.feedFixedHeader} onClick={() => {
                window.scrollTo({
                    top: 0,
                })
            }}>
                <h2 className={styles.feedTitle} onClick={() => { setIsAddingTweetModalOpen(true) }}>
                    Home
                </h2>
                <button className={styles.feedTopTweetsBtn}>
                    <Icon icon="pepicons-pop:stars" width='16' height='16' color="#0f1419" className={'iconSvg'} />
                </button>
            </div>
            <div className={styles.feedHeader}>
                <AddingTweet setTweets={setTweets} />
            </div>
            <div className={styles.feedPosts}>
                {tweets?.map(tweet => (
                    <TweetComponent key={tweet._id} tweet={tweet} tweets={tweets} />
                ))}
            </div>
        </div>
    )
}

export default Feed