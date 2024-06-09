import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { Suspense } from 'react'

export const metadata = {
    title: "The Engineering Blog",
    description: "I am a hookup engineer! hehe"
}

function RootLayout({ children }) {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <Nav></Nav>
                <main className='app'>
                    <Suspense fallback={<div>Loading...</div>}>
                        {children}
                    </Suspense>
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout