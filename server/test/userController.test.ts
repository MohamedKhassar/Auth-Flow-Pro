import { Request, Response } from 'express';
import { signIn } from '../Controllers/AuthController';

describe('signIn function', () => {
    test('should sign in a user with valid credentials', async () => {
        // Mock request object
        const req: Request = {
            body: {
                email: 'test@example.com',
                password: 'testpassword123',
            },
        } as Request;

        // Mock response object
        const res: Response<any, Record<string, any>> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response<any, Record<string, any>>;

        // Mock UserModel.findOne to return a user with matching email and password
        jest.mock('../Models/UserModel', () => ({
            findOne: jest.fn().mockResolvedValueOnce({
                email: 'test@example.com',
                password: 'hashedPassword', // Assuming password is already hashed
            }),
        }));

        await signIn(req, res);

        // Expect status 200 and response with user details and token
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                username: expect.any(String),
                email: 'test@example.com',
                role: expect.any(String),
                token: expect.any(String),
            })
        );
    });

    test('should return error for invalid credentials', async () => {
        // Mock request object
        const req: Request = {
            body: {
                email: 'test@example.com',
                password: 'invalidpassword',
            },
        } as Request;

        // Mock response object
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        // Mock UserModel.findOne to return null (no user found)
        jest.mock('../Models/UserModel', () => ({
            findOne: jest.fn().mockResolvedValueOnce(null),
        }));

        await signIn(req, res);

        // Expect status 400 and error message
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'email not found',
        });
    });
});
