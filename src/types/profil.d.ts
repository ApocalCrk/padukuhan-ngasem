export interface Profil {
    id: string;
    image: string;
    judul: string;
    konten: string;
    subjudul: string;
    visi_misi: Array<string>;
    pengurus: Array<{ nama: string; posisi: string }>;
}