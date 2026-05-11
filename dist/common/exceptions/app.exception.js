"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerException = exports.BadRequestException = exports.NotFoundException = exports.UnauthorizedException = exports.ConflictException = exports.ApplicationException = void 0;
class ApplicationException extends Error {
    status;
    constructor(message, status, cause) {
        super(message, { cause });
        this.status = status;
    }
}
exports.ApplicationException = ApplicationException;
class ConflictException extends ApplicationException {
    constructor(message, cause) {
        super(message, 409, cause);
    }
}
exports.ConflictException = ConflictException;
class UnauthorizedException extends ApplicationException {
    constructor(message, cause) {
        super(message, 401, cause);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class NotFoundException extends ApplicationException {
    constructor(message, cause) {
        super(message, 404, cause);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends ApplicationException {
    constructor(message, cause) {
        super(message, 400, cause);
    }
}
exports.BadRequestException = BadRequestException;
class ServerException extends ApplicationException {
    constructor(message, cause) {
        super(message, 500, cause);
    }
}
exports.ServerException = ServerException;
