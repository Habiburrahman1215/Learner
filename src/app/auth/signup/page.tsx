import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Create your profile" };

export default function SignupPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 py-12">
      <AuthForm mode="signup" />
    </div>
  );
}
