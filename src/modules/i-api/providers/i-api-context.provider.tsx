import { createContext, useContext } from 'react'

type IApiContextType = {
    fileID: string
    setFileID: (id: string) => void
}

const DEFAULT_IAPI_CONTEXT = Object.freeze({
    fileID: '',
    setFileID(id: string) {
        console.log(id)
    },
})

export const IApiContext = createContext<IApiContextType>(DEFAULT_IAPI_CONTEXT)

export const useIApiContext = () => useContext(IApiContext)
