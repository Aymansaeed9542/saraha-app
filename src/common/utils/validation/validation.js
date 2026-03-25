import { BadRequestException } from "../response/error.responce.js"

export const validation = (schema) => {
    return (req, res, next) => {
        const inputData = { ...req.body, ...req.params, ...req.query };
        let { value, error } = schema.validate(inputData, { abortEarly: false })
        if (error) {
            throw BadRequestException({ message: "validation error", extra: error })
        }
        next()
    }
}
