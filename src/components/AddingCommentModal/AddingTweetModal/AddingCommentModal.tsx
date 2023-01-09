import React, { Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from './AddingCommentModal.module.scss'
import { useSession } from 'next-auth/react';
import { Comment, CommentBody, Tweet, TweetBody } from '../../../typings';
import { fetchTweets } from '../../../utils/fetchTweets';
import { toast } from 'react-hot-toast';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TextareaAutosize from 'react-textarea-autosize'
import classNames from 'classnames';
import { fetchComments } from '../../../utils/fetchComments';
import EmojiPicker from 'emoji-picker-react';
import moment from 'moment';
import router from 'next/router';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface Props {
    tweet: Tweet
}

export const AddingCommentModal: React.FC<Props> = ({ tweet }: Props) => {
    //refs
    const imageInputRef = useRef<HTMLInputElement>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)
    const inputContainer = useRef<HTMLDivElement>(null)
    //states
    const [textInput, setTextInput] = useState<string>('')
    const [imageInput, setImageInput] = useState<string>('')
    const [imgUrlBoxOpen, setImgUrlBoxOpen] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([])
    const [emojiPicker, setEmojiPicker] = useState<boolean>()


    const onEmojiClick = (emojiObject: any) => {
        setTextInput(prevInput => prevInput + emojiObject.emoji);
    }

    useEffect(() => {
        if (imageInput.trim() !== '' && imageInput !== '') {
            inputContainer.current.style.minHeight = '52px'
        }
    })

    const { data: session } = useSession()

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        if (!imageInputRef.current?.value) return

        setImageInput(imageInputRef.current.value)
        imageInputRef.current.value = ''
        setImgUrlBoxOpen(false)
    }

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id)
        setComments(comments)
    }

    useEffect(() => {
        refreshComments()
    }, [])

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        const commentToast = toast.loading('Posting Comment...')

        // Comment logic
        const comment: CommentBody = {
            text: textInput,
            nickname: session?.user?.name || 'Unknown User',
            tweetId: tweet._id,
            username: session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
            image: imageInput,
        }

        const result = await fetch(`/api/addComment`, {
            body: JSON.stringify(comment),
            method: 'POST',
        })

        toast.success('Comment Posted!', {
            id: commentToast,
        })

        setTextInput('')
        refreshComments()
    }

    // progress bar logic
    const [progressBarPathColor, setProgressBarPathColor] = useState<string>('rgb(29, 155, 240)')
    const [progressBarTextSize, setProgressBarTextSize] = useState<string>('0rem')
    const [progressBarTextColor, setProgressBarTextColor] = useState<string>('inherit')
    const [progressBarTrailColor, setProgressBarTrailColor] = useState<string>('rgb(239, 243, 244)')

    useEffect(() => {
        if (textInput.length >= 260) {
            setProgressBarPathColor('rgb(255, 212, 0)')
            progressBarRef.current.style.transform = 'scale(1.5)'
            setProgressBarTextSize('2.5rem')
            setProgressBarTextColor('rgb(255, 212, 0)')
        } else if (textInput.length < 260) {
            setProgressBarPathColor('rgb(29, 155, 240)')
            progressBarRef.current.style.transform = 'scale(1.1)'
            setProgressBarTextSize('0')
            setProgressBarTrailColor('rgb(239, 243, 244)')
        }
        if (textInput.length >= 280) {
            setProgressBarPathColor('rgb(244, 33, 46)')
            setProgressBarTextColor('rgb(244, 33, 46)')
        }
        if (textInput.length >= 290) {
            setProgressBarTrailColor('transparent')
            setProgressBarPathColor('transparent')
        }
    })

    return (
        <>
            <div className={styles.addingTweetModalHeader}>
                <button disabled={!textInput || textInput.trim() === '' || !session || 280 - textInput.length < 0} className={`${styles.addingTweetTweetBtnFixed}`}
                    onClick={handleSubmit}
                >
                    Tweet
                </button>
            </div>
            <div className={styles.postContainer}>
                <div className={styles.postLeft}>
                    <div className={styles.logo}>
                        <img className={styles.logoImg} src={`${tweet.profileImg}`} alt="LOGO" />
                    </div>
                    <hr className={styles.postCommentLine} />
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
                    </div>
                    <div className={styles.postContentContainer}>
                        <div className={styles.postContentTextContainer}>
                            <p className={styles.postContentText}>
                                {tweet.text}
                            </p>
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
                </div>
            </div>
            <div className={styles.addingTweetContainer}>
                <div className={styles.addingTweetLeft}>
                    <img src={session?.user?.image || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"} alt="" className={styles.addingTweetImg} />
                </div>
                <div className={styles.addingTweetRight}>
                    <div ref={inputContainer} className={styles.addingTweetTextInputContainer} >
                        <TextareaAutosize
                            id={'textareaRef'}
                            value={textInput}
                            onChange={(e => setTextInput(e.target.value))}
                            className={styles.addingTweetTextInput}
                            placeholder='Tweet your reply'>
                        </TextareaAutosize>
                    </div>
                    {imageInput && imageInput.trim() !== '' && <div className={styles.addingTweetContent}>
                        <button className={styles.addingTweetImgContentDeleteBtn} onClick={() => setImageInput('')}>
                            <Icon icon="material-symbols:close" width='24' height='24' className={'iconSvg'} />
                        </button>
                        <img className={styles.addingTweetImgContent} onError={() => {
                            setImageInput('')
                            toast.error("Error Image URL")
                        }} src={imageInput} alt="Error" />
                    </div>}
                    <div className={styles.addingTweetFooter}>
                        <div className={styles.addingTweetFooterInputs}>
                            <div className={styles.addingTweetFooterItemBox}>
                                <div onClick={() => setImgUrlBoxOpen(!imgUrlBoxOpen)}
                                    className={styles.addingTweetFooterItemInput}>
                                </div>
                                <Icon icon={"ph:image-square-bold"} width='20' height='20' color='#1d9bf0' />
                            </div>
                            <div className={styles.addingTweetFooterItemBox}>
                                <Icon icon={"ic:outline-gif-box"} width='20' height='20' color='#1d9bf0' />
                            </div>
                            <div className={styles.addingTweetFooterItemBox}>
                                <Icon icon={"teenyicons:list-layout-outline"} width='18' height='18' color='#1d9bf0' />
                            </div>
                            <div className={styles.addingTweetFooterItemBox}
                                onClick={() => setEmojiPicker(!emojiPicker)}>
                                <Icon icon={"mdi:emoji-happy-outline"} width='20' height='20' color='#1d9bf0' />
                            </div>
                            <div className={styles.addingTweetFooterItemBox}>
                                <Icon icon={"akar-icons:schedule"} width='20' height='20' color='#1d9bf0' />
                            </div>
                            <div className={styles.addingTweetFooterItemBox}>
                                <Icon icon={"mi:location"} width='20' height='20' color='#1d9bf0' />
                            </div>
                        </div>
                        <div className={styles.addingTweetFooterRight}>
                            <div ref={progressBarRef} className={styles.addingTweetProgressBar} hidden={textInput.trim() === '' || !textInput}>
                                <CircularProgressbar
                                    value={textInput.trim() !== '' && (textInput.length)}
                                    text={`${280 - textInput.length}`}
                                    maxValue={280}
                                    minValue={0}
                                    styles={buildStyles({
                                        pathColor: progressBarPathColor,
                                        trailColor: progressBarTrailColor,
                                        textColor: progressBarTextColor,
                                        pathTransitionDuration: 0,
                                        textSize: progressBarTextSize,
                                    }
                                    )}
                                />
                            </div>
                            {emojiPicker && (
                                <>
                                    {/* <div className={classNames(styles.emojiPickerFormBg, {
                                        [styles.emojiPickerFormBgActive]: emojiPicker
                                    })
                                    } onClick={() => { setEmojiPicker(false) }}>
                                    </div> */}
                                    <div className={styles.addingTweetEmojiForm}>
                                        <EmojiPicker onEmojiClick={onEmojiClick} />
                                    </div>
                                </>
                            )}
                            <button disabled={(!imageInput && imgUrlBoxOpen) || !textInput || textInput.trim() === '' || !session || 280 - textInput.length < 0} className={styles.addingTweetTweetBtn} onClick={handleSubmit}>
                                Tweet
                            </button>
                        </div>
                    </div>
                    {imgUrlBoxOpen && (
                        <form className={styles.addingTweetImgUrlBox}>
                            <input className={styles.addingTweetImgUrlInput} ref={imageInputRef} type="text" placeholder="Enter Image URL" />
                            <button className={styles.addingTweetImgUrlButton} type='submit' onClick={addImageToTweet}>Add Image</button>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}