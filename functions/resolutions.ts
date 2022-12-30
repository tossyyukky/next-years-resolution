

export async function onRequestGet(context) {
    const response = {
        text: 'Hello World!'
    }
    return new Response(JSON.stringify(response))
}