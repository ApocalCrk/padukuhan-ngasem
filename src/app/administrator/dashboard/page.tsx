'use client';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import DashboardPage from '@/components/administrator/dashboard';
import React from 'react';

export default function Page() {
    return (
        <>
            <DefaultLayout>
            <DashboardPage />
            </DefaultLayout>
        </>
    );
}