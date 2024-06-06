import { imageCardsReferenceIncludes, includefooterRefUids, includeheaderRefUids, teaserReferenceIncludes, textAndImageReferenceIncludes } from '@/components'
import {  prefixReferenceIncludes } from '@/utils'
import { getEntries, getEntryByUrl } from '@/services'

export const getHomePage = ( cmsUrlPath: string | undefined, locale: string) => {
    const newRefUids = prefixReferenceIncludes('components',
        ...prefixReferenceIncludes('text_and_image', ...textAndImageReferenceIncludes),
        ...prefixReferenceIncludes('teaser', ...teaserReferenceIncludes),
        ...prefixReferenceIncludes('card_collection', ...imageCardsReferenceIncludes)
    )

    newRefUids.push(...prefixReferenceIncludes('featured_articles', 'articles'))

    return getEntryByUrl('home_page', locale, '/', newRefUids, [])

}

export const getLandingPage = (cmsUrlPath: string | undefined, locale: string) => {
    const newRefUids = prefixReferenceIncludes('components',
        ...prefixReferenceIncludes('text_and_image', ...textAndImageReferenceIncludes),
        ...prefixReferenceIncludes('teaser', ...teaserReferenceIncludes),
        ...prefixReferenceIncludes('card_collection', ...imageCardsReferenceIncludes)
    )
    return getEntryByUrl('landing_page',locale, `${cmsUrlPath}`, newRefUids, [])
}

export const getPaths = async (contentType:string, locale:string) => {
    let entries = await getEntries(contentType, locale, [], [])
    entries = entries !== null ? entries : []
    const paths: { params: { slug:string[] } }[] = []
    entries?.forEach((entry : {url:string}) => {
        paths.push({ params: { slug: [entry.url.toString()] } })
    })
    return paths
}

export const getArticle = (cmsUrlPath: string | undefined, locale: string) => {
    const jsonRtePaths = ['content']
    return getEntryByUrl('article', locale, `${cmsUrlPath}`, [], jsonRtePaths) 

}

export const getArticleListingPage = (cmsUrlPath: string, locale: string) => {
    const newRefUids = prefixReferenceIncludes('components',
        ...prefixReferenceIncludes('text_and_image', ...textAndImageReferenceIncludes),
        ...prefixReferenceIncludes('teaser', ...teaserReferenceIncludes),
        ...prefixReferenceIncludes('card_collection', ...imageCardsReferenceIncludes)
    )
    return getEntryByUrl('article_listing_page', locale, cmsUrlPath, newRefUids, [])  
}

export const getArticles = (locale: string) => {
    const articles = getEntries('article', locale, [], []) 
    return articles
}

export const getAppConfigData = async (locale:string) => {
    const webConf=await getEntries('web_configuration', locale, ['footer_navigation',...prefixReferenceIncludes('footer_navigation', ...includefooterRefUids),
        'main_navigation', ...prefixReferenceIncludes('main_navigation', ...includeheaderRefUids)], [])

    if (!webConf || webConf === null) {
        return null
    }
    
    return webConf

}
