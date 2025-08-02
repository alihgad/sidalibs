import { LogActionType } from '../index';
export interface AuditContext {
    businessNumber: string;
    ipAddress?: string;
    userAgent?: string;
    [key: string]: any;
}
export interface AuditLogParams {
    businessNumber: string;
    performedBy: string;
    actionType: LogActionType;
    actionName: string;
    actionDescription: string;
    module: string;
    entityType: string;
    entityId: string;
    status: 'SUCCESS' | 'FAILURE';
    context?: AuditContext;
    oldValues?: any;
    newValues?: any;
    errorMessage?: string;
}
/**
 * Simple audit logging function that can be used across all services
 * @param params AuditLogParams object containing all necessary information
 */
export declare function createAuditLog(params: AuditLogParams): Promise<void>;
/**
 * Helper function for logging CREATE operations
 */
export declare function logCreate(businessNumber: string, performedBy: string, module: string, entityType: string, entityId: string, entityName: string, context?: AuditContext): Promise<void>;
/**
 * Helper function for logging UPDATE operations
 */
export declare function logUpdate(businessNumber: string, performedBy: string, module: string, entityType: string, entityId: string, entityName: string, oldValues: any, newValues: any, context?: AuditContext): Promise<void>;
/**
 * Helper function for logging DELETE operations
 */
export declare function logDelete(businessNumber: string, performedBy: string, module: string, entityType: string, entityId: string, entityName: string, context?: AuditContext): Promise<void>;
/**
 * Helper function for logging errors
 */
export declare function logError(businessNumber: string, performedBy: string, module: string, operation: string, errorMessage: string, context?: AuditContext): Promise<void>;
/**
 * Helper function for logging inventory operations
 */
export declare function logInventoryOperation(businessNumber: string, performedBy: string, operation: string, entityType: string, entityId: string, entityName: string, quantity?: number, context?: AuditContext): Promise<void>;
/**
 * Helper function for logging financial operations
 */
export declare function logFinancialOperation(businessNumber: string, performedBy: string, operation: string, entityType: string, entityId: string, entityName: string, amount?: number, context?: AuditContext): Promise<void>;
/**
 * Helper function for logging user login
 */
export declare function logUserLogin(businessNumber: string, performedBy: string, userName: string, context?: AuditContext): Promise<void>;
/**
 * Helper function for logging user logout
 */
export declare function logUserLogout(businessNumber: string, performedBy: string, userName: string, context?: AuditContext): Promise<void>;
/**
 * Helper function for logging session termination
 */
export declare function logSessionTermination(businessNumber: string, performedBy: string, userName: string, context?: AuditContext): Promise<void>;
export declare const logActions: {
    createAuditLog: typeof createAuditLog;
    logCreate: typeof logCreate;
    logUpdate: typeof logUpdate;
    logDelete: typeof logDelete;
    logError: typeof logError;
    logInventoryOperation: typeof logInventoryOperation;
    logFinancialOperation: typeof logFinancialOperation;
    logUserLogin: typeof logUserLogin;
    logUserLogout: typeof logUserLogout;
    logSessionTermination: typeof logSessionTermination;
};
//# sourceMappingURL=audit.d.ts.map