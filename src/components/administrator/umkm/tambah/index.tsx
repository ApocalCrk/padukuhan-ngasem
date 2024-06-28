import { useState } from 'react';
import { slugify } from '@/utils/slugify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useUmkm from '@/hooks/pages/useUmkm';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Form = () => {
  const { addUmkm, uniqueTitle } = useUmkm();

  const initialValues = {
    id: '',
    nama_umkm: '',
    pemilik_umkm: '',
    no_telepon: '',
  };

  const validationSchema = Yup.object({
    nama_umkm: Yup.string().required('Nama UMKM diperlukan').min(1, 'Nama UMKM minimal 1 karakter').max(50, 'Nama UMKM maksimal 50 karakter').test('unique', 'Nama UMKM sudah ada', async (value) => {
        if (value) {
            return await uniqueTitle(value);
        }
        return true;
        }
    ),
    pemilik_umkm: Yup.string().required('Pemilik UMKM diperlukan').min(5, 'Pemilik UMKM minimal 5 karakter').max(50, 'Pemilik UMKM maksimal 50 karakter'),
    no_telepon: Yup.string().required('No Telepon diperlukan').min(11, 'No Telepon minimal 11 karakter').max(13, 'No Telepon maksimal 13 karakter'),
  });


  const handleSubmit = async (values: any) => {
    const success = await addUmkm({
      id: slugify(values.nama_umkm),
      nama_umkm: values.nama_umkm,
      pemilik_umkm: values.pemilik_umkm,
      no_telepon: values.no_telepon,
    });

    const MySwal = withReactContent(Swal);
    if (success) {
      MySwal.fire('UMKM Berhasil Ditambahkan!', '', 'success').then(() => {
        window.location.href = '/administrator/umkm';
      });
    } else {
      MySwal.fire('Terjadi Kesalahan!', '', 'error');
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Tambah Berita</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormikForm className="space-y-6 p-6 bg-white rounded shadow-md">
          <div className="flex flex-col gap-2">
            <label htmlFor="nama_umkm" className="text-gray-900">Nama UMKM</label>
            <Field type="text" id="nama_umkm" name="nama_umkm" className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
            <ErrorMessage name="nama_umkm" component="span" className="text-danger font-bold text-sm mt-1" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="pemilik_umkm" className="text-gray-900">Pemilik UMKM</label>
            <Field type="text" id="pemilik_umkm" name="pemilik_umkm" className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
            <ErrorMessage name="pemilik_umkm" component="span" className="text-danger font-bold text-sm mt-1" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="no_telepon" className="text-gray-900">No Telepon</label>
            <Field type="number" id="no_telepon" name="no_telepon" className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
            <ErrorMessage name="no_telepon" component="span" className="text-danger font-bold text-sm mt-1" />
          </div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Tambah UMKM</button>
        </FormikForm>

      </Formik>
    </>
  );
};

export default Form;
