import axios, { type AxiosError, type AxiosInstance } from "axios";
import type { ApiError, ApiResponse } from "@/types";
import { logger } from "@/lib/logger";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

class ApiClient {
  private client: AxiosInstance;
  private refreshPromise: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("accessToken");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config;

        // Handle 401 - Unauthorized
        if (error.response?.status === 401 && originalRequest) {
          // Try to refresh token
          try {
            const accessToken = await this.refreshToken();

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.client(originalRequest);
          } catch (_refreshError) {
            // Refresh failed, logout user
            this.handleLogout();
          }
        }

        return Promise.reject(this.handleError(error));
      },
    );
  }

  private async refreshToken(): Promise<string> {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          logger.authError("No refresh token available");
          throw new Error("No refresh token available");
        }

        logger.info("Refreshing access token");
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        logger.info("Access token refreshed successfully");
        return accessToken;
      } catch (error) {
        logger.authError("Failed to refresh token", error as Error);
        throw error;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private handleLogout(): void {
    if (typeof window !== "undefined") {
      logger.info("User logged out due to authentication failure");

      // Clear all auth data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("auth-storage");

      // Dispatch custom event for app to react
      window.dispatchEvent(new CustomEvent("auth:logout"));

      // Redirect to login
      window.location.href = "/login";
    }
  }

  private handleError(error: AxiosError<ApiError>): ApiError {
    if (error.response) {
      const apiError = {
        message: error.response.data?.message || "An error occurred",
        code: error.response.data?.code,
        statusCode: error.response.status,
        details: error.response.data?.details,
      };

      logger.apiError(
        `API Error: ${apiError.message}`,
        error,
        error.config?.url
      );

      return apiError;
    }

    if (error.request) {
      logger.apiError("No response from server", error);
      return {
        message: "No response from server",
        statusCode: 0,
      };
    }

    logger.apiError("Unexpected API error", error);
    return {
      message: error.message || "An unexpected error occurred",
      statusCode: 0,
    };
  }

  async get<T>(url: string, config?: object): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: object,
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: object,
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: object,
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: object): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
