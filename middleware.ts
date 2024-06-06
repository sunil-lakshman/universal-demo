import { NextRequest, NextResponse } from 'next/server' 
import { defaultLocale, localeCookieName } from '@/config/localization'
import { createManagmentHeaders } from '@/config/contentstack/managementSDK'
import { isLocale } from '@/utils/localization'

const fetchLocales = async () => {
    const requestOptions = createManagmentHeaders('GET')
    const res = await fetch(`https://${process.env.CONTENTSTACK_API_HOST}/v3/locales`, requestOptions)
    const {locales} = await res.json()
    return locales
}

 
export async function middleware (request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const languagesCookie = request.cookies.get(localeCookieName)
    
    const locales =  languagesCookie?.value ? JSON.parse(languagesCookie.value) : await fetchLocales()

    const preferedBrowserLang = request.headers.get('accept-language')?.split(',')?.[0]?.substring(0,2)
    let preferredLang = defaultLocale

    if(preferedBrowserLang && locales.some(({code}: {code: string}) => code === preferedBrowserLang)) { // if preferred browser language is acceptable locale
        preferredLang = preferedBrowserLang
    }

    const pathnameHasLocale = pathname.split('/')?.some((p) => {
        return isLocale(p)
    })

    if (pathnameHasLocale) {
        if (!languagesCookie)  {
            // set reponse.cookie "languages" cookie if not exist
            // cookie will expire in 5 days
            const response = NextResponse.next() 
            response.cookies.set(localeCookieName, JSON.stringify(locales), { expires: new Date(Date.now() + ( 5 * 24 * 60 * 60 * 1000)) })
            return response

        } // if request.cookie exist then return
        return NextResponse.next() 
    }

    // Redirect to default locale if there is no locale in url
    request.nextUrl.pathname = `/${preferredLang}/${pathname}`
    return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        * - robots.txt (robots file)
        */
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
        
        // allow / routes
        '/' 
    ]
}
