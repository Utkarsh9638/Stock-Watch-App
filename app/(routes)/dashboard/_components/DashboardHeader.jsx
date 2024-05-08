import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="z-20 ml-72 flex h-20 items-center justify-end px-12">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default DashboardHeader;
