import dotenv from 'dotenv'
import {Kysely} from 'kysely'
import {PlanetScaleDialect} from 'kysely-planetscale'
import { DATABASE_URL } from '$env/static/private'



/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({request, platform, fetch}) {
    // console.log(process.env.DATABASE_URL)
    // console.log(platform)
    const url = DATABASE_URL || ""
    // const db = new Kysely<Database>({
    //     dialect: new PlanetScaleDialect({
    //         host: 'ap-northeast.connect.psdb.cloud',
    //         username: 'puxn485jqj7q7ypdw8jt',
    //         password: 'pscale_pw_56vwIJZgoyVAwDwJH3RyXoImaibxfDgr5Lgf8ciRq6V',
    //     }),
    // })
    const db = new Kysely<Database>({
        dialect: new PlanetScaleDialect({
            url,
            fetch,
        }),
    })
    const {max} = db.fn
    // console.log(url)
    // console.log(db)

    const maxId = await db.selectFrom('resolutions')
        .select(max('id').as('max_id'))
        .executeTakeFirst()
    console.log(maxId.max_id)
    const startId = maxId.max_id - 20 < 0 ? maxId.max_id : maxId.max_id - 20 < 0
    console.log(startId)
    const resolutions = await db.selectFrom('resolutions')
        .selectAll()
        .where('id', '>=', startId)
        .limit(10)
        .execute()

    console.log(resolutions)

    return new Response(JSON.stringify({text: "hojhohoho"}))
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
    // console.log(request)
    // const db = new Kysely<Database>({
    //     dialect: new PlanetScaleDialect({
    //         host: 'ap-northeast.connect.psdb.cloud',
    //         username: 'puxn486jqj7q7ypdw8jt',
    //         password: 'pscale_pw_57vwIJZgoyVAwDwJH3RyXoImaibxfDgr5Lgf8ciRq6V',
    //     }),
    // })
    // console.log(platform)
    // console.log(request)
    // platform.env.KV_NAMESPACE.put(`${request.name}_${Date.now()}`, request.text)

    const {poster, text} = await request.json()

    console.log(poster)
    console.log(text)

    await db.transaction().execute(async (trx) => {
        const result = await trx
            .insertInto('users')
            .values({
                name: poster ? poster : "匿名"
            })
            .executeTakeFirst()

        console.log(result.insertId)

        const resolution = await trx
            .insertInto('resolutions')
            .values({
                user_id: result.insertId,
                resolution: text
            })
            .executeTakeFirst()
    })

    return new Response(JSON.stringify({text: "hojhohoho"}))
}
