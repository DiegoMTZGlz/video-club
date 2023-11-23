const supertest = require('supertest');
const app = require('../app');

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

describe("Probar agregar actores", ()=>{
    it("Debería agregar un actor correctamente", (done)=>{
        supertest(app).post("/actors").set('Authorization', `Bearer ${token}`)
        .send({"name":"Test", "lastName":"test"})
        .expect(200).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });

    it("No debería agregar un actor", (done)=>{
        supertest(app).post("/actors")
        .send({"name":"Test", "lastName":"test"})
        .expect(401).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });
});

describe("Probar obtener actores", ()=>{
    it("Debería listar los actores correctamente", (done)=>{
        supertest(app).get("/actors").set('Authorization', `Bearer ${token}`)
        .expect(200).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });

    it("No debería listar los actores", (done)=>{
        supertest(app).get("/actors").expect(401).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });
});

describe("Probar reemplazar actores", ()=>{
    it("Debería reemplazar un actor correctamente", () => {
        try {
            supertest(app)
                .put("/actors/655e0d9441c1d5bbcefba448")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "name": "testName2",
                    "lastName": "testLastName2"
                })
                .expect(200);
        } catch (err) {
            throw err;
        }
    });

    it("No debería reemplazar ningún actor", () => {
        try {
            supertest(app)
                .put("/actors:655e0d9441c1d5bbcefba448")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "name": "testName2",
                    "lastName": "testLastName2"
                })
                .expect(404);
        } catch (err) {
            throw err;
        }
    });
});

describe("Probar actualizar usuarios", ()=>{
    it("Debería actualizar un actor correctamente", async () => {
        try {
            supertest(app)
                .patch("/actors/655e0e40901ff32858541212")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "name": "testName2",
                    "lastName": "testLastName2"
                })
                .expect(200);
        } catch (err) {
            throw err;
        }
    });

    it("No debería actualizar un actor correctamente", async () => {
        try {
            supertest(app)
                .patch("/actors:655e0e40901ff32858541212")
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "name": "testName2",
                    "lastName": "testLastName2"
                })
                .expect(404);
        } catch (err) {
            throw err;
        }
    });
});

describe("Probar eliminar usuarios", ()=>{
    it("Debería eliminar un actor correctamente", (done)=>{
        supertest(app).delete("/actors/655e0e40901ff32858541212").set('Authorization', `Bearer ${token}`)
        .expect(200).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });

    it("No debería eliminar ningún actor", (done)=>{
        supertest(app).delete("/actors:655e0e40901ff32858541212").set('Authorization', `Bearer ${token}`)
        .expect(404).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });
});