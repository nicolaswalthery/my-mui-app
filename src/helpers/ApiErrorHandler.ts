// src/utils/ApiErrorHandler.ts
import { ApiErrorEnum } from '../enums/ApiErrorEnum';

export interface ApiError {
  code: ApiErrorEnum;
  message: string;
  details?: any;
  httpStatus?: number;
}

export class ApiErrorHandler {
  /**
   * Creates an ApiError from an HTTP response error
   */
  static createFromHttpError(error: any): ApiError {
    const httpStatus = error.response?.status;
    const responseData = error.response?.data;
    const message = error.message || 'Unknown error occurred';

    // Map HTTP status codes to API error codes
    let code: ApiErrorEnum;

    switch (httpStatus) {
      case 400:
        code = ApiErrorEnum.VALIDATION_ERROR;
        break;
      case 401:
        code = ApiErrorEnum.UNAUTHORIZED;
        break;
      case 403:
        code = ApiErrorEnum.FORBIDDEN;
        break;
      case 404:
        code = ApiErrorEnum.CLIENT_NOT_FOUND;
        break;
      case 409:
        code = ApiErrorEnum.CLIENT_ALREADY_EXISTS;
        break;
      case 422:
        code = ApiErrorEnum.VALIDATION_ERROR;
        break;
      case 429:
        code = ApiErrorEnum.AIRTABLE_RATE_LIMIT;
        break;
      case 500:
        code = ApiErrorEnum.INTERNAL_SERVER_ERROR;
        break;
      case 502:
        code = ApiErrorEnum.BAD_GATEWAY;
        break;
      case 503:
        code = ApiErrorEnum.SERVICE_UNAVAILABLE;
        break;
      default:
        if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
          code = ApiErrorEnum.NETWORK_ERROR;
        } else if (error.code === 'ECONNABORTED') {
          code = ApiErrorEnum.TIMEOUT_ERROR;
        } else {
          code = ApiErrorEnum.UNKNOWN_ERROR;
        }
    }

    // Check for specific error messages to refine the error code
    if (message.toLowerCase().includes('already exists')) {
      code = ApiErrorEnum.EMAIL_ALREADY_EXISTS;
    } else if (message.toLowerCase().includes('not found')) {
      code = ApiErrorEnum.CLIENT_NOT_FOUND;
    } else if (message.toLowerCase().includes('unauthorized')) {
      code = ApiErrorEnum.UNAUTHORIZED;
    }

    return {
      code,
      message,
      details: responseData,
      httpStatus
    };
  }

  /**
   * Creates an ApiError from a business logic error
   */
  static createFromBusinessLogicError(code: ApiErrorEnum, message: string, details?: any): ApiError {
    return {
      code,
      message,
      details
    };
  }

  /**
   * Gets a user-friendly message for an API error
   */
  static getUserFriendlyMessage(apiError: ApiError): string {
    const userMessages: Record<ApiErrorEnum, string> = {
      [ApiErrorEnum.NETWORK_ERROR]: 'Network connection error occurred',
      [ApiErrorEnum.TIMEOUT_ERROR]: 'Request timed out',
      [ApiErrorEnum.UNKNOWN_ERROR]: 'An unknown error occurred',
      [ApiErrorEnum.UNAUTHORIZED]: 'You are not authorized to perform this action',
      [ApiErrorEnum.FORBIDDEN]: 'Access to this resource is forbidden',
      [ApiErrorEnum.TOKEN_EXPIRED]: 'Your session has expired',
      [ApiErrorEnum.INVALID_CREDENTIALS]: 'Invalid credentials provided',
      [ApiErrorEnum.VALIDATION_ERROR]: 'Please check your input data',
      [ApiErrorEnum.REQUIRED_FIELD_MISSING]: 'Required field is missing',
      [ApiErrorEnum.INVALID_EMAIL_FORMAT]: 'Please enter a valid email address',
      [ApiErrorEnum.INVALID_FIELD_VALUE]: 'Invalid field value provided',
      [ApiErrorEnum.CLIENT_NOT_FOUND]: 'Client profile not found',
      [ApiErrorEnum.CLIENT_ALREADY_EXISTS]: 'Client already exists',
      [ApiErrorEnum.EMAIL_ALREADY_EXISTS]: 'A client with this email already exists',
      [ApiErrorEnum.PROFILE_UPDATE_FAILED]: 'Failed to update profile',
      [ApiErrorEnum.PROFILE_CREATE_FAILED]: 'Failed to create profile',
      [ApiErrorEnum.AIRTABLE_RATE_LIMIT]: 'Too many requests. Please try again later',
      [ApiErrorEnum.AIRTABLE_QUOTA_EXCEEDED]: 'Service quota exceeded',
      [ApiErrorEnum.AIRTABLE_INVALID_REQUEST]: 'Invalid request format',
      [ApiErrorEnum.AIRTABLE_RECORD_NOT_FOUND]: 'Record not found',
      [ApiErrorEnum.AIRTABLE_FIELD_MISSING]: 'Required field is missing',
      [ApiErrorEnum.INTERNAL_SERVER_ERROR]: 'Internal server error occurred',
      [ApiErrorEnum.SERVICE_UNAVAILABLE]: 'Service is temporarily unavailable',
      [ApiErrorEnum.BAD_GATEWAY]: 'Bad gateway error',
      [ApiErrorEnum.DUPLICATE_OPERATION]: 'This operation has already been performed',
      [ApiErrorEnum.OPERATION_NOT_ALLOWED]: 'This operation is not allowed',
      [ApiErrorEnum.INSUFFICIENT_PERMISSIONS]: 'You do not have sufficient permissions'
    };

    return userMessages[apiError.code] || apiError.message || 'An error occurred';
  }
}