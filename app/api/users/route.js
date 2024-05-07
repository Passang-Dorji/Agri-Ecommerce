import knex from '@/database'

export async function GET(){
    const data = await knex('users').select('*')
    return Response.json({data})
}

export async function POST(req){
    const {name,email,address,contact}=await req.json()
    const body = await knex('users').insert({
        name,
        email,
        address,
        contact
    })

    return Response.json({body})
}
