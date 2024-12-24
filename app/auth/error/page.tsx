"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthError() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    useEffect(() => {
        let errorMessage = "An error occurred during authentication";

        if (error === "CredentialsSignin") {
            errorMessage = "Invalid email or password";
        }

        toast.error(errorMessage);
        router.replace("/auth/login");
    }, [error, router]);

    return null;
} 