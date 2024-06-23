'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import KegiatanPage from '@/components/administrator/kegiatan';

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <KegiatanPage />
            </DefaultLayout>
        </>
    )
}