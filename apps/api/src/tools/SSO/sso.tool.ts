import { User, Token, ServiceUserData } from '../types';
import pool from '../../../src/tools/database.tools';

export async function createUser(
    displayName: string,
    email: string,
    password: string,
    loginType: 'classic' | 'SSO',
): Promise<User> {
    const createUserQuery = `INSERT INTO users (displayname, email, password, logintype) VALUES ($1, $2, $3, $4) RETURNING *`;
    const createUserValues = [displayName, loginType === 'SSO' ? undefined : email, password, loginType];
    const {
        rows: [user],
    } = await pool.query(createUserQuery, createUserValues);
    return user;
}

export async function linkService(user: User, serviceUserData: ServiceUserData, token: Token) {
    const createSSOQuery = `INSERT INTO sso (provider, clientId, userId, token, refreshtoken, expiresat) VALUES ($1, $2, $3, $4, $5, $6)`;
    // token.expires_in === 3600
    const tokenExpiration: Date = new Date(Date.now() + token.expires_in * 1000);
    const createSSOValues = [
        token.provider,
        serviceUserData.id,
        user.id,
        token.access_token,
        token.refresh_token,
        tokenExpiration,
    ];
    return pool.query(createSSOQuery, createSSOValues);
}

export async function updateToken(user: User, serviceUserData: any, token: Token) {
    // update, token, refreshtoken, expiresat
    const updateSSOQuery = `UPDATE sso SET token = $1, refreshtoken = $2, expiresat = $3 WHERE userId = $4 AND clientid = $5 AND provider = $6`;
    const tokenExpiration: Date = new Date(Date.now() + token.expires_in * 1000);
    const updateSSOValues = [
        token.access_token,
        token.refresh_token,
        tokenExpiration,
        user.id,
        serviceUserData.clientId,
        token.provider,
    ];
    return pool.query(updateSSOQuery, updateSSOValues);
}

export async function findUserByService(serviceName: string, serviceClientId: string): Promise<User | undefined> {
    const query = `SELECT * FROM users WHERE id = (SELECT userId FROM sso WHERE provider = $1 AND clientId = $2)`;
    const values = [serviceName, serviceClientId];
    const { rows } = await pool.query(query, values);
    return rows.length ? rows[0] : undefined;
}