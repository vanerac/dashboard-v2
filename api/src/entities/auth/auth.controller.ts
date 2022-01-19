import { Response, Request } from 'express';
import Pool from '../../tools/database.tools';
import { checkPassword, hashPassword } from '../../tools/auth.tools';

export default class AuthController {
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const user = await Pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

            if (user.rows.length === 0) {
                res.status(404).json({
                    message: 'User not found',
                });
            } else {
                const [userData] = user.rows;
                const isPasswordValid = checkPassword(password, userData.password);

                if (isPasswordValid === userData.password) {
                    res.status(200).json({
                        message: 'Login successful',
                        user: userData,
                    });
                } else {
                    res.status(401).json({
                        message: 'Invalid password',
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { username: email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({
                    message: 'Username and password are required',
                });
                return;
            }

            const hashedPassword = hashPassword(password);

            const query = `
                INSERT INTO users (username, password)
                VALUES ($1, $2)
                RETURNING *`;

            const values = [email, hashedPassword];

            const { rows } = await Pool.query(query, values);

            const [user] = rows;

            res.status(201).json({
                message: 'User created',
                user,
            });
        } catch (e) {
            res.status(500).json({
                message: 'Something went wrong',
            });
        }
    }
}
