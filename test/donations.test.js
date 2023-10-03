import supertest from 'supertest';
import chai from 'chai';
import app from '../app.js'; 

const expect = chai.expect;
const request = supertest(app);

describe('Pruebas para createOrder10', () => {
  it('Debería crear una orden y recibir una respuesta JSON exitosa', async () => {
    const response = await request.post('/payment/create-order10');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('Order created');
  });

  it('Debería manejar errores correctamente', async () => {
    const response = await request.post('/payment/create-order10');
    expect(response.status).to.equal(500);
    expect(response.body).to.have.property('message').to.equal('Something goes wrong');
  });
});

describe('Pruebas para receiveWebhook10', () => {
  it('Debería manejar un webhook de pago correctamente', async () => {
    const response = await request.get('/payment/webhook');
    expect(response.status).to.equal(204);
  });

  it('Debería manejar errores correctamente', async () => {
    const response = await request.get('/payment/webhook');
    expect(response.status).to.equal(500);
    expect(response.body).to.have.property('message').to.equal('Something goes wrong');
  });
});
