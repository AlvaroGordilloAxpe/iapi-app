//import styles from './reports-form.module.css'
import cn from 'classnames'
import { z } from 'zod'
import { roles, options } from '@/i-api/api/mocks'
import * as Form from '@/common/components/ui/form'
import { Textarea } from '@/common/components/ui/textarea'
import { LoadingButton } from '@/common/components/loading-button'
import ReactSelect from 'react-select'
import { Input } from '@/common/components/ui/input'

const schema = z.object({
    role: z.object({
        value: z.string(),
    }),
    contexto: z.string(),
    roles: z.array(
        z.object({
            value: z.string(),
        })
    ),
    temperature: z.number(),
})

type ReportsFormDataType = z.infer<typeof schema>

type ReportsFormProps = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onSubmit'
> & {
    onSubmit: (fields: ReportsFormDataType) => Promise<void | string>
}

export function ReportsFormComponent({
    className,
    onSubmit,
    ...props
}: ReportsFormProps) {
    const form = Form.useZodForm<ReportsFormDataType>({
        criteriaMode: 'firstError',
        schema,
        defaultValues: {
            role: { value: '' },
            contexto: '',
            roles: [],
            temperature: 0.2,
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
            data-testid="reports-form"
            className={cn('space-y-8', className)}
            {...props}
        >
            <Form.Root {...form}>
                <div className="space-y-4">
                    <Form.Field
                        control={form.control}
                        name="role"
                        render={({
                            field: { onChange, onBlur, value, name, ref },
                        }) => (
                            <Form.Item>
                                <Form.Label>Rol</Form.Label>
                                <Form.Input>
                                    <ReactSelect
                                        options={roles}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        name={name}
                                        ref={ref}
                                    />
                                </Form.Input>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <Form.Field
                        control={form.control}
                        name="contexto"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Contexto</Form.Label>
                                <Form.Input>
                                    <Textarea rows={4} {...field} />
                                </Form.Input>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <Form.Field
                        control={form.control}
                        name="roles"
                        render={({
                            field: { onChange, onBlur, value, name, ref },
                        }) => (
                            <Form.Item>
                                <Form.Label>
                                    Opciones <i>(selección multiple)</i>
                                </Form.Label>
                                <Form.Input>
                                    <ReactSelect
                                        options={options}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        name={name}
                                        ref={ref}
                                        isMulti
                                    />
                                </Form.Input>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <Form.Field
                        control={form.control}
                        name="temperature"
                        render={({
                            field: { name, onBlur, onChange, ref, value },
                        }) => (
                            <Form.Item>
                                <Form.Label>Temperatura</Form.Label>
                                <Form.Input>
                                    <Input
                                        type="range"
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        onChange={(event) =>
                                            onChange(
                                                parseFloat(event?.target?.value)
                                            )
                                        }
                                        onBlur={onBlur}
                                        value={value}
                                        name={name}
                                        ref={ref}
                                    />
                                </Form.Input>
                                <span>{value}</span>
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
                    Crear Reporte
                </LoadingButton>
            </Form.Root>
        </div>
    )
}
