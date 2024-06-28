import React from "react"
import { Metadata } from "next"
import BannerTop from "@/components/home/external/banner-top";
import Umkm from "@/components/home/umkm-wrapper/umkm";

export const metadata: Metadata = {
    title: "UMKM | Eksplorasi Padukuhan Ngasem",
    description: "Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta",
};

export default function Page() {
    return (
        <div className="page-wrapper">
            <BannerTop breadcrumb="UMKM" title="UMKM Padukuhan Ngasem" />
            <Umkm />
        </div>
    );
}