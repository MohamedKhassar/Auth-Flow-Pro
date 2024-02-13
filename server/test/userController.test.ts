import { Request, Response } from 'express';
import UserModel from '../Models/UserModel';
import RoleModel from '../Models/RoleModel';
import jwt from 'jsonwebtoken';
import { signUp } from '../Controllers/AuthController';

jest.mock('../Models/UserModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('userController', () => {
    describe('signUp', () => {
        test('should create a new user', async () => {
            const req: Partial<Request> = { body: { username: 'testUser', email: 'test@example.com', role: 'roleId' } };
            const res: Partial<Response> = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            (UserModel.findOne as jest.Mock).mockResolvedValue(null);
            (UserModel.create as jest.Mock).mockResolvedValue({ _id: 'userId', username: 'testUser', email: 'test@example.com', role: 'roleId' });
            await signUp(req as Request, res as Response);

            expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com', username: 'testUser' });
            expect(UserModel.create).toHaveBeenCalledWith({ username: 'testUser', email: 'test@example.com', role: 'roleId' });
            expect(jwt.sign).toHaveBeenCalledWith({ id: 'userId' }, expect.any(String), { expiresIn: '1d' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'User created', username: 'testUser', email: 'test@example.com', role: 'roleName', token: 'fakeToken' });
        });
    });

    // Add similar test blocks for other functions (signIn, logOut, getUser)...
});
