import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import {SingleCol} from '@/layout'
import '@contentstack/live-preview-utils/dist/main.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../globals.css'
import '@/styles/style.css'
import '/node_modules/flag-icons/css/flag-icons.min.css'

const inter = Inter({ subsets: ['latin'] })
 
export const metadata: Metadata = {
    title: 'Compass starter',
    description: 'Provided by Contentstack'
}


export default async function RootLayout ({
    children
}: Readonly<{
  children: React.ReactNode;
}>) {

    return (
        <html lang='en'>
            <body className={inter.className}>
                <SingleCol>
                    {children}
                </SingleCol>
            </body>
        </html>
    )
}
