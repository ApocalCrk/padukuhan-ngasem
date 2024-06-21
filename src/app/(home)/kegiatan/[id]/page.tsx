import React from 'react';
import { Metadata } from 'next';
import BannerTop from '@/components/home/external/banner-top';
import DetailKegiatan from '@/components/home/kegiatan-wrapper/detail-kegiatan';

export const metadata: Metadata = {
    title: "Detail Kegiatan | Eksplorasi Padukuhan Ngasem",
    description: "Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta",
};


export default function KegiatanDetail({params} : {params: {id: string}}) {
    const { id } = params;
    return (
        <div className="page-wrapper">
            <BannerTop breadcrumb="Kegiatan" title="Detail Kegiatan" />
            <DetailKegiatan id={id} />
        </div>
    );
}