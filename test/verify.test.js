import { expect } from "chai";
import app from '../app.js';
import supertest from 'supertest';

describe("set de test auth/verify/:verify_code", () => { 
  describe("auth/verify/:verify_code", () => { 
    it("deberia retornar status 400, Código de verificación inválido o cuenta ya verificada.", async () => { 
      const response = await supertest(app)
        .get("/auth/verify/c83d75ff4c65a8725412")
        console.log(response.status)
        console.log(response.body)
        expect (response.status).to.equal(400);
        expect(response.body.message).to.be.equal("Código de verificación inválido o cuenta ya verificada.");
    });

    it("deberia retornar status 200, Cuenta verificada exitosamente.", async () => { 
        const response = await supertest(app)
          .get("/auth/verify/135dbb162856916d94c9")
          console.log(response.body)
          expect (response.status).to.equal(200);
          expect(response.body.message).to.be.equal("Cuenta verificada exitosamente.");
      });
  });
});

