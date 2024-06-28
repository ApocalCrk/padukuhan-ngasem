export interface Pengurus {
    nama: string;
    posisi: string;
}

export interface Profil {
    id: string;
    image: string;
    judul: string;
    konten: string;
    subjudul: string;
    visi_misi: Array<string>;
    pengurus: Array<Pengurus>;
}