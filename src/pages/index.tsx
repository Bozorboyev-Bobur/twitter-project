import React, { useState } from 'react'
import { IndexPage } from '../components/IndexPage/IndexPage'
import { SignUpModal } from '../components/SignUpModal/SignUpModal'
import { SignInModal } from '../components/SignInModal/SignInModal'
import router from 'next/router'

export default function Index() {
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

    return (
        <>
            <IndexPage setIsSignUpModalOpen={setIsSignUpModalOpen} setIsSignInModalOpen={setIsSignInModalOpen} />
            <SignUpModal isSignUpModalOpen={isSignUpModalOpen} setIsSignUpModalOpen={setIsSignUpModalOpen} />
            <SignInModal isSignInModalOpen={isSignInModalOpen} setIsSignInModalOpen={setIsSignInModalOpen}
            />
        </>
    )
}