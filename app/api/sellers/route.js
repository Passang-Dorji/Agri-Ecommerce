import knex from '@/database'

export async function GET(){
    const data = await knex('sellers').select('*')
    return Response.json({data})
}

export async function POST(req){
    const {name,email,address,discription,contact}=await req.json()
    const body = await knex('sellers').insert({
        name,
        email,
        address,
        discription,
        contact
    })

    return Response.json({body})
}