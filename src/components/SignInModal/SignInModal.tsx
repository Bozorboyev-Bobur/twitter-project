import React, { useState, useRef, useEffect } from 'react'
import Head from "next/head"
import Link from "next/link"
import styles from '../../components/SignInModal/SignInModal.module.scss'
import Router, { useRouter } from 'next/router'
import classNames from 'classnames'

export interface ISignInModalProps {
    isSignInModalOpen: boolean
    setIsSignInModalOpen: Function
}

export const SignInModal: React.FC<ISignInModalProps> = ({
    isSignInModalOpen,
    setIsSignInModalOpen
}: ISignInModalProps) => {
    const router = useRouter()
    // States
    const [imgSrc, setImgSrc] = useState(false)
    const [inputType, setInputType] = useState(false)
    // Refs
    const signInModalBgRef = useRef<HTMLDivElement>(null)
    const eyeBtnRef = useRef(null)
    const passwordRef = useRef(null)
    // Variables
    const toggleImgSrc = imgSrc ? '../imgs/SignInModal/eyeLook.svg' : '../imgs/SignInModal/eyeNoLook.svg',
        toggleInputType = inputType ? 'text' : 'password'
    // Functions
    const srcHandler = () => {
        setImgSrc(imgSrc => !imgSrc)
        setInputType(inputType => !inputType)
    }
    const getEyeShow = () => {
        if (passwordRef.current.value.length > 0) {
            eyeBtnRef.current.style.display = 'flex'
        } else if (passwordRef.current.value.length === 0) {
            eyeBtnRef.current.style.display = 'none'
        }
    }
    const modalCloseHandler = (): void => {
        setIsSignInModalOpen(false)
    }

    useEffect(() => {
        if (isSignInModalOpen && window.navigator.platform === `${'Win32' || 'Win64'}`) {
            document.body.style.marginRight = '17px'
            document.body.style.overflow = 'hidden'
            setIsSignInModalOpen(true)
            signInModalBgRef.current.style.opacity = '.55'
            signInModalBgRef.current.style.zIndex = '999'
        }
        else if (isSignInModalOpen && window.navigator.platform === 'MacIntel') {
            document.body.style.overflow = 'hidden'
        }
        else {
            signInModalBgRef.current.style.opacity = '0'
            signInModalBgRef.current.style.zIndex = '-1'
            document.body.style.overflow = ''
            document.body.style.marginRight = '0'
            document.body.style.overflow = ''
        }
    })

    return (
        < div className={styles.signInModalDiv} >
            <Head>
                <title>
                    Login to Twitter / Twitter
                </title>
                <meta name="description" content="" />
                <meta charSet="utf-8" />
            </Head>
            <div className={classNames
                (styles.signInModalContainer, {
                    [styles.signInModalActive]: isSignInModalOpen,
                })}>
                <div className={styles.signInModalLogoContainer}>
                    <div className={styles.twitterLogo}>
                        <svg width="256px" height="209px" viewBox="0 0 256 209" version="1.1" xmlns="http://www.w3.org/2000/svg" className={"twitterLogo"} preserveAspectRatio="xMidYMid">
                            <g>
                                <path d="M256,25.4500259 C246.580841,29.6272672 236.458451,32.4504868 225.834156,33.7202333 C236.678503,27.2198053 245.00583,16.9269929 248.927437,4.66307685 C238.779765,10.6812633 227.539325,15.0523376 215.57599,17.408298 C205.994835,7.2006971 192.34506,0.822 177.239197,0.822 C148.232605,0.822 124.716076,24.3375931 124.716076,53.3423116 C124.716076,57.4586875 125.181462,61.4673784 126.076652,65.3112644 C82.4258385,63.1210453 43.7257252,42.211429 17.821398,10.4359288 C13.3005011,18.1929938 10.710443,27.2151234 10.710443,36.8402889 C10.710443,55.061526 19.9835254,71.1374907 34.0762135,80.5557137 C25.4660961,80.2832239 17.3681846,77.9207088 10.2862577,73.9869292 C10.2825122,74.2060448 10.2825122,74.4260967 10.2825122,74.647085 C10.2825122,100.094453 28.3867003,121.322443 52.413563,126.14673 C48.0059695,127.347184 43.3661509,127.988612 38.5755734,127.988612 C35.1914554,127.988612 31.9009766,127.659938 28.694773,127.046602 C35.3777973,147.913145 54.7742053,163.097665 77.7569918,163.52185 C59.7820257,177.607983 37.1354036,186.004604 12.5289147,186.004604 C8.28987161,186.004604 4.10888474,185.75646 0,185.271409 C23.2431033,200.173139 50.8507261,208.867532 80.5109185,208.867532 C177.116529,208.867532 229.943977,128.836982 229.943977,59.4326002 C229.943977,57.1552968 229.893412,54.8901664 229.792282,52.6381454 C240.053257,45.2331635 248.958338,35.9825545 256,25.4500259" fill="#55acee"></path>
                            </g>
                        </svg>
                    </div>
                    <button className={styles.signInModalCloseBtn} onClick={modalCloseHandler}>
                        <div className={styles.signInModalCloseImg}>
                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" className={'iconSvg'} viewBox="0 0 50 50" width="50px" height="50px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" /></svg>
                        </div>
                    </button>
                </div>
                <h1 className={styles.signInModalTitle}>
                    Log in to Twitter
                </h1>
                <div className={styles.signInModalInputs}>
                    <input className={styles.signInModalInput} placeholder={'Phone number, email address'} type="text" />
                    <input ref={passwordRef} className={styles.signInModalInput} placeholder={'Password'} type={toggleInputType}
                        onChange={getEyeShow}
                    />
                    <button ref={eyeBtnRef} className={styles.signInModalInputEye}
                        onClick={
                            srcHandler
                        } >
                        <img src={toggleImgSrc} alt=""
                        />
                    </button>
                </div>

                <button className={styles.signInModalBtn}>
                    Log In
                </button>
                <div className={styles.signInModalLinks}>
                    <a className={styles.signInModalLink} href='https://twitter.com/i/flow/password_reset?input_flow_data=%7B%22requested_variant%22%3A%22eyJwbGF0Zm9ybSI6IlJ3ZWIifQ%3D%3D%22%7D'>Forgot password?</a>
                    <Link href='/signup'>
                        <a className={styles.signInModalLink} >Sign up to Twitter</a>
                    </Link>
                </div>
            </div>
            <div ref={signInModalBgRef} className={styles.signInModalBg} onClick={() => {
                modalCloseHandler()
            }}></div>
        </div >
    )
}