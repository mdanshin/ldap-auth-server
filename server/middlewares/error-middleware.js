import ApiError from '../exeptions/api-error.js'

export default function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: 'Unknown errors', error: err.message})
}