import Footer from "@/src/Components/ui/Footer/Footer";
import { Navbar } from "@/src/Components/ui/Navbar";
import { childrenProps } from "@/src/Types";
import React from "react";

const CommonLayout = ({ children }: childrenProps) => {
  return (
    <div>
      <Navbar />

      <div className="min-h-[70vh]">{children}</div>
      {/* footer section  */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CommonLayout;
