import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export const SwaggerComponent = ({ url }: { url: string }) => {
    return <SwaggerUI url={url} />
}
