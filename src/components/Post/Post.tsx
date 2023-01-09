import classNames from 'classnames';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import styles from '../Post/Post.module.scss'
import { Tweet, Comment, CommentBody } from "../../typings"
import router from 'next/router';
import { fetchComments } from '../../utils/fetchComments';
import { useSession } from 'next-auth/react';
import moment from 'moment/moment';
import toast from 'react-hot-toast';
import { AddingTweetModal } from '../AddingTweetModal';
import { AddingCommentModal } from '../AddingCommentModal/AddingTweetModal';
import { Icon } from '@iconify/react';

interface Props {
    tweet: Tweet
    tweets: Tweet[]
}

function Post({ tweet, tweets: tweetsProp }: Props) {
    const { data: session } = useSession()
    const [comments, setComments] = useState<Comment[]>([])
    const addingTweetModalBgRef = useRef<HTMLDivElement>(null)
    const [isAddingCommentModalOpen, setIsAddingCommentModalOpen] = useState<boolean>(false)


    useEffect(() => {
        if (isAddingCommentModalOpen) {
            addingTweetModalBgRef.current.style.zIndex = '9989'
            addingTweetModalBgRef.current.style.opacity = '1'
            document.body.style.marginRight = '17px'
            document.body.style.overflow = 'hidden'
            setIsAddingCommentModalOpen(true)
        } else {
            addingTweetModalBgRef.current.style.zIndex = '-1'
            addingTweetModalBgRef.current.style.opacity = '0'
            document.body.style.overflow = ''
            document.body.style.marginRight = ''
        }
    })

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id)
        setComments(comments)
    }

    useEffect(() => {
        refreshComments()
    }, [])

    return (
        <>
            <div className={styles.postAndCommentContainer} key={(tweet._id)} >
                <div className={styles.postContainer}>
                    <div className={styles.postLeft}>
                        <div className={styles.logo}>
                            <img className={styles.logoImg} src={`${tweet.profileImg}`} alt="LOGO" />
                        </div>
                    </div>
                    <div className={styles.postRight}>
                        <div className={styles.postHeader}>
                            <div className={styles.postHeaderLeft}>
                                <div className={styles.postHeaderTop}>
                                    <div className={styles.postUserName} onClick={() =>
                                        router.push(
                                            {
                                                pathname: `${tweet.nickname || tweet.username}`
                                            }
                                        )
                                    }>
                                        <p className={styles.postUserNameText}>
                                            {tweet.username}
                                        </p>
                                        <div className={classNames(styles.tweetVerifiedImg, {
                                            [styles.verified]: tweet.verified,
                                        })}>
                                        </div>
                                    </div>
                                    <div className={styles.postUserNick}>
                                        <p className={styles.postUserNickText}>
                                            @{tweet.nickname || tweet.username.toLocaleLowerCase()}
                                        </p>
                                    </div>
                                    <div className={styles.postHeaderDot}>
                                        ·
                                    </div>
                                    <div className={styles.postDate}>
                                        {moment(tweet._createdAt).fromNow()}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.postHeaderRight}>
                                <button className={styles.postHeaderTripleDots}>···</button>
                            </div>
                        </div>
                        <div className={styles.postContentContainer}>
                            <div className={styles.postContentTextContainer}>
                                <p className={styles.postContentText}>
                                    {tweet.text}
                                </p>
                            </div>
                            <div className={styles.postMediasContainer}>
                                <div className={styles.postMediasContent}>
                                    <div className={styles.postMedias} key={Math.random()}>
                                        {
                                            tweet.video && <div className={styles.postContentVideoContainer}>
                                                <video min-width="0" min-height="0" src={tweet.video} controls={true} className={styles.postVideoContent} autoPlay muted loop >
                                                </video>
                                            </div>
                                        }
                                        {
                                            tweet.image && <div className={styles.postContentImgContainer}>
                                                <img className={styles.postImgContent} src={tweet.image} alt="" />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.postFooter}>
                            <div className={styles.postFooterItem} onClick={(e) => {
                                setIsAddingCommentModalOpen(!isAddingCommentModalOpen)
                            }}>
                                <div className={styles.postFooterItemImg}>
                                    <Icon icon={"fluent:comment-28-regular"} width='20' height='20' />
                                </div>
                                <div className={styles.postFooterItemText}>
                                    {tweet._id === tweet._id && comments.length}
                                </div>
                            </div>
                            <div className={styles.postFooterItem}>
                                <div className={styles.postFooterItemImg}>
                                    <Icon icon={"system-uicons:retweet"} width='20' height='20' />
                                </div>
                                <div className={styles.postFooterItemText}>
                                    {tweet.retweet}
                                </div>
                            </div>
                            <div className={styles.postFooterItem}>
                                <div className={styles.postFooterItemImg}>
                                    <Icon icon={"ph:heart"} width='20' height='20' />
                                </div>
                                <div className={styles.postFooterItemText}>
                                    {tweet.like}
                                </div>
                            </div>
                            <div className={styles.postFooterShareBtn}>
                                <Icon icon={"quill:share"} width='20' height='20' />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    comments?.length > 0 && (
                        <div className={styles.postComment}>
                            <div className={styles.postCommentContainer}>
                                {comments.map(comment => (
                                    <div className={styles.postCommentBox} key={comment._id}>
                                        <div className={styles.postCommentLeft}>
                                            <img className={styles.postCommentProfileImg} src={comment.profileImg} alt="fwe" onClick={() => {
                                                router.push({
                                                    pathname: `${comment.nickname}`
                                                });
                                            }} />
                                        </div>
                                        <hr className={styles.postCommentLine} />
                                        <div className={styles.postCommentRight}>
                                            <div className={styles.postCommentHeader}>
                                                <div className={styles.postCommentHeaderLeft}>
                                                    <Link href={`${comment.nickname}`}>
                                                        <a className={styles.postCommentUserName}>
                                                            {comment.username}
                                                        </a>
                                                    </Link>
                                                    <div className={classNames(styles.tweetVerifiedImg, {
                                                        [styles.verified]: comment.verified,
                                                    })}>
                                                    </div>
                                                    <div className={styles.postCommentNick}>
                                                        @{comment.nickname || session?.user?.name.toLocaleLowerCase()}
                                                    </div>
                                                    <div className={styles.postHeaderDot}>
                                                        ·
                                                    </div>
                                                    <div className={styles.postCommentDate}>
                                                        {moment(comment._createdAt).fromNow()}
                                                    </div>
                                                </div>
                                                <div className={styles.postCommentHeaderRight}>
                                                    <button className={styles.postHeaderTripleDots}>···</button>
                                                </div>
                                            </div>
                                            <div className={styles.postCommentReplying}>
                                                <span>Replying to </span>
                                                <Link href={tweet?.nickname || tweet?.username.toLocaleLowerCase()}>
                                                    <a className={styles.postCommentReplyingNickName}>
                                                        @{tweet?.nickname || tweet?.username.toLocaleLowerCase()}
                                                    </a>
                                                </Link>
                                            </div>
                                            <div className={styles.postCommentContent}>
                                                <div className={styles.postCommentTextContainer}>
                                                    <p className={styles.postCommentText}>
                                                        {comment.text}
                                                    </p>
                                                </div>
                                                {
                                                    comment.image && <div className={styles.postCommentImgContainer}>
                                                        <img className={styles.postCommentImgContent} src={comment.image} alt="" />
                                                    </div>
                                                }
                                            </div>
                                            <div className={styles.postFooter}>
                                                <div className={styles.postFooterItem}>
                                                    <div className={styles.postFooterItemImg}>
                                                        <Icon icon={"fluent:comment-28-regular"} width='20' height='20' />
                                                    </div>
                                                    <div className={styles.postFooterItemText}>
                                                        0
                                                    </div>
                                                </div>
                                                <div className={styles.postFooterItem}>
                                                    <div className={styles.postFooterItemImg}>
                                                        <Icon icon={"system-uicons:retweet"} width='20' height='20' />
                                                    </div>
                                                    <div className={styles.postFooterItemText}>
                                                        {tweet.retweet}
                                                    </div>
                                                </div>
                                                <div className={styles.postFooterItem}>
                                                    <div className={styles.postFooterItemImg}>
                                                        <Icon icon={"ph:heart"} width='20' height='20' />
                                                    </div>
                                                    <div className={styles.postFooterItemText}>
                                                        {tweet.like}
                                                    </div>
                                                </div>
                                                <div className={styles.postFooterShareBtn}>
                                                    <Icon icon={"quill:share"} width='20' height='20' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
            </div >
            <div ref={addingTweetModalBgRef} className={styles.addingTweetModalBg}
                onClick={() => setIsAddingCommentModalOpen(false)}>
            </div>
            <div className={classNames(styles.addingTweetModal, {
                [styles.addingTweetModalActive]: isAddingCommentModalOpen,
            })}>
                <button className={styles.addingTweetModalCloseBtn} onClick={() => setIsAddingCommentModalOpen(false)}>
                    <Icon icon="material-symbols:close" width='24' height='24' className={'iconSvg'} />
                </button>
                <div className={styles.addingTweetComponent}>
                    <AddingCommentModal tweet={tweet} />
                </div>
            </div>
        </>
    )
}
export default Post