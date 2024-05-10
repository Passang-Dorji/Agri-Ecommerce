import knex from "@/database";

export async function GET(req){
    const journalNumber = req.nextUrl.searchParams.get('jnrl_no')
    const data = await knex('transactions')
        .join('transaction_items','transaction_items.transaction_id','transactions.id')
        .join('products','transaction_items.product_id','products.id')
        .where('journal_number',journalNumber)
        .orWhere('transactions.id',journalNumber)
        .select ('transactions.*',
                'transaction_items.quantity',
                'transaction_items.price',
                'transaction_items.total_price',
                'products.name as product_name'
        )
        return Response.json({data})
}