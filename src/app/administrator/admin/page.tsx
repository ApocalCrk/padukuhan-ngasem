'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import AdminPage from '@/components/administrator/admin';

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <AdminPage />
            </DefaultLayout>
        </>
    )
}