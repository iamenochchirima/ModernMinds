import { API_URL } from '../../../config/index';
import axios from 'axios';

export default async (req, res) => {
    if (req.method === 'POST') {
        const {
            first_name,
            last_name,
            email,
            password,
            re_password
        } = req.body;

        const body = JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            re_password
        });

        try {
            const apiRes = await axios.post(`${API_URL}/users/create/`, body, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const data = await apiRes.data;

            if (apiRes.status === 201) {
                return res.status(201).json({ success: data.success });
            } else {
                return res.status(apiRes.status).json({
                    error: data.error
                });
            }
        } catch(err) {
            return res.status(500).json({
                error: 'Something went wrong when registering for an account'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ 'error': `Method ${req.method} not allowed`});
    }
};