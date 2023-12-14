import * as Card from '@/common/components/ui/card'
import { uploadFormFetch } from '@/i-api/api'
import { UploadForm } from '@/i-api/components/upload-form'
//import { useRouter } from 'next/navigation'

export function UploadFilesWidget() {
    //const router = useRouter()

    return (
        <Card.Root className="w-1/3">
            <Card.Header>
                <Card.Title>Creación inteligente de APIs</Card.Title>
                <Card.Description>
                    Creación inteligente de APIs
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <UploadForm
                    onSubmit={async (fields) => {
                        try {
                            const result = await uploadFormFetch(fields)

                            console.debug('Upload result:', result)

                            //router.replace(callbackUrl)
                        } catch (e: any) {
                            console.log('error aaaaaa', e)

                            return 'Invalid credentials'
                        }
                    }}
                />
            </Card.Content>
        </Card.Root>
    )
}
