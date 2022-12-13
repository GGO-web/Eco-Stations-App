import React, { useMemo, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';

import { toast } from 'react-toastify';

import { v4 } from 'uuid';

import Select, {
  SingleValue,
} from 'react-select';

import { useUserRegisterMutation } from '../../redux/services/auth';

import { useActions } from '../../hooks/actions';
import { useLocalStorage } from '../../hooks/localStorage';

import { IAuth } from '../../models/auth.model';
import {
  AUTH_CREDENTIALS, AUTH_STATUS_DESCRIPTION, TError,
} from '../../constants';
import { sleep } from '../../helpers/sleep';

export function Auth() {
  const [values, setValues] = React.useState<IAuth>({
    password: '',
    showPassword: false,
    username: '',
    email: '',
  });

  const [userRole, setUserRole] = useState('');

  const [createUser] = useUserRegisterMutation();

  const { setCredentials } = useActions();
  const [, setCredentialsStore] = useLocalStorage(AUTH_CREDENTIALS, {});

  const navigate = useNavigate();

  const roleOptions = useMemo(() => ([
    { value: 'User', label: 'User' },
    { value: 'Service Provider', label: 'Service Provider' },
  ]), []);

  const roleColourStyles: any = {
    menuOption: (styles: any) => ({
      ...styles,
      background: '#8EE4AF',
    }),
    singleValue: (provided: any, { hasValue }: any) => ({
      ...provided,
      color: !hasValue ? 'gray' : '#05386B',
    }),
    control: (provided: any) => ({
      ...provided,
      border: '2px solid #05386B',
      padding: '5px 7px',
      fontSize: '0.875rem',
      marginTop: '0',
    }),
  };

  const handleChange = (prop: keyof IAuth) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleChangeRole = (newRole: SingleValue<{ value: string, label: string }>) => {
    setUserRole(newRole?.value as string);
  };

  const handleAuth = async () => {
    if (values.password === ''
      || values.username === ''
      || values.email === ''
      || userRole === '') {
      toast.error('Please fill all the fields 😅', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      return;
    }

    try {
      const { jwtToken } = await createUser({
        username: values.email,
        password: values.password,
        email: values.email,
        role: userRole,
      }).unwrap();

      const { role, sub }: { role: string, sub: string } = jwt_decode(jwtToken as string);

      const credentials = {
        role,
        username: sub,
        token: jwtToken as string,
      };

      setCredentials(credentials);
      setCredentialsStore(credentials);

      toast.success('You have been Registered 😎', {
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
        (errorMessage, index: number) => (
          setTimeout(() => {
            toast
              .warn(<div key={v4()}>{AUTH_STATUS_DESCRIPTION[errorMessage as never]}</div>, {
                toastId: v4(),
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
              });
          }, index * 500)
        ),
      );
    }
  };

  return (
    <div className="grid place-items-center w-full bg-light p-5 min-[500px]:h-screen">
      <form
        className="auth-form rounded-[20px] bg-white p-5 w-[480px] max-[520px]:w-full"
        action="#"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="card__content flex flex-col gap-[10px] mb-6">
          <p className="text-blue-400 text-2xl mb-5 max-[425px]:mb-2">
            Create a new account
          </p>

          <label className="auth-form__group">
            <span className="block mb-2">Name</span>

            <input
              className="input"
              placeholder="Please enter your name"
              value={values.username}
              onChange={handleChange('username')}
            />
          </label>

          <label className="auth-form__group">
            <span className="block mb-2">Email</span>

            <input
              className="input"
              placeholder="Please enter your email"
              value={values.email}
              onChange={handleChange('email')}
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

          <div className="auth-form__group">
            <span className="block mb-2">Role</span>

            <Select
              onChange={(newRole: SingleValue<typeof roleOptions[0]>) => handleChangeRole(newRole)}
              placeholder="Select role"
              styles={roleColourStyles}
              className="react-select-container"
              classNamePrefix="react-select"
              options={roleOptions as any}
            />
          </div>
        </div>

        <button className="p-3 rounded-2xl bg-[#7483bd] text-white w-full" type="button" onClick={handleAuth}>Sign up</button>

        <p className="text-sm mt-2 text-center min-[520px]:text-base">
          If you have account already,
          {' '}
          <Link to="/Login" className="underline text-dark font-semibold">login</Link>
          {' '}
          now
          🙏🏻
        </p>
      </form>
    </div>
  );
}
