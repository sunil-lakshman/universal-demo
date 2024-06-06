
export const isLocale  = (slug: string)  => {
    // Regular expression to match valid locale codes (e.g., 'en', 'en-US')
    const localeRegex = /^[a-z]{2}(?:-[a-z]{2})?$/
    return localeRegex.test(slug)
}