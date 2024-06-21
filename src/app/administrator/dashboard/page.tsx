'use client';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import withAdminAuth from '@/components/administrator/adminAuth/check';
import DashboardPage from '@/components/administrator/dashboard';
import React from 'react';

function Page() {
    return (
        <>
            <DefaultLayout>
            <DashboardPage />
            </DefaultLayout>
        </>
    );
}

export default withAdminAuth(Page);