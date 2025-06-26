import { Injectable, Logger } from "@nestjs/common";
import { Connection, ConnectionStates, createConnection } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

@Injectable()
export class ConnectionManager {
  private static connections: Map<string, Connection> = new Map();
  private static readonly logger = new Logger(ConnectionManager.name);


  constructor() {

  }

  static getConnection(businessNumber: string): Connection {
    const mongoUri = process.env.MONGODB_URI ;
    console.log(mongoUri)

    if (!mongoUri) throw new Error('MONGODB_URI is not defined');

    // Check if connection exists in map
    if (ConnectionManager.connections.has(businessNumber)) {
      const existingConnection = ConnectionManager.connections.get(businessNumber)!;
      if (existingConnection.readyState === ConnectionStates.connected) {
        console.log('exsist Connection');

        return existingConnection;
      }
      ConnectionManager.connections.delete(businessNumber);
    }

    // Create new connection if not exists
    const connection = createConnection(`${mongoUri}/tenant_${businessNumber}`, {

      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    connection.on('connected', () => {
      ConnectionManager.logger.log(`Connected to database for tenant: ${businessNumber}`);
    });

    connection.on('error', (error) => {
      ConnectionManager.logger.error(`Database connection error for tenant ${businessNumber}:`, error);
      ConnectionManager.connections.delete(businessNumber);
    });

    connection.on('disconnected', () => {
      ConnectionManager.logger.warn(`Database disconnected for tenant: ${businessNumber}`);
      ConnectionManager.connections.delete(businessNumber);
    });

    // Store connection in map
    ConnectionManager.connections.set(businessNumber, connection);
    return connection;
  }

  static async closeConnection(businessNumber: string): Promise<void> {
    const connection = ConnectionManager.connections.get(businessNumber);
    if (connection) {
      await connection.close();
      ConnectionManager.connections.delete(businessNumber);
      ConnectionManager.logger.log(`Closed database connection for tenant: ${businessNumber}`);
    }
  }

  static async closeAllConnections(): Promise<void> {
    for (const [businessNumber, connection] of ConnectionManager.connections) {
      await connection.close();
      ConnectionManager.connections.delete(businessNumber);
      ConnectionManager.logger.log(`Closed database connection for tenant: ${businessNumber}`);
    }
  }
}


