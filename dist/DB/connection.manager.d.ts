import { Connection } from "mongoose";
export declare class ConnectionManager {
    private static connections;
    private static readonly logger;
    constructor();
    static getConnection(businessNumber: string): Connection;
    static closeConnection(businessNumber: string): Promise<void>;
    static closeAllConnections(): Promise<void>;
}
//# sourceMappingURL=connection.manager.d.ts.map