export default class ApiErrors extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors: any = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiErrors(401, 'User isn\'t authorized'  )
    }
}