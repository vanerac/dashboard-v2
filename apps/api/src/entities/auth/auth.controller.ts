import { Response, Request } from 'express';
import Pool from '../../tools/database.tools';
import { checkPassword, generateToken, hashPassword } from '../../tools/auth.tools';

export default class AuthController {
    static async login(req: Request, res: Response): Promise<void> {
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
                    res.status(200)
                        .cookie('API_TOKEN', token, { expires: new Date(Date.now() + 3600 * 1000) })
                        .json({
                            message: 'Login successful',
                            token: {
                                access_token: token,
                                expires_in: 3600,
                            },
                        });
                } else {
                    res.status(401).json({
                        message: 'Invalid password',
                    });
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Something went wrong',
            });
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

            res.status(201).json({
                message: 'User created',
                user,
            });
        } catch (e) {
            console.error(e);

            // todo: Filter user already exists error
            res.status(500).json({
                message: 'Something went wrong',
            });
        }
    }
}
