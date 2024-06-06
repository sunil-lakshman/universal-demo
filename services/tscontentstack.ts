import { BaseEntry, QueryOperation } from '@contentstack/delivery-sdk'
import { addEditableTags, jsonToHTML } from '@contentstack/utils'

import { isEditButtonsEnabled } from '@/config'
import { stackInstance } from '@/config/contentstack/tsDeliverySdk'

const Stack1 = stackInstance()
Stack1.config.host = process.env.CONTENTSTACK_HOST

const renderOption = {
    span: (node: any, next: any) => next(node?.children),
    a: (asset: any) => {
        return `<a href=${asset?.attrs?.url} target=${asset?.attrs?.target}
        style='text-align:${asset?.attrs?.style?.['text-align'] ? asset.attrs.style?.['text-align'] : 'left' }'>
            ${asset?.children?.[0]?.text}
        </a>`
    }
}

/**
 *
 * fetches all the entries from specific content-type
 * @param contentTypeUid content-type uid
 * @param locale locale
 * @param referenceFieldPath reference field name
 * @param jsonRtePath Json RTE path
 *
 */
export const getEntries = async (contentTypeUid: string, locale: string, referenceFieldPath: string | any, jsonRtePath: string []) => {
    try {
        let result: any
        if (!Stack1) {
            throw new Error('===== No stack initialization found====== \n check environment variables: \
            CONTENTSTACK_API_KEY, CONTENTSTACK_DELIVERY_TOKEN, CONTENTSTACK_MANAGEMENT_TOKEN, CONTENTSTACK_REGION, CONTENTSTACK_ENVIRONMENT')
        }
        const entryQuery = Stack1.contentType(contentTypeUid)
            .entry().locale(locale)
        if (entryQuery) {
            if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath)

            result = await entryQuery
                .includeFallback()
                .includeEmbeddedItems()
                .addParams({'include_metadata': 'true'})
                .find<BaseEntry>()

            if (jsonRtePath && result) {
                // Handle JSON to HTML conversion here
                jsonToHTML({
                    entry: result,
                    paths: jsonRtePath,
                    renderOption: renderOption
                })
            }

            if (result.entries[0]?.length > 0 && Object.keys(result.entries[0][0]).length === 0) {
                return null
            }
            isEditButtonsEnabled && result?.[0]?.forEach((entry: any) => {
                return addEditableTags(entry, contentTypeUid, true, locale)
            })

            const data = result.entries
            return data
        }
    } catch (error) {
        if (error) {
            throw new Error(JSON.stringify(error))
        } else {
            throw new Error()
        }
    }
}

/**
 *
 * fetches all the entries from specific content-type
 * @param contentTypeUid content-type uid
 * @param locale locale
 * @param entryUrl entryUrl
 * @param referenceFieldPath reference field name
 * @param jsonRtePath Json RTE path
 *
 */
export const getEntryByUrl = async (contentTypeUid: string, locale: string, entryUrl: string, referenceFieldPath: string | any, jsonRtePath: string[]) => {
    try {
        let result: any
        if (!Stack1) {
            throw new Error('===== No stack initialization found====== \n check environment variables: \
            CONTENTSTACK_API_KEY, CONTENTSTACK_DELIVERY_TOKEN, CONTENTSTACK_MANAGEMENT_TOKEN, CONTENTSTACK_REGION, CONTENTSTACK_ENVIRONMENT, CONTENTSTACK_LIVE_PREVIEW, CONTENTSTACK_LIVE_EDIT_TAGS')
        }
        const entryQuery = Stack1.contentType(contentTypeUid)
            .entry()
            .locale(locale)

        if (entryQuery) {
            if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath)
            result = await entryQuery.query()
                .where('url', QueryOperation.EQUALS, `${entryUrl}`)
                .addParams({'include_metadata': 'true'})
                .find<BaseEntry>()

            if (jsonRtePath) {
                jsonToHTML({
                    entry: result,
                    paths: jsonRtePath,
                    renderOption: renderOption
                })
            }
            
            
            if (result?.length > 0 && Object.keys(result[0]).length === 0) {
                return
            }
            
            isEditButtonsEnabled && addEditableTags(result.entries, contentTypeUid, true, locale)
            // const data = result[0][0]
            // return data
            const data = result.entries[0]
            return data
        }

    } catch (error) {
        if (error) throw new Error(JSON.stringify(error))
        else throw new Error()
    }
}

/**
 *
 * fetches all the entries from specific content-type
 * @param contentTypeUid content-type uid
 * @param locale locale
 * @param entryUid entryUid
 * @param referenceFieldPath reference field name
 * @param jsonRtePath Json RTE path
 *
 */
export const getEntryByUID = async (contentTypeUid: string, locale: string, entryUid: string, referenceFieldPath: string | any, jsonRtePath: string[]) => {
    try {
        let result: any
        if (!Stack1) {
            throw new Error('===== No stack initialization found====== \n check environment variables: \
            CONTENTSTACK_API_KEY, CONTENTSTACK_DELIVERY_TOKEN, CONTENTSTACK_MANAGEMENT_TOKEN, CONTENTSTACK_REGION, CONTENTSTACK_ENVIRONMENT')
        }
        const entryQuery = Stack1.contentType(contentTypeUid)
            .entry(entryUid).locale(locale)


        if (entryQuery) {
            if (referenceFieldPath) entryQuery //includeReference(referenceFieldPath)

            result = await entryQuery
                .includeFallback()
                .fetch<BaseEntry>()

            if (jsonRtePath) {
                jsonToHTML({
                    entry: result,
                    paths: jsonRtePath,
                    renderOption: renderOption
                })
            }

            isEditButtonsEnabled && addEditableTags(result, contentTypeUid, true, locale)
            return result
            // const data = result.entries[0]
            // return data
        }
    } catch (error) {
        if (error) throw new Error(JSON.stringify(error))
        else throw new Error()
    }
}
