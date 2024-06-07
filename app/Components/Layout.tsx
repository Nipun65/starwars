import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-black h-screen">
      <Header />
      {children}
    </div>
  );
};
export default Layout;
