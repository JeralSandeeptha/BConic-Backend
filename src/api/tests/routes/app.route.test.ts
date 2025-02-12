import { describe } from "node:test";
import request from 'supertest';
import app from '../../../index';

describe('Server running correctly', () => {

    test('GET --> sever start correctly', async () => {
        const res = await request(app).get('/api/v1/application');
        expect(res.status).toBe(200);
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.body).toHaveBeenCalledWith({
            statusCode: 200,
            message: 'Application API checking query was success',
            data: 'Application API checking query was success'
        });
    });
});