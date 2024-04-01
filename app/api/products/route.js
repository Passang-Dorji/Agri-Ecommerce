import knex from '@/database'

export async function GET(){
    const data = await knex('products').select('*')
    return Response.json({data})
}

export async function POST(req){
    const {name,price,quantity,discription,categoryId,sellerId,otherDetails}=await req.json()
    const body = await knex('products').insert({
        name,
        price,
        quantity,
        discription,
        category_id:categoryId,
        seller_id:sellerId,
        other_details:otherDetails
        })
    
    return Response.json({body})
}