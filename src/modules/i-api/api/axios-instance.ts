import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { SERVER_DOMAIN, SERVER_PATH, SERVER_VERSION } from './constants'

export const api: AxiosInstance = axios.create({
    baseURL: `${SERVER_DOMAIN}/${SERVER_PATH}/${SERVER_VERSION}`,
    headers: {
        'Accept-Language': 'es-ES',
        'Content-Type': 'application/json',
    },
})

export const isAxiosError = axios.isAxiosError
