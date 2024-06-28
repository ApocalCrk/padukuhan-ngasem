'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import GaleriPage from '@/components/administrator/galeri';

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <GaleriPage />
            </DefaultLayout>
        </>
    )
}