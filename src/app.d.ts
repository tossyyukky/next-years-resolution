/// <reference types="@sveltejs/kit" />
/// <reference types="@sveltejs/adapter-cloudflare" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    interface Platform {
        env?: {
            "next_years_resolutions_2022": KVNamespace;
            // YOUR_DURABLE_OBJECT_NAMESPACE: DurableObjectNamespace;
            DATABASE_URL: 'mysql://puxn487jqj7q7ypdw8jt:pscale_pw_58vwIJZgoyVAwDwJH3RyXoImaibxfDgr5Lgf8ciRq6V@ap-northeast.connect.psdb.cloud/next-years-resolutions-2022?ssl={"rejectUnauthorized":true}'
        };
        context: {
            waitUntil(promise: Promise<any>): void;
        };
        caches: CacheStorage & { default: Cache }
    }

}
