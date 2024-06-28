import React, { useState, useEffect } from 'react';
import useProfil from '@/hooks/pages/useProfil';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Profil } from '@/types/profil';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const IdentitasPage = () => {
    const { getProfil, updateProfil } = useProfil();
    const [image, setImage] = useState<File | null>(null);
    
    const [formikValues, setFormikValues] = useState<Profil>({
        id: '',
        image: '',
        judul: '',
        konten: '',
        subjudul: '',
        visi_misi: [],
        pengurus: [],
    });

    const fetchData = async () => {
        const data = await getProfil();
        setFormikValues(data);
    }


    useEffect(() => {
        fetchData();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
            setFieldValue('image', e.target.files[0]);
        }
    }

    const fileSizeValidation = (value: any) => {
        if (value && value.size > 1 * 1024 * 1024) {
            return false;
        }
        return true;
    };

    const validationSchema = Yup.object({
        image: Yup.mixed().test('fileSize', 'Gambar tidak boleh lebih dari 1 MB', fileSizeValidation),
        judul: Yup.string().required('Judul diperlukan'),
        konten: Yup.string().required('Konten diperlukan').min(20, 'Konten minimal 20 karakter'),
        subjudul: Yup.string().required('Subjudul diperlukan'),
        visi_misi: Yup.array().of(Yup.string().required('Visi Misi diperlukan')),
        pengurus: Yup.array().of(
            Yup.object().shape({
                nama: Yup.string().required('Nama diperlukan'),
                posisi: Yup.string().required('Posisi diperlukan'),
            })
        ),
    });

    const onSubmit = (values: Profil) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Anda akan mengubah identitas padukuhan',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Ubah!',
            cancelButtonText: 'Batal',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await updateProfil({
                    judul: values.judul,
                    subjudul: values.subjudul,
                    konten: values.konten,
                    visi_misi: values.visi_misi,
                    pengurus: values.pengurus,
                    image: image,
                });
                if (success) {
                    MySwal.fire('Berhasil!', 'Identitas padukuhan berhasil diubah.', 'success').then(() => {
                        fetchData();
                    });
                } else {
                    MySwal.fire('Gagal!', 'Terjadi kesalahan saat mengubah identitas padukuhan.', 'error');
                }
            }
        });
    }
    
    return (
        <div className="grid">
            <h1 className="text-3xl font-bold mb-4">Profil Padukuhan</h1>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <Formik
                    enableReinitialize
                    initialValues={formikValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Judul Profil Padukuhan
                                    </label>
                                    <Field
                                        type="text"
                                        name="judul"
                                        placeholder="Masukkan judul"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="judul" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>   

                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Subjudul Profil Padukuhan
                                    </label>
                                    <Field
                                        type="text"
                                        name="subjudul"
                                        placeholder="Masukkan subjudul"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="subjudul" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Gambar Profil Padukuhan
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        max={1}
                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="image" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>

                                <div>
                                    <label htmlFor="konten" className="mb-3 block text-sm font-medium text-black dark:text-white">Konten / Isi Profil *</label>
                                    <div className='h-50'>
                                        <Field name="konten">
                                        {({ field }: { field: any }) => (
                                            <ReactQuill
                                            value={field.value}
                                            onChange={(value) => field.onChange({ target: { name: field.name, value } })}
                                            theme="snow"
                                            modules={{
                                                toolbar: [
                                                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                                [{size: []}],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{'list': 'ordered'}, {'list': 'bullet'}, 
                                                {'indent': '-1'}, {'indent': '+1'}],
                                                ['link', 'image', 'video'],
                                                ['clean']
                                                ],
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-[80%]"
                                            />
                                        )}
                                        </Field>
                                    </div>
                                    <ErrorMessage name="konten" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div> 

                                <div className="mb-4.5">
                                    <label className="mt-5 mb-3 block text-sm font-medium text-black dark:text-white">
                                        Visi Misi Padukuhan
                                    </label>
                                    {formikValues.visi_misi.map((visiMisi, index) => (
                                        <div key={index} className="grid gap-2 mt-3">
                                            <label className="block text-sm font-medium text-black dark:text-white">
                                                Visi Misi {index + 1}
                                            </label>
                                            <Field
                                                type="text"
                                                name={`visi_misi[${index}]`}
                                                value={visiMisi ? visiMisi : '' }
                                                placeholder="Masukkan visi misi"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                onChange={(e: any) => {
                                                    const newVisiMisi = [...formikValues.visi_misi];
                                                    newVisiMisi[index] = e.target.value;
                                                    setFormikValues({
                                                        ...formikValues,
                                                        visi_misi: newVisiMisi,
                                                    });
                                                }}
                                            />
                                            <ErrorMessage name={`visi_misi[${index}]`} component="div" className="text-danger font-bold text-sm mt-1" />
                                        </div>
                                    ))}

                                    <div className="flex flex-row gap-2 mt-5">
                                        <button
                                            type="button"
                                            onClick={() => setFormikValues({
                                                ...formikValues,
                                                visi_misi: [
                                                    ...formikValues.visi_misi,
                                                    '',
                                                ]
                                            })}
                                            className="flex w-50 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                                        >
                                            Tambah Visi Misi
                                        </button>

                                        {formikValues.visi_misi.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setFormikValues({
                                                    ...formikValues,
                                                    visi_misi: formikValues.visi_misi.slice(0, -1)
                                                })}
                                                className="flex w-50 justify-center rounded bg-danger p-3 font-medium text-gray hover:bg-opacity-90"
                                            >
                                                Hapus Visi Misi
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Pengurus Padukuhan
                                    </label>
                                    {formikValues.pengurus.map((pengurus, index) => (
                                        <div key={index} className="grid gap-2 mt-3">
                                            <label className="block text-sm font-medium text-black dark:text-white">
                                                Pengurus {index + 1}
                                            </label>
                                            <Field
                                                type="text"
                                                name={`pengurus[${index}].posisi`}
                                                placeholder="Masukkan posisi"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                value={pengurus.posisi ? pengurus.posisi : ''}
                                                onChange={(e: any) => {
                                                    const newPengurus = [...formikValues.pengurus];
                                                    newPengurus[index].posisi = e.target.value;
                                                    setFormikValues({
                                                        ...formikValues,
                                                        pengurus: newPengurus,
                                                    });
                                                }}
                                            />
                                            <Field
                                                type="text"
                                                name={`pengurus[${index}].nama`}
                                                placeholder="Masukkan nama"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                value={pengurus.nama ? pengurus.nama : ''}
                                                onChange={(e: any) => {
                                                    const newPengurus = [...formikValues.pengurus];
                                                    newPengurus[index].nama = e.target.value;
                                                    setFormikValues({
                                                        ...formikValues,
                                                        pengurus: newPengurus,
                                                    });
                                                }}
                                            />

                                            <ErrorMessage name={`pengurus[${index}].posisi`} component="div" className="text-danger font-bold text-sm mt-1" />
                                        </div>
                                    ))}

                                    <div className="flex flex-row gap-2 mt-5">
                                        <button
                                            type="button"
                                            onClick={() => setFormikValues({
                                                ...formikValues,
                                                pengurus: [
                                                    ...formikValues.pengurus,
                                                    { nama: '', posisi: '' },
                                                ]
                                            })}
                                            className="flex w-50 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                                        >
                                            Tambah Pengurus
                                        </button>

                                        {formikValues.pengurus.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setFormikValues({
                                                    ...formikValues,
                                                    pengurus: formikValues.pengurus.slice(0, -1)
                                                })}
                                                className="flex w-50 justify-center rounded bg-danger p-3 font-medium text-gray hover:bg-opacity-90"
                                            >
                                                Hapus Pengurus
                                            </button>
                                        )}
                                    </div>
                                </div>                    

                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Ubah Profil Padukuhan
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}


export default IdentitasPage;