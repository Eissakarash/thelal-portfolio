import React from "react";

function LayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="w-1/4">{children}</div>
    </div>
  );
}

export default LayoutAuth;
