// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const res = await fetch(`/resolutions`);
  console.log(res)
  const item = await res.json();
 
  return { item }
}