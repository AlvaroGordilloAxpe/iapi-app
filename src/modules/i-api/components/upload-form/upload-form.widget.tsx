import { z } from 'zod'
import * as Form from '@/common/components/ui/form'
import { Textarea } from '@/common/components/ui/textarea'
import { IMaskInput } from 'react-imask'
import { LoadingButton } from '@/common/components/loading-button'
import { Input } from '@/common/components/ui/input'
import cn from 'classnames'

const schema = z.object({
    apiName: z.string(),
    apiFile: z.instanceof(File).optional(),
    apiSummary: z.string(),
    apiDescription: z.string(),
    apiFileType: z.string(),
    apiVersion: z.string(),
})

type UploadFormDataType = z.infer<typeof schema>

type UploadFormProps = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onSubmit'
> & {
    onSubmit: (fields: UploadFormDataType) => Promise<void | string>
}

export function UploadForm({ className, onSubmit, ...props }: UploadFormProps) {
    const form = Form.useZodForm<UploadFormDataType>({
        criteriaMode: 'firstError',
        schema,
        defaultValues: {
            apiName: '',
            apiFile: undefined,
            apiSummary: '',
            apiDescription: '',
            apiFileType: '',
            apiVersion: '',
        },
        onSubmit: async (data) => {
            try {
                const response = await onSubmit(data)
                console.log('response', response)

                if (!response) {
                    form.setError('root.submit', {
                        type: 'server',
                        message: 'Network Error',
                    })
                }
            } catch (e: any) {
                console.error('UploadForm.onSubmit error', e)

                form.setError('root.submit', {
                    type: 'unknown',
                    message: 'Unknown error',
                })
            }
        },
    })

    return (
        <div
            data-testid="upload-form"
            className={cn('space-y-8', className)}
            {...props}
        >
            <Form.Root {...form}>
                <div className="space-y-4">
                    <Form.Field
                        control={form.control}
                        name="apiName"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Nombre para la API</Form.Label>
                                <Form.Input>
                                    <Input type="text" {...field} />
                                </Form.Input>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <Form.Field
                        control={form.control}
                        name="apiFile"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>
                                    Suba colección de pruebas en Postman aquí:
                                </Form.Label>
                                <Form.Input>
                                    <Input
                                        type="file"
                                        accept=".yaml, .yml"
                                        onChange={(e) =>
                                            field.onChange(e.target.files?.[0])
                                        }
                                    />
                                </Form.Input>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <Form.Field
                        control={form.control}
                        name="apiSummary"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Resumen</Form.Label>
                                <Form.Input>
                                    <Textarea rows={3} {...field} />
                                </Form.Input>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <Form.Field
                        control={form.control}
                        name="apiDescription"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Input>
                                    <Textarea rows={3} {...field} />
                                </Form.Input>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <Form.Field
                        control={form.control}
                        name="apiFileType"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Tipo de fichero</Form.Label>
                                <Form.Input>
                                    <select
                                        className="block w-full rounded-md border-2 border-secondary p-2"
                                        {...field}
                                    >
                                        <option value="">Select one</option>
                                        <option value="api">API</option>
                                        <option value="test">TEST</option>
                                    </select>
                                </Form.Input>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <Form.Field
                        control={form.control}
                        name="apiVersion"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Número de versión</Form.Label>
                                <Form.Input>
                                    <IMaskInput
                                        className="block w-full rounded-md border-2 border-secondary p-2"
                                        mask={
                                            /^((([0-9]*)\.)?([0-9]*)\.)?([0-9]*)$/
                                        }
                                        {...field}
                                    />
                                </Form.Input>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                </div>

                <Form.CustomMessage className="mt-8" isError>
                    {form.formState.errors.root?.submit?.message || null}
                </Form.CustomMessage>

                <LoadingButton
                    className="mt-8"
                    loading={form.formState.isSubmitting}
                    type="submit"
                >
                    Crear API
                </LoadingButton>
            </Form.Root>
        </div>
    )
}
