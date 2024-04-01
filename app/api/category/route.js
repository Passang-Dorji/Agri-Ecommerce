import knex from '@/database'

export async function GET(){
    const data = await knex('category').select('*')
    return Response.json({data})
}

export async function POST(req){
    const {name,discription}=await req.json()
    const body = await knex('category').insert({
        name,
        discription
        })
    
    return Response.json({body})
}