import React, { useState, useEffect } from 'react';
import useAdmin from '@/hooks/identity/useAdmin';
import { Admin } from '@/types/admin';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useColorMode from '@/hooks/useColorMode';


export default function AdminPage() {
    const { getAllAdmin, getAdmin, addAdmin, updateAdmin, deleteAdmin } = useAdmin();
    const userData = JSON.parse(localStorage.getItem('admin') || '{}');
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [data, setData] = useState<Admin>({ uid: '', nama: '', username: '', password: '', last_log: '', special_case: '' });
    const [colorMode] = useColorMode();

    const [admin, setAdmin] = useState<Array<Admin>>([]);

    const fetchAdmin = async () => {
        const adminData = await getAllAdmin();
        setAdmin(adminData);
    };

    useEffect(() => {
        fetchAdmin();
    }, []);

    const clearData = () => {
        setData({ uid: '', nama: '', username: '', password: '', last_log: '', special_case: '' });
    }

    const handleAdd = async () => {
        if (data.nama === '' || data.username === '' || data.password === '') {
            const MySwal = withReactContent(Swal);
            MySwal.fire('Data tidak boleh kosong!', '', 'error');
            return;
        }
        const added = await addAdmin(data);
        if (!added) {
            const MySwal = withReactContent(Swal);
            MySwal.fire('Admin sudah terdaftar!', '', 'error');
            return;
        }

        const MySwal = withReactContent(Swal);
        MySwal.fire('Admin Berhasil Ditambahkan!', '', 'success');

        setAddModal(false);
        fetchAdmin();
    }

    const handleModalUpdate = async (id: string) => {
        const adminData = await getAdmin(id);
        setData(adminData);
        setEditModal(true);
    }

    const handleUpdate = async (id: string) => {
        const MySwal = withReactContent(Swal);
        if (data.nama === '' || data.username === '') {
            MySwal.fire('Data tidak boleh kosong!', '', 'error');
            return;
        }
        MySwal.fire({
            title: "Apakah Anda Yakin?",
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, update!",
            cancelButtonText: "Tidak, batalkan!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updated = await updateAdmin(data);
                if (!updated) {
                    MySwal.fire('Username sudah terdaftar!', '', 'error');
                    return;
                }
                MySwal.fire('Admin Berhasil Diupdate!', '', 'success');
                setEditModal(false);
                clearData();
                fetchAdmin(); 
            }
        }).catch((error) => {
            MySwal.fire('Terjadi Kesalahan!', '', 'error');
        });
    }

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
                const deleted = await deleteAdmin(id);
                if (!deleted) {
                    MySwal.fire('Tidak bisa menghapus superuser!', '', 'error');
                    return;
                }
                MySwal.fire('Admin Berhasil Dihapus!', '', 'success');
                fetchAdmin(); 
            }
        }).catch((error) => {
            MySwal.fire('Terjadi Kesalahan!', '', 'error');
        });
    };

    const columns: TableColumn<Admin>[] = [
        {
            name: 'No',
            selector: (row: Admin, index?: number) => (index ?? 0) + 1,
            sortable: true,
        },
        {
            name: 'Nama',
            selector: (row: Admin) => row.nama,
            sortable: true,
        },
        {
            name: 'Login Terakhir',
            selector: (row: Admin) => row.last_log,
            sortable: true,
        },
        {
            name: 'Aksi',
            cell: (row: Admin) => 
            userData.special_case === 'superuser' ?
            <div className="flex space-x-2">
                <button className="bg-blue-500 text-white py-1 px-1 rounded" onClick={() => handleModalUpdate(row.uid)}>
                    <FaEdit />
                </button>
                <button className="bg-danger text-white py-1 px-1 rounded" onClick={() => handleDelete(row.uid)}>
                    <FaTrash />
                </button>
            </div>
            :
            userData.uid === row.uid ?
            <div className="flex space-x-2">
                <button className="bg-blue-500 text-white py-1 px-1 rounded" onClick={() => handleModalUpdate(row.uid)}>
                    <FaEdit />
                </button>
            </div>
            :
            null   
        },
    ];
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold mb-4">Admin</h1>
                {userData.special_case === 'superuser' && (
                    <button className="bg-primary text-white py-2 px-4 rounded" onClick={() => setAddModal(true)}>Tambah Admin</button>
                )}
            </div>
            <DataTable
                columns={columns}
                data={admin}
                pagination
                highlightOnHover
                theme={colorMode === 'dark' ? 'dark' : 'default'}
            />
            {addModal ? (
            <>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-50 top-0 left-0"></div>
                <div className="fixed inset-0 flex justify-center items-center z-50 ">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md max-h-full">
                        <h1 className="text-2xl font-bold mb-4">Tambah Admin</h1>
                        <form className="space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            handleAdd();
                        }}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nama</label>
                                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" name="nama" onChange={(e) => setData({...data, nama: e.target.value})} placeholder='Masukkan nama admin' />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" name="username" onChange={(e) => setData({...data, username: e.target.value})} placeholder='Masukkan username admin' />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" name="password" onChange={(e) => setData({...data, password: e.target.value})} placeholder='Masukkan password admin' />
                            </div>
                            <div className="flex justify-between">
                                <button type="button" className="bg-danger text-white py-2 px-4 rounded" onClick={() => setAddModal(false)}>Batal</button>
                                <button type="submit" className="bg-primary text-white py-2 px-4 rounded">Tambah Admin</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
            ) : null}

            {editModal ? (
            <>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-50 top-0 left-0"></div>
                <div className="fixed inset-0 flex justify-center items-center z-50 ">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md max-h-full">
                        <h1 className="text-2xl font-bold mb-4">Edit Admin</h1>
                        <form className="space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate(data.uid);
                        }}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nama</label>
                                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" name="nama" value={data.nama} onChange={(e) => setData({...data, nama: e.target.value})} placeholder='Masukkan nama admin' />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" name="username" value={data.username} onChange={(e) => setData({...data, username: e.target.value})} placeholder='Masukkan username admin' />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Password Baru</label>
                                <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" name="password" onChange={(e) => setData({...data, password: e.target.value})} placeholder='Kosongkan jika tidak ingin mengubah password' />
                            </div>
                            <div className="flex justify-between">
                                <button type="button" className="bg-danger text-white py-2 px-4 rounded" onClick={() => {
                                    setEditModal(false);
                                    clearData();
                                }}>
                                    Batal
                                </button>
                                <button type="submit" className="bg-primary text-white py-2 px-4 rounded">Edit Admin</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
            ) : null}
        </div>
    )
}
