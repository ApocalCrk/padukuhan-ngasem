'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import UmkmPage from '@/components/administrator/umkm';

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <UmkmPage />
            </DefaultLayout>
        </>
    )
}