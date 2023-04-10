import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

type Props = {};

const Signup = (props: Props) => {
    const [signupErrors, setSignupErrors] = useState([]);
    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onHandleSubmit = async (data: any) => {
        try {
            await signup(data);
            navigate("/signin");
        } catch (error: any) {
            setSignupErrors(error.response.data.message);
        }
    };
    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                        Get started today
                    </h1>
                    <div className="flex flex-col justify-center items-center py-[20px] text-red-500">
                        {signupErrors.map((item) => {
                            return <p>{item}</p>;
                        })}
                    </div>
                    <form
                        action=""
                        className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                        onSubmit={handleSubmit(onHandleSubmit)}
                    >
                        <p className="text-center text-lg font-medium">Sign up</p>

                        <div>
                            <label htmlFor="email" className="sr-only">
                                Name
                            </label>

                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter name"
                                    {...register("name")}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>

                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                    {...register("email")}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter password"
                                    {...register("password")}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Confirm password
                            </label>

                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Confirm password"
                                    {...register("confirmPassword")}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;