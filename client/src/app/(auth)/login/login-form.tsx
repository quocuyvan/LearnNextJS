"use client";

import authApiRequest from "@/apiRequests/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await authApiRequest.login(values);
            toast({
                description: result.payload.message,
            });
            await authApiRequest.auth({ sessionToken: result.payload.data.token });
            router.push("/me");
        } catch (error: any) {
            handleErrorApi({ error, setError: form.setError });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px] flex-shrink-0 w-full" noValidate>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="!mt-8 w-full">
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
