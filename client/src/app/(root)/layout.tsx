import StoreProvider from "@/state/StoreProvider";
import { Providers } from "../provider";
import Header from "@/components/shared/header.component";
import LeftSidebar from "@/components/shared/left-sidebar.component";
import RightSidebar from "@/components/shared/right-sidebar.component";
import Footer from "@/components/shared/footer.component";

interface ProtectedRootLayoutProps {
  children: React.ReactNode;
}
const ProtectedRootLayout = ({ children }: ProtectedRootLayoutProps) => {
  return (
    <StoreProvider>
      <Providers>
        {/* Header */}
        <Header />
        <main className="flex flex-row">
          {/* Left Sidebar */}
          <LeftSidebar />
          <section className="main-container">
            <div className="w-full max-w-4xl dark:bg-dark-4 bg-light-2">
              {children}
            </div>
          </section>
          {/* Right Sidebar */}
          <RightSidebar />
        </main>
        {/* Footer */}
        <Footer />
      </Providers>
    </StoreProvider>
  );
};

export default ProtectedRootLayout;
