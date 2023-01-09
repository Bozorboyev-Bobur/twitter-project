import React, { useState, useRef, useEffect } from 'react'
import Head from "next/head"
import styles from '../../components/SignUpModal/SignUpModal.module.scss'
import classNames from 'classnames'
import { SignUpDates } from '../SignUpDates'
import router, { useRouter } from 'next/router'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { CODE_PREFIXES } from '../../constants'
import { Icon } from '@iconify/react'

export interface ISignUpModalProps {
    isSignUpModalOpen: boolean
    setIsSignUpModalOpen: Function
}

export const SignUpModal = ({
    isSignUpModalOpen,
    setIsSignUpModalOpen

}: ISignUpModalProps) => {
    const { data: session } = useSession()
    // States
    const [inputType, setInputType] = useState(false),
        [name, setName] = useState<string>(''),
        [data, setData] = useState<string>(''),
        [lengthCounter, setLengthCounter] = useState(0),
        [isFormValid, setIsFormValid] = useState<boolean>(false),
        [signUpModalState, setSignUpModalState] = useState<string>('initial')
    // Refs
    const signUpModalBgRef = useRef<HTMLDivElement>(null),
        submitBtnRef = useRef<HTMLInputElement>(null),
        dataRef = useRef<HTMLInputElement>(),
        nameRef = useRef<HTMLInputElement>(),
        nameInputLengthCounterRef = useRef<HTMLDivElement>()
    // Variables
    const signUpInputType = inputType ? 'email' : 'tel',
        signUpInputPlaceHolder = inputType ? 'Email' : 'Phone',
        signUpEmailTogglerBtn = inputType ? 'Use phone instead' : 'Use email instead',
        date = new Date
    // Functions
    const signUpInputToggler = (): void => {
        setInputType(inputType => !inputType)
        setData('')
        setIsFormValid(false)
    }
    const modalCloseHandler = (): void => {
        setIsSignUpModalOpen(false)
        setSignUpModalState('initial')
        setName('')
        setData('')
        setIsFormValid(false)
    }

    useEffect(() => {
        if (session) {
            router.push({
                pathname: '/home'
            });
        }
    }, [session])

    useEffect(() => {
        if (isSignUpModalOpen && window.navigator.platform === `${'Win32' || 'Win64'}`) {
            document.body.style.marginRight = '17px'
            document.body.style.overflow = 'hidden'
            signUpModalBgRef.current.style.opacity = '.55'
            signUpModalBgRef.current.style.zIndex = '999'
            setIsSignUpModalOpen(true)
        }
        else if (isSignUpModalOpen && window.navigator.platform === 'MacIntel') {
            document.body.style.overflow = 'hidden'
            signUpModalBgRef.current.style.opacity = '.55'
            signUpModalBgRef.current.style.zIndex = '999'
            setIsSignUpModalOpen(true)
        }
        else {
            document.body.style.overflow = ''
            signUpModalBgRef.current.style.opacity = '0'
            signUpModalBgRef.current.style.zIndex = '-1'
            document.body.style.marginRight = '0'
        }
    })

    useEffect(() => {
        setIsFormValid(
            ((dataRef.current.value.slice(-10) === '@gmail.com' && dataRef.current.type === 'email' && dataRef.current.value.length > 10) ||
                (dataRef.current.value.slice(0, 4) === '+998' && dataRef.current.value.length === 13 && CODE_PREFIXES.includes(data.slice(4, 6)) &&
                    dataRef.current.type === 'tel')) &&
            nameRef.current.value.length > 0,
        )

    }, [name, data])

    useEffect(() => {
        setLengthCounter(nameRef.current.value.length)
    }, [name])

    const formValidFunc = () => {
        {
            submitBtnRef.current
            if (isFormValid) {
                submitBtnRef.current.disabled = false
            } else {
                submitBtnRef.current.disabled = true
            }
        }
    }

    const getNameLengthCounterShow = () => {
        nameInputLengthCounterRef.current.style.display = 'flex'
    }
    const getNameLengthCounterNoShow = () => {
        nameInputLengthCounterRef.current.style.display = 'none'
    }

    if (signUpModalState === 'initial') {
        return (
            <>
                <div>
                    <div className={classNames(styles.signUpModalContainer, {
                        [styles.signUpModalActive]: isSignUpModalOpen,
                    })}>
                        <div className={styles.signUpModalHeader}>
                            <button className={styles.signUpModalCloseBtn} onClick={modalCloseHandler}>
                                <div className={styles.loginPageCloseImg}>
                                    <Icon icon="material-symbols:close" width='24' height='24' className={'iconSvg'} />
                                </div>
                            </button>
                            <span className={styles.signUpModalStep}>
                                Step 1 of 3
                            </span>
                        </div>
                        <div className={styles.signUpModalContent}>
                            <h2 className={styles.signUpModalTitle}>
                                Create your account
                            </h2>
                            <div className={styles.signUpModalInputs}>
                                <input
                                    id={"name"}
                                    value={name}
                                    ref={nameRef}
                                    className={styles.signUpModalNameInput}
                                    type="text"
                                    maxLength={50}
                                    required
                                    onChange={(e) => {
                                        setName(e.target.value)
                                        formValidFunc()
                                    }}
                                    onFocus={getNameLengthCounterShow}
                                    onBlur={getNameLengthCounterNoShow}
                                />
                                <label htmlFor={"name"} className={styles.signUpModalNameInputLabel}>
                                    Name
                                </label>
                                <div ref={nameInputLengthCounterRef} className={styles.signupModalNameInputCounter}>
                                    {lengthCounter} / 50
                                </div>
                                <input id={"data"}
                                    value={data}
                                    ref={dataRef}
                                    className={styles.signUpModalDataInput}
                                    type={signUpInputType}
                                    required
                                    onChange={(e) => {
                                        setData(e.target.value)
                                        formValidFunc()
                                    }}
                                />
                                <label htmlFor={"data"} className={styles.signUpModalDataInputLabel}>
                                    {signUpInputPlaceHolder}
                                </label>
                            </div>
                            <button className={styles.signUpModalEmailTogglerBtn}
                                onClick={() =>
                                    signUpInputToggler()
                                }>
                                {signUpEmailTogglerBtn}
                            </button>
                            <SignUpDates />
                        </div>
                        <input
                            className={styles.signUpModalNextBtn}
                            disabled={!isFormValid}
                            type='submit'
                            value='Next'
                            ref={submitBtnRef}
                            onClick={() => {
                                setSignUpModalState('confirmation')
                            }} />
                    </div>
                </div>
                <div ref={signUpModalBgRef} className={styles.signUpModalBg}
                    onClick={() => modalCloseHandler()
                    } />
            </>
        )
    } else if (signUpModalState === 'confirmation') {
        return (
            <>
                <div>
                    <div className={classNames(styles.signUpModalContainer, {
                        [styles.signUpModalActive]: isSignUpModalOpen,
                    })}>
                        <div className={styles.signUpModalHeader}>
                            <button className={styles.signUpModalCloseBtn}
                                onClick={() => {
                                    setSignUpModalState('initial')
                                }}>
                                <div className={styles.loginPageCloseImg}>
                                    <Icon icon="material-symbols:close" width='24' height='24' className={'iconSvg'} />
                                </div>
                            </button>
                            <span className={styles.signUpModalStep}>
                                Step 2 of 3
                            </span>
                        </div >
                        <div className={styles.signUpModalContent}>
                            <h2 className={styles.signUpModalTitle}>
                                Customize Twitter the way you want
                            </h2>
                            <h3 className={styles.signUpModalSecondTitle}>
                                Track which sites are serving Twitter content
                            </h3>
                            <div className={styles.signUpModalAgreementContainer}>
                                <label htmlFor={'agree'} className={styles.signUpModalAgreementText}>
                                    Twitter uses this data to curate content for your feed. Your name, email address and phone number will never be stored with your browsing history.
                                </label>
                                <input id={'agree'}
                                    type="checkbox"
                                    defaultChecked={true}
                                    className={styles.signUpModalAgreementInput}
                                />
                            </div>
                            <div className={styles.signUpModalTerms}>
                                By registering, you accept our <Link href={'https://twitter.com/ru/tos#new'}><a>Terms</a></Link>,<Link href={'https://twitter.com/ru/privacy'}><a>Privacy Policy</a></Link> and <Link href={'https://help.twitter.com/ru/rules-and-policies/twitter-cookies'}><a>Cookie Policy</a></Link>. Twitter may use your contact information, including your email address and phone number, for the purposes described in our Privacy Policy. <Link href={'https://twitter.com/ru/privacy'}><a>More</a></Link>
                            </div>
                        </div>
                        <input
                            className={styles.signUpModalNextBtn}
                            disabled={!isFormValid}
                            type='submit'
                            value='Next'
                            ref={submitBtnRef}
                            onClick={() => {
                                setSignUpModalState('result')
                            }} />
                    </div>
                </div>
                <div ref={signUpModalBgRef} className={styles.signUpModalBg}
                    onClick={() => modalCloseHandler()
                    } />
            </>
        )
    } else if (
        signUpModalState === 'result'
    ) {
        return (
            <>
                <div>
                    <div className={classNames(styles.signUpModalContainer, {
                        [styles.signUpModalActive]: isSignUpModalOpen,
                    })}>
                        <div className={styles.signUpModalHeader}>
                            <button className={styles.signUpModalCloseBtn}
                                onClick={() => {
                                    setSignUpModalState('confirmation')
                                }}>
                                <div className={styles.loginPageCloseImg}>
                                    <Icon icon="material-symbols:close" width='24' height='24' className={'iconSvg'} />
                                </div>
                            </button>
                            <span className={styles.signUpModalStep}>
                                Step 3 of 3
                            </span>
                        </div>
                        <div className={styles.signUpModalContent}>
                            <h2 className={styles.signUpModalTitle}>
                                Create your account
                            </h2>
                            <div className={styles.signUpModalInputs}>
                                <input
                                    defaultValue={name}
                                    className={styles.signUpModalNameInput}
                                    type="text"
                                    placeholder='Name'
                                    onFocus={() => {
                                        setSignUpModalState('initial')
                                        setTimeout(() => {
                                            nameRef.current.focus()
                                        }, 100)
                                    }}
                                />
                                <label htmlFor={"name"} className={styles.signUpModalNameInputLabel}>
                                    Name
                                </label>
                                <div className={styles.nameGreenCheckMark}></div>
                                <input
                                    defaultValue={data}
                                    onFocus={() => {
                                        setSignUpModalState('initial')
                                        setTimeout(() => {
                                            dataRef.current.focus()
                                        }, 100)
                                    }}
                                    required
                                    className={styles.signUpModalDataInput}
                                    type={signUpInputType}
                                    placeholder={signUpInputPlaceHolder}
                                />
                                <label htmlFor={"data"} className={styles.signUpModalDataInputLabel}>
                                    {signUpInputPlaceHolder}
                                </label>
                                <div className={styles.dataGreenCheckMark}></div>
                                <input
                                    id={"birthDate"}
                                    defaultValue={date.toLocaleDateString()}
                                    onFocus={() => {
                                        setSignUpModalState('initial')
                                        setTimeout(() => {
                                            dataRef.current.focus()
                                        }, 100)
                                    }}
                                    className={styles.signUpModalDateInput}
                                    type={'text'}
                                    placeholder={signUpInputPlaceHolder}
                                />
                                <label htmlFor={"birthDate"} className={styles.signUpModalDateInputLabel}>
                                    Birth date
                                </label>
                                <div className={styles.dateGreenCheckMark}></div>
                            </div>
                            <div className={styles.signUpModalDetailTerms}>
                                By registering, you accept <Link href={'https://twitter.com/ru/privacy'}><a>the Terms of Service</a></Link>, <Link href={'https://twitter.com/ru/privacy'}><a>Privacy Policy</a></Link> and <Link href={'https://twitter.com/ru/privacy'}><a>the Terms of Service</a></Link>Cookie Policy . Twitter may use your contact information, including your email address and phone number, for the purposes described in our Privacy Policy, such as maintaining account security and personalizing services, including advertising. <Link href={'https://twitter.com/ru/privacy'}><a>Read more</a></Link> . Other users will be able to find you using the email address or phone number you provide, unless you specify otherwise <Link href={'https://twitter.com/ru/privacy'}><a>here</a></Link> .                            </div>
                        </div>
                        <input
                            className={styles.signUpModalNextBtn}
                            type='submit'
                            value={session ? "Sing out" : "Sign up"}
                            onClick={() => {
                                session ? signOut() : signIn()
                            }}
                        />
                    </div>
                </div>
                <div ref={signUpModalBgRef} className={styles.signUpModalBg}
                    onClick={() => modalCloseHandler()
                    } />
            </>
        )
    } else {
        null
    }
}