import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

type ResponseData = {
    token: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    let { user_id } = req.query

    if (!user_id) {
        res.status(400)
    }

    res.status(200).json({ token: createJWT(user_id) })
}

const createJWT = (user_id) => {
    const secretKey =
        '-----BEGIN RSA PRIVATE KEY-----\n' +
        process.env.JWT_SECRET_KEY +
        '\n-----END RSA PRIVATE KEY-----';

    const payload = {
        sub: user_id,
        iat: 1516239022,
        'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['editor', 'user', 'mod'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': user_id
        }
    };

    return jwt.sign(payload, secretKey, {
        algorithm: 'RS256',
    });
};