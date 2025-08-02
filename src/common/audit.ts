import { getLogModel, LogActionType } from '../index';
import { Types } from 'mongoose';

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
export async function createAuditLog(params: AuditLogParams): Promise<void> {
  try {
    const logModel = getLogModel(params.businessNumber);
    await logModel.create({
      actionType: params.actionType,
      actionName: params.actionName,
      actionDescription: params.actionDescription,
      performedBy: new Types.ObjectId(params.performedBy),
      module: params.module,
      entityType: params.entityType,
      entityId: new Types.ObjectId(params.entityId),
      status: params.status,
      context: params.context || { businessNumber: params.businessNumber },
      oldData: params.oldValues,
      newData: params.newValues,
    });
  } catch (error) {
    console.error('Failed to create audit log entry:', error);
    // Don't throw error to avoid breaking the main operation
  }
}

/**
 * Helper function for logging CREATE operations
 */
export async function logCreate(
  businessNumber: string,
  performedBy: string,
  module: string,
  entityType: string,
  entityId: string,
  entityName: string,
  context?: AuditContext
): Promise<void> {
  await createAuditLog({
    businessNumber,
    performedBy,
    actionType: LogActionType.CREATE,
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
export async function logUpdate(
  businessNumber: string,
  performedBy: string,
  module: string,
  entityType: string,
  entityId: string,
  entityName: string,
  oldValues: any,
  newValues: any,
  context?: AuditContext
): Promise<void> {
  await createAuditLog({
    businessNumber,
    performedBy,
    actionType: LogActionType.UPDATE,
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
export async function logDelete(
  businessNumber: string,
  performedBy: string,
  module: string,
  entityType: string,
  entityId: string,
  entityName: string,
  context?: AuditContext
): Promise<void> {
  await createAuditLog({
    businessNumber,
    performedBy,
    actionType: LogActionType.DELETE,
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
export async function logError(
  businessNumber: string,
  performedBy: string,
  module: string,
  operation: string,
  errorMessage: string,
  context?: AuditContext
): Promise<void> {
  await createAuditLog({
    businessNumber,
    performedBy,
    actionType: LogActionType.OTHER,
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
export async function logInventoryOperation(
  businessNumber: string,
  performedBy: string,
  operation: string,
  entityType: string,
  entityId: string,
  entityName: string,
  quantity?: number,
  context?: AuditContext
): Promise<void> {
  await createAuditLog({
    businessNumber,
    performedBy,
    actionType: LogActionType.OTHER,
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
export async function logFinancialOperation(
  businessNumber: string,
  performedBy: string,
  operation: string,
  entityType: string,
  entityId: string,
  entityName: string,
  amount?: number,
  context?: AuditContext
): Promise<void> {
  await createAuditLog({
    businessNumber,
    performedBy,
    actionType: LogActionType.OTHER,
    actionName: operation,
    actionDescription: `${operation} for ${entityType}: ${entityName}${amount ? ` (Amount: ${amount})` : ''}`,
    module: 'Financial Management',
    entityType,
    entityId,
    status: 'SUCCESS',
    context,
  });
} 