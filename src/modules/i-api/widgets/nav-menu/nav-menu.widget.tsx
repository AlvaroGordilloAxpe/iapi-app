import * as NavigationMenu from '@/common/components/ui/navigation-menu'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import cn from 'classnames'

const paths: { href: string; title: string; subtitle: string }[] = [
    {
        href: '/i-api/upload-files',
        title: 'Update Documentation',
        subtitle: 'Upload files for creation APIs docs',
    },
    {
        href: '/i-api/documentations',
        title: 'AI Documentations',
        subtitle: 'Listado de APIS generadas con IA',
    },
    {
        href: '/i-api/reports',
        title: 'Generate Documentation',
        subtitle: 'Creación inteligente de APIs',
    },
]

const Link = ({ href = '', ...props }) => {
    const pathname = usePathname()

    return (
        <NextLink href={href} passHref legacyBehavior>
            <NavigationMenu.Link
                className={cn(
                    'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-fg focus:bg-accent focus:text-accent-fg',
                    pathname === href && 'bg-accent text-accent-fg'
                )}
                {...props}
            />
        </NextLink>
    )
}

export function NavMenuWidget() {
    return (
        <div data-testid="account-widget" className="ml-auto">
            <NavigationMenu.Root>
                <NavigationMenu.List>
                    {paths.map(({ href, title, subtitle }) => (
                        <NavigationMenu.Item key={href}>
                            <Link href={href}>
                                <div className="text-md font-bold leading-none">
                                    {title}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-fg">
                                    {subtitle}
                                </p>
                            </Link>
                        </NavigationMenu.Item>
                    ))}
                </NavigationMenu.List>
            </NavigationMenu.Root>
        </div>
    )
}
