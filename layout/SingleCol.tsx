'use client'

import React, { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { App } from '@/types'

import { getAppConfigData } from '@/loaders'
import { onEntryChange } from '@/config'
import useRouterHook from '@/hooks/useRouterHook'
import { LocaleContext } from '@/context'
import { NotFoundComponent } from '@/components'

const SingleCol: React.FC<App.SingleColLayout> = (
    props: React.PropsWithChildren<App.SingleColLayout>
) => {

    const [appConfig, setAppConfig] = useState<App.csWebConfig>()
    const [loading, setLoading] = useState<boolean>(true)
    const { locale } = useRouterHook()

    const fetchAppConfig = async () => {
        try {
            const web_config: App.csWebConfig[] = await getAppConfigData(locale) || null
            setAppConfig(web_config[0])
        } catch (err) {
            console.error('Single Col Layout failed to load,\n', err)
            setLoading(false)
        }
    }

    useEffect(() => {
        onEntryChange(fetchAppConfig)
    }, [])

    return (
        loading
            ? <>
                {appConfig && <LocaleContext.Provider
                    value={{
                        currentLocale: locale
                    }}
                >
                    <Header
                        {...appConfig?.main_navigation?.[0]}
                        logo={appConfig?.logo}
                    />
                    <div className='single-col mx-auto h-10 !min-h-[100vh]'>
                        {props.children}
                    </div>

                    <Footer
                        {...appConfig?.footer_navigation?.[0]}
                        logo={appConfig?.logo}
                    />
                </LocaleContext.Provider>}
            </> : <NotFoundComponent/>
    )
}

export { SingleCol }