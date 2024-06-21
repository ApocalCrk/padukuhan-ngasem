"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/administrator/Sidebar";
import Header from "@/components/administrator/Header";
import { checkUid } from "@/utils/auth";

export default function DefaultLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
      const data = localStorage.getItem('admin');
      if (data) {
          const user = JSON.parse(data);
          checkUid(user.uid).then((res) => {
              if (res) {
                  setUserData(user);
              }else{
                  localStorage.removeItem('admin');
                  window.location.href = '/administrator/login';
              }
          });
      }
  }, []);
  
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} data={userData} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
