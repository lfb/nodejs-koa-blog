import service from '~/request/request.js'

export function GET(config) {
    const { url = '', data = {}, ...opt } = config
    return service
        .get(url, {
            params: data,
            ...opt
        })
        .then(res => {
            return [null, res]
        })
        .catch(err => {

            return [err, null]
        })
}
export function POST(config) {
    const { url = '', data = {}, ...opt } = config
    return service
        .post(url, data, opt)
        .then(res => {
            return [null, res]
        })
        .catch(err => {
            return [err, null]
        })
}

export function UPLOAD(config) {
    const { url = '', data = {}, ...opt } = config
    return service
        .post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            ...opt
        })
        .then(res => {
            return [null, res]
        })
        .catch(err => {
            return [err, null]
        })
}
