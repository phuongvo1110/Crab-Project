import Footer from "@/components/Layout/Footer/Footer";
import DashboardHeader from "@/components/Layout/Header/DashboardHeader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  return (
    <>
      <div className="w-full">
        <DashboardHeader />
      </div>
      <div className="flex min-h-screen w-full flex-col gap-4 pt-16 sm:pt-0">
        {children}
      </div>
      <Footer />
    </>
  );
}
