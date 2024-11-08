'use client'
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Field, ErrorMessage } from "formik";

const CustomInput = ({ name, label, placeholder, type = "text" }) => {

    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={name} className="text-sm font-medium text-gray-700 pb-1">{label}</label>
            <div className="relative flex items-center">
                <Field
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    type={inputType}
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-gray-500 focus:border-primary transition-all duration-300"
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            <ErrorMessage name={name} component="div" className="text-xs text-red-500 pt-1" />
        </div>
    );
};

export default CustomInput;