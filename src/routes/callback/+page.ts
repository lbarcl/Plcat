/** @typedef {import('./$types').PageLoad} PageLoad */

/** @type {PageLoad} */ 
export function load({ url }) {
    var qparams = url.toString().split('#')[1].split('&');
    var s = "{"

    for (let i = 0; i < qparams.length; i++) {
        const key = qparams[i].split('=')[0];
        const value = qparams[i].split('=')[1];
        s += `"${key}": "${value}"${(i + 1) == qparams.length ? '' : ','}`
    }

    s += "}";

    return JSON.parse(s);
}

export const ssr = false;