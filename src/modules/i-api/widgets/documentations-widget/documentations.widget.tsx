import * as Card from '@/common/components/ui/card'
import { DocumentationsTable } from '@/i-api/components/documentations-table'

export function DocumentationsWidget() {
    return (
        <Card.Root className="w-4/5">
            <Card.Header>
                <Card.Title>Documentación de APIs</Card.Title>
                <Card.Description>Documentación de APIs</Card.Description>
            </Card.Header>
            <Card.Content>
                <DocumentationsTable />
            </Card.Content>
        </Card.Root>
    )
}
