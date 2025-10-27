import { mockApi, isBackendAvailable } from "./mockApi";

const API_BASE_URL = "http://localhost:3000";
const USE_MOCK = true; // Set to false when your backend is ready

class ApiService {
  constructor() {
    this.useMock = USE_MOCK;
  }

  // Utility - Auto fallback to mock if backend is unavailable
  async handleRequest(endpoint, method, body, mockFunction) {
    if (!this.useMock) {
      try {
        const backendUp = await isBackendAvailable();
        if (!backendUp) throw new Error("Backend unavailable");

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        return {
          success: response.ok,
          status: response.status,
          data,
        };
      } catch (error) {
        console.warn(`Backend unavailable. Switched to mock for ${endpoint}`);
        return await mockFunction(body);
      }
    }

    // Always use mock if USE_MOCK = true
    return await mockFunction(body);
  }

  // ----------------- Patient Registration -----------------
  async registerPatient(userData) {
    return await this.handleRequest(
      "/register-patient",
      "POST",
      userData,
      mockApi.registerPatient
    );
  }

  // ----------------- Doctor Registration -----------------
  async registerDoctor(userData) {
    return await this.handleRequest(
      "/register-doctor",
      "POST",
      userData,
      mockApi.registerDoctor
    );
  }

  // ----------------- User Login -----------------
  async login(credentials) {
    return await this.handleRequest(
      "/login",
      "POST",
      credentials,
      mockApi.login
    );
  }
}

export const apiService = new ApiService();
