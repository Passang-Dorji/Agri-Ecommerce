import knex from '@/database';

export async function GET(req, {params}){
    const sellerId = params.id 
    const {searchParams} = req.nextUrl
    const data = await knex('sellers').select('*')
    return Response.json({data})
}

export async function PUT(req, {params}){
    const sellerId = params.id 
    const {searchParams} = req.nextUrl
    const{address,discription,contact} = await req.json()
    const body = await knex('sellers').where('id',sellerId).update({
        address,
        discription,
        contact
    })
    return Response.json({body})
}