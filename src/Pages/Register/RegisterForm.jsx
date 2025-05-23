import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import { imageUpload } from "../../Utils/Utils";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import { LuLoaderPinwheel } from "react-icons/lu"
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../Shared/PrimaryButton";
const RegisterForm = () => {
  const { CreateUserWithEmail, UpdateUserProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()
  const { t } = useTranslation();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onsubmit = async (data) => {
    setIsLoading(true)
    const imgUrl = await imageUpload(data.image[0])

    try {
      await CreateUserWithEmail(data.email, data.password)
      await UpdateUserProfile(data.name, imgUrl)


      const user = {
        username: data.name,
        photo: imgUrl,
        email: data.email,
        password: data.password,
        role: data.role
      }


      const { result } = await axiosPublic.post(`/api/register`, user)
      console.log(result);
      setIsLoading(false)
      navigate('/')


    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }


  }

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}
        className="">
        {/* name */}
        <div className="mb-4">
          <label className=" uppercase">{t('register.Name')}</label>

          <input
            type="text"
            {...register('name')}
            required
            placeholder="Your name"
            className="mt-1 w-full border-b-2 duration-300 py-1 focus:py-2 outline-none bg-transparent focus:bg-blue-100 px-4 shadow-sm"
          />
        </div>
        {/* email */}
        <div className="mb-4">
          <label className=" uppercase">{t('login.Email')}</label>

          <input
            type="email"
            {...register('email')}
            required
            placeholder="ex@gmail.com"
            className="mt-1 w-full border-b-2 duration-300 py-1 focus:py-2 outline-none bg-transparent focus:bg-blue-100 px-4 shadow-sm"
          />
        </div>
        {/* password */}
        <div className="mb-5">
          <label className=" uppercase">{t('login.Password')}</label>

          <input
            type="password"
            {...register('password')}
            required
            placeholder="Enter Password"
            className="mt-1 w-full border-b-2 duration-300 py-1 focus:py-2 outline-none bg-transparent focus:bg-blue-100 px-4 shadow-sm"
          />
        </div>
        {/* image Upload */}
        <div className="mb-6">
          <label className=" uppercase">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register('image')}
            />
            <div className="border-2 font-semibold flex bg-blue-100 justify-center items-center gap-3 border-dashed p-2 px-4 cursor-pointer">
              <span className="text-2xl">
                <FaImage />
              </span>{" "}
              {t('register.Upload Image')}
            </div>
          </label>
        </div>
        {/* User Role */}
        {/* <div className="mb-6 flex w-full gap-4">
          <label className="w-full  uppercase flex ">

            <div className=" font-semibold flex w-full  bg-blue-100 justify-center items-center gap-3 border-dashed p-2 px-4 cursor-pointer">
              <input
                type="radio"
                name="role"
                className=""
                value='customer'
                {...register('role', { required: true })}
              />
              {t('register.Customer')}
            </div>
          </label>
          <label className=" w-full uppercase flex ">

            <div className=" font-semibold w-full flex bg-blue-100 justify-center items-center gap-3 border-dashed p-2 px-4 cursor-pointer">
              <input
                type="radio"
                name="role"
                value='restaurant'
                className=""
                {...register('role', { required: true })}
              />
              {t('register.Reasturant')}
            </div>
          </label>

        </div> */}
        {/* submit button */}
        <button className="w-full " type="submit">
          <PrimaryButton
            text={
              isLoading ? <LuLoaderPinwheel className="animate-spin mx-auto text-2xl" />
                : t('register.Register')
            } />
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
