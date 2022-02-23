import { Request, Response } from 'express';
import Pool from '../../tools/database.tools';
import { checkPassword, generateToken, hashPassword } from '../../tools/auth.tools';

export default class AuthController {
    static async login(req: Request, res: Response, next: any): Promise<void> {
        try {
            const { email, password } = req.body;

            const user = await Pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

            if (user.rows.length === 0) {
                res.status(401).json({
                    message: 'User not found',
                });
            } else {
                const [userData] = user.rows;
                const isPasswordValid = checkPassword(password, userData.password);

                delete userData.password;
                if (isPasswordValid) {
                    const token = generateToken(userData);
                    res.status(200).json({
                        message: 'Login successful',
                        token,
                    });
                } else {
                    res.status(401).json({
                        message: 'Invalid password',
                    });
                }
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, displayName, password } = req.body;

            if (!email || !password || !displayName) {
                res.status(400).json({
                    message: 'Missing required fields: email, password, displayName',
                });
                return;
            }

            const hashedPassword = hashPassword(password);

            const query = `
                INSERT INTO users (email, displayName, password)
                VALUES ($1, $2, $3)
                RETURNING email, displayName, id AS userId`;

            const values = [email, displayName, hashedPassword];

            const { rows } = await Pool.query(query, values);

            const [user] = rows;
            if (!user) {
                res.status(500).json({
                    message: 'Error registering user',
                });
                return;
            }

            res.status(201).json({
                message: 'User created',
            });
        } catch (e) {
            console.error(e);
            if ((e as any).code === '23505') {
                res.status(409).json({
                    message: 'User already exists',
                });
            } else {
                res.status(500).json({
                    message: 'Something went wrong',
                });
            }
        }
    }
}
