"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ConnectionManager_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionManager = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let ConnectionManager = ConnectionManager_1 = class ConnectionManager {
    constructor() {
    }
    static getConnection(businessNumber) {
        const mongoUri = process.env.MONGODB_URI;
        console.log(mongoUri);
        if (!mongoUri)
            throw new Error('MONGODB_URI is not defined');
        // Check if connection exists in map
        if (ConnectionManager_1.connections.has(businessNumber)) {
            const existingConnection = ConnectionManager_1.connections.get(businessNumber);
            if (existingConnection.readyState === mongoose_1.ConnectionStates.connected) {
                console.log('exsist Connection');
                return existingConnection;
            }
            ConnectionManager_1.connections.delete(businessNumber);
        }
        // Create new connection if not exists
        let url;
        if (mongoUri[mongoUri.length - 1] === '/') {
            url = mongoUri.slice(0, mongoUri.length - 1);
        }
        else {
            url = mongoUri;
        }
        const connection = (0, mongoose_1.createConnection)(`${mongoUri}/tenant_${businessNumber}`, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        connection.on('connected', () => {
            ConnectionManager_1.logger.log(`Connected to database for tenant: ${businessNumber}`);
        });
        connection.on('error', (error) => {
            ConnectionManager_1.logger.error(`Database connection error for tenant ${businessNumber}:`, error);
            ConnectionManager_1.connections.delete(businessNumber);
        });
        connection.on('disconnected', () => {
            ConnectionManager_1.logger.warn(`Database disconnected for tenant: ${businessNumber}`);
            ConnectionManager_1.connections.delete(businessNumber);
        });
        // Store connection in map
        ConnectionManager_1.connections.set(businessNumber, connection);
        return connection;
    }
    static async closeConnection(businessNumber) {
        const connection = ConnectionManager_1.connections.get(businessNumber);
        if (connection) {
            await connection.close();
            ConnectionManager_1.connections.delete(businessNumber);
            ConnectionManager_1.logger.log(`Closed database connection for tenant: ${businessNumber}`);
        }
    }
    static async closeAllConnections() {
        for (const [businessNumber, connection] of ConnectionManager_1.connections) {
            await connection.close();
            ConnectionManager_1.connections.delete(businessNumber);
            ConnectionManager_1.logger.log(`Closed database connection for tenant: ${businessNumber}`);
        }
    }
};
exports.ConnectionManager = ConnectionManager;
ConnectionManager.connections = new Map();
ConnectionManager.logger = new common_1.Logger(ConnectionManager_1.name);
exports.ConnectionManager = ConnectionManager = ConnectionManager_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ConnectionManager);
