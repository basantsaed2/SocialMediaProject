interface AppError {
    statusCode: number;
    message: string;
    stack?: string;
    cause?: unknown;
}


export class ApplicationException extends Error implements AppError {
    constructor(message: string, public statusCode: number, cause?: unknown) {
        super(message, { cause });
    }
}

export class ConflictException extends ApplicationException {
    constructor(message: string, cause?: unknown) {
        super(message, 409, cause);
    }
}

export class UnauthorizedException extends ApplicationException {
    constructor(message: string, cause?: unknown) {
        super(message, 401, cause);
    }
}

export class NotFoundException extends ApplicationException {
    constructor(message: string, cause?: unknown) {
        super(message, 404, cause);
    }
}

export class BadRequestException extends ApplicationException {
    constructor(message: string, cause?: unknown) {
        super(message, 400, cause);
    }
}

export class ServerException extends ApplicationException {
    constructor(message: string, cause?: unknown) {
        super(message, 500, cause);
    }
}