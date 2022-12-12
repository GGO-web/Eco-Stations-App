import React, { ChangeEvent, useState } from 'react';

import { toast } from 'react-toastify';

import jwt_decode from 'jwt-decode';

import { v4 } from 'uuid';

import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/actions';
import { useLocalStorage } from '../../hooks/localStorage';
import { useUserLoginMutation } from '../../redux/services/auth';

import { ILoginState } from '../../models/login.model';

import { AUTH_CREDENTIALS, AUTH_STATUS_DESCRIPTION, TError } from '../../constants';

export function LoginPage() {
  const [values, setValues] = useState<ILoginState>({
    password: '',
    showPassword: false,
    username: '',
  });

  const [loginUser] = useUserLoginMutation();

  const { setCredentials } = useActions();
  const [, setCredentialsStore] = useLocalStorage(AUTH_CREDENTIALS, {});

  const navigate = useNavigate();

  const handleChange = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    if (values.password === ''
      || values.username === '') {
      toast.error('Please fill all the fields 😅', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }

    try {
      const { jwtToken } = await loginUser({
        username: values.username,
        password: values.password,
      }).unwrap();

      const { role, sub }: { role: string, sub: string } = jwt_decode(jwtToken as string);

      const credentials = {
        role,
        username: sub,
        token: jwtToken as string,
      };

      setCredentials(credentials);
      setCredentialsStore(credentials);

      toast.success('You have been Log In 😎', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      navigate('/');
    } catch (err: any) {
      if (!err.data) {
        toast.error(`Something goes wrong 😨 - ${err.error.split(' ')[1]}`, {
          toastId: 'error-msg',
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });

        return;
      }

      (err as TError).data.message.map(
        (errorMessage) => (
          toast.error(<div key={v4()}>{AUTH_STATUS_DESCRIPTION[errorMessage as never]}</div>, {
            toastId: v4(),
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          })
        ),
      );
    }
  };

  return (
    <div className="grid place-items-center fixed w-full h-screen bg-light">
      <form
        className="auth-form rounded-[20px] bg-white p-5 w-[480px]"
        action="#"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="card__content flex flex-col gap-[10px] mb-6">
          <p className="text-blue-400 text-2xl mb-5">
            Login
          </p>

          <label className="auth-form__group">
            <span className="block mb-2">Email</span>

            <input
              className="input"
              placeholder="Please enter your email"
              value={values.username}
              onChange={handleChange('username')}
            />
          </label>

          <label className="auth-form__group">
            <span className="block mb-2">Password</span>

            <div className="relative">
              <input
                className="input"
                placeholder="Please enter your password"
                value={values.password}
                type={!values.showPassword ? 'password' : 'text'}
                onChange={handleChange('password')}
              />

              <button
                className="absolute top-[50%] bg-white p-1 right-3 translate-y-[-50%]"
                type="button"
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseDownPassword}
              >
                {values.showPassword
                  ? <svg width="24" height="24" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityOffIcon"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" /></svg>
                  : <svg width="24" height="24" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityIcon"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>}
              </button>
            </div>
          </label>
        </div>

        <button className="p-3 rounded-2xl bg-[#7483bd] text-white w-full" type="button" onClick={handleLogin}>Sign in</button>
      </form>
    </div>

  );
}
