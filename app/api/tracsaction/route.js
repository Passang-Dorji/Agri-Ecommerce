import knex from '@/database';

export async function POST(req){
 const {itemLists,totalAmount,paymentMethod,journalNumber} = await req.json()
 console.log(itemLists)
 const data = await knex.transaction(async(trx)=>{
    const [transamount] = await trx('transactions')
        .insert({
            total_amount:totalAmount,
            payment_method:paymentMethod,
            journal_number:journalNumber,
            opened_at:new Date().toISOString(),
            closed_at: new Date().toISOString()
        }).returning('*')
        for(let i=0;i<itemLists.length;i++){
            const items = itemLists[i]
            await trx('transaction_items').insert({
                transaction_id:transamount.id,
                product_id:items.productId,
                quantity:items.quantity,
                price: items.price,
                total_price: items.quantity * items.price
            }).where('transaction_items.transaction_id','transactions.id')
            
                 await trx('inventory')
                    .where('product_id',items.productId)
                    .decrement('quantity',items.quantity)
        }
 })
  return Response.json({data})
}