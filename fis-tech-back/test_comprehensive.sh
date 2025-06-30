#!/bin/bash

# FisTech Comprehensive API Testing Script
# This script consolidates all testing functionality and adds comprehensive tests

# Configuration
BASE_URL="http://localhost:3000"
AUTH_TOKEN=""
ADMIN_TOKEN=""
MODERATOR_TOKEN=""
USER_TOKEN=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to print colored output
print_header() {
    echo -e "${PURPLE}==========================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}==========================================${NC}"
}

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
    ((PASSED_TESTS++))
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    ((FAILED_TESTS++))
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_test() {
    echo -e "${CYAN}[TEST]${NC} $1"
    ((TOTAL_TESTS++))
}

# Function to make API calls and display results
make_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    local expected_status=$5
    local token_to_use=${6:-$AUTH_TOKEN}
    
    print_test "$description"
    echo "Endpoint: $method $BASE_URL$endpoint"
    
    if [ -n "$data" ]; then
        echo "Data: $data"
    fi
    
    if [ -n "$token_to_use" ]; then
        echo "Authorization: Bearer token present"
    else
        echo "Authorization: None"
    fi
    
    echo "Expected Status: ${expected_status:-200}"
    echo "---"
    
    # Make the request
    if [ -n "$data" ]; then
        response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X "$method" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $token_to_use" \
            -d "$data" \
            "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X "$method" \
            -H "Authorization: Bearer $token_to_use" \
            "$BASE_URL$endpoint")
    fi
    
    # Extract status code and response body
    http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
    response_body=$(echo "$response" | sed '/HTTP_STATUS:/d')
    
    # Display results
    if [ "$http_status" = "${expected_status:-200}" ]; then
        print_success "Status: $http_status (Expected: ${expected_status:-200})"
        echo "Response: $response_body"
    else
        print_error "Status: $http_status (Expected: ${expected_status:-200})"
        echo "Response: $response_body"
    fi
    
    echo ""
    echo "------------------------------------------"
    echo ""
}

# Function to login and get token
login_and_get_token() {
    local email=$1
    local password=$2
    local token_var=$3
    
    print_status "Logging in as $email..."
    
    login_response=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"$email\",\"password\":\"$password\"}" \
        "$BASE_URL/auth/login")
    
    token=$(echo "$login_response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    
    if [ -n "$token" ]; then
        print_success "Login successful for $email"
        echo "Token: ${token:0:20}..."
        eval "$token_var=\"$token\""
    else
        print_error "Login failed for $email"
        echo "Response: $login_response"
        return 1
    fi
}

# Function to test permissions
test_permissions() {
    local user_type=$1
    local token_var=$2
    local should_have_access=$3
    local endpoint=$4
    local description=$5
    
    print_test "Testing $user_type permissions: $description"
    
    local token_value
    eval "token_value=\$$token_var"
    
    if [ "$should_have_access" = "true" ]; then
        expected_status="200"
    else
        expected_status="403"
    fi
    
    make_request "GET" "$endpoint" "" "$user_type accessing $endpoint" "$expected_status" "$token_value"
}

# Start comprehensive testing
print_header "FisTech Comprehensive API Testing Script"
echo ""

# Check if server is running
print_status "Checking if server is running..."
if curl -s "$BASE_URL" > /dev/null 2>&1; then
    print_success "Server is running at $BASE_URL"
else
    print_error "Server is not running at $BASE_URL"
    print_warning "Please start the server with 'npm run dev' before running tests"
    exit 1
fi

echo ""

# ============================================================================
# SECTION 1: AUTHENTICATION TESTS
# ============================================================================
print_header "SECTION 1: AUTHENTICATION TESTS"

# Test 1.1: Register new user (administrador)
make_request "POST" "/auth/register" \
    '{"nome": "Test Admin", "email": "testadmin@example.com", "password": "password123", "user_type_id": 1}' \
    "Register new user (administrador)"

# Test 1.2: Register new user (moderador)
make_request "POST" "/auth/register" \
    '{"nome": "Test Moderator", "email": "testmod@example.com", "password": "password123", "user_type_id": 2}' \
    "Register new user (moderador)"

# Test 1.3: Register new user (usuario_padrao)
make_request "POST" "/auth/register" \
    '{"nome": "Test User", "email": "testuser@example.com", "password": "password123", "user_type_id": 3}' \
    "Register new user (usuario_padrao)"

# Test 1.4: Register with invalid data
make_request "POST" "/auth/register" \
    '{"nome": "A", "email": "invalid-email", "password": "123", "user_type_id": 0}' \
    "Register with invalid data" "400"

# Test 1.5: Register with duplicate email
make_request "POST" "/auth/register" \
    '{"nome": "Duplicate User", "email": "testadmin@example.com", "password": "password123", "user_type_id": 1}' \
    "Register with duplicate email" "400"

# Test 1.6: Login with valid credentials (admin)
login_and_get_token "testadmin@example.com" "password123" "ADMIN_TOKEN"

# Test 1.7: Login with valid credentials (moderator)
login_and_get_token "testmod@example.com" "password123" "MODERATOR_TOKEN"

# Test 1.8: Login with valid credentials (user)
login_and_get_token "testuser@example.com" "password123" "USER_TOKEN"

# Test 1.9: Login with invalid credentials
make_request "POST" "/auth/login" \
    '{"email": "invalid@example.com", "password": "wrongpassword"}' \
    "Login with invalid credentials" "401"

# Test 1.10: Login with missing fields
make_request "POST" "/auth/login" \
    '{"email": "testadmin@example.com"}' \
    "Login with missing password" "400"

echo ""

# ============================================================================
# SECTION 2: USER MANAGEMENT TESTS
# ============================================================================
print_header "SECTION 2: USER MANAGEMENT TESTS"

# Test 2.1: Create user as admin (should succeed)
make_request "POST" "/users" \
    '{"nome": "New User Admin", "email": "newuseradmin@example.com", "senha_hash": "password123", "user_type_id": 1}' \
    "Create user as admin" "201" "$ADMIN_TOKEN"

# Test 2.2: Create user as moderator (should fail - no permission)
make_request "POST" "/users" \
    '{"nome": "New User Mod", "email": "newusermod@example.com", "senha_hash": "password123", "user_type_id": 2}' \
    "Create user as moderator (should fail)" "403" "$MODERATOR_TOKEN"

# Test 2.3: Create user as regular user (should fail - no permission)
make_request "POST" "/users" \
    '{"nome": "New User Regular", "email": "newuserreg@example.com", "senha_hash": "password123", "user_type_id": 3}' \
    "Create user as regular user (should fail)" "403" "$USER_TOKEN"

# Test 2.4: Get all users as admin (should succeed)
make_request "GET" "/users" "" "Get all users as admin" "200" "$ADMIN_TOKEN"

# Test 2.5: Get all users as moderator (should fail - no permission)
make_request "GET" "/users" "" "Get all users as moderator (should fail)" "403" "$MODERATOR_TOKEN"

# Test 2.6: Get all users as regular user (should fail - no permission)
make_request "GET" "/users" "" "Get all users as regular user (should fail)" "403" "$USER_TOKEN"

# Test 2.7: Get user by ID as admin (should succeed)
make_request "GET" "/users/1" "" "Get user by ID as admin" "200" "$ADMIN_TOKEN"

# Test 2.8: Get non-existent user as admin
make_request "GET" "/users/999" "" "Get non-existent user as admin" "404" "$ADMIN_TOKEN"

# Test 2.9: Update user as admin (should succeed)
make_request "PUT" "/users/1" \
    '{"nome": "Updated Admin User", "email": "updatedadmin@example.com"}' \
    "Update user as admin" "200" "$ADMIN_TOKEN"

# Test 2.10: Update user as moderator (should fail - no permission)
make_request "PUT" "/users/1" \
    '{"nome": "Updated by Mod", "email": "updatedbymod@example.com"}' \
    "Update user as moderator (should fail)" "403" "$MODERATOR_TOKEN"

# Test 2.11: Delete user as admin (should succeed)
make_request "DELETE" "/users/2" "" "Delete user as admin" "200" "$ADMIN_TOKEN"

# Test 2.12: Delete user as moderator (should fail - no permission)
make_request "DELETE" "/users/3" "" "Delete user as moderator (should fail)" "403" "$MODERATOR_TOKEN"

echo ""

# ============================================================================
# SECTION 3: PERMISSION SYSTEM TESTS
# ============================================================================
print_header "SECTION 3: PERMISSION SYSTEM TESTS"

# Test permissions for each user type
test_permissions "Administrator" "ADMIN_TOKEN" "true" "/users" "List users"
test_permissions "Moderator" "MODERATOR_TOKEN" "false" "/users" "List users"
test_permissions "Regular User" "USER_TOKEN" "false" "/users" "List users"

# Test with invalid token
make_request "GET" "/users" "" "Access with invalid token" "401" "invalid_token_here"

# Test without token
make_request "GET" "/users" "" "Access without token" "401" ""

echo ""

# ============================================================================
# SECTION 4: ERROR HANDLING TESTS
# ============================================================================
print_header "SECTION 4: ERROR HANDLING TESTS"

# Test 4.1: Invalid endpoint
make_request "GET" "/invalid-endpoint" "" "Access invalid endpoint" "404"

# Test 4.2: Invalid method
make_request "PATCH" "/users" "" "Use invalid HTTP method" "404"

# Test 4.3: Malformed JSON
make_request "POST" "/auth/login" \
    '{"email": "test@example.com", "password": "password123"' \
    "Send malformed JSON" "400"

# Test 4.4: Missing required fields in registration
make_request "POST" "/auth/register" \
    '{"nome": "Test User"}' \
    "Register with missing required fields" "400"

# Test 4.5: Invalid user_type_id
make_request "POST" "/auth/register" \
    '{"nome": "Test User", "email": "test@example.com", "password": "password123", "user_type_id": 999}' \
    "Register with invalid user_type_id" "400"

echo ""

# ============================================================================
# SECTION 5: EDGE CASES AND BOUNDARY TESTS
# ============================================================================
print_header "SECTION 5: EDGE CASES AND BOUNDARY TESTS"

# Test 5.1: Very long name
make_request "POST" "/auth/register" \
    '{"nome": "This is a very long name that exceeds normal limits and should be validated properly by the system", "email": "longname@example.com", "password": "password123", "user_type_id": 1}' \
    "Register with very long name" "400"

# Test 5.2: Very short password
make_request "POST" "/auth/register" \
    '{"nome": "Test User", "email": "shortpass@example.com", "password": "123", "user_type_id": 1}' \
    "Register with very short password" "400"

# Test 5.3: Special characters in email
make_request "POST" "/auth/register" \
    '{"nome": "Test User", "email": "test+special@example.com", "password": "password123", "user_type_id": 1}' \
    "Register with special characters in email"

# Test 5.4: SQL injection attempt
make_request "POST" "/auth/login" \
    '{"email": "admin@example.com\"; DROP TABLE users; --", "password": "password123"}' \
    "SQL injection attempt" "401"

# Test 5.5: XSS attempt
make_request "POST" "/auth/register" \
    '{"nome": "<script>alert(\"xss\")</script>", "email": "xss@example.com", "password": "password123", "user_type_id": 1}' \
    "XSS attempt in name field" "400"

echo ""

# ============================================================================
# SECTION 6: PERFORMANCE AND LOAD TESTS
# ============================================================================
print_header "SECTION 6: PERFORMANCE AND LOAD TESTS"

# Test 6.1: Multiple rapid requests
print_test "Testing multiple rapid requests"
for i in {1..5}; do
    make_request "GET" "/users" "" "Rapid request $i" "200" "$ADMIN_TOKEN"
done

# Test 6.2: Large payload
large_payload=$(printf '{"nome": "%s", "email": "large@example.com", "password": "password123", "user_type_id": 1}' "$(printf 'A%.0s' {1..1000})")
make_request "POST" "/auth/register" "$large_payload" "Register with large payload" "400"

echo ""

# ============================================================================
# FINAL SUMMARY
# ============================================================================
print_header "TEST SUMMARY"

echo "Total Tests: $TOTAL_TESTS"
echo "Passed: $PASSED_TESTS"
echo "Failed: $FAILED_TESTS"
echo "Success Rate: $(( (PASSED_TESTS * 100) / TOTAL_TESTS ))%"

echo ""
print_status "Test Categories Covered:"
echo "- Authentication (Registration, Login, Token validation)"
echo "- User Management (CRUD operations)"
echo "- Permission System (Role-based access control)"
echo "- Error Handling (Invalid requests, validation errors)"
echo "- Edge Cases (Boundary conditions, security attempts)"
echo "- Performance (Rapid requests, large payloads)"

echo ""
print_warning "Notes:"
echo "- Make sure to run 'npm run seed' before testing to populate the database"
echo "- UserType IDs: 1=administrador, 2=moderador, 3=usuario_padrao"
echo "- Some tests may fail if the database is not properly seeded"
echo "- The server must be running on http://localhost:3000"

echo ""
print_header "Testing completed!" 