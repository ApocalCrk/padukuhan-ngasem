export interface DetailDukuh {
    total_rt: number;
    total_umkm: number;
    total_penduduk: number;
    luas_area: number;
  }

export interface Identity {
    email: string;
    facebook: string;
    instagram: string;
    nama: string;
    nomor_telepon: string;
    twitter: string;
    jam_kerja: string;
    gmaps: string;
    alamat: string;
    detail_dukuh: DetailDukuh;
}