import { api, isAxiosError } from './axios-instance'
import { ENDPOINT_DOCUMENTATIONS, ENDPOINT_FILES } from './constants'
import {
    DocumentationRespType,
    DocumentationSingleType,
    FileRespType,
    ReportsFormDataType,
    UploadFormDataType,
    ValidationError,
} from './types'

const handleError = (error: unknown) => {
    if (isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        console.log(error.status)
        console.error(error.response)

        return error
    } else {
        console.error(error)
    }
}

export const uploadFormFetch = async (props: UploadFormDataType) => {
    const formData = new FormData()

    formData.append('name', props.apiName)
    formData.append('file', props.apiFile as Blob)
    formData.append('summary', props.apiSummary)
    formData.append('description', props.apiDescription)
    formData.append('type', props.apiFileType)
    formData.append('version', props.apiVersion)

    return await api
        .post(`/${ENDPOINT_FILES}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => response)
        .catch((error) => {
            handleError(error)
        })
}

export const getDocumentationList = async () => {
    return await api
        .get<DocumentationRespType>(`/${ENDPOINT_DOCUMENTATIONS}`)
        .then((response) => response.data.data)
        .catch((error) => {
            handleError(error)
        })
}

export const getDocumentationSpec = async (documentationId: string) => {
    return await api
        .get<DocumentationSingleType>(
            `/${ENDPOINT_DOCUMENTATIONS}/${documentationId}`
        )
        .then((response) => response.data)
        .catch((error) => {
            handleError(error)
        })
}

export const getFileList = async () => {
    return await api
        .get<FileRespType>(`/${ENDPOINT_FILES}`)
        .then((response) => response.data.data)
        .catch((error) => {
            console.error(error)
        })
}

export const deleteFileSpec = async (fileId: string) => {
    console.log('fileId', fileId)

    return await new Promise((resolve) =>
        setTimeout(() => {
            resolve(true)
        }, 2000)
    )
}

export const reportsFormFetch = async (props: ReportsFormDataType) => {
    console.log('props', props)

    const formData = new FormData()

    formData.append('apiFileId', props.fileID)
    formData.append('documentationType', props.role.toLocaleUpperCase())
    formData.append('options', props.roles.toLocaleString())
    formData.append('context', props.contexto)
    formData.append('temperature', props.temperature.toLocaleString())

    return await api
        .post(`/${ENDPOINT_DOCUMENTATIONS}`, formData)
        .then((response) => response)
        .catch((error) => {
            handleError(error)
        })
}
