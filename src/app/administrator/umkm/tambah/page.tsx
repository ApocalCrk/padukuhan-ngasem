'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import TambahUmkmPage from '@/components/administrator/umkm/tambah';

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <TambahUmkmPage />
            </DefaultLayout>
        </>
    )
}