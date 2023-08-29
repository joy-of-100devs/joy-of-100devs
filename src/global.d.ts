declare global {
    namespace Api {
        interface Response<T> {
            success: true,
            data: T,
        }
    }
}

export {};
