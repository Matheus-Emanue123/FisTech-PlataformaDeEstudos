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

async function registerUser(name: string, emailPrefix: string, password: string, userType: number) {
  const email = `${emailPrefix}-${Date.now()}@example.com`;
  console.log(`--- Registering User: ${email} ---`);
  try {
    const userData = {
      nome: name,
      email: email,
      password: password,
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

async function getUsersWithParams(params: { page?: number, size?: number, sortBy?: string, direction?: string, nome?: string, userType?: number }) {
  const queryString = new URLSearchParams(params as any).toString();
  console.log(`--- Getting Users with Params: ${queryString} ---`);
  try {
    const response = await client.get(`/users?${queryString}`);
    console.log("Get users with params successful:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error(
      "Get users with params failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function testUserLifecycle() {
  console.log("\n--- Testing User Lifecycle (Register, Login, Soft Delete) ---");

  const testUserPassword = "password123";
  const testUser = await registerUser("Test User", "testuser", testUserPassword, 3);
  assert(!!testUser, "User registration successful");

  const adminEmail = "admin-test@example.com"; 
  const adminPassword = "adminpassword"; 
  await loginUser(adminEmail, adminPassword);
  assert(!!accessToken, "Admin login successful");

  await deleteUser(testUser.id);

  const deletedUserById = await getUserById(testUser.id);
  assert(deletedUserById && deletedUserById.nome === 'Deleted User' && deletedUserById.email === 'deleted@example.com' && deletedUserById.disabled === true, "Soft-deleted user by ID shows placeholder info and disabled flag.");

  const allUsersAfterDelete = await getAllUsers();
  const softDeletedUserInList = allUsersAfterDelete.users.find((user: any) => user.id === testUser.id);
  assert(!softDeletedUserInList, "Soft-deleted user is NOT in the list of active users.");

  return { testUser, adminEmail, adminPassword };
}

async function createAdditionalUsers() {
  console.log("\n--- Creating additional users for pagination/sorting tests ---");
  const user1 = await registerUser("Alice Smith", "alice", "password123", 3);
  const user2 = await registerUser("Bob Johnson", "bob", "password123", 3);
  const user3 = await registerUser("Charlie Brown", "charlie", "password123", 3);
  const user4 = await registerUser("David Lee", "david", "password123", 3);

  assert(!!user1 && !!user2 && !!user3 && !!user4, "Additional users registered successfully");
  return [user1, user2, user3, user4];
}

async function testPaginationAndFilters(additionalUsers: any[]) {
  console.log("\n--- Testing Pagination and Filters ---");

  // Test 1: Pagination - page 1, size 2
  const page1Users = await getUsersWithParams({ page: 1, size: 2 });
  assert(page1Users.users.length === 2 && page1Users.page === 1 && page1Users.size === 2, `Pagination Test 1 (page 1, size 2) - Received: ${JSON.stringify(page1Users)}`);

  // Test 2: Pagination - page 2, size 2
  const page2Users = await getUsersWithParams({ page: 2, size: 2 });
  assert(page2Users.users.length === 2 && page2Users.page === 2 && page2Users.size === 2, `Pagination Test 2 (page 2, size 2) - Received: ${JSON.stringify(page2Users)}`);

  // Test 3: Sorting by name descending
  const sortedByNameDesc = await getUsersWithParams({ sortBy: 'nome', direction: 'desc' });
  const expectedOrder = ["Test Admin", "David Lee", "Charlie Brown", "Bob Johnson", "Alice Smith"];
  const actualOrder = sortedByNameDesc.users.map((u: any) => u.nome);
  const isSorted = actualOrder.length === expectedOrder.length && actualOrder.every((name: string, i: number) => name === expectedOrder[i]);
  assert(isSorted, `Sorting Test 3 (by name descending) - Expected: ${expectedOrder}, Received: ${actualOrder}`);

  // Test 4: Filter by name (like) - "admin"
  const filteredByNameAdmin = await getUsersWithParams({ nome: 'admin' });
  const allMatchAdmin = filteredByNameAdmin.users.every((user: any) => user.nome.toLowerCase().includes('admin'));
  assert(allMatchAdmin && filteredByNameAdmin.users.length > 0, `Filter Test 4 (by name 'admin') - Received: ${filteredByNameAdmin.users.map((u: any) => u.nome)}`);

  // Test 5: Filter by userType (assuming userType 1 exists for admin)
  const filteredByUserType1 = await getUsersWithParams({ userType: 1 });
  const allMatchUserType1 = filteredByUserType1.users.every((user: any) => user.UserType.id === 1);
  assert(allMatchUserType1 && filteredByUserType1.users.length > 0, `Filter Test 5 (by userType 1) - Received: ${filteredByUserType1.users.map((u: any) => u.nome)}`);

  // Test 6: Combined filters - page 1, size 1, sort by name asc, filter by name 'test', userType 3
  const combinedFilter = await getUsersWithParams({ page: 1, size: 1, sortBy: 'nome', direction: 'asc', nome: 'test', userType: 3 });
  assert(combinedFilter.users.length === 0 && combinedFilter.total === 0, `Combined Filter Test 6 (expect no users) - Received: ${JSON.stringify(combinedFilter)}`);
}

async function cleanupAdditionalUsers(usersToCleanup: any[]) {
  console.log("\n--- Cleaning up additional users ---");
  for (const user of usersToCleanup) {
    await deleteUser(user.id);
  }
  console.log("Additional users cleaned up.");
}

async function runTests() {
  try {
    const { testUser, adminEmail, adminPassword } = await testUserLifecycle();
    const additionalUsers = await createAdditionalUsers();
    await testPaginationAndFilters(additionalUsers);
    await cleanupAdditionalUsers(additionalUsers);

    console.log("\n--- All Tests Completed Successfully ---");

  } catch (error: any) {
    console.error("❌ An error occurred during tests:", error.message);
  } finally {
    if (refreshToken) {
      await logoutUser();
    }
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


function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✅ ${message}`);
  } else {
    console.error(`❌ ${message}`);
    throw new Error(message); 
  }
}

runTests();
