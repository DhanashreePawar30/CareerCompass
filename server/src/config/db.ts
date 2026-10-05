import mongoose from 'mongoose';

/**
 * Connect to MongoDB.
 * - In production, uses MONGODB_URI from .env
 * - In development (no URI), uses mongodb-memory-server for zero-config local testing
 */
export async function connectDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (uri) {
    // Production / real MongoDB
    await mongoose.connect(uri);
    // Log host/db only, never credentials embedded in the URI
    console.log(`[Database] Connected to MongoDB: ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`);
  } else {
    // Development fallback — in-memory MongoDB server
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const memoryServer = await MongoMemoryServer.create();
      const memoryUri = memoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[Database] Connected to in-memory MongoDB at: ${memoryUri}`);
      console.log('[Database] ⚠️  Data will be lost on server restart. Set MONGODB_URI in .env for persistence.');
    } catch (err) {
      console.error('[Database] Failed to start in-memory MongoDB:', err);
      console.log('[Database] Server will run WITHOUT database. Only AI endpoints will work.');
      return;
    }
  }

  mongoose.connection.on('error', (err) => {
    console.error('[Database] MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('[Database] MongoDB disconnected');
  });
}
