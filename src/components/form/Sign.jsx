'use client'
import React from 'react'
import CustomInput from './CustomInput';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Loader } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { userSignIn, userSignUp } from '@/API/httpClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useUserStore from '@/Stores/AuthStore';
import { toast } from 'sonner';

function Sign({ formType }) {

    const router = useRouter()

    const { setUserStore,userInfo } = useUserStore();

    const initialValues = { name: "", email: "", password: "" };
    const validationSchema = Yup.object({
        name: formType === "sign-up" && Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
    });

    const signUpMutation = useMutation({

        mutationFn: (values) => userSignUp(values),
        onSuccess() {
            toast.success("You Signed Up Successfully");
            router.push(`/sign-in`);
        },
        onError(error) {
            console.log("Error signing up", error.message);
            toast.error(error.message);
        },
    });

    const signInMutation = useMutation({
        mutationFn: (values) => userSignIn(values),
        onSuccess(data) {
            const user = {
                userId:data.id,
                userName: data.userName,
                userEmail:data.userEmail
            }
            setUserStore(user,null)
            toast.success("You Signed in Successfully");
            router.push(`/`);
        },
        onError(error) {
            console.log("Error signing up", error.message);
            toast.error(error.message);
        },
    });

    const handleSubmit = async (values) => {
        try {
            if (formType === "sign-up") {
                signUpMutation.mutate(values)
            }
            else if (formType === "sign-in") {
                signInMutation.mutate(values)
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            if (err.response?.status === 409) {
                toast.error("This email is already registered. Please use a different email.");
            } else if (err.response?.status === 400) {
                toast.error(err.response.data.message);
            } else {
                toast.error("An error occurred while adding the user.");
            }
        }
    };

    return (
        <div className='h-dvh content-center'>
            <section className="max-w-[400px] mx-auto p-5 my-10 shadow-lg bg-white rounded-lg">
                <p className="font-semibold py-3 text-[25px] text-center">Task Manger</p>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            {formType === "sign-up" &&
                                <CustomInput name="name" label="Name" placeholder="Enter your name" />
                            }
                            <CustomInput name="email" label="Email" placeholder="Enter your email" type="email" />
                            <CustomInput name="password" label="Password" placeholder="Enter your password" type="password" />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-2 bg-black text-white font-semibold rounded-lg 
                                ${isSubmitting ? "disabled:bg-gray-200" : "hover:bg-white hover:text-black"} 
                                border-black border transition-all duration-300`}
                            >
                                {isSubmitting ? <Loader className='animate-spin text-black mx-auto' /> : formType === "sign-up" ? "Sign Up" : "Sign In"}
                            </button>
                            <div className='flex justify-center space-x-1'>
                                <p className="text-14 font-normal flex flex-row text-gray-600">
                                    {formType === "sign-in"
                                        ? "Don't have Account?"
                                        : "Already have Account?"
                                    }
                                </p>
                                <Link
                                    href={
                                        formType === "sign-in"
                                            ? `/sign-up`
                                            : `/sign-in`
                                    }
                                    className="form-link font-semibold text-primaryColor hover:text-[#363655] "
                                >
                                    {formType === "sign-in" ? "Sign Up" : "Sign In"}
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>
        </div>
    )
}

export default Sign