import React, { useState, useEffect } from 'react';
import useUmkm from '@/hooks/pages/useUmkm';
import { UMKM } from '@/types/umkm';
import DataTable, { TableColumn } from 'react-data-table-component';
import Link from 'next/link';
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useColorMode from '@/hooks/useColorMode';


export default function UmkmPage() {
    const { getAllUmkm, deleteUmkm } = useUmkm()
    const [colorMode] = useColorMode();

    const [umkm, setUmkm] = useState<Array<UMKM>>([]);

    const fetchUmkm = async () => {
        const umkmData = await getAllUmkm();
        setUmkm(umkmData);
    };

    useEffect(() => {
        fetchUmkm();
    }, []);

    const handleDelete = async (id: string) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: "Apakah Anda Yakin?",
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Tidak, batalkan!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteUmkm(id);
                MySwal.fire('UMKM Berhasil Dihapus!', '', 'success');
                fetchUmkm(); 
            }
        }).catch((error) => {
            MySwal.fire('Terjadi Kesalahan!', '', 'error');
        });
    };

    const columns: TableColumn<UMKM>[] = [
        {
            name: 'No',
            selector: (row: UMKM, index?: number) => (index ?? 0) + 1,
            sortable: true,
        },
        {
            name: 'Nama UMKM',
            selector: (row: UMKM) => row.nama_umkm,
            sortable: true,
        },
        {
            name: 'Pemilik UMKM',
            selector: (row: UMKM) => row.pemilik_umkm,
            sortable: true,
        },
        {
            name: 'No Telepon',
            selector: (row: UMKM) => row.no_telepon,
            sortable: true,
        },
        {
            name: 'Aksi',
            cell: (row: UMKM) => 
            <div className="flex space-x-2">
                <Link className="bg-blue-500 text-white py-1 px-1 rounded" href={`/administrator/umkm/edit/${row.id}`}>
                    <FaEdit />
                </Link>
                <button className="bg-danger text-white py-1 px-1 rounded" onClick={() => handleDelete(row.id)}>
                    <FaTrash />
                </button>
            </div>
        },
    ];
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold mb-4">UMKM</h1>
                <Link href="/administrator/umkm/tambah">
                    <button className="bg-primary text-white py-2 px-4 rounded">Tambah UMKM</button>
                </Link>
            </div>
            <DataTable
                columns={columns}
                data={umkm}
                pagination
                highlightOnHover
                theme={colorMode === 'dark' ? 'dark' : 'default'}
            />
        </div>
    )
}
