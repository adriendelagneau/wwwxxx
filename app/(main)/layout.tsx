import ViewCanvas from "@/components/cans/ViewCanvas";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import Social from "@/components/social/Social";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ViewCanvas />
      <Header />

      <div>{children}</div>
      <Social />
      <Footer />
    </>
  );
}
