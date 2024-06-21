export default function Department() {
    return (
      <section className="department-section">
        <div className="container">
          <div className="department-section-inner">
            <div className="row row-gutter-y-40">
              <div className="col-xl-2 col-lg-4 col-md-6">
                <div className="department-card">
                  <div className="department-card-icon">
                    <a href="departments.html"><i className="flaticon-farmer"></i></a>
                  </div>
                  <div className="department-card-content">
                    <h5><a href="department-details.html">Pertanian & Perkebunan</a></h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6">
                <div className="department-card">
                  <div className="department-card-icon">
                    <a href="departments.html"><i className="flaticon-briefcase"></i></a>
                  </div>
                  <div className="department-card-content">
                    <h5><a href="department-details.html">Pekerjaan & Karir</a></h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6">
                <div className="department-card">
                  <div className="department-card-icon">
                    <a href="departments.html"><i className="flaticon-lake"></i></a>
                  </div>
                  <div className="department-card-content">
                    <h5><a href="department-details.html">UMKM & Pariwisata</a></h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6">
                <div className="department-card">
                  <div className="department-card-icon">
                    <a href="departments.html"><i className="flaticon-transportation"></i></a>
                  </div>
                  <div className="department-card-content">
                    <h5><a href="department-details.html">Akses Jalan & Transportasi</a></h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6">
                <div className="department-card">
                  <div className="department-card-icon">
                    <a href="departments.html"><i className="flaticon-agriculture"></i></a>
                  </div>
                  <div className="department-card-content">
                    <h5><a href="department-details.html">Budaya & Rekreasi</a></h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6">
                <div className="department-card">
                  <div className="department-card-icon">
                    <a href="departments.html"><i className="flaticon-clinic"></i></a>
                  </div>
                  <div className="department-card-content">
                    <h5><a href="department-details.html">Kesehatan & Kesejahteraan</a></h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="department-search-section">
          <div className="container">
            <form className="department-search-form">
              <input type="text" placeholder="Get our quick services from the city municipal" name="search"/>
              <button type="submit">View All Services</button>
            </form>
          </div>
        </div>
      </section>
    );
}