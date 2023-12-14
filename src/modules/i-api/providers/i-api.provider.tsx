import { PropsWithChildren, useState } from 'react'
import { IApiContext } from './i-api-context.provider'

export const IApiProvider = ({ children }: PropsWithChildren) => {
    const [fileID, setFileID] = useState<string>('')

    return (
        <IApiContext.Provider value={{ fileID, setFileID }}>
            {children}
        </IApiContext.Provider>
    )
}
