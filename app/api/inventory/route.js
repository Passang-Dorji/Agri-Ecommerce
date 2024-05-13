import knex from '@/database';
 export async function GET(){
    const data = await knex('inventory')
            .join('products','inventory.product_id','products.id')
            .join('prices','prices.product_id','products.id')
            .distinctOn('products.id')
            .where('prices.valid_from','<',new Date())
            .orderBy(['products.id',{column:'prices.valid_from',order:'desc'}])
            .select('products.id','products.name as product_name',knex.raw('CAST(prices.price AS FLOAT) as price'),'inventory.quantity')
            return Response.json({data})
 }
export async function POST(req){
    const {productId,quantity} = await req.json()
    const body = await knex('inventory').insert({
        product_id:productId,
        quantity
    })
    return Response.json({data : validatebody})
}
