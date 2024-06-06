'use client'
import { useEffect, useState } from 'react'
import { isNull } from 'lodash'
import { getArticle, getArticles } from '@/loaders'
import RenderComponents from '@/RenderComponents'
import { Page } from '@/types'
import { ArticleCover, NotFoundComponent, PageWrapper, RelatedArticles, RelatedRegionTopics } from '@/components'
import { ImageCardItem } from '@/types/components'
import { onEntryChange } from '@/config'
import { isDataInLiveEdit } from '@/utils'
import useRouterHook from '@/hooks/useRouterHook'

export default function Article () {
    const [data, setData] = useState<Page.ArticlePage['entry'] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [articles, setArticles] = useState<Page.ArticlePage['articles'] | null>(null)
    const {path, locale} = useRouterHook()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const entryData: Page.ArticlePage['entry'] = await getArticle(path, locale)
                setData(entryData)
                if (!entryData && !isNull(entryData)) {
                    throw '404'
                }
            } catch (err) {
                console.error('🚀 ~ article.tsx ~ fetchData ~ err:', err)
                setLoading(false)
            }
        }

        onEntryChange(fetchData)

    }, [path])

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                let articlesData: Page.ArticlePage['articles'] = await getArticles(locale)
                articlesData = articlesData?.filter((article) => article.uid !== data?.uid)
                articlesData && setArticles(articlesData)
            } catch (err) {
                console.error('🚀 ~ article.tsx ~ fetchArticles ~ err:', err)
            }
        }

        data && !articles && fetchArticles() // articles will be fetched only when data is available and if articles are not already fetched. !articles is used as otherwise related articles was not visible in live preview panel
    }, [data])

    const { content, title, summary, cover_image, show_related_regions_and_topics, region, topics, show_related_articles, related_articles, $ } = data || {}

    const cards: ImageCardItem[] | [] = articles?.map((article) => {
        return ({
            title: article?.title,
            content: article?.summary,
            image: article?.cover_image,
            $: article?.$,
            cta: article?.url
        })
    }) as ImageCardItem[] | []

    const relatedArticles = cards && cards.splice(0, (data?.related_articles?.number_of_articles && data?.related_articles?.number_of_articles <= 4) ? related_articles?.number_of_articles : 4)

    return (
        data ? <>
            <PageWrapper {...data} contentType='article'>
                <ArticleCover
                    title={title}
                    summary={summary}
                    cover_image={cover_image}
                    $={$}
                />
                <RenderComponents components={[{
                    text: {
                        content,
                        $: $
                    }
                }]}
                />
                {show_related_regions_and_topics && <RelatedRegionTopics
                    region={region}
                    topics={topics}
                    $={data?.$}
                />}
                {show_related_articles && <RelatedArticles
                    related_articles={related_articles}
                    cards={relatedArticles}
                />}
            </PageWrapper>

        </>
            : !loading && !isDataInLiveEdit() && <NotFoundComponent />
    )

}
