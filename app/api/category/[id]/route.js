import knex from '@/database'

export async function GET(req, {params}){
    const categoryId = params.id 
    const {searchParams} = req.nextUrl
    const data = await knex('category')
            .join('products','products.category_id','category.id')
            .where('category.id',categoryId)
            .select('products.id', 'products.name as product_name','products.price','products.discription as product_discription','category.name as category_name','category.discription','products.other_details')
    return Response.json({data})
}
// export async function PUT(req, {params}){
//     const categoryId = params.id
//     const {searchParams} = req.nextUrl
//     const {imageSrc} = await req.json()
//     const body = await knex('category')
//             .where('category.id',categoryId)
//             .update({
//                 imageSrc,
//             })
//             return Response.json({body})
// }