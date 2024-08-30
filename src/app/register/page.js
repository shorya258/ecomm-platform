"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const register = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    isAdmin: "",
  });
  const onSubmit=(e)=>{
    e.preventDefault();
    toast.success("Registered successfully!");
    console.log("code")
    console.log(credentials)
    setTimeout(()=>(router.push('/login')),3000);
  }
  const onChange=(e)=>{
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <ToastContainer/>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight  ">
           Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6  "
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  autoComplete="email"
                  value={credentials.email}
                  onChange={onChange}
                  required
                  className="block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6  "
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  value={credentials.password}
                  onChange={onChange}
                  required
                  className="block w-full rounded-md border-0 p-1.5   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black"
                />
              </div>
            </div>

            <div className="flex flex-row">
              <label className="inline-flex items-center basis-1/2">
                <input
                  type="radio"
                  value="true"
                  name="isAdmin"
                  checked={credentials.isAdmin === "true"}
                  onChange={onChange}
                  className="form-radio h-5 w-5 text-indigo-600  border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2 text-white">admin</span>
              </label>
              <label className="inline-flex items-center basis-1/2">
                <input
                  type="radio"
                  value="false"
                  name="isAdmin"
                  checked={credentials.isAdmin === "false"}
                  onChange={onChange}
                  className="form-radio h-5 w-5 text-indigo-600  border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2 text-white">team member</span>
              </label>
            </div>

            <div>
              <button
                type="submit"
                onClick={onSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <Link
              href={'/login'}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
               Log in to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default register;
