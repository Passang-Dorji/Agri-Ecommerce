import knex from '@/database'

export async function GET(){
    const data = await knex('orders')
    return Response.json({data})
}

export async function POST(req){
    const {
        user_id,
        order_items,
        status,
        address,
        payment
    } = await req.json()
    
    await knex.transaction(async(trx) =>{
        const [createdOrder] = await trx('orders').insert({
            users_id: user_id,
            order_date: new Date().toISOString(),
            amount: 0,
            order_status: status,
            shipping_address: address,
            payment_status: 'completed',
            payment_method: payment
        }).returning('*')
        
        for (let i=0; i < order_items.length; i++){
            const orderItem = order_items[i]
            await trx('order_ithems').insert({
                order_id: createdOrder.id,
                product_id: orderItem.product_id,
                quantity: orderItem.quantity    
            })
            .where('order_items.order_id','orders.id')

            const foundProduct = await trx('products')
                .where('id', orderItem.product_id)
                .first('*')

            await trx('products').update({
                quantity: foundProduct.quantity - orderItem.quantity
            })
            .where('id',orderItem.product_id)
        }
    })
    return Response.json({ ok: true })
    
}