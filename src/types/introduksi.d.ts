interface Tentang {
    judul: string;
    isi: string;
}

export interface Introduksi {
    tagline: string;
    judul: string;
    konten: string;
    gambar1: string;
    gambar2: string;
    sorotan: Array<Tentang>;
}