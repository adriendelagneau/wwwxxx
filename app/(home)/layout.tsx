import BubblesView from "@/components/bubbles/BubblesView";
import BackgroundCanvas from "@/components/layout/bg/BackgroundCanvas";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/sidebarMenu/Sidebar";
import Social from "@/components/social/Social";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Sidebar />
      <BubblesView />
      <BackgroundCanvas />
      {children}
      <Social />
      <Footer />
    </>
  );
}
