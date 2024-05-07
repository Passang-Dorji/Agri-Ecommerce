import knex from '@/database';

export async function GET(req, {params}){
    const orderId = params.id
    const {searchParams} = req.nextUrl;
    const data = await knex('orders')
        .where('orders.id',orderId)
        .select('*')
        return Response.json({data})
}
export async function PUT(req, {params}){
    const orderId = params.id
    const {searchParams} = req.nextUrl
    const {amount,orderStatus,paymentStatus,paymentMethod} = await req.json()
    const body = await knex('orders')
            .where('orders.id',orderId)
            .update({
                amount,
                order_status:orderStatus,
                payment_status:paymentStatus,
                payment_method:paymentMethod,
                order_date:new Date().toISOString()
            })
            return Response.json({body})
}