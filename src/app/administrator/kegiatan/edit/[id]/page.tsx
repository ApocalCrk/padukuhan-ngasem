'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import EditKegiatanPage from '@/components/administrator/kegiatan/edit';

export default function Page({params} : {params: {id: string}}) {
    const { id } = params;

    return (
        <>
            <DefaultLayout>
                <EditKegiatanPage id={id} />
            </DefaultLayout>
        </>
    )
}