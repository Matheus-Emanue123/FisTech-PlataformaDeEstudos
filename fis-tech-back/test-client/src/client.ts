import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";

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

async function registerUser(name: string, email: string, password: string, userType: number) {
  console.log(`--- Registering User: ${email} ---`);
  try {
    const userData = {
      nome: name,
      email: email,
      password: password, // Corrected field name
      user_type_id: userType,
    };
    const response = await client.post("/auth/register", userData);
    console.log("Registration successful:", response.data);
    return response.data.data.user; // Return the created user object
  } catch (error: any) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function loginUser(email: string, password: string) {
  console.log(`--- Logging In User: ${email} ---`);
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

async function deleteUser(userId: number) {
  console.log(`--- Deleting User ID: ${userId} (Soft Delete) ---`);
  try {
    const response = await client.delete(`/users/${userId}`);
    console.log("Soft delete successful:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Soft delete failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function getUserById(userId: number) {
  console.log(`--- Getting User by ID: ${userId} ---`);
  try {
    const response = await client.get(`/users/${userId}`);
    console.log("Get user successful:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error(
      "Get user failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function getAllUsers() {
  console.log("--- Getting All Users ---");
  try {
    const response = await client.get("/users");
    console.log("Get all users successful:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error(
      "Get all users failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function runTests() {
  try {
    // 1. Register a test user (to be soft-deleted)
    const testUserEmail = "testuser@example.com";
    const testUserPassword = "password123";
    const testUser = await registerUser("Test User", testUserEmail, testUserPassword, 3); // Assuming user_type_id 3 is 'usuario_padrao'

    if (!testUser) {
      console.error("Failed to register test user. Exiting tests.");
      return;
    }

    // 2. Log in as the seeded administrator
    const adminEmail = "admin-test@example.com"; // Use the email from prisma/seed.ts
    const adminPassword = "adminpassword"; // Use the password from prisma/seed.ts
    await loginUser(adminEmail, adminPassword);
    if (!accessToken) {
      console.error("Failed to log in as admin. Exiting tests.");
      return;
    }

    // 4. Delete the test user using the administrator's token (soft delete)
    await deleteUser(testUser.id);

    // 5. Verify soft deletion
    console.log("\n--- Verifying Soft Delete ---");

    // 5a. Fetch the soft-deleted user by ID
    const deletedUserById = await getUserById(testUser.id);
    if (deletedUserById && deletedUserById.nome === 'Deleted User' && deletedUserById.email === 'deleted@example.com' && deletedUserById.disabled === true) {
      console.log("✅ Verification successful: Soft-deleted user by ID shows placeholder info and disabled flag.");
    } else {
      console.error("❌ Verification FAILED: Soft-deleted user by ID does NOT show placeholder info or disabled flag.");
      console.log("Received user:", deletedUserById);
    }

    // 5b. Fetch all users and confirm the soft-deleted user appears with placeholder data
    const allUsers = await getAllUsers();
    const softDeletedUserInList = allUsers.find((user: any) => user.id === testUser.id);

    if (softDeletedUserInList && softDeletedUserInList.nome === 'Deleted User' && softDeletedUserInList.email === 'deleted@example.com' && softDeletedUserInList.disabled === true) {
      console.log("✅ Verification successful: Soft-deleted user in all users list shows placeholder info and disabled flag.");
    } else {
      console.error("❌ Verification FAILED: Soft-deleted user in all users list does NOT show placeholder info or disabled flag.");
      console.log("Received user in list:", softDeletedUserInList);
    }

    console.log("\n--- Tests Completed ---");

  } catch (error) {
    console.error("An error occurred during tests:", error);
  } finally {
    // Optional: Logout admin user
    if (refreshToken) {
      await logoutUser();
    }
  }
}

// Helper function for logout (from original client.ts)
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


runTests();
