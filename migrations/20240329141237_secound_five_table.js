/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('order_ithems',(table)=> {
            table.increments()
            table.integer('order_id').unsigned().references('orders.id')
            table.integer('product_id').unsigned().references('products.id')
            table.integer('quantity').notNullable()
            
  })
        .createTable('cart',(table)=>{
            table.increments()
            table.integer('user_id').unsigned().references('users.id')
            table.integer('product_id').unsigned().references('products.id')
            table.integer('quantity').notNullable()
            table.dateTime('added_date').notNullable()

        })
        .createTable('review',(table)=>{
            table.increments()
            table.integer('user_id').unsigned().references('users.id')
            table.integer('product_id').unsigned().references('products.id')
            table.integer('rating').notNullable()
            table.dateTime('review_date').notNullable()
            table.string('review_text',255)
        })
        .createTable('payment_method',(table)=>{
            table.increments()
            table.string('payment_method_name',32).notNullable()
        })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
            .dropTable('payment_method')
            .dropTable('review')
            .dropTable('cart')
            .dropTable('order_ithems')
  
};
