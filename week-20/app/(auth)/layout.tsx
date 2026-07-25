import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>Header</div>
      {children}
      <div>Footer</div>
    </div>
  );
}

export default layout;
