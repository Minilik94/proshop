const notFound = (req, res, next) => {
    const error = new Error(`Not found`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : err.statusCode
    let message = err.message

    if(!statusCode) {
        statusCode = 500
    }



    if (err.name === "CastError" && err.kind === "ObjectId") {
        message = `Resource not found`,
            statusCode = 404
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack
    })


}

export {
    notFound,
    errorHandler
}