import knex from "@/database";
export async function POST(req){
    const productId = req.nextUrl.searchParams.get('pdt_id')
    const {product_id,quantity,occurred_at,description} = await req.json()

        await knex.transaction(async(trx)=>{
         let insertRec = await trx('inventory').where('product_id',productId).first('*')
            if(!insertRec){
                insertRec =await trx('inventory').insert({
                    product_id:productId,
                    quantity:0
                })
                .returning('*')
            }
            await trx('stocks').insert({
                product_id:productId,
                quantity,
                occurred_at,
                description
            }).returning('*')
            await trx('inventory').increment({quantity}).where('product_id',productId)
                .returning('*')
        })
    return Response.json({ok:true})
}
