import styles from '../../../styles/suggested.module.scss'
import Link from "next/link"
import Head from "next/head"
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import router from 'next/router'

function ConnectCards({ componentTitle, configName }: any) {
    

    return (
        <div className={styles.suggestedCards}>
            <div className={styles.suggestedCardsTitle}>
                <div className={styles.suggestedCardsTitleContainer}>
                    <h3 className={styles.suggestedCardsTitleText}>
                        {componentTitle}
                    </h3>
                </div>
            </div>
            {configName.map(user => (
                <div tabIndex={0} className={styles.suggestedCard} key={user.numId} onClick={() => {
                    router.push({
                        pathname: `${user.nick}`
                    });
                }}>
                    <div className={styles.suggestedDataHeader}>
                        <div tabIndex={-1} className={styles.suggestedImg}>
                            <img src={`${user.img || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}`} alt="" />
                        </div>
                        <div className={styles.suggestedData}>
                            <Link href={`${user.nick}`}>
                                <a className={styles.suggestedName}>
                                    <p className={styles.suggestedNameText}>
                                        {user.name}
                                    </p>
                                    <div className={classNames(styles.suggestedVerifiedImg, {
                                        [styles.verified]: user.verified,
                                    })}>
                                    </div>
                                </a>
                            </Link>
                            <div className={styles.suggestedUserName}>
                                {`@${user.nick}`}
                            </div>
                        </div>
                        <button className={styles.suggestedFollowBtn}>
                            Follow
                        </button>
                    </div>
                    <div className={styles.suggestedAbout}>
                        {user.about}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ConnectCards