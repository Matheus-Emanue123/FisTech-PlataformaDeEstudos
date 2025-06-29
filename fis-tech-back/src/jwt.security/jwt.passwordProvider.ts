require('dotenv').config();

const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const salt = bycrypt.genSalt();

export async function hashPassword(password: string): Promise<string> {

    return bycrypt.hash(password, await salt);

}


export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bycrypt.compare(password, hashedPassword);
}

