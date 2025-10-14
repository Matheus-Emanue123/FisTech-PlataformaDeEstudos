"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var BASE_URL = 'http://localhost:3000/';
var accessToken = null;
var refreshToken = null;
var client = axios_1.default.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
client.interceptors.request.use(function (config) {
    if (accessToken) {
        config.headers.Authorization = "Bearer ".concat(accessToken);
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
function registerUser() {
    return __awaiter(this, void 0, void 0, function () {
        var userData, response, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('--- Registering User ---');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    userData = {
                        nome: 'Test User',
                        email: "testuser".concat(Date.now(), "@example.com"),
                        password: 'password123',
                    };
                    return [4 /*yield*/, client.post('/auth/register', userData)];
                case 2:
                    response = _b.sent();
                    console.log('Registration successful:', response.data);
                    return [2 /*return*/, userData];
                case 3:
                    error_1 = _b.sent();
                    console.error('Registration failed:', ((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) || error_1.message);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('--- Logging In User ---');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.post('/auth/login', { email: email, password: password })];
                case 2:
                    response = _b.sent();
                    accessToken = response.data.data.accessToken;
                    refreshToken = response.data.data.refreshToken;
                    console.log('Login successful. Access Token:', accessToken ? 'Obtained' : 'Failed', 'Refresh Token:', refreshToken ? 'Obtained' : 'Failed');
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    console.error('Login failed:', ((_a = error_2.response) === null || _a === void 0 ? void 0 : _a.data) || error_2.message);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function testProtectedRoute() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('--- Testing Protected Route (/users) ---');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.get('/users')];
                case 2:
                    response = _b.sent();
                    console.log('Protected route access FAILED: Unexpected access to /users route for standard user.');
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    if (error_3.response && error_3.response.status === 403) {
                        console.log('Protected route access successful: Received 403 Forbidden for /users route as expected.');
                    }
                    else {
                        console.error('Protected route access FAILED:', ((_a = error_3.response) === null || _a === void 0 ? void 0 : _a.data) || error_3.message);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function testPermissionDenied() {
    return __awaiter(this, void 0, void 0, function () {
        var tempClient, error_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('--- Testing Permission Denied (without token) ---');
                    tempClient = axios_1.default.create({ baseURL: BASE_URL });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, tempClient.get('/users')];
                case 2:
                    _b.sent();
                    console.log('Permission denied test FAILED: Unexpected access without token.');
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    if (error_4.response && error_4.response.status === 401) {
                        console.log('Permission denied test successful: Received 401 Unauthorized.');
                    }
                    else {
                        console.error('Permission denied test FAILED:', ((_a = error_4.response) === null || _a === void 0 ? void 0 : _a.data) || error_4.message);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function refreshAccessToken() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_5;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('--- Refreshing Access Token ---');
                    if (!refreshToken) {
                        console.error('No refresh token available.');
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.post('/auth/refresh', { refreshToken: refreshToken })];
                case 2:
                    response = _b.sent();
                    accessToken = response.data.data.accessToken;
                    console.log('Access token refreshed successfully. New Access Token:', accessToken ? 'Obtained' : 'Failed');
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _b.sent();
                    console.error('Token refresh failed:', ((_a = error_5.response) === null || _a === void 0 ? void 0 : _a.data) || error_5.message);
                    throw error_5;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function logoutUser() {
    return __awaiter(this, void 0, void 0, function () {
        var error_6;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('--- Logging Out User ---');
                    if (!refreshToken) {
                        console.error('No refresh token available for logout.');
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.post('/auth/logout', { refreshToken: refreshToken })];
                case 2:
                    _b.sent();
                    accessToken = null;
                    refreshToken = null;
                    console.log('Logout successful.');
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _b.sent();
                    console.error('Logout failed:', ((_a = error_6.response) === null || _a === void 0 ? void 0 : _a.data) || error_6.message);
                    throw error_6;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function runTests() {
    return __awaiter(this, void 0, void 0, function () {
        var registeredUser, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, registerUser()];
                case 1:
                    registeredUser = _a.sent();
                    if (!registeredUser)
                        return [2 /*return*/];
                    return [4 /*yield*/, loginUser(registeredUser.email, registeredUser.password)];
                case 2:
                    _a.sent();
                    if (!accessToken)
                        return [2 /*return*/];
                    return [4 /*yield*/, testProtectedRoute()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, testPermissionDenied()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, refreshAccessToken()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, testProtectedRoute()];
                case 6:
                    _a.sent(); // Test protected route with new access token
                    return [4 /*yield*/, logoutUser()];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    error_7 = _a.sent();
                    console.error('An error occurred during tests:', error_7);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
runTests();
