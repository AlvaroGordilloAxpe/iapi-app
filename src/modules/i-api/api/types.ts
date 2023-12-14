export type UploadFormDataType = {
    apiName: string
    apiSummary: string
    apiDescription: string
    apiFileType: string
    apiVersion: string
    apiFile?: File | undefined
}

export type ValidationError = {
    message: string
    errors: Record<string, string[]>
}

export type DocumentationSingleType = {
    documentation_id: string
    documentation_type: string
    summary: string
    options: string[]
}

export type DocumentationRespType = {
    data: DocumentationSingleType[]
}

export type FileSingleType = {
    description: string
    file_id: string
    name: string
    summary: string
    type_file: string
    version: string
}

export type FileRespType = {
    data: FileSingleType[]
}

export type ReportsFormDataType = {
    fileID: string
    role: string
    contexto: string
    roles: string[]
    temperature: number
}
