import React from 'react'
import styles from './header.module.css'
import { AccountWidget } from '@/auth/widgets/account'
import Link from 'next/link'
import Image from 'next/image'
import { useIsInIApi } from '@/hooks'
import { NavMenuWidget } from '@/i-api/widgets/nav-menu'

export type HeaderWidgetProps = {}

export function HeaderWidget(props: HeaderWidgetProps) {
    return (
        <div
            data-testid="header-widget"
            className="flex bg-white border-b text-primary p-4"
        >
            {useIsInIApi() ? (
                <>
                    <Link href="/i-api">
                        <Image
                            src="/logo.png"
                            alt="company_logo"
                            width={200}
                            height={25}
                            className={styles.companyLogo}
                            priority
                        />
                    </Link>
                    <NavMenuWidget />
                </>
            ) : (
                <>
                    <Link href="/" className={styles.logo}>
                        Logo
                    </Link>
                    <AccountWidget className="ml-auto" />
                </>
            )}
        </div>
    )
}
