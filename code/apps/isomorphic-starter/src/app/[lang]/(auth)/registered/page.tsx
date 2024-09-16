import { metaObject } from "@/config/site.config.tsx";
import SignIn from "@/app/[lang]/(home)/page.tsx";

export const metadata = {
  ...metaObject("Success registration"),
};

export default function Registered() {
  return <SignIn />;
}
