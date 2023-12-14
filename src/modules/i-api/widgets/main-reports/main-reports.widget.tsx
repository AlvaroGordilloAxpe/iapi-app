import { useState } from 'react'
import * as Card from '@/common/components/ui/card'
import { Panel, PanelGroup } from 'react-resizable-panels'
import { PanelResizeComponent } from '@/i-api/components/panel-resize'
import { SwaggerComponent } from '@/i-api/components/swagger'
import styles from './main-reports.module.css'
import { Button } from '@/common/components/ui/button'
import { ScrollArea } from '@/common/components/ui/scroll-area'
import { ReportsFormComponent } from '@/i-api/components/reports-form'
import { useIApiContext } from '@/i-api/providers'
import cn from 'classnames'
import { reportsFormFetch } from '@/i-api/api'
import { Icons } from '@/common/components/icons'
import * as Alert from '@/common/components/ui/alert'

export function MainReportsWidget() {
    const [showFirstPanel, setShowFirstPanel] = useState(true)
    const [showLastPanel, setShowLastPanel] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fileID, setFileID } = useIApiContext()

    return (
        <main className={styles.main}>
            <div className={styles.TopRow}>
                <Button
                    size="sm"
                    variant="secondary"
                    disabled={!fileID}
                    onClick={() => setShowFirstPanel(!showFirstPanel)}
                >
                    {showFirstPanel ? 'Ocultar' : 'Mostrar'} Configuración
                </Button>
                <Button
                    className="ml-4"
                    size="sm"
                    variant="secondary"
                    disabled={!fileID}
                    onClick={() => setShowLastPanel(!showLastPanel)}
                >
                    {showLastPanel ? 'Ocultar' : 'Mostrar'} Swagger
                </Button>
            </div>

            <div className={styles.BottomRow}>
                <PanelGroup autoSaveId="example" direction="horizontal">
                    {showFirstPanel && (
                        <Panel
                            collapsible={true}
                            defaultSizePercentage={50}
                            order={1}
                        >
                            <ScrollArea className={styles.Panel}>
                                <Card.Root
                                    className={cn(
                                        'mt-3',
                                        showLastPanel && 'ml-4 mr-1',
                                        !showLastPanel &&
                                            'w-2/3 ml-auto mr-auto'
                                    )}
                                >
                                    <Card.Header>
                                        <Card.Title>
                                            Información de la API
                                        </Card.Title>
                                        <Card.Description>
                                            Información de la API
                                        </Card.Description>
                                    </Card.Header>
                                    <Card.Content>
                                        {fileID ? (
                                            <ReportsFormComponent
                                                onSubmit={async ({
                                                    role,
                                                    roles,
                                                    contexto,
                                                    temperature,
                                                }) => {
                                                    try {
                                                        const result =
                                                            await reportsFormFetch(
                                                                {
                                                                    fileID,
                                                                    role: role.value,
                                                                    roles: roles.map(
                                                                        (rol) =>
                                                                            rol.value
                                                                    ),
                                                                    contexto,
                                                                    temperature,
                                                                }
                                                            )

                                                        console.log(
                                                            'Result',
                                                            result
                                                        )
                                                        //router.replace(callbackUrl)
                                                    } catch (e: any) {
                                                        console.log(
                                                            'error aaaaaa',
                                                            e
                                                        )
                                                        return 'Invalid credentials'
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <Alert.Root
                                                variant="danger"
                                                className="bg-yellow-400 w-1/2 ml-auto mr-auto"
                                            >
                                                <Alert.Title>
                                                    <Icons.warning className="inline mr-3" />
                                                    <p className="mt-[6px]">
                                                        Seleccione un archivo
                                                        del panel lateral
                                                    </p>
                                                </Alert.Title>
                                            </Alert.Root>
                                        )}
                                    </Card.Content>
                                </Card.Root>
                            </ScrollArea>
                        </Panel>
                    )}

                    {showFirstPanel && showLastPanel && (
                        <PanelResizeComponent />
                    )}

                    {showLastPanel && (
                        <Panel collapsible={true} order={2}>
                            <ScrollArea className={styles.Panel}>
                                <SwaggerComponent url="/poc_api.yaml" />
                            </ScrollArea>
                        </Panel>
                    )}
                </PanelGroup>
            </div>
        </main>
    )
}
/*
<h1 className="align-baseline">
                                                <Icons.panelLeft className="inline-block mb-[4px]" />{' '}
                                                Seleccione un archivo del panel
                                                lateral
                                            </h1>
*/
