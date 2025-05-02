export interface IAuthService {
  validateUserToken(userToken: string): Promise<UserValidationResult>;
}

export type UserValidationResult = {
  isValid: boolean;
  userId?: number;
  message?: string;
};
