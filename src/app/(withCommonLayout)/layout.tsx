import { Suspense } from "react";
import { Navbar } from "../../components/navbar";


export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <Suspense>
      <main>{children}</main>
      </Suspense>
    </div>
  );
}