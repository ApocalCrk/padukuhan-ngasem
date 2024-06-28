'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import IdentitasPage from '@/components/administrator/identitas';

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <IdentitasPage />
            </DefaultLayout>
        </>
    )
}