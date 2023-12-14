import { ScrollArea } from '@/common/components/ui/scroll-area'
import { IApiProvider } from '@/i-api/providers'
import { AsideReportsWidget } from '@/i-api/widgets/aside-reports'
import { MainReportsWidget } from '@/i-api/widgets/main-reports'

export function IApiResportsView() {
    return (
        <IApiProvider>
            <div className="grid grid-cols-[15vw_auto] divide-x">
                <ScrollArea className="h-[89vh]">
                    <AsideReportsWidget />
                </ScrollArea>
                <ScrollArea className="h-[89vh]">
                    <MainReportsWidget />
                </ScrollArea>
            </div>
        </IApiProvider>
    )
}
