import knex from '@/database'


export async function GET(req, {params}){
    const userId =params.id 
    const {searchParams} =req.nextUrl
    const data = await knex('users')
            .where('id',userId)
            .select('name','address')
    return Response.json({data})
}