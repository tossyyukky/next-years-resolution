// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;
import type {Actions} from '../$types';
import {fail} from '@sveltejs/kit'


/** @type {import('./$types').PageServerLoad} */
export async function load({fetch}) {
    const res = await fetch(`/resolutions`);

    const item = await res.json();
    if (res) {
        return {resolutions: item}
    }
}

/** @type {import('./$types').Actions} */
export const actions: Actions = {
    default: async ({ cookies, request, fetch}) => {
        const data = await request.formData()

        const poster = data.get('poster')
        const resolution = data.get('resolution')
        if (resolution.length >= 1000) {
            return fail(422, {
                description: resolution,
                error: "抱負は1000文字以内で書いてください"
            })
        }

        await fetch('/resolutions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                poster: data.get('poster'),
                resolution: data.get('resolution')
            })

        })
    }
};
