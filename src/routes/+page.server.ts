// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;
import type {Actions} from '../$types';


/** @type {import('./$types').PageServerLoad} */
export async function load({fetch}) {
    const res = await fetch(`/resolutions`);
    // console.log(res)

    // env.KV_NAMESPACE

    const item = await res.json();
    if (res) {
        return {item}
    }
//   throw error(404, 'Not found')
//     return {text: "asdfasdfa"}
}

/** @type {import('./$types').Actions} */
export const actions: Actions = {
    default: async ({ cookies, request, fetch}) => {
        // console.log(request)
        const data = await request.formData()


        await fetch('/resolutions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                poster: data.get('poster'),
                text: data.get('text')
            })

        })
        // TODO log the user in
    }
};
