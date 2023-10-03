import executeQueries from "../dialogflow/dialogflow.js";

const projectId = "mingabot-wauv";
const languageCode = 'es';

export default (io) => {
    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');

        const sessionId = socket.id;

        socket.on("chatBot", async (data) => {
            const response = await executeQueries.executeQueries(projectId, sessionId, [data], languageCode);
            console.log("response", response)
            socket.emit("chatBot", response);
        });

        socket.on('mensaje del cliente', (mensaje) => {
            console.log('Mensaje recibido:', mensaje);

            socket.emit('mensaje del servidor', 'Respuesta del servidor: ' + mensaje);
        });
    });
};