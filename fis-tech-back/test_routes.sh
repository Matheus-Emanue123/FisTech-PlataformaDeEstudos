#!/bin/bash

# FisTech API Route Testing Script
# This script tests all implemented routes in the FisTech backend

# Configuration
BASE_URL="http://localhost:3000"
AUTH_TOKEN=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to make API calls and display results
make_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    print_status "Testing: $description"
    echo "Endpoint: $method $BASE_URL$endpoint"
    
    if [ -n "$data" ]; then
        echo "Data: $data"
    fi
    
    if [ -n "$AUTH_TOKEN" ]; then
        echo "Authorization: Bearer token present"
    fi
    
    echo "---"
    
    # Make the request
    if [ -n "$data" ]; then
        response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X "$method" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $AUTH_TOKEN" \
            -d "$data" \
            "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X "$method" \
            -H "Authorization: Bearer $AUTH_TOKEN" \
            "$BASE_URL$endpoint")
    fi
    
    # Extract status code and response body
    http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
    response_body=$(echo "$response" | sed '/HTTP_STATUS:/d')
    
    # Display results
    if [ "$http_status" -ge 200 ] && [ "$http_status" -lt 300 ]; then
        print_success "Status: $http_status"
        echo "Response: $response_body"
    else
        print_error "Status: $http_status"
        echo "Response: $response_body"
    fi
    
    echo ""
    echo "=========================================="
    echo ""
}

# Start testing
echo "=========================================="
echo "FisTech API Route Testing Script"
echo "=========================================="
echo ""

# Test 1: Register a new user (using user_type_id 1 - administrador)
print_status "Starting authentication tests..."
make_request "POST" "/auth/register" \
    '{"nome": "Test User", "email": "test@example.com", "password": "password123", "user_type_id": 1}' \
    "Register new user (administrador)"

# Test 2: Login with the registered user
print_status "Testing login..."
login_response=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{"email": "test@example.com", "password": "password123"}' \
    "$BASE_URL/auth/login")

# Extract token from login response
AUTH_TOKEN=$(echo "$login_response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -n "$AUTH_TOKEN" ]; then
    print_success "Login successful, token obtained"
    echo "Token: ${AUTH_TOKEN:0:20}..."
else
    print_error "Login failed, continuing without authentication"
fi

echo ""

# Test 3: Create a user (requires auth) - using user_type_id 2 (moderador)
print_status "Starting user management tests..."
make_request "POST" "/users" \
    '{"nome": "Another User", "email": "another@example.com", "senha_hash": "password123", "user_type_id": 2}' \
    "Create new user (moderador)"

# Test 4: Get all users (requires auth)
make_request "GET" "/users" "" "Get all users"

# Test 5: Get user by ID (requires auth) - assuming user ID 1 exists
make_request "GET" "/users/8" "" "Get user by ID (1)"

# Test 6: Update user (requires auth) - assuming user ID 1 exists
make_request "PUT" "/users/8" \
    '{"nome": "Updated User Name", "email": "updated@example.com"}' \
    "Update user by ID (8)"

# Test 7: Delete user (requires auth) - assuming user ID 2 exists
make_request "DELETE" "/users/9" "" "Delete user by ID (2)"

# Test 8: Try to access protected route without token
print_status "Testing authentication middleware..."
temp_token=""
original_token="$AUTH_TOKEN"
AUTH_TOKEN=""

make_request "GET" "/users" "" "Get all users (without authentication - should fail)"

# Restore token
AUTH_TOKEN="$original_token"

# Test 9: Test invalid login
print_status "Testing invalid credentials..."
make_request "POST" "/auth/login" \
    '{"email": "invalid@example.com", "password": "wrongpassword"}' \
    "Login with invalid credentials"

# Test 10: Test invalid registration data
print_status "Testing validation..."
make_request "POST" "/auth/register" \
    '{"nome": "A", "email": "invalid-email", "password": "123", "user_type_id": 0}' \
    "Register with invalid data"

# Test 11: Register another user with different user type (usuario_padrao)
print_status "Testing different user types..."
make_request "POST" "/auth/register" \
    '{"nome": "Regular User", "email": "regular@example.com", "password": "password123", "user_type_id": 3}' \
    "Register new user (usuario_padrao)"

echo "=========================================="
echo "Testing completed!"
echo "=========================================="

# Summary
echo ""
print_status "Test Summary:"
echo "- Authentication endpoints: 3 tested"
echo "- User management endpoints: 5 tested"
echo "- Error handling: 3 tested"
echo "- Total endpoints tested: 11"
echo ""
print_warning "Note: Make sure to run 'npm run seed' before testing to populate the database with required UserType records."
print_warning "UserType IDs: 1=administrador, 2=moderador, 3=usuario_padrao" 