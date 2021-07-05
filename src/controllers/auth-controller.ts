import AuthAPI from '../api/auth-api';
import { LoginFormModel, SignupFormModel } from '../core/types';

const authAPI = new AuthAPI();

export default class AuthController {
    public async login(data: LoginFormModel): Promise<unknown> {
        try {
            console.log('fire login controller', data);
            return Promise.resolve('test');
        } catch (error) {
            // TO DO YOUR DEALS WITH ERROR
        }
    }

    public async signup(data: SignupFormModel): Promise<unknown> {
        try {
            console.log('fire signup controller', data);
            return Promise.resolve('test');
        } catch (error) {
            // TO DO YOUR DEALS WITH ERROR
        }
    }

    public async getUserInfo(): Promise<unknown> {
        try {
            console.log('fire get-user-info controller');
            const responce = await authAPI.getUserInfo();
            return responce;
        } catch (error) {
            // TO DO YOUR DEALS WITH ERROR
        }
    }

    public async logout(): Promise<unknown> {
        try {
            console.log('fire logout controller');
            const responce = await authAPI.logout();
            return responce;
        } catch (error) {
            // TO DO YOUR DEALS WITH ERROR
        }
    }
}
