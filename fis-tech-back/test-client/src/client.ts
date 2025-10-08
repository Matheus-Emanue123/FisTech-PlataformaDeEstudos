import axios from "axios";

const BASE_URL = "http://localhost:8080/";

let accessToken: string | null = null;
let refreshToken: string | null = null;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function registerUser() {
  console.log("--- Registering User ---");
  try {
    const userData = {
      nome: "Test User",
      email: `admin@example.com`,
      password: "123456",
      userType: 1,
    };
    const response = await client.post("/auth/register", userData);
    console.log("Registration successful:", response.data);
    return userData;
  } catch (error: any) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function loginUser(email: string, password: string) {
  console.log("--- Logging In User ---");
  try {
    const response = await client.post("/auth/login", { email, password });
    accessToken = response.data.data.accessToken;
    refreshToken = response.data.data.refreshToken;
    console.log(
      "Login successful. Access Token:",
      accessToken ? "Obtained" : "Failed",
      "Refresh Token:",
      refreshToken ? "Obtained" : "Failed"
    );
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
}

async function testProtectedRoute() {
  console.log("--- Testing Protected Route (/users) ---");
  try {
    const response = await client.get("/users");
    console.log(
      "Protected route access FAILED: Unexpected access to /users route for standard user."
    );
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      console.log(
        "Protected route access successful: Received 403 Forbidden for /users route as expected."
      );
    } else {
      console.error(
        "Protected route access FAILED:",
        error.response?.data || error.message
      );
    }
  }
}

async function testPermissionDenied() {
  console.log("--- Testing Permission Denied (without token) ---");
  const tempClient = axios.create({ baseURL: BASE_URL });
  try {
    await tempClient.get("/users");
    console.log(
      "Permission denied test FAILED: Unexpected access without token."
    );
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(
        "Permission denied test successful: Received 401 Unauthorized."
      );
    } else {
      console.error(
        "Permission denied test FAILED:",
        error.response?.data || error.message
      );
    }
  }
}

async function refreshAccessToken() {
  console.log("--- Refreshing Access Token ---");
  if (!refreshToken) {
    console.error("No refresh token available.");
    return;
  }
  try {
    const response = await client.post("/auth/refresh", { refreshToken });
    accessToken = response.data.data.accessToken;
    console.log(
      "Access token refreshed successfully. New Access Token:",
      accessToken ? "Obtained" : "Failed"
    );
  } catch (error: any) {
    console.error(
      "Token refresh failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function logoutUser() {
  console.log("--- Logging Out User ---");
  if (!refreshToken) {
    console.error("No refresh token available for logout.");
    return;
  }
  try {
    await client.post("/auth/logout", { refreshToken });
    accessToken = null;
    refreshToken = null;
    console.log("Logout successful.");
  } catch (error: any) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error;
  }
}

async function runTests() {
  try {
    const registeredUser = await registerUser();
    if (!registeredUser) return;

    await loginUser(registeredUser.email, registeredUser.password);
    if (!accessToken) return;

    await testProtectedRoute();
    await testPermissionDenied();
    await refreshAccessToken();
    await testProtectedRoute(); // Test protected route with new access token
    await logoutUser();
  } catch (error) {
    console.error("An error occurred during tests:", error);
  }
}

runTests();
