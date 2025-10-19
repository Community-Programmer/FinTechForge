import axios, { AxiosError } from "axios";

export interface ApiErrorResponse {
  status: "fail" | "error";
  statusCode: number;
  message: string;
  errorCode?: string;
  details?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export interface ParsedApiError {
  message: string;
  statusCode: number;
  errorCode?: string;
  details?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_ERROR_MESSAGE = "An unexpected error occurred";

export const parseApiError = (
  error: unknown,
  fallbackMessage: string = DEFAULT_ERROR_MESSAGE
): ParsedApiError => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return parseAxiosError(error, fallbackMessage);
  }

  if (error instanceof Error) {
    return {
      message: error.message || fallbackMessage,
      statusCode: 500,
    };
  }

  return {
    message: fallbackMessage,
    statusCode: 500,
  };
};

const parseAxiosError = (
  error: AxiosError<ApiErrorResponse>,
  fallbackMessage: string
): ParsedApiError => {
  const { response } = error;
  const data = response?.data;

  if (data) {
    return {
      message: data.message || fallbackMessage,
      statusCode: data.statusCode ?? response?.status ?? 500,
      errorCode: data.errorCode,
      details: data.details,
    };
  }
  return {
    message: error.message || fallbackMessage,
    statusCode: response?.status ?? 500,
  };
};
