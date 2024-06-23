'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import TambahBeritaPage from '@/components/administrator/berita/tambah';

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <TambahBeritaPage />
            </DefaultLayout>
        </>
    )
}