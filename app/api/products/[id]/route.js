import knex from '@/database';

export async function GET(req, {params}){
    const productId = params.id
    const {searchParams} = req.nextUrl;
    const data = await knex('products')
        .join('category','category.id','products.category_id')
        .where('products.id',productId)
        .select('products.name as procuct_name','products.price as price_per_kg','products.quantity','products.discription','category.name as category_name','category.discription as category_discription')
        
        return Response.json({data})
}
export async function PUT(req,{params}){
    const productId = params.id
    const {searchParams} = req.nextUrl
    const {price,quantity}= await req.json()
    const body = await knex('products').where('products.id',productId).update({
        price,
        quantity
    })
    return Response.json({body})
}