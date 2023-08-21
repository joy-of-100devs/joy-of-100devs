function wrapPromise<T>(promise: Promise<T>) {
    let status = 'pending'
    let response: T;
    let error: unknown;

    const suspender = promise.then(
        (res) => {
            status = 'success'
            response = res
        },
        (err: unknown) => {
            status = 'error'
            error = err
        },
    )

    const read = () => {
        switch (status) {
            case 'pending':
                throw suspender
            case 'error':
                throw error
            default:
                return response
        }
    }

    return { read }
}

export default wrapPromise
