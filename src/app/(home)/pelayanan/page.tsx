import React from "react"
import { Metadata } from "next"
import BannerTop from "@/components/home/external/banner-top";
import Service from "@/components/home/pelayanan-wrapper/service";
import BannerBot from "@/components/home/pelayanan-wrapper/banner-bot";

export const metadata: Metadata = {
    title: "Pelayanan | Eksplorasi Padukuhan Ngasem",
    description: "Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta",
};

export default function Pelayanan() {
    return <div className="page-wrapper">
        <BannerTop breadcrumb="Pelayanan" title="Pelayanan Padukuhan Ngasem" />
        <Service />
        <BannerBot />
    </div>
}