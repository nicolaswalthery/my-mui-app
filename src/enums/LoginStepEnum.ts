export const LoginStepEnum = {
    Login: 'login',
    Verify: 'verify'
}

export type LoginStepEnum = typeof LoginStepEnum[keyof typeof LoginStepEnum];
