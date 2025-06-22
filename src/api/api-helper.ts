import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * API Helper class to handle API requests
 */
export class ApiHelper {
  private readonly baseUrl: string;

  /**
   * Constructor for ApiHelper
   */
  constructor() {
    this.baseUrl = process.env.API_BASE_URL || 'https://www.automationexercise.com/api';
  }

  /**
   * Make a GET request
   * @param endpoint API endpoint
   * @param params Query parameters
   * @returns API response
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      params
    };
    return await axios.get<T>(`${this.baseUrl}${endpoint}`, config);
  }

  /**
   * Make a POST request
   * @param endpoint API endpoint
   * @param data Request body
   * @returns API response
   */
  async post<T>(endpoint: string, data?: any): Promise<AxiosResponse<T>> {
    return await axios.post<T>(`${this.baseUrl}${endpoint}`, data);
  }

  /**
   * Make a PUT request
   * @param endpoint API endpoint
   * @param data Request body
   * @returns API response
   */
  async put<T>(endpoint: string, data?: any): Promise<AxiosResponse<T>> {
    return await axios.put<T>(`${this.baseUrl}${endpoint}`, data);
  }

  /**
   * Make a DELETE request
   * @param endpoint API endpoint
   * @returns API response
   */
  async delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return await axios.delete<T>(`${this.baseUrl}${endpoint}`);
  }

  /**
   * Get all products list
   * @returns API response with products list
   */
  async getProductsList(): Promise<AxiosResponse<any>> {
    return await this.get('/productsList');
  }

  /**
   * Get all brands list
   * @returns API response with brands list
   */
  async getBrandsList(): Promise<AxiosResponse<any>> {
    return await this.get('/brandsList');
  }

  /**
   * Search product by name
   * @param searchTerm Search term
   * @returns API response with search results
   */
  async searchProduct(searchTerm: string): Promise<AxiosResponse<any>> {
    return await this.post('/searchProduct', { search_product: searchTerm });
  }

  /**
   * Verify login with valid credentials
   * @param email Email
   * @param password Password
   * @returns API response with login status
   */
  async verifyLogin(email: string, password: string): Promise<AxiosResponse<any>> {
    return await this.post('/verifyLogin', { email, password });
  }

  /**
   * Create user account
   * @param userData User data
   * @returns API response with account creation status
   */
  async createAccount(userData: any): Promise<AxiosResponse<any>> {
    return await this.post('/createAccount', userData);
  }

  /**
   * Get user account detail by email
   * @param email Email
   * @returns API response with user account details
   */
  async getUserDetailByEmail(email: string): Promise<AxiosResponse<any>> {
    return await this.post('/getUserDetailByEmail', { email });
  }

  /**
   * Update user account
   * @param userData User data
   * @returns API response with account update status
   */
  async updateAccount(userData: any): Promise<AxiosResponse<any>> {
    return await this.put('/updateAccount', userData);
  }

  /**
   * Delete user account
   * @param email Email
   * @param password Password
   * @returns API response with account deletion status
   */
  async deleteAccount(email: string, password: string): Promise<AxiosResponse<any>> {
    return await this.delete(`/deleteAccount?email=${email}&password=${password}`);
  }
}
