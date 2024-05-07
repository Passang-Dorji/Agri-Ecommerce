import knex from "@/database";
export async function GET(req){
    const searchBy = req.nextUrl.searchParams.get('search')
    const data = await knex('inventory')
            .join('products','inventory.product_id','products.id')
            .join('prices','prices.product_id','products.id')
            .distinctOn('products.id')
            .where('prices.valid_from','<',new Date())
            .whereILike('products.name',`%${searchBy}%`)
            .orWhereILike('products.code',`%${searchBy}%`)
            .orderBy(['products.id',{column:'prices.valid_from',order:'desc'}])
            .select('products.id','products.name as product_name','prices.price','inventory.quantity')      
            return Response.json({data})
  }