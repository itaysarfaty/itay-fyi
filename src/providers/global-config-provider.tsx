'use client'

import React, { ReactNode, createContext, useContext, useState } from 'react'

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
    const [config, setConfig] = useState<GlobalConfig>({
        animateBg: true,
    })

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
