
export const isLocale  = (slug: string)  => {
    // Regular expression to match valid locale codes (e.g., 'en', 'en-us')
    const localeRegex = /^[a-z]{2}(?:-[a-z]{2})?$/
    return localeRegex.test(slug)
}

export const getUnlocalizedPath = (pathname: string) => {
    return '/' + pathname.split('/').filter((x) => !isLocale(x)).join('/')
}

export const getFlagCode = (code?:string) => {
    if (code === 'en') return 'us'
    return code ? new Intl.Locale(code)?.region?.toLowerCase() || new Intl.Locale(code)?.language?.toLowerCase() : ''
}