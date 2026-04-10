import { api } from '@booking/shared';

export function getLoginUserMutation() {
  return api.auth.loginUser();
}

export function getLoginManagerMutation() {
  return api.auth.loginManager();
}

export function getRegisterUserMutation() {
  return api.auth.register();
}

export function getVerifyEmailMutation() {
  return api.auth.verifyEmail();
}
