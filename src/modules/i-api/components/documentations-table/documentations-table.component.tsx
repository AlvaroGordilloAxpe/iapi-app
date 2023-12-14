import * as Table from '@/common/components/ui/table'
import { ScrollArea } from '@/common/components/ui/scroll-area'
import { Icons } from '@/common/components/icons'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/common/components/ui/button'
import * as Tooltip from '@/common/components/ui/tooltip'
import { getDocumentationList, getDocumentationSpec } from '@/i-api/api'

type DocumentationType = {
    documentation_id: string
    documentation_type: string
    summary: string
    options: string[]
}

const DownloadDocumentation = ({ id }: { id: string }) => {
    const downloadDoc = useCallback(async () => {
        try {
            const doc = await getDocumentationSpec(id)
            console.log(doc)
        } catch (error) {
            console.error(error)
        }
    }, [id])

    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button size="sm" onClick={() => void downloadDoc()}>
                        <Icons.fileDown />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                    <p>{`Descargar documentación ${id}`}</p>
                </Tooltip.Content>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}

export function DocumentationsTable() {
    const [documentationList, setDocumentationList] =
        useState<DocumentationType[]>()

    async function loadAPIDocumentation() {
        const response = await getDocumentationList()
        if (response && response.length > 0) setDocumentationList(response)

        //const { data } = await getDocumentationList()
        //if (data && data.length > 0) setDocumentationList(data)
    }

    useEffect(() => {
        void loadAPIDocumentation()
    }, [])

    return (
        <ScrollArea className="h-[70vh]">
            <Table.Root>
                <Table.Caption>A list of your documentations.</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.Head className="w-[200px]">ID</Table.Head>
                        <Table.Head>Type</Table.Head>
                        <Table.Head>Summary</Table.Head>
                        <Table.Head className="text-right">Options</Table.Head>
                        <Table.Head className="text-center"></Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {documentationList && documentationList?.length > 0 ? (
                        documentationList.map((item) => (
                            <Table.Row key={item.documentation_id}>
                                <Table.Cell className="font-medium">
                                    {item.documentation_id}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.documentation_type}
                                </Table.Cell>
                                <Table.Cell>{item.summary}</Table.Cell>
                                <Table.Cell className="text-right">
                                    {item.options}
                                </Table.Cell>
                                <Table.Cell className="text-center">
                                    <DownloadDocumentation
                                        id={item.documentation_id}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                            <Table.Cell colSpan={5} className="text-center">
                                <Icons.spinner className="animate-spin w-8 h-8 mr-2 inline-block ml-4" />
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root>
        </ScrollArea>
    )
}
