import { deleteFileSpec, getFileList } from '@/i-api/api'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { Icons } from '@/common/components/icons'
import styles from './aside-reports.module.css'
import { useIApiContext } from '@/i-api/providers'

type FileType = {
    description: string
    file_id: string
    name: string
    summary: string
    type_file: string
    version: string
}

export function AsideReportsWidget() {
    const [fileList, setFileList] = useState<FileType[]>()
    const [selectedFile, setSelectedFile] = useState<FileType>()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fileID, setFileID } = useIApiContext()

    async function handleOnClickDelete(
        event: React.MouseEvent<HTMLSpanElement>
    ) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { numberId = '' } = event?.currentTarget?.dataset

        if (!numberId) return

        try {
            await deleteFileSpec(numberId).then((response) => {
                console.log(response)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const loadAPIFiles = async () => {
        const response = await getFileList()

        if (response) setFileList(response)

        //if (response && response.length > 0) setSelectedFile(response[0])
    }

    useEffect(() => {
        void loadAPIFiles()
    }, [])

    return (
        <>
            {fileList && fileList?.length > 0 ? (
                fileList?.map((file) => (
                    <div
                        key={file.file_id}
                        className={cn(
                            styles.sidebarItem,
                            file === selectedFile && styles.sidebarItemSelected
                        )}
                    >
                        <span
                            className={styles.asideText}
                            onClick={() => {
                                setFileID(file.file_id)
                                setSelectedFile(file)
                            }}
                        >
                            {file.name}
                        </span>
                        <span
                            className={styles.asideDelete}
                            data-number-id={file.file_id}
                            onClick={(event) => void handleOnClickDelete(event)}
                        >
                            <Icons.trash2 className="inline-block" />
                        </span>
                    </div>
                ))
            ) : (
                <p>
                    Cargando archivos{' '}
                    <Icons.spinner className="animate-spin w-8 h-8 mr-2 inline-block ml-4" />
                </p>
            )}
        </>
    )
}
