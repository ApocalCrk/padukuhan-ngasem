'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import BeritaPage from '@/components/administrator/berita';

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <BeritaPage />
            </DefaultLayout>
        </>
    )
}