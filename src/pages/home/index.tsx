//* next-imports
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import router from "next/router"
//* react-imports
import { useEffect, useRef, useState, Dispatch, MouseEvent, SetStateAction } from "react"
//* component-imports
import { NavigationBar } from "../../components/NavigationBar/NavigationBar"
import { SideBar } from "../../components/SideBar/SideBar"
import { AddingTweetModal } from "../../components/AddingTweetModal"
import Feed from '../../components/Feed/Feed'
//* DB-imports
// import { Tweet } from "../../typings"
import { Tweet } from "../../typings"
import { fetchTweets } from "../../utils/fetchTweets"
//* style-imports
import styles from '../../../styles/home.module.scss'

interface Props {
    tweets: Tweet[]
}

export default function Home({ tweets }: Props) {
    return (
        <div className={styles.homePageContainer}>
            <Head>
                <title>
                    Home / Twitter
                </title>
            </Head>
            <NavigationBar tweets={tweets} />
            <Feed tweets={tweets} />
            <SideBar />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const tweets = await fetchTweets();
    return {
        props: {
            tweets,
        }
    }
}
