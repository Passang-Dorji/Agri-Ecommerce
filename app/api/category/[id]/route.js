import knex from '@/database'

export async function GET(req, {params}){
    const categoryId = params.id 
    const {searchParams} = req.nextUrl
    const data = await knex('category')
            .where('category.id',categoryId)
            .select('*')
    return Response.json({data})
}