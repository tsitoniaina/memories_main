import AuthWrapperOne from "@/app/shared/auth-layout/auth-wrapper-one.tsx";
import Image from "next/image";
import { metaObject } from "@/config/site.config.tsx";
import SignInForm from "@/app/[lang]/(home)/sign-in-form.tsx";

export const metadata = {
  ...metaObject("Sign In"),
};

export default function SignIn() {
  return (
    <AuthWrapperOne
      title={<>Memory login </>}
      description=""
      bannerTitle="The simplest way to manage your workspace."
      bannerDescription="Amet minim mollit non deserunt ullamco est sit aliqua dolor do
      amet sint velit officia consequat duis."
      isSocialLoginActive={true}
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <Image
            src={
              "https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-up.webp"
            }
            alt="Sign Up Thumbnail"
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
      }
    >
      <SignInForm />
    </AuthWrapperOne>
  );
}
