import styles from './main.module.css'

export function IApiMainView() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                I-API{' '}
                <span className={styles.subtitle}>
                    (a <b>uXcale&reg;</b> product)
                </span>
            </h1>
        </div>
    )
}
