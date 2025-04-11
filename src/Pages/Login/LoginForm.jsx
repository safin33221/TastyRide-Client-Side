import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Countdown from "../../Components/CountDownTimer/Countdown";

const LoginForm = () => {
  const { LoginUser, resetPassword, user } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation();
  const axiosPublic = useAxiosPublic()
  const [lock, setLock] = useState(null)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onsubmit = async (data) => {
    setError('')
    setLock('')
    try {
      const { email, password } = data

      const res = await axiosPublic.post(`/api/login`, { email, password })



      await LoginUser(email, password)
      navigate('/')
    } catch (error) {
      console.log(error);


      if (error.response.status === 400) {
        return setError("User not Found !");
      }
      if (error.response.status === 401) {
        return setError(`Invalid Password. After ${6 - error.response.data.failedLoginAttempts} Attempts Your Account Will be lock `);
      }
      if (error.response.status == 403) {
        return setLock(error.response.data)
      }
      else {
        toast.error("Unknown error");
      }
    }


  }

  const handleResetPassword = async () => {
    await resetPassword(email)
    toast.success('Password reset email sent!')
  }
  console.log('email sent', email);

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onsubmit)}>
        <div className="mb-8">
          <label className=" uppercase">{t('login.Email')}</label>

          <input
            type="email"
            {...register('email')}
            required
            className="mt-1 w-full border-b-2 duration-300 py-1 focus:py-2 outline-none bg-transparent focus:bg-blue-100 px-4 shadow-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-10">
          <label className=" uppercase">{t('login.Password')}</label>

          <input
            type="password"
            {...register('password')}
            required
            className="mt-1 w-full border-b-2 duration-300 py-1 focus:py-2 outline-none bg-transparent focus:bg-blue-100 px-4 shadow-sm"
          />

          {
            lock ? <Countdown lockUntil={lock} /> : null
          }
          {
            error && <p className="text-red-500"> {error} </p>
          }
        </div>
        <input
          type="submit"
          value={t('userMenu.Login')}
          className=" w-full font-semibold border rounded-md cursor-pointer uppercase py-2 px-6"
        />
        <button type="button" onClick={handleResetPassword}
          className="text-blue-500 underline cursor-pointer hover:text-blue-700">Forget Password?
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
