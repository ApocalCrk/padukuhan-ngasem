'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import IntroduksiPage from '@/components/administrator/introduksi';

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <IntroduksiPage />
            </DefaultLayout>
        </>
    )
}