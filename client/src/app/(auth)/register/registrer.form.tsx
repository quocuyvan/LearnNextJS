"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema";
import envConfig from "@/config";
import authApiRequest from "@/apiRequests/auth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { clientSessionToken } from "@/lib/http";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: RegisterBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await authApiRequest.register(values);
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input placeholder="Confirm password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="!mt-8 w-full">
                    Register
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
