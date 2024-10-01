type AuthLayout = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: AuthLayout) => {
  return (
    <div className=" h-[650px] flex   flex-col items-center justify-center   md:grid lg:max-w-none px-8  lg:px-0">
      <div className="lg:p-8">{children}</div>
    </div>
  );
};
export default AuthLayout;
