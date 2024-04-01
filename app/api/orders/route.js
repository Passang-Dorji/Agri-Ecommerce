import knex from '@/database'

export async function GET(){
    const data = await knex('orders').select('*')
    return Response.json({data})
}

export async function POST(req){
    const {usersId,amount,orderStatus,shippingAddress,paymentStatus,paymentMethod}=await req.json()
    const body = await knex('orders').insert({
        users_id:usersId,
        order_date:new Date().toISOString(),
        amount,
        order_status:orderStatus,
        shipping_address:shippingAddress,
        payment_status:paymentStatus,
        payment_method:paymentMethod
        })
    
    return Response.json({body})
}