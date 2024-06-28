'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import ProfilPage from '@/components/administrator/profil';

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <ProfilPage />
            </DefaultLayout>
        </>
    )
}