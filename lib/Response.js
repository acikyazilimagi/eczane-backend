class Response {
    constructor() {

    }

    success(res, data) {
        return res.json({
            ok: true,
            data
        });
    }

    error(res, code, message) {
        return res.status(code).json({
            ok: false,
            code,
            message
        })
    }
}

module.exports = Response;