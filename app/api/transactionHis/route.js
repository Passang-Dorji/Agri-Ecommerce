import knex from "@/database";

export async function GET(request) {
  const {searchParams} = request.nextUrl
  const startDate = searchParams.get("start_date")
  const endDate = searchParams.get("end_date")

  const data = await knex('transactions')
      .join('transaction_items','transaction_items.transaction_id','transactions.id')
      .join('products','transaction_items.product_id','products.id')
      .whereRaw("DATE(opened_at) >= ?", startDate)
      .andWhereRaw("DATE(closed_at) <= ?", endDate)
      .select ('transactions.*',
               'transaction_items.quantity',
               'transaction_items.price',
               'transaction_items.total_price',
               'products.name as product_name'
              )

      // console.log(data)
  return Response.json({data})  

}