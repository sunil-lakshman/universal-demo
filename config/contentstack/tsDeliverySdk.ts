import { StackConfig } from '@contentstack/delivery-sdk'
import contentstack from '@contentstack/delivery-sdk'
import ContentstackLivePreview from '@contentstack/live-preview-utils'
import { IStackSdk } from '@contentstack/live-preview-utils/dist/src/utils/types'

export function stackInstance () {
    const params: StackConfig = {
        apiKey: process.env.CONTENTSTACK_API_KEY as string,
        deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN as string,
        environment: process.env.CONTENTSTACK_ENVIRONMENT as string,
        host: process.env.CONTENTSTACK_HOST,
        live_preview: {
            enable: true,
            host: process.env.CONTENTSTACK_API_HOST,
            management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN
        },
    }
    return contentstack.stack(params)
}

const ss = stackInstance()

export const onEntryChange = ContentstackLivePreview.onEntryChange
export const isLivePreviewEnabled= process.env.isLivePreviewEnabled === 'true'
export const isEditButtonsEnabled= process.env.isEditButtonsEnabled === 'true'