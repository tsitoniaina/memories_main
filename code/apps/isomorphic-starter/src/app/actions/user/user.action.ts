'use server'

import {routes} from "@/config/routes.ts";
import {SignUpSchema} from "@/validators/signup.schema.ts";
import * as process from "node:process";
import {AxiosError} from "axios";
import {CreateUserStateType, ValidationError} from "@/types.ts";
import {redirect} from "next/navigation";

const axios = require('axios').default;

export async function createUser(prevState: CreateUserStateType, formData: SignUpSchema): Promise<CreateUserStateType> {
    try {
        await axios.post(`${process.env.API_URL}/api/user/create`, formData, {
            'Content-type': 'application/json'
        })

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ violations: ValidationError[], error?: string }>;
            const data = axiosError?.response?.data
            if (data?.error) return [{title: data.error, propertyPath: 'email'}]
            return data?.violations.map(({title, propertyPath}) => ({title, propertyPath}))
        }
    }
    redirect(routes.registered)
}

