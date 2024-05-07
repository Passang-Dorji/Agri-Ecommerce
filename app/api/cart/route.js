import knex from '@/database'

export async function GET(){
    const data = await knex('cart').select('*')
    return Response.json({data})
}

export async function POST(req){
    const {userId,productId,quantity} = await req.json()
    const data = await knex('cart').insert({
        user_id:userId,
        product_id:productId,
        quantity,
        added_date:new Date().toISOString()
    })
    return Response.json(data)
}