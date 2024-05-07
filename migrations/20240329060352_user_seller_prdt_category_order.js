/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users',(table)=>{
        table.increments();
        table.string('name',32).notNullable();
        table.string('email',64).notNullable();
        table.string('address',128).notNullable();
        table.string('contact',12).notNullable();
    })
    .createTable('sellers',(table)=>{
        table.increments()
        table.string('name',32).notNullable();
        table.string('email',64).notNullable();
        table.string('address',128).notNullable();
        table.string('discription',256).notNullable();
        table.string('contact',12).notNullable();
    })
    .createTable('category',(table)=>{
        table.increments()
        table.string('name',32).notNullable();
        table.string('discription',256).notNullable();

    })
    .createTable('products',(table)=>{
        table.increments()
        table.string('name',32).notNullable();
        table.decimal('price').notNullable();
        table.integer('quantity').notNullable();
        table.string('discription',256).notNullable();
        table.integer('category_id').unsigned().references('category.id');
        table.integer('seller_id').unsigned().references('sellers.id');
        table.string('other_details',255)
    })
    .createTable('orders',(table)=>{
        table.increments()
        table.integer('users_id').unsigned().references('users.id');
        table.dateTime('order_date').notNullable();
        table.integer('amount').notNullable();
        table.string('order_status',256);
        table.string('shipping_address',255).notNullable();
        table.string('payment_status',255);
        table.string('payment_method',64)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('orders')
        .dropTable('products')
        .dropTable('category')
        .dropTable('sellers')
        .dropTable('users')
  
};
