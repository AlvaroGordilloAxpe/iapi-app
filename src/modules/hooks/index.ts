import { usePathname } from 'next/navigation'

const IAPI = 'i-api'

export const useIsInIApi = () =>
    !!usePathname()?.match(new RegExp(`${IAPI}`, 'i'))
