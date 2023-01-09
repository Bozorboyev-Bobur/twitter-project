import Head from "next/head"
import '../../styles/global.scss'
import NextProgress from 'nextjs-progressbar'
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

function TwitterApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <>
      <Head>
        <title>
          Твиттер. Здесь обсуждают всё, что происходит. / Твиттер
        </title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
        <meta charSet="utf-8" />
        <link rel="icon" href="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png" />
      </Head>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerStyle={{
          zIndex: '9999'
        }}
        toastOptions={{
          success: {
            style: {
              background: '#1d9bf0',
              color: 'white'
            },
          },
          error: {
            style: {
              background: 'red',
              color: 'white'
            },
          },
        }}

      />

      <NextProgress
        color="#1d9bf0"
        startPosition={0.3}
        stopDelayMs={200}
        height={3} />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default TwitterApp