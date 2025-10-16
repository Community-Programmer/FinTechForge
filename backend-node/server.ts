import { io, server } from './src/app';
import { logger } from './src/utils/logger';

const startServer = async () => {
  const port = process.env.PORT || 5050;

  server.listen(port, () => {
    logger.error(`Listening on port: ${port}`);
  });
};

io.on('connection', socket => {
  logger.error('New client connected');
  socket.on('disconnect', () => {
    logger.error('Client disconnected');
  });
});

startServer();
