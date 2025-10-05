import SignupForm from "@/components/SignupForm";
import FloatingCustomerCare from "@/components/FloatingCustomerCare";

export default function Home() {
  return (
    <div className="min-h-screen py-12 px-4">
      <SignupForm />
      <FloatingCustomerCare />
    </div>
  );
}