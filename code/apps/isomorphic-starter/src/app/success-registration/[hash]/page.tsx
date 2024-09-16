"use client";
import { Loader2 } from "lucide-react";
import { Text } from "rizzui";
import { useEffect } from "react";
import enableAccount from "@/app/actions/security/enableAccount.ts";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { routes } from "@/config/routes.ts";

export default function Success({ params }: { params: { hash: string } }) {
  const router = useRouter();
  useEffect(() => {
    enableAccount(params.hash).then((data) => {
      if (data.success) {
        toast.success("Your account has been activated", {
          position: "top-center",
        });
        router.push(routes.signIn);
      } else {
        data?.message && toast.error(data.message, { position: "top-center" });
      }
    });
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <Text>Activation de votre compte</Text>
      <Loader2 className="my-4 w-5 h-5 animate-spin" />
      <Text>Veuillez patienter ...</Text>
    </div>
  );
}
