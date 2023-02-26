import cookie from 'cookie';
import { API_URL } from '../../../config/index';
import axios from 'axios';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        console.log(req.body)

        const body = JSON.stringify({
            email,
            password
        });

        try {
            const apiRes = await axios.post(`${API_URL}/api/token/`, body, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const data = apiRes.data;

            if (apiRes.status === 200) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', data.access, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 30,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    ),
                    cookie.serialize(
                        'refresh', data.refresh, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 60 * 24,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    )
                ]);

                return res.status(200).json({
                    success: 'Logged in successfully'
                });
            } else {
                return res.status(apiRes.status).json({
                    error: 'Authentication failed'
                });
            }
        } catch(err) {
            return res.status(500).json({
                error: 'Something went wrong when authenticating'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    } 
};
