const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center blue_bg">
        {children}
    </div>
  )
};

export default AuthLayout;
