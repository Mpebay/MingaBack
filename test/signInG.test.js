import { expect } from "chai";
import app from '../app.js';
import supertest from 'supertest';

describe("set de test auth/google-signin", () => { 
    it("deberia retornar status 500, The verifyIdToken method requires an ID Token", async () => { 
      const response = await supertest(app)
        .post("/auth/google-signin");
      console.log(response.body);
        expect(response.status).to.equal(500); 
        expect(response.body.message[0]).to.be.equal("The verifyIdToken method requires an ID Token");
    });
});
