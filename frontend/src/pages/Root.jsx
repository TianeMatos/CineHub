import { Outlet } from "react-router";
import { Navbar } from "../components/layout/NavBar";
import { Footer } from "../components/layout/Footer";

export function Root() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f0f0f] dark:text-neutral-100">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
