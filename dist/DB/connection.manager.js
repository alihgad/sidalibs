"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ConnectionManager_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionManager = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let ConnectionManager = ConnectionManager_1 = class ConnectionManager {
    constructor() { }
    static getConnection(businessNumber) {
        const mongoUri = process.env.MONGODB_URI;
        console.log(mongoUri);
        if (!mongoUri)
            throw new Error("MONGODB_URI is not defined");
        // Check if connection exists in map
        if (ConnectionManager_1.connections.has(businessNumber)) {
            const existingConnection = ConnectionManager_1.connections.get(businessNumber);
            if (existingConnection.readyState === mongoose_1.ConnectionStates.connected) {
                console.log("exsist Connection");
                return existingConnection;
            }
            ConnectionManager_1.connections.delete(businessNumber);
        }
        // Create new connection if not exists
        let url;
        if (mongoUri[mongoUri.length - 1] === "/") {
            url = `${mongoUri}tenant_${businessNumber}`;
        }
        else {
            url = `${mongoUri}/tenant_${businessNumber}`;
        }
        const connection = (0, mongoose_1.createConnection)(url);
        connection.on("connected", () => {
            ConnectionManager_1.logger.log(`Connected to database for tenant: ${businessNumber}`);
        });
        connection.on("error", (error) => {
            ConnectionManager_1.logger.error(`Database connection error for tenant ${businessNumber}:`, error);
            ConnectionManager_1.connections.delete(businessNumber);
        });
        connection.on("disconnected", () => {
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
