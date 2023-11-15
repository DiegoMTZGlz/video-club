const supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de autenticación", ()=>{
    it("Debería de obtener un login con un user y password ok", (done)=>{
        supertest(app).post("/login").send({"email":"diegoalex02@gmail.com","password":"1234"}).expect(200).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });
});