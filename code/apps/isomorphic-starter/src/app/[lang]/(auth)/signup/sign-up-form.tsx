"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { PiArrowRightBold } from "react-icons/pi";
import { Password, Checkbox, Button, Input, Text } from "rizzui";
import { Form } from "@ui/form.tsx";
import { routes } from "@/config/routes.ts";
import { SignUpSchema, signUpSchema } from "@/validators/signup.schema.ts";
import { useFormState } from "react-dom";
import { createUser } from "@/app/actions/user/user.action.ts";
import { Loader2 } from "lucide-react";
import { CreateUserStateType } from "@/types.ts";
import { useParams } from "next/navigation";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isAgreed: false,
};

export default function SignUpForm() {
  const [reset, setReset] = useState({});
  const { lang } = useParams<{ lang: string }>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [createUserState, formAction] = useFormState<
    CreateUserStateType,
    SignUpSchema
  >(createUser, []);
  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    setIsSubmitting(true);
    formAction(data);
  };

  const getError = useCallback(
    (field: keyof SignUpSchema) =>
      typeof createUserState === "object" &&
      createUserState?.find(
        ({ propertyPath }) =>
          propertyPath.toLowerCase() === field.toLowerCase(),
      )?.title,
    [createUserState],
  );
  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
          disabled: isSubmitting,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
            <Input
              type="text"
              size="lg"
              label="First Name"
              placeholder="Enter your first name"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("firstname")}
              error={getError("firstname") || errors.firstname?.message}
            />
            <Input
              type="text"
              size="lg"
              label="Name"
              placeholder="Enter your last name"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("name")}
              error={getError("name") || errors.name?.message}
            />
            <Input
              type="email"
              size="lg"
              label="Email"
              className="col-span-2 [&>label>span]:font-medium"
              inputClassName="text-sm"
              placeholder="Enter your email"
              {...register("email")}
              error={getError("email") || errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("password")}
              error={getError("password") || errors.password?.message}
            />
            <Password
              label="Confirm Password"
              placeholder="Enter confirm password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("confirmPassword")}
              error={getError("password") || errors.confirmPassword?.message}
            />
            <div className="col-span-2 flex items-start ">
              <Checkbox
                {...register("isAgreed")}
                className="[&>label>span]:font-medium [&>label]:items-start"
                label={
                  <>
                    By signing up you have agreed to our{" "}
                    <Link
                      href="/apps/isomorphic-starter/public"
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Terms
                    </Link>{" "}
                    &{" "}
                    <Link
                      href="/apps/isomorphic-starter/public"
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </>
                }
              />
            </div>
            <Button size="lg" type="submit" className="col-span-2 mt-2">
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Get Started</span>{" "}
                  <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{" "}
        <Link
          href={`/${lang + routes.signIn}`}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
