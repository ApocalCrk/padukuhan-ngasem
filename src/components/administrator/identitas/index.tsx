import React, { useState, useEffect } from 'react';
import useIdentity from '@/hooks/identity/fetch-identity';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Identity } from '@/types/identity';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const IdentitasPage = () => {
    const { getIdentity, updateIdentity } = useIdentity();
    const [submitted, setSubmitted] = useState(false);
    const [formikValues, setFormikValues] = useState<Identity>({
        nama: '',
        nomor_telepon: '',
        email: '',
        alamat: '',
        jam_kerja: '',
        gmaps: '',
        facebook: '',
        instagram: '',
        twitter: '',
        detail_dukuh: {
            total_rt: 0,
            total_penduduk: 0,
            luas_area: 0,
            total_umkm: 0,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
          const data = await getIdentity();
          setFormikValues(data);
        }

        fetchData();
    }, []);


    const validationSchema = Yup.object({
        nama: Yup.string().required('Nama padukuhan harus diisi'),
        nomor_telepon: Yup.string().required('No telepon harus diisi'),
        email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
        alamat: Yup.string().required('Alamat harus diisi'),
        jam_kerja: Yup.string().required('Jam kerja harus diisi'),
        gmaps: Yup.string().required('Link Google Maps harus diisi'),
        facebook: Yup.string().required('Link Facebook harus diisi'),
        instagram: Yup.string().required('Link Instagram harus diisi'),
        twitter: Yup.string().required('Link Twitter harus diisi'),
        detail_dukuh: Yup.object().shape({
            total_rt: Yup.number().required('Total RT harus diisi'),
            total_penduduk: Yup.number().required('Total Penduduk harus diisi'),
            luas_area: Yup.number().required('Luas Area harus diisi'),
            total_umkm: Yup.number().required('Karang Taruna harus diisi'),
        }),
    });

    const onSubmit = (values: Identity) => {
        setSubmitted(true);
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
                const response = await updateIdentity(values);
                if (response) {
                    MySwal.fire('Berhasil!', 'Identitas padukuhan berhasil diubah', 'success');
                    setSubmitted(false);
                } else {
                    MySwal.fire('Gagal!', 'Identitas padukuhan gagal diubah', 'error');
                    setSubmitted(false);
                }
            }else{
                setSubmitted(false);
            }
        });
    }
    
    return (
        <div className="grid">
            <h1 className="text-3xl font-bold mb-4">Identitas Padukuhan</h1>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <Formik
                    enableReinitialize
                    initialValues={formikValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Nama Padukuhan
                                    </label>
                                    <Field
                                        type="text"
                                        name="nama"
                                        placeholder="Masukkan nama padukuhan"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="nama" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        No Telepon
                                    </label>
                                    <Field
                                        type="text"
                                        name="nomor_telepon"
                                        placeholder="Masukkan no telepon"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="nomor_telepon" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Email Padukuhan
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Masukkan email"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger font-bold text-sm mt-1" />
                            </div>

                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Alamat Padukuhan
                                </label>
                                <Field
                                    as="textarea"
                                    rows={3}
                                    name="alamat"
                                    placeholder="Masukkan alamat padukuhan"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <ErrorMessage name="alamat" component="div" className="text-danger font-bold text-sm mt-1" />
                            </div>

                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Jam Kerja Padukuhan
                                </label>
                                <Field
                                    type="text"
                                    name="jam_kerja"
                                    placeholder="Masukkan jam kerja padukuhan"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <ErrorMessage name="jam_kerja" component="div" className="text-danger font-bold text-sm mt-1" />
                            </div>

                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Link Google Maps
                                </label>
                                <Field
                                    type="text"
                                    name="gmaps"
                                    placeholder="Masukkan link Google Maps"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <ErrorMessage name="gmaps" component="div" className="text-danger font-bold text-sm mt-1" />
                            </div>

                            <div className="mb-4.5 flex flex-col gap-4 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Link Facebook
                                    </label>
                                    <Field
                                        type="text"
                                        name="facebook"
                                        placeholder="Masukkan link Facebook"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="facebook" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Link Instagram
                                    </label>
                                    <Field
                                        type="text"
                                        name="instagram"
                                        placeholder="Masukkan link Instagram"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="instagram" component="div" className="text-danger font-bold text-sm mt-1" />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Link Twitter
                                    </label>
                                    <Field
                                        type="text"
                                        name="twitter"
                                        placeholder="Masukkan link Twitter"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <ErrorMessage name="twitter" component="div" className="text-danger font-bold text-sm mt-1" />
                                  </div>
                            </div>

                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Detail Dukuh
                                </label>

                                {Object.keys(formikValues.detail_dukuh).map((key, index) => (
                                  <div className="w-full mt-3" key={index}>
                                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                          Total { key.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }
                                      </label>
                                      <Field
                                          type="number"
                                          name={`detail_dukuh.${key}`}
                                          placeholder="Masukkan Total"
                                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                      />
                                      <ErrorMessage name={`detail_dukuh.${key}`} component="div" className="text-danger font-bold text-sm mt-1" />
                                  </div>

                                ))}

                            </div>                                

                            <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" disabled={submitted}>
                                {submitted ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}


export default IdentitasPage;