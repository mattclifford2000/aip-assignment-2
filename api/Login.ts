import Login from '../api/models/Login'

// Just a fake loginAPI
export const isValidLogin = (loginInfo: Login): Promise<boolean> =>
  new Promise((resolve) => {
    setTimeout(() => {
      // mock call
      resolve(loginInfo.login === "admin" && loginInfo.password === "test");
    }, 500);
  });