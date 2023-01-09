import { LOGIN_CONFIG } from '../../constants/index'
import Head from "next/head"
import Link from "next/link"
import styles from '../../components/IndexPage/IndexPage.module.scss'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import router from 'next/router'
import { Icon } from '@iconify/react'

export interface IIndexPageProps {
    setIsSignUpModalOpen: Function
    setIsSignInModalOpen: Function
}
export const IndexPage: React.FC<IIndexPageProps> = ({
    setIsSignUpModalOpen,
    setIsSignInModalOpen,
}: IIndexPageProps) => {
    const date = new Date
    const { data: session } = useSession()
    useEffect(() => {
        if (session) {
            router.push({
                pathname: '/home'
            });
        }
    }, [session])
    return (
        <>
            <div className={styles.indexPageDiv} >
                <Head>
                    <title>
                        Twitter. Everything that happens here is discussed. / Twitter
                    </title>
                    <meta name="description" content="" />
                    <meta charSet="utf-8" />
                </Head>
                <div className={styles.indexLeft}>
                    <div className={styles.indexLeftImgs}>
                        <Icon icon={"uiw:twitter"} width='auto' height='auto' color='#fff' className={styles.indexLeftTwitterLogo} />
                    </div>
                </div>
                <div className={styles.indexRight}>
                    <div className={styles.indexRightContainer}>
                        <div className={styles.indexRightTwitterLogo}>
                            <Icon icon={"ion:logo-twitter"} width='auto' height='auto' color='#1d9bf0' className={'twitterLogo'} />
                        </div>
                        <h1 className={styles.indexRightH1}>
                            Happening now
                        </h1>
                        <h2 className={styles.indexRightH2}>
                            Join Twitter today
                        </h2>
                        <button className={styles.indexRightSignUpBtn} onClick={() => {

                        }}>
                            <Icon icon={"flat-color-icons:google"} width='auto' height='auto' color='#fff' className={styles.indexRightSignUpImg} />
                            Sign up with Google
                        </button>
                        <button className={styles.indexRightSignUpBtn}>
                            <Icon icon={"logos:apple"} color='#fff' className={styles.indexRightSignUpImg} />
                            Sign up with Apple
                        </button>
                        <button tabIndex={0} className={styles.indexRightSignUpBtn}
                            onClick={() => {
                                setIsSignUpModalOpen(true)
                            }}>
                            Sign up with phone or email
                        </button>
                        <div className={styles.agreements}>
                            By singing up you agree to the <a href="https://twitter.com/ru/tos">Terms of Service</a> and <a href="https://twitter.com/ru/privacy">Privacy Policy</a>, including <a href="https://help.twitter.com/ru/rules-and-policies/twitter-cookies">Cookie Use</a>.
                        </div>
                        <div className={styles.indexRightLogInBox}>
                            Already have an account?
                            <button tabIndex={0} className={styles.indexRightLogInBtn}
                                onClick={() => {
                                    session ? signOut() : signIn()
                                }}>
                                {session ? "Sing out" : "Sign in"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={styles.indexFooter}>
                <ul className={styles.indexFooterLinks}>
                    {LOGIN_CONFIG.map(item => (
                        <li key={item.label}
                            className={styles.indexFooterlinksItem}
                        >
                            <a href={`${item.link}`}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                    <li className={styles.indexFooterlinksItem}>
                        © Twitter, Inc., {date.getFullYear()}.
                    </li>
                </ul>
            </footer>
        </>
    )
}
