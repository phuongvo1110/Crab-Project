import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

export const metadata = {
  title: "Crab - Public Transportation Service",
  description: "Website for public booking transportation service",
  keywords: "Crab, motor, bike, booking service",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  return (
    <>
      <Header />
      <div className="w-full h-fit min-h-screen flex flex-col gap-4">
        {children}
      </div>
      <Footer />
    </>
  );
}
