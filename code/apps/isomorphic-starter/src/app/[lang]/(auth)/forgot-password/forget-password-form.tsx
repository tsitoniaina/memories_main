"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Text, Input } from "rizzui";
import { SubmitHandler } from "react-hook-form";
import { Form } from "@ui/form.tsx";
import { routes } from "@/config/routes.ts";

import {
  queryResetPasswordSchema,
  QueryResetPasswordSchema,
} from "@/validators/query-reset-password.schema.ts";
import { querySetPassword } from "@/app/actions/security/querySettingPassword.action.ts";
import { useFormState } from "react-dom";
import { RecoverPasswordStateType } from "@/types.ts";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

const initialValues = {
  email: "",
};

export default function ForgetPasswordForm() {
  const [reset, setReset] = useState({});
  const { lang } = useParams<{ lang: string }>();
  const [recoveryPasswordState, setRecovery] = useFormState<
    RecoverPasswordStateType,
    string
  >(querySetPassword, { message: null });
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const onSubmit: SubmitHandler<QueryResetPasswordSchema> = (data) => {
    setIsSubmitting(true);
    setRecovery(data.email);
    setReset(data);
  };
  useEffect(() => {
    if (recoveryPasswordState?.message) {
      setServerError(recoveryPasswordState.message);
      setIsSubmitting(false);
    }
    if (recoveryPasswordState === null) {
      setIsSubmitting(false);
      setReset(initialValues);
    }
  }, [recoveryPasswordState]);

  return (
    <>
      <Form<QueryResetPasswordSchema>
        validationSchema={queryResetPasswordSchema}
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
            {recoveryPasswordState === null && (
              <label className="text-emerald-400">
                Un lien de récupération de mot de passe a été envoyé à votre
                adresse.
              </label>
            )}
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:fon t-medium"
              inputClassName="text-sm"
              {...register("email")}
              onChange={(event) => {
                setValue("email", event.target.value);
                setServerError(null);
              }}
              error={serverError || errors.email?.message}
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
          href={`/${lang + routes.signIn}`}
          className="font-bold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
