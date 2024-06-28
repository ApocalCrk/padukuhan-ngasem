"use client";
import React from "react";
import CardDataStats from "../CardDataStats";
import useDashboard from '@/hooks/administrator/useDashboard';
import { Dashboard } from '@/types/dashboard';
import { FaCog, FaFile, FaNewspaper, FaUsers } from "react-icons/fa";

const DashboardPage: React.FC = () => {
  const data = useDashboard();

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Web Response" total={`${data?.web_response} ms` || '0 ms'}>
          <FaCog className="fill-primary dark:fill-white" style={{ animation: 'spin 4s linear infinite' }} />
        </CardDataStats>
        <CardDataStats title="Total Berita" total={data?.total_post.toString() || '0'}>
          <FaNewspaper className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Total Kegiatan" total={data?.total_kegiatan.toString() || '0'}>
          <FaFile className="fill-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Total Admin" total={data?.total_admin.toString() || '0'}>
          <FaUsers className="fill-primary dark:fill-white" />
        </CardDataStats>
      </div>
    </>
  );
};

export default DashboardPage;
