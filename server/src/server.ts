import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';

const startServer = async () => {
  try {
    await connectDB();
    const app = createApp();

    app.listen(ENV.PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 Portfolio API server listening on http://localhost:${ENV.PORT}`);
      console.log(`📡 Health Check: http://localhost:${ENV.PORT}/api/v1/health`);
      console.log(`🌐 Public API:   http://localhost:${ENV.PORT}/api/v1/settings`);
      console.log(`🔒 Admin API:    http://localhost:${ENV.PORT}/api/v1/admin`);
      console.log(`=======================================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
