export default function Footer() {
    return <section className="footer">
        <div className="footer-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="footer-widget-logo">
                  <a href="index-2.html"><img src="/image/logo-ngasem.png" className="img-fluid"
                      alt="img-25"/></a>
                </div>
                <div className="footer-widget-text">
                  <p>Padukuhan Ngasem adalah sebuah padukuhan yang terletak di Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta</p>
                </div>
                <div className="footer-widget-socials">
                  <a href="#"><i className="fa-brands fa-twitter"></i></a>
                  <a href="#"><i className="fa-brands fa-facebook"></i></a>
                  <a href="#"><i className="fa-brands fa-pinterest-p"></i></a>
                  <a href="#"><i className="fa-brands fa-instagram"></i></a>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="footer-widget">
                  <div className="footer-widget-explore">
                    <h4 className="footer-widget-title">Explore</h4>
                    <ul className="list-unstyled">
                      <li><a href="department-details.html">Administration</a></li>
                      <li><a href="service-details.html">Fire Services</a></li>
                      <li><a href="event-details.html">Business & Taxation</a></li>
                      <li><a href="team-details.html">Circular's And Go's</a></li>
                      <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="footer-widget">
                  <div className="footer-widget-department">
                    <h4 className="footer-widget-title">Departments</h4>
                    <ul className="list-unstyled">
                      <li><a href="department-details.html">Health & Safety</a></li>
                      <li><a href="department-details.html">Housing & Land</a></li>
                      <li><a href="department-details.html">Legal & Finance</a></li>
                      <li><a href="department-details.html">Transport & Traffic</a></li>
                      <li><a href="department-details.html">Arts & Culture</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="footer-widget">
                  <div className="footer-widget-contact">
                    <h4 className="footer-widget-title">Contact</h4>
                    <p>Padukuhan Ngasem, Desa Tileng, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah Istimewa Yogyakarta</p>
                  </div>
                  <div className="footer-widget-contact-list">
                    <i className="fa-solid fa-envelope"></i>
                    <div className="footer-widget-contact-item">
                      <a href="mailto:padukuhan.ngasem1@gmail.com">padukuhan.ngasem1@gmail.com</a>
                    </div>
                  </div>
                  <div className="footer-widget-contact-list">
                    <i className="fa-solid fa-phone"></i>
                    <div className="footer-widget-contact-item">
                      <a href="tel:+62 812-3456-7890">+62 812-3456-7890</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-footer">
          <div className="conatiner">
            <p>© Copyright {new Date().getFullYear()} by <a href="#">Padukuhan Ngasem</a></p>
          </div>
        </div>
      </section>
}