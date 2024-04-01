import knex from '@/database'

export async function GET(req){
    const productName = req.nextUrl.searchParams.get('p_name')
    const data = await knex('products')
            .join('sellers','products.seller_id','sellers.id')
            .where('products.name',productName)
            .select('products.name as product_name','products.price as product_price','products.quantity','sellers.name as seller_name','sellers.address as seller_address','sellers.contact','products.discription')
    return Response.json({data})
}

