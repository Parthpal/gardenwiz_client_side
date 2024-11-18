/* eslint-disable prettier/prettier */
import Container from "@/src//components/Container";
import Sidebar from "@/src//components/UI/sidebar/Sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
        <div className="flex w-full">
        <div className="w-4/5">
            {children}
        </div>
        <div className=" w-1/5 sticky top-0 h-screen">
            <Sidebar/>
        </div>
        </div>
    </Container>
  );
}