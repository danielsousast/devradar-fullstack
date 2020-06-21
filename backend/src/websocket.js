import socketio from 'socket.io';
import parseStringAsArray from './core/utils/parseStringAsArray';
import calculateDistance from './core/utils/calculateDistance';

let io;
const connections = [];

export function setupWebsocket(server) {
    io = socketio(server);

    io.on("connection", socket => {
      const { latitude, longitude, techs } = socket.handshake.query; // Parametros que vem do frontend
  
      // Salvar todas as conexoes que sao feita na aplicacao
      connections.push({
        id: socket.id,
        coordinates: {
          latitude: Number(latitude),
          longitude: Number(longitude)
        },
        techs: parseStringAsArray(techs)
      });
    });
}

export function findConnections(coordinates, techs) {
    return connections.filter(connection => {
        // Calculo vendo se o dev esta numa distancia de 10km
        // e se o dev cadastrado possui alguma das tecnologias que esta sendo pesquisada
        return (
          calculateDistance(coordinates, connection.coordinates) < 10 &&
          connection.techs.some(item => techs.includes(item))
        );
      });
}

export function sendMessage(to, message, data) {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
      });
}