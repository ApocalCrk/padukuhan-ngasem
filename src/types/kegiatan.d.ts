export interface Kegiatan {
    id: string;
    gambar: string;
    has_tamu: boolean;
    judul: string;
    konten: string;
    lokasi: string;
    tamu: Array<{ nama: string; posisi: string }>;
    tanggal: string;
    waktu_mulai: string;
}