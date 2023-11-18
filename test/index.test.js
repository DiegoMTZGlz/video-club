const supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de autenticación", ()=>{
    it("Debería hacer login correctamente", (done)=>{
        supertest(app).post("/login").send({"email":"diegoalex02@gmail.com","password":"1234"}).expect(200).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });
    it("No deberían coincidir las credenciales", (done)=>{
        supertest(app).post("/login").send({"email":"diegoalex02@gmail.com","password":"12345"}).expect(403).end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });
});
