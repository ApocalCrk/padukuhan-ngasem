export default function Contact() {
    return <section className="contact-section">
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
                    <form  action="" className="contact-form  contact-form-validated" method="post" >
                        <div className="row row-gutter-10">
                            <div className="col-12 col-lg-6">
                                <input type="text" id="name"  className="input-text" placeholder="Nama" name="name" aria-required="true" />
                            </div>
                            <div className="col-12 col-lg-6">
                                <input type="email" id="email" className="input-text" placeholder="Alamat Email" name="email" aria-required="true" />
                            </div>
                            <div className="col-12 col-lg-6">
                                <input type="text" id="phone" className="input-text" placeholder="No Handphone / Whatsapp" name="phone" aria-required="true" />
                            </div>
                            <div className="col-12 col-lg-6">
                                <input type="text" id="subject" className="input-text" placeholder="Subjek" name="subject" aria-required="true" />
                            </div>
                            <div className="col-12 col-lg-12">
                                <textarea name="message" placeholder="Tuliskan Pesan" className="input-text" aria-required="true"></textarea>
                            </div>
                            <div className="col-12 col-lg-12">
                                <button className="btn btn-primary">Kirim Pesan</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
}