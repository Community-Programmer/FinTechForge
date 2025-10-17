import { io, server } from './src/app';
import { logger } from './src/utils/logger';

const startServer = async () => {
  const port = process.env.PORT || 5050;

  server.listen(port, () => {
    logger.info(`Listening on port: ${port}`);
  });
};

io.on('connection', socket => {
  logger.info('New client connected');
  socket.on('disconnect', () => {
    logger.info('Client disconnected');
  });
});

startServer();
