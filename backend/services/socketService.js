const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
class SocketService {
  constructor(server ,jwtSecret) {
    this.io = new Server(server, {
        cors: {
          origin: "*", // Adjust this to your allowed origins
          methods: ["GET", "POST"]
        }
      });
      this.jwtSecret = jwtSecret;
      this.setupEventHandlers();
  }

 
  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log('a user connected');

      socket.on('authenticate', (token, callback) => {
        try {
          const decoded = jwt.verify(token, this.jwtSecret);
          const userId = decoded.userId; // Assuming your JWT contains a 'id' field
          const roomId = userId.toString(); // Use user ID as room ID

          socket.join(roomId);
          socket.data.userId = userId; // Store user ID on the socket
          callback(null, roomId);
        } catch (error) {
          callback(error, null);
        }
      });

      socket.on('sendMessage', (message, callback) => {
        try {
          const roomId = socket.data.userId.toString(); // Get room ID from socket data
          this.io.to(roomId).emit('receiveMessage', message);
          callback(null, 'Message sent');
        } catch (error) {
          callback(error, null);
        }
      });


      socket.on('disconnect', () => {
        console.log('user disconnected');
        // Optionally, remove the user from rooms and notify others
      });
    });
  }

  getIO() {
    return this.io;
  }
}

module.exports = SocketService;