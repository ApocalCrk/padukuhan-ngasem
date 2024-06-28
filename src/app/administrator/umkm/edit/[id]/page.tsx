'use client';
import React from 'react';
import DefaultLayout from '@/components/administrator/Layouts/DefaultLayout';
import EditUmkmPage from '@/components/administrator/umkm/edit';

export default function Page({params} : {params: {id: string}}) {
    const { id } = params;

    return (
        <>
            <DefaultLayout>
                <EditUmkmPage id={id} />
            </DefaultLayout>
        </>
    )
}