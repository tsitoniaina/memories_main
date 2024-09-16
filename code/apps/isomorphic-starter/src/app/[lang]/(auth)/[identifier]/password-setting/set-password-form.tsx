"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Text, Password } from "rizzui";
import { SubmitHandler } from "react-hook-form";
import { Form } from "@ui/form.tsx";
import { routes } from "@/config/routes.ts";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/validators/reset-password.schema.ts";
import { useFormState } from "react-dom";
import { setPassword } from "@/app/actions/security/setPassword.action.ts";
import toast from "react-hot-toast";

const initialValues = {
  password: "",
  confirmPassword: "",
};

export const PasswordSettingForm: React.FC<{ hash: string }> = ({ hash }) => {
  const router = useRouter();

  const [reset, setReset] = useState({});
  const [settingPasswordState, settingPasswordAction] = useFormState(
    setPassword,
    undefined,
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    setIsSubmitting(true);
    settingPasswordAction({ ...data, hash });
    setReset(data);
  };
  useEffect(() => {
    if (settingPasswordState === null) {
      toast.success(
        <span className="flex justify-center items-center">
          Your password was successfull set
          <Button
            size="sm"
            variant="solid"
            onClick={(t) => {
              toast.dismiss();
              router.push(routes.signIn);
            }}
          >
            sign in
          </Button>
        </span>,
        {
          position: "top-right",
          duration: 5000,
          style: {
            color: "#4ade80",
          },
        },
      );
    }
    setIsSubmitting(false);
  }, [settingPasswordState]);

  return (
    <>
      <Form<ResetPasswordSchema>
        validationSchema={resetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
          disabled: isSubmitting,
        }}
        className="pt-1.5"
      >
        {({ register, formState: { errors }, setValue }) => (
          <div className="space-y-6">
            <label className="flex justify-center text-red-600">
              {settingPasswordState?.message}
            </label>

            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("password")}
              error={errors.password?.message}
            />
            <Password
              label="Confirm Password"
              placeholder="Enter confirm password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("repeatPassword")}
              error={errors.repeatPassword?.message}
            />
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              <Button className="mt-2 w-full" type="submit" size="lg">
                Reset Password
              </Button>
            )}
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base">
        Don’t want to reset your password?{" "}
        <Link
          href={routes.signIn}
          className="font-bold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
};
