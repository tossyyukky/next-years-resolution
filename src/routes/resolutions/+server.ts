import {Kysely} from 'kysely'
import {PlanetScaleDialect} from 'kysely-planetscale'
import { DATABASE_URL } from '$env/static/private'



/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({request, platform, fetch}) {
    const url = DATABASE_URL || ""
    const db = new Kysely<Database>({
        dialect: new PlanetScaleDialect({
            url,
            fetch,
        }),
    })
    const {max} = db.fn

    const maxId = await db.selectFrom('resolutions')
        .select(max('id').as('max_id'))
        .executeTakeFirst()
    const startId = maxId.max_id - 20 < 0 ? 1 : maxId.max_id - 20
    const resolutions = await db.selectFrom('resolutions')
        .selectAll()
        .where('id', '>=', startId)
        .limit(10)
        .orderBy('id', 'desc')
        .execute()

    return new Response(JSON.stringify(resolutions))
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({request, platform, fetch}) {
    const url = DATABASE_URL || ""
    const db = new Kysely<Database>({
        dialect: new PlanetScaleDialect({
            url,
            fetch,
        }),
    })

    const {poster, resolution} = await request.json()

    await db.transaction().execute(async (trx) => {
        const result = await trx
            .insertInto('resolutions')
            .values({
                poster: poster || "匿名",
                resolution: resolution
            })
            .executeTakeFirst()
    })

    return new Response(JSON.stringify({text: "success"}))
}
