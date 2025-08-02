"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logActions = void 0;
exports.createAuditLog = createAuditLog;
exports.logCreate = logCreate;
exports.logUpdate = logUpdate;
exports.logDelete = logDelete;
exports.logError = logError;
exports.logInventoryOperation = logInventoryOperation;
exports.logFinancialOperation = logFinancialOperation;
exports.logUserLogin = logUserLogin;
exports.logUserLogout = logUserLogout;
exports.logSessionTermination = logSessionTermination;
const index_1 = require("../index");
const mongoose_1 = require("mongoose");
/**
 * Simple audit logging function that can be used across all services
 * @param params AuditLogParams object containing all necessary information
 */
async function createAuditLog(params) {
    try {
        const logModel = (0, index_1.getLogModel)(params.businessNumber);
        await logModel.create({
            actionType: params.actionType,
            actionName: params.actionName,
            actionDescription: params.actionDescription,
            performedBy: new mongoose_1.Types.ObjectId(params.performedBy),
            module: params.module,
            entityType: params.entityType,
            entityId: new mongoose_1.Types.ObjectId(params.entityId),
            status: params.status,
            context: params.context || { businessNumber: params.businessNumber },
            oldData: params.oldValues,
            newData: params.newValues,
        });
    }
    catch (error) {
        console.error('Failed to create audit log entry:', error);
        // Don't throw error to avoid breaking the main operation
    }
}
/**
 * Helper function for logging CREATE operations
 */
async function logCreate(businessNumber, performedBy, module, entityType, entityId, entityName, context) {
    await createAuditLog({
        businessNumber,
        performedBy,
        actionType: index_1.LogActionType.CREATE,
        actionName: `Create ${entityType}`,
        actionDescription: `Created ${entityType}: ${entityName}`,
        module,
        entityType,
        entityId,
        status: 'SUCCESS',
        context,
    });
}
/**
 * Helper function for logging UPDATE operations
 */
async function logUpdate(businessNumber, performedBy, module, entityType, entityId, entityName, oldValues, newValues, context) {
    await createAuditLog({
        businessNumber,
        performedBy,
        actionType: index_1.LogActionType.UPDATE,
        actionName: `Update ${entityType}`,
        actionDescription: `Updated ${entityType}: ${entityName}`,
        module,
        entityType,
        entityId,
        status: 'SUCCESS',
        context,
        oldValues,
        newValues,
    });
}
/**
 * Helper function for logging DELETE operations
 */
async function logDelete(businessNumber, performedBy, module, entityType, entityId, entityName, context) {
    await createAuditLog({
        businessNumber,
        performedBy,
        actionType: index_1.LogActionType.DELETE,
        actionName: `Delete ${entityType}`,
        actionDescription: `Deleted ${entityType}: ${entityName}`,
        module,
        entityType,
        entityId,
        status: 'SUCCESS',
        context,
    });
}
/**
 * Helper function for logging errors
 */
async function logError(businessNumber, performedBy, module, operation, errorMessage, context) {
    await createAuditLog({
        businessNumber,
        performedBy,
        actionType: index_1.LogActionType.OTHER,
        actionName: operation,
        actionDescription: `Error occurred during ${operation}`,
        module,
        entityType: 'System',
        entityId: 'N/A',
        status: 'FAILURE',
        context,
        errorMessage,
    });
}
/**
 * Helper function for logging inventory operations
 */
async function logInventoryOperation(businessNumber, performedBy, operation, entityType, entityId, entityName, quantity, context) {
    await createAuditLog({
        businessNumber,
        performedBy,
        actionType: index_1.LogActionType.OTHER,
        actionName: operation,
        actionDescription: `${operation} for ${entityType}: ${entityName}${quantity ? ` (Quantity: ${quantity})` : ''}`,
        module: 'Inventory Management',
        entityType,
        entityId,
        status: 'SUCCESS',
        context,
    });
}
/**
 * Helper function for logging financial operations
 */
async function logFinancialOperation(businessNumber, performedBy, operation, entityType, entityId, entityName, amount, context) {
    await createAuditLog({
        businessNumber,
        performedBy,
        actionType: index_1.LogActionType.OTHER,
        actionName: operation,
        actionDescription: `${operation} for ${entityType}: ${entityName}${amount ? ` (Amount: ${amount})` : ''}`,
        module: 'Financial Management',
        entityType,
        entityId,
        status: 'SUCCESS',
        context,
    });
}
/**
 * Helper function for logging user login
 */
async function logUserLogin(businessNumber, performedBy, userName, context) {
    await createAuditLog({
        businessNumber,
        performedBy,
        actionType: index_1.LogActionType.LOGIN,
        actionName: 'User Login',
        actionDescription: `User ${userName} logged in successfully`,
        module: 'User Management',
        entityType: 'User',
        entityId: performedBy,
        status: 'SUCCESS',
        context,
    });
}
/**
 * Helper function for logging user logout
 */
async function logUserLogout(businessNumber, performedBy, userName, context) {
    await createAuditLog({
        businessNumber,
        performedBy,
        actionType: index_1.LogActionType.LOGOUT,
        actionName: 'User Logout',
        actionDescription: `User ${userName} logged out successfully`,
        module: 'User Management',
        entityType: 'User',
        entityId: performedBy,
        status: 'SUCCESS',
        context,
    });
}
/**
 * Helper function for logging session termination
 */
async function logSessionTermination(businessNumber, performedBy, userName, context) {
    await createAuditLog({
        businessNumber,
        performedBy,
        actionType: index_1.LogActionType.LOGOUT,
        actionName: 'Session Termination',
        actionDescription: `Session terminated for user ${userName}`,
        module: 'User Management',
        entityType: 'User',
        entityId: performedBy,
        status: 'SUCCESS',
        context,
    });
}
// Export all logging functions as a single object
exports.logActions = {
    createAuditLog,
    logCreate,
    logUpdate,
    logDelete,
    logError,
    logInventoryOperation,
    logFinancialOperation,
    logUserLogin,
    logUserLogout,
    logSessionTermination,
};
