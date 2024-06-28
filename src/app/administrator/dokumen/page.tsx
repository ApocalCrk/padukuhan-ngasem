'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import DokumenPage from '@/components/administrator/dokumen';

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <DokumenPage />
            </DefaultLayout>
        </>
    )
}