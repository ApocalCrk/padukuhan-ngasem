'use client';
import { useState } from 'react';
import { sendMail } from '@/utils/sendMail';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendMail(formData);
      alert('Email sent successfully');
    } catch (error) {
      alert('Failed to send email');
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="contact-box">
              <div className="section-tagline">
                Tulis Pesanmu
              </div>
              <h1 className="section-title">Selalu Di Sini Untuk Membantu Anda</h1>
              <p>Hubungi kami untuk informasi lebih lanjut tentang Padukuhan Ngasem. Kami akan dengan senang hati membantu Anda.</p>
            </div>
          </div>
          <div className="col-lg-8">
            <form className="contact-form contact-form-validated" onSubmit={handleSubmit}>
              <div className="row row-gutter-10">
                <div className="col-12 col-lg-6">
                  <input
                    type="text"
                    id="name"
                    className="input-text"
                    placeholder="Nama"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-required="true"
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <input
                    type="email"
                    id="email"
                    className="input-text"
                    placeholder="Alamat Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true"
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <input
                    type="text"
                    id="phone"
                    className="input-text"
                    placeholder="No Handphone / Whatsapp"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-required="true"
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <input
                    type="text"
                    id="subject"
                    className="input-text"
                    placeholder="Subjek"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    aria-required="true"
                  />
                </div>
                <div className="col-12 col-lg-12">
                  <textarea
                    name="message"
                    placeholder="Tuliskan Pesan"
                    className="input-text"
                    value={formData.message}
                    onChange={handleChange}
                    aria-required="true"
                  ></textarea>
                </div>
                <div className="col-12 col-lg-12">
                  <button className="btn btn-primary" type="submit">
                    Kirim Pesan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
