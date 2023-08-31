export class HTTPError extends Error {
    httpCode = 500;
}

export class NotFoundError extends HTTPError {
    httpCode = 404;

    constructor(message = "Resource not found.") {
        super(message);
    }
}


export class ForbiddenError extends HTTPError {
    httpCode = 403;

    constructor(message = "Access to resource denied.") {
        super(message);
    }
}


export class UnauthorizedError extends HTTPError {
    httpCode = 401;

    constructor(message = "This resource requires signing in.") {
        super(message);
    }
}
