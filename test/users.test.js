const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');

let token;
beforeAll((done) => {
    supertest(app)
        .post("/login")
        .send({ "email": "test@gmail.com", "password": "test" })
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            token = res.body.obj;
            done();
        });
});

describe("Probar agregar usuarios", ()=>{
    it("Debería agregar un usuario correctamente", (done)=>{
        supertest(app).post("/users").set('Authorization', `Bearer ${token}`)
        .send({"name":"Test", "lastName":"test", "email":"test@gmail.com","password":"test"})
        .expect(200).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });

    it("No debería agregar un usuario", (done)=>{
        supertest(app).post("/users")
        .send({"name":"Test", "lastName":"test", "email":"test@gmail.com","password":"test"})
        .expect(401).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });
});

describe("Probar obtener usuarios", ()=>{
    it("Debería listar los usuarios correctamente", (done)=>{
        supertest(app).get("/users").set('Authorization', `Bearer ${token}`)
        .expect(200).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });

    it("No debería listar los usuarios", (done)=>{
        supertest(app).get("/users").expect(401).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });
});

describe("Probar reemplazar usuarios", ()=>{
    it("Debería reemplazar un usuario correctamente", async () => {
        try {
            let salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash("12345", salt);
            const res = await supertest(app)
                .put("/users/654b9c6a1d7092369f92ca88")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "name": "testName",
                    "lastName": "testLastName",
                    "email": "testemail@test.com",
                    "password": passwordHash,
                    "salt": salt
                })
                .expect(200);
        } catch (err) {
            throw err;
        }
    });

    it("No debería reemplazar un usuario correctamente", async () => {
        try {
            let salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash("12345", salt);
            const res = await supertest(app)
                .put("/users:654b9c6a1d7092369f92ca88")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "name": "testName",
                    "lastName": "testLastName",
                    "email": "testemail@test.com",
                    "password": passwordHash,
                    "salt": salt
                })
                .expect(404);
        } catch (err) {
            throw err;
        }
    });
});

describe("Probar actualizar usuarios", ()=>{
    it("Debería actualizar un usuario correctamente", async () => {
        try {
            let salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash("12345", salt);
            const res = await supertest(app)
                .patch("/users/654b9c6a1d7092369f92ca88")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "name": "testName",
                    "lastName": "testLastName",
                    "email": "testemail@test.com",
                    "password": passwordHash,
                    "salt": salt
                })
                .expect(200);
        } catch (err) {
            throw err;
        }
    });

    it("No debería actualizar un usuario correctamente", async () => {
        try {
            let salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash("12345", salt);
            const res = await supertest(app)
                .patch("/users:654b9c6a1d7092369f92ca88")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "name": "testName",
                    "lastName": "testLastName",
                    "email": "testemail@test.com",
                    "password": passwordHash,
                    "salt": salt
                })
                .expect(404);
        } catch (err) {
            throw err;
        }
    });
});

describe("Probar eliminar usuarios", ()=>{
    it("Debería eliminar un usuario correctamente", (done)=>{
        supertest(app).delete("/users/65581d0a4e53124230b298fc").set('Authorization', `Bearer ${token}`)
        .expect(200).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });

    it("No debería eliminar ningún usuario", (done)=>{
        supertest(app).delete("/users:65581d0a4e53124230b298fc").set('Authorization', `Bearer ${token}`)
        .expect(404).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });
});