export default async function (url: string, token: string, body: Object): Promise<any> {
    return await (await fetch(url, {
        method: 'post',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })).json()
}