const request = require('supertest') ;
const app = require('../app.js') ;

describe('Product API Tests', () => {
    let expectProduct = [
        { id: 1, name: 'Laptop', price: 1000, stock: 5 },
        { id: 2, name: 'Smartphone', price: 600, stock: 10 }
    ] ;

    it('should return all products', async () => {
        const res = await request(app).get('/products') ;
        expect(res.statusCode).toBe(200) ;
        expect(res.body).toEqual(expectProduct) ;
    }) ;

    it('should return a product by ID', async () => {
        const res = await request(app).get('/products/2') ;
        expect(res.statusCode).toBe(200) ;
        expect(res.body).toEqual(expectProduct[1]) ;
    }) ;

    it('should return 404 if product not found', async () => {
        const res = await request(app).get('/products/3') ;
        expect(res.statusCode).toBe(404) ;
        expect(res.body).toHaveProperty('message', 'Product not found')
    }) ;

    it('should add a new product', async () => {
        const res = await request(app).post('/products').send({id: 3, name: 'TV', price: 1500, stock: 3}) ;
        expect(res.statusCode).toBe(201) ;
        const newProduct = [ 
            {id: 3, name: 'TV', price: 1500, stock: 3}
        ] 
        expect(res.body).toEqual(newProduct[0]) ;
    }) ;

    it('should update and existing product', async () => {
        const res = await request(app).put('/products/1').send({name: 'Laptop2.0', price: 2000, stock: 1}) ;
        updateProduct = [
            {id: 1, name: 'Laptop2.0', price: 2000, stock: 1}
        ]
        expect(res.statusCode).toBe(200) ;
        expect(res.body).toEqual(updateProduct[0]) ;
    }) ;

    it('should be the same product if not send any data', async () => {
        const res = await request(app).put('/products/2').send({}) ;
        expect(res.statusCode).toBe(200) ;
        expect(res.body).toEqual(expectProduct[1]) ;
    }) ;

    it('should return 404 if product not found', async () => {
        const res = await request(app).put('/products/4').send({name: 'Laptop2.0', price: 2000, stock: 1}) ;
        expect(res.statusCode).toBe(404) ;
        expect(res.body).toHaveProperty('message', 'Product not found')
    }) ;

    it('should delete a product', async () => {
        const res = await request(app).delete('/products/1') ;
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Product deleted') ;
    }) ;

    it('should return 404 if product not found', async () => {
        const res = await request(app).delete('/products/5') ;
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'Product not found') ;
    }) ;
}) ;