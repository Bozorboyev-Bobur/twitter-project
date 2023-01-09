import React, { Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from './AddingTweetModal.module.scss'
import { useSession } from 'next-auth/react';
import { Tweet, TweetBody } from '../../typings';
import { fetchTweets } from '../../utils/fetchTweets';
import { toast } from 'react-hot-toast';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TextareaAutosize from 'react-textarea-autosize'
import classNames from 'classnames';
import EmojiPicker from 'emoji-picker-react';
import { Icon } from '@iconify/react';

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

export interface IAddingTweetModalProps {
    isAddingTweetModalOpen: boolean,
    setIsAddingTweetModalOpen: Function
}

export const AddingTweetModal: React.FC<IAddingTweetModalProps & Props> = (
    { setTweets }: Props, {
        isAddingTweetModalOpen,
        setIsAddingTweetModalOpen
    }: IAddingTweetModalProps
) => {
    //refs
    const imageInputRef = useRef<HTMLInputElement>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)
    const inputContainer = useRef<HTMLDivElement>(null)
    //states
    const [textInput, setTextInput] = useState<string>('')
    const [imageInput, setImageInput] = useState<string>('')
    const [showPicker, setShowPicker] = useState(false)
    const [imgUrlBoxOpen, setImgUrlBoxOpen] = useState<boolean>(false);
    const [emojiPicker, setEmojiPicker] = useState<boolean>()


    const onEmojiClick = (emojiObject: any) => {
        setTextInput(prevInput => prevInput + emojiObject.emoji);
    }

    const { data: session } = useSession()

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        if (!imageInputRef.current?.value) return

        setImageInput(imageInputRef.current.value)
        imageInputRef.current.value = ''
        setImgUrlBoxOpen(false)
    }

    useEffect(() => {
        if (imageInput.trim() !== '' && imageInput !== '') {
            inputContainer.current.style.minHeight = '52px'
        }
    })

    const postTweet = async () => {
        const postingToast = toast.loading('Tweet Posting')

        const tweetInfo: TweetBody = {
            text: textInput,
            username: session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
            image: imageInput,
            nickname: session?.user?.name || 'Unknown User',
            verified: false
        }

        const result = await fetch(`api/addTweet/`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST',
        })

        const json = await result.json()


        toast.success('Tweet Posted', {
            id: postingToast
        })

        const newTweets = await fetchTweets()
        setTweets(newTweets)

        return json
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        postTweet()

        setTextInput('')
        setImageInput('')
        setImgUrlBoxOpen(false)
    }

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
                <button disabled={!textInput || textInput.trim() === '' || !session || 280 - textInput.length < 0} className={`${styles.addingTweetTweetBtnFixed}`} onClick={handleSubmit}>
                    Tweet
                </button>
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
                            placeholder='What’s happening?'>
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