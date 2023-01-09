import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { NavigationBar } from "../components/NavigationBar";
import { SideBar } from "../components/SideBar";
import styles from '../../styles/user.module.scss'
import { ReactElement, ReactHTMLElement, useEffect, useRef, useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { WHOTOFOLLOW_CONFIG } from '../constants/index'
import classNames from "classnames";
import TweetComponent from "../components/Post/Post";
import ConnectCards from "../components/ConnectCards/ConnectCards";
import { WhoToFollow } from "../components/WhoToFollow";
import { Tweet } from "../typings"
import { Icon } from "@iconify/react";
import Feed from "../components/Feed/Feed";
import { GetServerSideProps } from "next";
import { fetchTweets } from "../utils/fetchTweets"

interface Props {
    tweets: Tweet[]
    user: any
    allUsers: any
}

function User({ user, allUsers, tweets }: Props) {
    const [follow, setFollow] = useState(user.youFollowing)
    const followBtnValue = follow ? 'Following' : 'Follow'

    const followToggler = (): void => {
        setFollow(!user.youFollowing)
    }

    const userImgModalBgRef = useRef<HTMLDivElement>(null)
    const userBgImgModaBgRef = useRef<HTMLDivElement>(null)
    const userBgImgContainerRef = useRef<HTMLDivElement>(null)

    const [isImgModalOpen, setIsImgModalOpen] = useState<boolean>(false)
    const [followBtnSticky, setFollowBtnSticky] = useState<boolean>(false)

    const [isBgImgModalOpen, setIsBgImgModalOpen] = useState<boolean>(false)
    const [index, setIndex] = useState<number>(0)
    const [headerTitle, setHeaderTitle] = useState<string>('')

    const modalCloseHandler = (): void => {
        setIsImgModalOpen(false) >
            setIsBgImgModalOpen(false)
    }

    useEffect(() => {
        const followBtn: any = document.querySelector('#followBtn')
        window.addEventListener('scroll', () => {
            if (followBtn.getBoundingClientRect().top < 20) {
                setFollowBtnSticky(true)
            } else {
                setFollowBtnSticky(false)
            }
        })
    })

    useEffect(() => {
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                setIsBgImgModalOpen(false)
            }
        })
        if (isBgImgModalOpen) {
            userBgImgModaBgRef.current.style.opacity = '1'
            userBgImgModaBgRef.current.style.zIndex = '999'
            document.body.style.marginRight = '17px'
            document.body.style.overflow = 'hidden'
            setIsBgImgModalOpen(true)
        } else {
            userBgImgModaBgRef.current.style.opacity = '0'
            userBgImgModaBgRef.current.style.zIndex = '-1'
            document.body.style.overflow = 'initial'
            document.body.style.marginRight = ''
        }

        if (user.bgImg === "") {
            userBgImgContainerRef.current.style.cursor = "inherit"
        } else {
            userBgImgContainerRef.current.style.cursor = "pointer"
        }
    }, [setIsBgImgModalOpen, isBgImgModalOpen])

    useEffect(() => {
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                setIsImgModalOpen(false)
            }
        })

        if (isImgModalOpen) {
            userImgModalBgRef.current.style.opacity = '1'
            userImgModalBgRef.current.style.zIndex = '999'
            document.body.style.marginRight = '17px'
            document.body.style.overflow = 'hidden'
            setIsImgModalOpen(true)
        } else {
            userImgModalBgRef.current.style.opacity = '0'
            userImgModalBgRef.current.style.zIndex = '-1'
            document.body.style.overflow = 'initial'
            document.body.style.marginRight = ''
        }
        if (user.img === "") {
            userBgImgContainerRef.current.style.cursor = "inherit"
        } else {
            userBgImgContainerRef.current.style.cursor = "pointer"
        }
    }, [setIsImgModalOpen, isImgModalOpen])

    const tweetNick = []
    tweets.forEach((tweet) => {
        tweetNick.push(tweet.nickname)
    })

    const tweetMedias = []
    tweets.forEach((tweet) => {
        if ((user.nick === tweet.nickname) && (tweet.image !== undefined || '')) {
            tweetMedias.push(
                tweet.image
            )
        }
        if ((user.nick === tweet.nickname) && (tweet.video !== undefined || '')) {
            tweetMedias.push(
                tweet.video
            )
        }
    })

    useEffect(() => {
        if (index === 0) {
            setHeaderTitle(`${tweetNick.filter(item => item === user.nick).length} ${tweetNick.filter(item => item === user.nick).length === 1 ? 'Tweet' : 'Tweets'}`)
        }
        else if (index === 1) {
            setHeaderTitle(`${tweetNick.filter(item => item === user.nick).length} ${tweetNick.filter(item => item === user.nick).length === 1 ? 'Tweet' : 'Tweets'}`)
        }
        else if (index === 2) {
            setHeaderTitle(`${tweetMedias.length} Photos & videos`)
        }
        else if (index === 3) {
            setHeaderTitle(`${user.likedTweets && user.likedTweets.length} ${user.likedTweets && user.likedTweets.length === 1 ? 'Like' : 'Likes'}`)
        }
    })

    return (
        <>
            <div className={styles.userContainer}>
                <Head>
                    <title>
                        {user.name} (@{user.nick}) / Twitter
                    </title>
                </Head>
                <NavigationBar tweets={tweets} />
                <div className={styles.user}>
                    <div className={styles.userHeader}>
                        <div className={styles.userHeaderLeft}>
                            <div className={styles.userHeaderBackBtnContainer}>
                                <button className={styles.userHeaderBackBtn} onClick={() => {
                                    history.back()
                                }}>
                                    <Icon icon="material-symbols:arrow-back" width='24' height='24' />
                                </button>
                            </div>
                            <div className={styles.userTitle}>
                                <div className={styles.userTitleContainer}>
                                    <h2 className={styles.userTitleText}>
                                        {user.name}
                                    </h2>
                                    <div className={classNames(styles.userVerifiedImg, {
                                        [styles.verified]: user.verified,
                                    })}>
                                    </div>
                                </div>
                                <div className={styles.userTweets}>
                                    {headerTitle}
                                </div>
                            </div>
                        </div>
                        <div className={styles.userHeaderRight}>
                            <button className={classNames(styles.userBodyFixedFollowBtn, {
                                [styles.fixed]: followBtnSticky,
                            })} onClick={followToggler}>
                                {followBtnValue}
                            </button>
                        </div>
                    </div>
                    <div ref={userBgImgContainerRef} className={'userBgImgContainer'} onClick={() => {
                        if (user.bgImg === "") {
                            setIsBgImgModalOpen(false)
                        } else {
                            setIsBgImgModalOpen(true)
                        }
                    }}>
                        <style jsx >{`
                    .userBgImgContainer {
                        background-image: url(${user.bgImg});
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        width: 100%;
                        max-height: 200px;
                        min-height: 200px;
                        height: 100%;
                        top: 52px;
                        z-index: 0;
                        background-color: rgb(207, 217, 222);
                        cursor: pointer;
                    }
                    @media only screen and (max-width: 600px) {
                        .userBgImgContainer{
                            min-height: 160px
                        }
                    }
                    @media only screen and (max-width: 499px) {
                        .userBgImgContainer{
                            min-height: 140px
                        }
                    }
                    `}</style>
                    </div>
                    <div className={styles.userBody}>
                        <div className={styles.userBodyImgContainer} onClick={() => {
                            setIsImgModalOpen(true)
                        }}>
                            <img src={`${user.img || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}`} alt="" className={styles.userBodyImg} />
                        </div>
                        <div className={styles.userBodyRight}>
                            <button className={styles.userBodyMoreBtn}>
                                ...
                            </button>
                            <button id="followBtn" className={styles.userBodyFollowBtn} onClick={followToggler}>
                                {followBtnValue}
                            </button>
                        </div>
                        <div className={styles.userBodyNameContainer}>
                            <div className={styles.userBodyName}>
                                <div className={styles.userBodyNameText}>
                                    {user.name}
                                </div>
                                <div className={classNames(styles.userVerifiedImg, {
                                    [styles.verified]: user.verified,
                                })}>
                                </div>
                            </div>
                            <div className={styles.userBodyNickName}>
                                @{user.nick}
                            </div>
                        </div>
                        <div className={styles.userInfos}>
                            <div className={styles.userInfosAbout}>
                                {user.about}
                            </div>
                            <div className={styles.userInfosOtherInfos}>
                                <div className={classNames({
                                    [styles.displayNone]: !user.proAccountExistence,
                                })}>
                                    <div className={styles.userInfosOtherInfo}>
                                        <div className={styles.userInfosOtherInfosImg}>
                                            <Icon icon="gg:briefcase" width='24' height='24' color="#0f1419" className={'iconSvg'} />
                                        </div>
                                        <div className={styles.userInfosOtherInfosText}>
                                            {user.proAccount}
                                        </div>
                                        <div className={classNames(styles.userInfosOtherInfosImg, styles.userInfosOtherInfosSecondImg)}>
                                            <Icon icon="material-symbols:info-outline" width='24' height='24' color="#0f1419" className={'iconSvg'} />
                                        </div>
                                    </div>
                                </div>
                                <div className={classNames({
                                    [styles.displayNone]: !user.locationExistence,
                                })}>
                                    <div className={styles.userInfosOtherInfo}>
                                        <div className={styles.userInfosOtherInfosImg}>
                                            <Icon icon="mi:location" width='24' height='24' color="#0f1419" className={'iconSvg'} />
                                        </div>
                                        <div className={styles.userInfosOtherInfosText}>
                                            {user.location}
                                        </div>
                                    </div>
                                </div>
                                <Link href={`https://${user.otherLink}`}>
                                    <a className={classNames({
                                        [styles.displayNone]: !user.otherLinkExistence,
                                    })}>
                                        <div className={styles.userInfosOtherInfo}>
                                            <div className={styles.userInfosOtherInfosImg}>
                                                <Icon icon="ph:link-simple" width='24' height='24' color="#0f1419" className={'iconSvg'} />
                                            </div>
                                            <div className={styles.userInfosOtherInfosText}>
                                                <div className={classNames({
                                                    [styles.otherLink]: user.otherLinkExistence
                                                })}>
                                                    {user.otherLink && user.otherLink.toLowerCase()}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                                <div className={classNames({
                                    [styles.displayNone]: !user.bornDateExistence,
                                })}>
                                    <div className={styles.userInfosOtherInfo}>
                                        <div className={styles.userInfosOtherInfosImg}>
                                            <Icon icon="tabler:ballon" width='24' height='24' color="#0f1419" className={'iconSvg'} />
                                        </div>
                                        <div className={styles.userInfosOtherInfosText}>
                                            Born {user.bornDate}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.userInfosOtherInfo}>
                                    <div className={styles.userInfosOtherInfosImg}>
                                        <Icon icon="uiw:date" width='24' height='24' color="#0f1419" className={'iconSvg'} />
                                    </div>
                                    <div className={styles.userInfosOtherInfosText}>
                                        Joined {user.joined}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.userInfosFollows}>
                                <Link href={`${user.nick}/follow`}>
                                    <a className={styles.userInfosFollowings}>
                                        <div className={styles.userInfosFollowingsNum}>
                                            {user.following}
                                        </div> Following
                                    </a>
                                </Link>
                                <Link href={`${user.nick}/followers`}>
                                    <a className={styles.userInfosFollowers}>
                                        <div className={styles.userFollowersNum}>
                                            {user.followers}
                                        </div>Followers
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.userCategory}>
                        <ul className={styles.userCategoryList}>
                            <li className={`${styles.userCategoryItem} ${index === 0 ? styles.categoryActive : null}`}
                                onClick={() => {
                                    setIndex(0)
                                }}>
                                <span className={styles.userCategoryText}>
                                    Tweets
                                    <div className={styles.userCategoryStick} hidden={index !== 0}></div>
                                </span>
                            </li>
                            <li className={`${styles.userCategoryItem} ${index === 1 ? styles.categoryActive : null}`}
                                onClick={() => {
                                    setIndex(1)
                                }}>
                                <span className={styles.userCategoryText}>
                                    Tweets & replies
                                    <div className={styles.userCategoryStick} hidden={index !== 1}></div>
                                </span>
                            </li>
                            <li className={`${styles.userCategoryItem} ${index === 2 ? styles.categoryActive : null}`}
                                onClick={() => {
                                    setIndex(2)
                                }}>
                                <span className={styles.userCategoryText}>
                                    Media
                                    <div className={styles.userCategoryStick} hidden={index !== 2}></div>
                                </span>
                            </li>
                            <li className={`${styles.userCategoryItem} ${index === 3 ? styles.categoryActive : null}`}
                                onClick={() => {
                                    setIndex(3)
                                }}>
                                <span className={styles.userCategoryText}>
                                    Likes
                                    <div className={styles.userCategoryStick} hidden={index !== 3}></div>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.userContentWrapper}>
                        <div className={styles.userContent} hidden={index !== 0}>
                            <div className={styles.userConnectCardsContainer}>
                                <ConnectCards componentTitle={"Who to follow"} configName={WHOTOFOLLOW_CONFIG} />
                                <Link href={'/connect'}>
                                    <a className={styles.whoToFollowShowMoreLink}>
                                        <div className={styles.whoToFollowShowMoreText}>
                                            Show more
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            {tweets && tweets.map(tweet => {
                                if (tweet.nickname === user.nick) {
                                    return (
                                        <TweetComponent key={tweet._id} tweet={tweet} tweets={tweets} />
                                    )
                                }
                            })}
                        </div>
                        <div className={styles.userContent} hidden={index !== 1}>
                            <div className={styles.userConnectCardsContainer}>
                                <ConnectCards componentTitle={"Who to follow"} configName={WHOTOFOLLOW_CONFIG} />
                                <Link href={'/connect'}>
                                    <a className={styles.whoToFollowShowMoreLink}>
                                        <div className={styles.whoToFollowShowMoreText}>
                                            Show more
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            {tweets && tweets.map(tweet => {
                                if (tweet.nickname === user.nick) {
                                    return (
                                        <TweetComponent key={tweet._id} tweet={tweet} tweets={tweets} />
                                    )
                                }
                            })}
                        </div>
                        <div className={styles.userContent} hidden={index !== 2}>
                            {tweets && tweets.map((tweet) => {
                                if ((user.nick === tweet.nickname) && ((tweet.video !== undefined || '') || (tweet.image !== undefined || ''))) {
                                    return (
                                        <TweetComponent key={`${user.nickname}${Math.random()}`} tweet={tweet} tweets={tweets} />
                                    )
                                }
                            }
                            )}
                            {tweetMedias.length === 0 && (
                                <div className={styles.userEpmtyInteraction}>
                                    <div className={styles.userEpmtyInteractionImage}>
                                        <img src="https://abs.twimg.com/responsive-web/client-web/masked-doll-head-with-camera-400x200.v1.930b4219.png" alt="" />
                                    </div>
                                    <div className={styles.userEpmtyInteractionTitle}>
                                        @{user.nick} hasn’t Tweeted media
                                    </div>
                                    <div className={styles.userEpmtyInteractionDescription}>
                                        Once they do, those Tweets will show up here.
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={styles.userContent} hidden={index != 3}>
                            {user?.likedTweets && user?.likedTweets.map((likedTweet: any) => {
                                for (let i = 0; i < tweets.length; i++) {
                                    if (tweets[i]._id === likedTweet) {
                                        return (
                                            <TweetComponent key={tweets[i]._id} tweet={tweets[i]} tweets={tweets} />
                                        )
                                    }
                                }
                            })}
                            {user.likedTweets && user.likedTweets.length === 0 && (
                                <div className={styles.userEpmtyInteraction}>
                                    <div className={styles.userEpmtyInteractionTitle}>
                                        @{user.nick} hasn’t liked any Tweets
                                    </div>
                                    <div className={styles.userEpmtyInteractionDescription}>
                                        When they do, those Tweets will show up here.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <SideBar />
                <img src={`${user.img || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}`} alt="" className={classNames
                    (styles.userImgModal, {
                        [styles.userImgModalActive]: isImgModalOpen,
                    })} />
                <div ref={userImgModalBgRef} className={styles.userImgModalBg} onClick={() => {
                    modalCloseHandler()
                }}>
                </div>
                <img src={`${user.bigBgImg}`} alt="" className={classNames
                    (styles.userBgImgModal, {
                        [styles.userBgImgModalActive]: isBgImgModalOpen,
                    })} />
                <div ref={userBgImgModaBgRef} className={styles.userBgImgModalBg} onClick={() => {
                    modalCloseHandler()
                }}>
                </div>
            </div>
        </>
    )
}

User.getInitialProps = async (ctx: any) => {
    const response = await fetch(`http://localhost:4200/users/${ctx.query.user}`)
    const allUsersResponse = await fetch(`http://localhost:4200/users`)
    const user = await response.json()
    const allUsers = await allUsersResponse.json()
    const tweets = await fetchTweets();

    return {
        user,
        allUsers,
        tweets
    }
}

export default User