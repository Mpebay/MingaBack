import { io } from 'socket.io-client'
import { expect } from 'chai';


const socketURL = 'http://localhost:8080'

describe("socket", () => {
    let socket;

    before(function (done) {
        this.timeout(3000);
        setTimeout(done, 2500)
        socket = io(socketURL);

        socket.on('connection', () => {
            done();
        });
    });
    describe("prueba socket sin dialog", () => {
        it('debería enviar y recibir el mensaje de prueba', (done) => {
            const message = 'Hola, soy un mensaje de prueba';

            socket.emit('mensaje del cliente', message);

            socket.on('mensaje del servidor', (response) => {
                expect(response).to.equal('Respuesta del servidor: ' + message);
                console.log(response, message);
                done();
            });
        });
    });

    describe("prueba socket con dialog, Hola", () => {

        it('debería enviar un hola y recibir algun saludo predeterminado', (done) => {
            socket.emit('chatBot', "hola");

            socket.on('chatBot', (response) => {
                const expectedResponses = ["¡Buenos días!", "¡Hey!", "¡Hola!"];
                expect(expectedResponses.includes(response)).to.be.true;
                console.log(response);
                done();
            });
        });
    })

    /*  describe("prueba socket con dialog, asd", () => {
         it('debería enviar un mensaje sin sentido, y devolver mensaje predeterminado de no coincidencia', (done) => {
             socket.emit('chatBot', "asdasd");
 
             socket.on('chatBot', (response) => {
                 expect(response).to.equal('¿Disculpa?');
                 done();
             });
         });
     }); */

})
