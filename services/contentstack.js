import _ from 'lodash'
import { addEditableTags, jsonToHTML } from '@contentstack/utils'
import { isEditButtonsEnabled, Stack } from '@/config'

const renderOption = {
    span: (node, next) => next(node?.children),
    a: (asset) => {
        return `<a href=${asset?.attrs?.url} target=${asset?.attrs?.target}
        style='text-align:${asset?.attrs?.style?.['text-align'] ? asset.attrs.style?.['text-align'] : 'left' }'>
            ${asset?.children?.[0]?.text}
        </a>`
    }
}

/**
  *
  * fetches all the entries from specific content-type
  * @param {* content-type uid} contentTypeUid
  * @param {* locale} locale
  * @param {* reference field name} referenceFieldPath
  * @param {* Json RTE path} jsonRtePath
  *
  */
export const getEntries = async (contentTypeUid, locale, referenceFieldPath, jsonRtePath) => {
    try {    
        let result    
        if(!Stack) {
            throw new Error('===== No stack initialization found====== \n check environment variables: \
            CONTENTSTACK_API_KEY, CONTENTSTACK_DELIVERY_TOKEN, CONTENTSTACK_MANAGEMENT_TOKEN, CONTENTSTACK_REGION, CONTENTSTACK_ENVIRONMENT')
        }
        const entryQuery = Stack.ContentType(contentTypeUid)
            .Query()
            .language(locale)

        //   if (localeConfig.allow_fallback) {
        //     entryQuery
        //       .includeFallback()
        //   }
        if (entryQuery) {
            if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath)

            result = await entryQuery
                .includeFallback()
                .toJSON()
                .includeEmbeddedItems()
                .addParam('include_metadata', 'true')
                .find()
            if (jsonRtePath) {
                jsonToHTML({
                    entry: result,
                    paths: jsonRtePath,
                    renderOption: renderOption
                })
            }
        
            if (result?.length > 0 && _.isEmpty(result[0]) ) {
                return null
            }
            isEditButtonsEnabled && result?.[0]?.forEach((entry) => {
                return addEditableTags(entry, contentTypeUid, true, locale)
            })
            const data = result[0]
            return data
        }
    }
    catch (error) {
        if (error?.error_message) throw new Error(JSON.stringify(error))
        else throw new Error(error.message)
    }
}


/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* locale} locale
 * @param {* entryUrl} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 *
 */
export const getEntryByUrl = async (contentTypeUid, locale, entryUrl, referenceFieldPath, jsonRtePath) => {
    try {
        let result
        if(!Stack) {
            throw new Error('===== No stack initialization found====== \n check environment variables: \
            CONTENTSTACK_API_KEY, CONTENTSTACK_DELIVERY_TOKEN, CONTENTSTACK_MANAGEMENT_TOKEN, CONTENTSTACK_REGION, CONTENTSTACK_ENVIRONMENT, CONTENTSTACK_LIVE_PREVIEW, CONTENTSTACK_LIVE_EDIT_TAGS')
        }
        const entryQuery = Stack.ContentType(contentTypeUid)
            .Query()
            .language(locale)
            
        if(entryQuery) {
            if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath)
            result = await entryQuery
                .includeFallback()
                .where('url', `${entryUrl}`)
                .toJSON()
                .includeEmbeddedItems()
                .addParam('include_metadata', 'true')
                .find()
            if (jsonRtePath) {
                jsonToHTML({
                    entry: result,
                    paths: jsonRtePath,
                    renderOption: renderOption
                })
            }
        
            if (result?.length > 0 && _.isEmpty(result[0]) ) {
                return
            }
        
            isEditButtonsEnabled && addEditableTags(result[0][0], contentTypeUid, true, locale)
            const data = result[0][0]
            return data
        }
        
        
    }
    catch (error) {
        if (error?.error_message) throw new Error(JSON.stringify(error))
        else throw new Error(error.message)
    }
}


/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* locale} locale
 * @param {* entryUid} entryUid
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 *
 */
export const getEntryByUID = async (contentTypeUid, locale, entryUid, referenceFieldPath, jsonRtePath) => {
    try {    
        let result    
        if(!Stack) {
            throw new Error('===== No stack initialization found====== \n check environment variables: \
            CONTENTSTACK_API_KEY, CONTENTSTACK_DELIVERY_TOKEN, CONTENTSTACK_MANAGEMENT_TOKEN, CONTENTSTACK_REGION, CONTENTSTACK_ENVIRONMENT')
        }
        const entryQuery = Stack.ContentType(contentTypeUid)
            .Entry(entryUid)
            .language(locale)

        //   if (localeConfig.allow_fallback) {
        //     entryQuery
        //       .includeFallback()
        //   }
        if (entryQuery) {
            if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath)

            result = await entryQuery
                .includeFallback()
                .toJSON()
                .fetch()
                
            if (jsonRtePath) {
                jsonToHTML({
                    entry: result,
                    paths: jsonRtePath,
                    renderOption: renderOption
                })
            }

            isEditButtonsEnabled && addEditableTags(result, contentTypeUid, true, locale)
            return result
        }
    }
    catch (error) {
        if (error?.error_message) throw new Error(JSON.stringify(error))
        else throw new Error(error.message)
    }
}