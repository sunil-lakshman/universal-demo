/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: { // available at build time
        CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY ,
        isLivePreviewEnabled: process.env.CONTENTSTACK_LIVE_PREVIEW || 'false',
        isEditButtonsEnabled: process.env.CONTENTSTACK_LIVE_EDIT_TAGS || 'false',
        CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
        CONTENTSTACK_MANAGEMENT_TOKEN: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
        CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH ? process.env.CONTENTSTACK_BRANCH : 'main',
        CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
        CONTENTSTACK_HOST: process.env.CONTENTSTACK_HOST, // cdn host
        CONTENTSTACK_API_HOST: process.env.CONTENTSTACK_API_HOST, //management api host
        CONTENTSTACK_APP_HOST: process.env.CONTENTSTACK_APP_HOST, //app host
        CONTENTSTACK_PREVIEW_HOST: process.env.CONTENTSTACK_PREVIEW_HOST, // live-preview host
        CONTENTSTACK_PREVIEW_TOKEN: process.env.CONTENTSTACK_PREVIEW_TOKEN, // live-preview token
        LOCALE_COOKIE_NAME: process.env.LOCALE_COOKIE_NAME || '', // set locale cookie name
        DEFAULT_LOCALE: process.env.DEFAULT_LOCALE || 'en',
        LOCALSTORAGE_WEBCONFIG_KEY: process.env.LOCALSTORAGE_WEBCONFIG_KEY || 'webconfig',
        LOCALSTORAGE_WEBCONFIG_TTL: process.env.LOCALSTORAGE_WEBCONFIG_TTL || '86400' // 1 day in seconds
    }
}

module.exports = nextConfig