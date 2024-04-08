import knex from '@/database'

export async function GET(req){
    const data = await knex('category')
            .join('products','products.category_id','category.id')
            .select('products.name as product_name','products.price','category.name as category_name')
        return Response.json({data})

}