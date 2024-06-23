'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import EditBeritaPage from '@/components/administrator/berita/edit';

export default function Page({params} : {params: {id: string}}) {
    const { id } = params;

    return (
        <>
            <DefaultLayout>
                <EditBeritaPage id={id} />
            </DefaultLayout>
        </>
    )
}