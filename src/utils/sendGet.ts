export default async function (url: string, token: string): Promise<any> {
    return await (await fetch(url, {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    })).json()
}