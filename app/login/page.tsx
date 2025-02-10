"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios, { AxiosError } from 'axios'
import { useToast } from "@/hooks/use-toast"
import api from '@/apiConfig'


interface SignInResponse {
    token: string,
}

interface ErrorResponse {
    status: BigInteger,
    message: string
}

const page = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | any>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const response = await api.post<SignInResponse>("http://localhost:8080/api/v1/auth/login", {
                email,
                password
            })

            console.log("Successfully login");
            localStorage.setItem('token', response.data.token)
            window.location.href = "/diary"
        } catch (error: any) {
            console.error('Sign in error:', error);
            let errorMessage = "An error occurred. Please try again later.";

            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>; // Type the error response
                if (axiosError.response?.data) { // Check if data exists
                    setError(axiosError.response.data.message || "Invalid email or password");
                } else {
                    setError("An error occurred. Please try again later."); // Handle cases where data is undefined
                }

            }
            // } else if (error instanceof Error) {
            //     setError(error.message || "An unexpected error occurred.");
            // } else {
            //     setError("An unexpected error occurred.");
            // }

            toast({
                variant: "destructive",
                title: "Error",
                description: "error",
            })

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>

            <header>
                <h1>Welcome Back</h1>
                <h4>Input your credentials to sign in</h4>
            </header>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                </div>
                <Button type='submit' disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                </Button>
            </form>
        </div>
    )
}

export default page