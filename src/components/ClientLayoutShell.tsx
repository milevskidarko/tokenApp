"use client";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

export default function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
