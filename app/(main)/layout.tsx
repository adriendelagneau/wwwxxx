import BackgroundCanvas from "@/components/background/BackgroundCanvas";
import { BubblesCanvas } from "@/components/bubbles/bubblesCanvas";
import ViewCanvas from "@/components/cans/ViewCanvas";
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
      <BackgroundCanvas />
      <BubblesCanvas />
      <ViewCanvas />

      <Header />
      <Sidebar />
      <div>{children}</div>
      <Social />
      <Footer />
    </>
  );
}
