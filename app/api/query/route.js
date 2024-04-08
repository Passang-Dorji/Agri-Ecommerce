import knex from '@/database'

export async function GET(){
    const data = await knex ('orders')
        .join('order_ithems','orders.id','order_ithems.order_id')
        .join('products','order_ithems.product_id','products.id')
        .join('users','users.id','orders.users_id')
        .orderBy('order_date','desc')
        .select('orders.*','products.name as product_name','orders.amount','users.name as customer_name','users.contact')
    return Response.json({ data: data })
}