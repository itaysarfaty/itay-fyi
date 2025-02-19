'use client'

import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

import { useIsMobile } from '@/hooks/is-mobile'

interface GlobalConfig {
    animateBg: boolean
}
interface SetGlobalConfig extends GlobalConfig {
    setConfig: (config: GlobalConfig) => void
}

interface GlobalConfigProviderProps {
    children: ReactNode
}

const GlobalConfigContext = createContext<SetGlobalConfig | null>(null)

export const GlobalConfigProvider = ({
    children,
}: GlobalConfigProviderProps) => {
    const isMobile = useIsMobile()
    const [config, setConfig] = useState<GlobalConfig>({
        animateBg: true,
    })

    useEffect(() => {
        if (isMobile && config.animateBg) {
            setConfig({
                animateBg: false,
            })
        }
    }, [isMobile, config.animateBg])

    return (
        <GlobalConfigContext.Provider value={{ ...config, setConfig }}>
            {children}
        </GlobalConfigContext.Provider>
    )
}

export const useGlobalConfig = () => {
    const context = useContext(GlobalConfigContext)
    if (context === null) {
        throw new Error(
            'useGlobalConfig must be used within a GlobalConfigProvider'
        )
    }
    return context
}
