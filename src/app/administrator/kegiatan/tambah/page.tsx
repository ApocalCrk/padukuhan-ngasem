'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import TambahKegiatanPage from '@/components/administrator/kegiatan/tambah';

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <TambahKegiatanPage />
            </DefaultLayout>
        </>
    )
}