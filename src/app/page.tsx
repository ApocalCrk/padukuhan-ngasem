"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const CustomOwlCarousel = ({ children, ...props }: any) => { 
  useEffect(() => {
    
  }, [props]); 

  return <OwlCarousel {...props}>{children}</OwlCarousel>;
};


export default function Home() {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <main>
      { !isMounted && (
        <div id="pre-loader">
          <div id="loader-logo"></div>
          <div id="loader-circle"></div>
          <div className="loader-section section-left"></div>
          <div className="loader-section section-right"></div>
        </div>
      )}

      <Header />

      <div className="page-wrapper">
        <section className="main-slider">
          <CustomOwlCarousel className="main-slider-swiper owl-carousel owl-theme" loop nav items={1} dots={false} autoplay navText={['<i class="fa-solid fa-arrow-left-long"></i>','<i class="fa-solid fa-arrow-right-long"></i>']}>
            <div className="item">
              <div className="item-slider-bg" style={{ backgroundImage: "url(/image/bg/ngasem1.png)" }}></div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="slider-content">
                      <div className="slider-tagline">Pelayanan Online Padukuhan Ngasem</div>
                      <h1 className="section-title">Eksplorasi & Kenali <br /> Padukuhan Ngasem</h1>
                      <a href="index-3.html" className="btn btn-primary">Lihat Lebih Lanjut</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="item-slider-bg" style={{ backgroundImage: "url(/image/bg/ngasem2.png)" }}></div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="slider-content">
                      <div className="slider-tagline">Media Informasi Padukuhan Ngasem</div>
                      <h1 className="section-title">Informasi Terkini <br /> Padukuhan Ngasem</h1>
                      <a href="index-3.html" className="btn btn-primary">Lihat Lebih Lanjut</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CustomOwlCarousel>
        </section>
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
        <section className="about-section">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-6">
                <div className="about-image">
                  <div className="about-image-inner img-one">
                    <img src="/image/gallery/about-1.jpg" className="img-fluid" alt="img-2"/>
                    <div className="sign-text">Kevin Martin</div>
                    <div className="about-image-caption">
                      <div className="about-image-caption-inner">
                        <span className="about-caption-number">18</span>
                        <span className="about-caption-text">Years of<br/>experience</span>
                      </div>
                    </div>
                  </div>
                  <div className="about-image-inner img-two">
                    <img src="/image/shapes/about-3.jpg" className="floated-image" alt="img-3"/>
                    <img src="/image/gallery/about-2.jpg" className="img-fluid" alt="img-4"/>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-inner">
                  <div className="section-title-box">
                    <div className="section-tagline">Our introductions</div>
                    <h2 className="section-title">Welcome & Support to City Municipal</h2>
                    <p>Aliquam viverra arcu. Donec aliquet blandit enim feugiat. Suspendisse id quam sed
                      eros tincidunt luctus sit amet eu nibh egestas tempus turpis, sit amet mattis magna
                      varius non.</p>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 col-lg-12 col-md-6">
                      <div className="about-card">
                        <h4 className="about-title"><i className="fa-solid fa-circle-check"></i>Business &
                          Economy</h4>
                        <p className="about-text">Lorem ipsum dolor sited amet consectetur notted.</p>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-6">
                      <div className="about-card">
                        <h4 className="about-title"><i className="fa-solid fa-circle-check"></i>Health &
                          Education</h4>
                        <p className="about-text">Lorem ipsum dolor sited amet consectetur notted.</p>
                      </div>
                    </div>
                  </div>
                  <div className="about-author-box">
                    <div className="about-author-image">
                      <img src="/image/gallery/about-4.png" className="img-fluid" alt="img-5"/>
                    </div>
                    <div className="about-author-box-meta">
                      <h5>Mr. Kevin Martin</h5>
                      <span>City Mayor</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="service-section">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-6">
                <div className="section-title-box">
                  <div className="section-tagline">Government Service</div>
                  <h2 className="section-title text-white">Explore our Online<br/> Governmet Services <br/> &
                    Resources</h2>
                  <div className="section-text">
                    <p>Aliquam viverra arcu. Donec aliquet blandit enim feugiat. Suspendisse id quam sed
                      eros tincidunt luctus sit amet eu nibh egestas tempus turpis, sit amet mattis magna
                      varius non.</p>
                  </div>
                  <div className="service-arrow-image">
                    <img src="/image/shapes/arrow.png" alt="img-6"/>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="service-card">
                  <div className="service-card-video">
                    <a href="https://www.youtube.com/watch?v=rzfmZC3kg3M" className="video-popup">
                      <i className="fa fa-play"></i>
                    </a>
                  </div>
                  <ul className="list-unstyled">
                    <li><a href="department-details.html">Parking Permission <i
                          className="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="department-details.html">File a Tax Return <i
                          className="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="department-details.html">Order Birth Certificate <i
                          className="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="department-details.html">Get Building Permission <i
                          className="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="department-details.html">Apply for Driving License <i
                          className="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="department-details.html">Report Polution <i
                          className="fa-solid fa-chevron-right"></i></a></li>
                  </ul>
                  <div className="service-button">
                    <a href="department-details.html" className="btn btn-primary">Discover More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="funfact-section">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="funfact-counter-item">
                  <div className="funfact-counter-box">
                    <div className="funfact-counter-icon">
                      <i className="flaticon-running-man"></i>
                    </div>
                    <div className="funfact-counter-number">
                      <h3 className="counter-number">84</h3>
                      <span className="funfact-counter-number-postfix">k</span>
                    </div>
                  </div>
                  <p className="funfact-text">Total People Lived<br/>in our City</p>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="funfact-counter-item">
                  <div className="funfact-counter-box">
                    <div className="funfact-counter-icon">
                      <i className="flaticon-coverage"></i>
                    </div>
                    <div className="funfact-counter-number">
                      <h3 className="counter-number">3.3</h3>
                      <span className="funfact-counter-number-postfix">k</span>
                    </div>
                  </div>
                  <p className="funfact-text">Square kilometres<br/> Region Covers</p>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="funfact-counter-item">
                  <div className="funfact-counter-box">
                    <div className="funfact-counter-icon">
                      <i className="flaticon-landscape"></i>
                    </div>
                    <div className="funfact-counter-number">
                      <h3 className="counter-number">26</h3>
                      <span className="funfact-counter-number-postfix">%</span>
                    </div>
                  </div>
                  <p className="funfact-text">Private & Domestic <br/>Garden Land</p>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="funfact-counter-item">
                  <div className="funfact-counter-box">
                    <div className="funfact-counter-icon">
                      <i className="flaticon-barn-3"></i>
                    </div>
                    <div className="funfact-counter-number">
                      <h3 className="counter-number">4</h3>
                      <span className="funfact-counter-number-postfix">th</span>
                    </div>
                  </div>
                  <p className="funfact-text">Average Costs of Home <br/> Ownership</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mayor-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="mayor-box">
                  <div className="section-title-box">
                    <div className="section-tagline">MAYOR OF GOWRNX</div>
                    <h2 className="section-title">Major Voice of City Government</h2>
                    <p>There cursus massa at urnaaculis estie. Sed aliquamellus vitae ultrs condmentum leo
                      massa mollis estiegittis miristum nulla sed medy fringilla vitae.</p>
                  </div>
                  <div className="mayor-icon-box">
                    <div className="mayor-icon">
                      <i className="flaticon-professor"></i>
                    </div>
                    <h4 className="mayor-icon-title">Meet Ideological Leader for Youth Generation</h4>
                  </div>
                  <ul className="list-unstyled list-style-one">
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      <p>Making this the first true generator on the Internet</p>
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      <p>Lorem Ipsum is not simply random text</p>
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      <p>If you are going to use a passage</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mayor-img">
                  <img src="/image/shapes/shape-1.png" className="floated-image-one" alt="img-7"/>
                  <img src="/image/gallery/mayor-2.jpg" alt="img-8"/>
                  <div className="mayor-name">
                    Mr. Kevin Martin
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="portfolio-section">
          <div className="section-title-box text-center">
            <div className="section-tagline">recent work portfolio</div>
            <h2 className="section-title">Explore City Highlights <br/>Portfolios</h2>
          </div>
          <div className="portfolio-content conatainer-fluid">
            <div className="portfolio-carousel owl-carousel owl-theme">
              <div className="item">
                <div className="portfolio-card">
                  <img src="/image/portfolio/portfolio-1.jpg" className="img-fluid" alt="img-9"/>
                  <div className="portfolio-card-meta">
                    <div className="portfolio-card-text"><a href="portfolio-details.html">Places</a></div>
                    <div className="portfolio-card-title"><a href="portfolio-details.html">Broadway Road</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="portfolio-card">
                  <img src="/image/portfolio/portfolio-2.jpg" className="img-fluid" alt="img-10"/>
                  <div className="portfolio-card-meta">
                    <div className="portfolio-card-text"><a href="portfolio-details.html">Intercity</a></div>
                    <div className="portfolio-card-title"><a href="portfolio-details.html"> Grand Central
                        Terminal</a></div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="portfolio-card">
                  <img src="/image/portfolio/portfolio-3.jpg" className="img-fluid" alt="img-11"/>
                  <div className="portfolio-card-meta">
                    <div className="portfolio-card-text"><a href="portfolio-details.html">Business</a></div>
                    <div className="portfolio-card-title"><a href="portfolio-details.html">Empire State
                        Building</a></div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="portfolio-card">
                  <img src="/image/portfolio/portfolio-4.jpg" className="img-fluid" alt="img-12"/>
                  <div className="portfolio-card-meta">
                    <div className="portfolio-card-text"><a href="portfolio-details.html">Travel</a></div>
                    <div className="portfolio-card-title"><a href="portfolio-details.html">Fulton Center</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="client-section">
          <h5 className="client-text">Our partners & suppoters</h5>
          <div className="container">
            <div className="client-carousel owl-carousel owl-theme">
              <div className="item">
                <img src="/image/shapes/client-1.png" className="img-fluid" alt="img-13"/>
              </div>
              <div className="item">
                <img src="/image/shapes/client-1.png" className="img-fluid" alt="img-14"/>
              </div>
              <div className="item">
                <img src="/image/shapes/client-1.png" className="img-fluid" alt="img-15"/>
              </div>
              <div className="item">
                <img src="/image/shapes/client-1.png" className="img-fluid" alt="img-16"/>
              </div>
            </div>
          </div>
        </section>
        <section className="testimonial-section">
          <div className="container">
            <div className="testimonial-name">TESTIMONIALS</div>
            <div className="testimonial-slider">
              <div className="swiper testimonial-reviews">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="testimonial-content">
                      <div className="testimonial-ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <div className="testimonial-text">
                        This is due to their excellent service, competitive pricing and customer
                        support. It’s throughly refresing to get such a personal touch. Duis aute lorem
                        ipsum is simply free text irure dolor in reprehenderit in esse nulla pariatur.
                      </div>
                      <div className="testimonial-thumb-card">
                        <h5>Martin McLaughlin</h5>
                        <span>Customer</span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="testimonial-content">
                      <div className="testimonial-ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <div className="testimonial-text">
                        This is due to their excellent service, competitive pricing and customer
                        support. It’s throughly refresing to get such a personal touch. Duis aute lorem
                        ipsum is simply free text irure dolor in reprehenderit in esse nulla pariatur.
                      </div>
                      <div className="testimonial-thumb-card">
                        <h5>Aleesha Brown</h5>
                        <span>Customer</span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="testimonial-content">
                      <div className="testimonial-ratings">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <div className="testimonial-text">
                        This is due to their excellent service, competitive pricing and customer
                        support. It’s throughly refresing to get such a personal touch. Duis aute lorem
                        ipsum is simply free text irure dolor in reprehenderit in esse nulla pariatur.
                      </div>
                      <div className="testimonial-thumb-card">
                        <h5>Kevin Martin</h5>
                        <span>Member</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
              <div className="testimonial-thumb">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img src="/image/testimonial/testimonial-2.jpg" className="img-fluid" alt="img-17"/>
                    <i className="fa-solid fa-quote-left"></i>
                  </div>
                  <div className="swiper-slide">
                    <img src="/image/testimonial/testimonial-3.jpg" className="img-fluid" alt="img-18"/>
                    <i className="fa-solid fa-quote-left"></i>
                  </div>
                  <div className="swiper-slide">
                    <img src="/image/testimonial/testimonial-4.jpg" className="img-fluid" alt="img-19"/>
                    <i className="fa-solid fa-quote-left"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="event-section">
          <div className="container">
            <div className="event-section-inner">
              <div className="row">
                <div className="col-lg-6">
                  <div className="section-title-box">
                    <div className="section-tagline">LATEST EVENTS</div>
                    <h2 className="section-title">Explore Upcoming City Event Schedule</h2>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="event-content-box">
                    <div className="section-text">
                      <p>Aliquam viverra arcu. Donec aliquet blandit enim feugiat.
                        Suspendisse id quam sed eros tincidunt luctus sit amet eu nibh egestas tempus
                        turpis.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row-gutter-y-40">
                <div className="col-xl-5">
                  <div className="event-subscribe-card">
                    <div className="event-details-card-title">
                      <div className="event-icon">
                        <i className="flaticon-envelope"></i>
                      </div>
                      <h5>Subscribe</h5>
                      <p>Get latest news & events details</p>
                    </div>
                    <div className="event-details-card-content">
                      <form action="https://webdevcode.com/html/towngov/assets/inc/sendemail.php"
                        className="contact-form" method="post">
                        <div className="form-group">
                          <input type="email" id="Email" className="input-text"
                            placeholder="Email address" name="email" required/>
                        </div>
                        <button className="btn btn-primary w-100">Subscribe</button>
                        <p>Never share your email with others.</p>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7">
                  <div className="event-card">
                    <div className="event-card-image">
                      <div className="event-card-image-inner">
                        <a href="event-details.html"><img src="/image/event/event-2.jpg"
                            className="img-fluid" alt="img-20"/></a>
                        <div className="event-card-meta">
                          <div className="event-meta-number">
                            <span>28</span>
                          </div>
                          <div className="event-meta-date">
                            <span>October 2022</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="event-card-content">
                      <div className="event-card-info">
                        <ul className="list-unstyled">
                          <li>
                            <i className="fa-solid fa-clock"></i>
                            <span>08:00am - 05:00pm</span>
                          </li>
                          <li>
                            <i className="fa-sharp fa-solid fa-location-pin"></i>
                            <span>New Hyde Park, NY 11040</span>
                          </li>
                        </ul>
                      </div>
                      <div className="event-card-title">
                        <h4><a href="event-details.html">Organizing 2022 city photography new
                            contest</a></h4>
                      </div>
                    </div>
                  </div>
                  <div className="event-card">
                    <div className="event-card-image">
                      <div className="event-card-image-inner">
                        <a href="event-details.html"><img src="/image/event/event-3.jpg"
                            className="img-fluid" alt="img-21"/></a>
                        <div className="event-card-meta">
                          <div className="event-meta-number">
                            <span>28</span>
                          </div>
                          <div className="event-meta-date">
                            <span>October 2022</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="event-card-content">
                      <div className="event-card-info">
                        <ul className="list-unstyled">
                          <li>
                            <i className="fa-solid fa-clock"></i>
                            <span>08:00am - 05:00pm</span>
                          </li>
                          <li>
                            <i className="fa-sharp fa-solid fa-location-pin"></i>
                            <span>New Hyde Park, NY 11040</span>
                          </li>
                        </ul>
                      </div>
                      <div className="event-card-title">
                        <h4><a href="event-details.html">Organizing 2022 city photography new
                            contest</a></h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="cta-five-section">
          <div className="container">
            <div className="cta-five-card">
              <div className="cta-five-card-icon">
                <i className="flaticon-file"></i>
              </div>
              <div className="cta-five-content">
                <h4>Download Recent Documents</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority<br/> have
                  suffered in some form, by injected humour words.</p>
              </div>
              <div className="cta-five-button">
                <a href="#" className="btn btn-primary">Download Files</a>
              </div>
              <div className="cta-five-img">
                <i className="flaticon-file"></i>
              </div>
            </div>
          </div>
        </section>
        <section className="blog-section">
          <div className="container">
            <div className="blog-box">
              <div className="section-title-box text-center">
                <div className="section-tagline">DIRECT FROM THE BLOG POSTS</div>
                <h2 className="section-title">Checkout Latest News <br/>and Articles</h2>
              </div>
            </div>
            <div className="row row-gutter-y-155">
              <div className="col-lg-4">
                <div className="blog-card">
                  <div className="blog-card-image">
                    <img src="/image/blog/blog-1.jpg" className="img-fluid" alt="img-22"/>
                    <a href="news-details.html"></a>
                  </div>
                  <div className="blog-card-date">
                    <a href="news-details.html">28SEP</a>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="author">
                        by<a href="news-details.html">Admin</a>
                      </span>
                      <span className="comment">
                        <a href="news-details.html">02 Comments</a>
                      </span>
                    </div>
                    <h4><a href="news-details.html">Supporting local business to bounce back</a></h4>
                    <p>Tellus amet vel nisi, vel felis morbi sit et. Risus, pulvinar ultricie</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="blog-card">
                  <div className="blog-card-image">
                    <img src="/image/blog/blog-2.jpg" className="img-fluid" alt="img-23"/>
                    <a href="news-details.html"></a>
                  </div>
                  <div className="blog-card-date">
                    <a href="news-details.html">28SEP</a>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="author">
                        by<a href="news-details.html">Admin</a>
                      </span>
                      <span className="comment">
                        <a href="news-details.html">02 Comments</a>
                      </span>
                    </div>
                    <h4><a href="news-details.html">Resilience for TownGov Green Project</a></h4>
                    <p>Tellus amet vel nisi, vel felis morbi sit et. Risus, pulvinar ultricie</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="blog-card">
                  <div className="blog-card-image">
                    <img src="/image/blog/blog-3.jpg" className="img-fluid" alt="img-24"/>
                    <a href="news-details.html"></a>
                  </div>
                  <div className="blog-card-date">
                    <a href="news-details.html">28SEP</a>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="author">
                        by<a href="news-details.html">Admin</a>
                      </span>
                      <span className="comment">
                        <a href="news-details.html">02 Comments</a>
                      </span>
                    </div>
                    <h4><a href="news-details.html">Save soil and save world project in 2022</a></h4>
                    <p>Tellus amet vel nisi, vel felis morbi sit et. Risus, pulvinar ultricie</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="cta-two-section">
          <div className="container">
            <div className="cta-two-section-inner">
              <div className="row">
                <div className="col-xl-5">
                  <div className="cta-two-title">
                    <div className="cta-two-card-icon">
                      <i className="flaticon-envelope-2"></i>
                    </div>
                    <div className="cta-two-card-content">
                      <p>Stay Connected</p>
                      <h3>Join Our Newsletter</h3>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7">
                  <form action="https://webdevcode.com/html/towngov/assets/inc/sendemail.php"
                    className="cta-two-form" method="post">
                    <div className="cta-two-form-group">
                      <input type="email" id="email" className="input-text" placeholder="Email address"
                        name="email" required/>
                    </div>
                    <button className="btn btn-primary">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      
      <div className="mobile-nav-wrapper">
        <div className="mobile-nav-overlay mobile-nav-toggler"></div>
        <div className="mobile-nav-content">
          <a href="#" className="mobile-nav-close mobile-nav-toggler">
            <span></span>
            <span></span>
          </a>
          <div className="logo-box">
            <a href="index-2.html"><img src="/image/logo-light.png" width="160" height="40" alt="26"/></a>
          </div>
          <div className="mobile-nav-container"></div>
          <ul className="mobile-nav-contact list-unstyled">
            <li>
              <i className="fa-solid fa-phone"></i>
              <a href="tel:+8898006802">+ 88 ( 9800 ) 6802</a>
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:needhelp@company.com">needhelp@company.com</a>
            </li>
            <li>
              <i className="fa-solid fa-map-marker-alt"></i>
              88 Broklyn Golden Road Street <br/> New York. USA
            </li>
          </ul>
          <ul className="mobile-nav-social list-unstyled">
            <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-pinterest-p"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
      
      <div className="search-popup">
        <div className="search-popup-overlay search-toggler"></div>
        <div className="search-popup-content">
          <form action="#">
            <label htmlFor="search" className="sr-only">search here</label>
            <input type="text" id="search" placeholder="Search Here..."/>
            <button type="submit" aria-label="search submit" className="search-btn">
              <span><i className="flaticon-search-interface-symbol"></i></span>
            </button>
          </form>
        </div>
      </div>

	    <a href="#" className="scroll-to-top scroll-to-target" data-target="html"><i className="fa-solid fa-arrow-up"></i></a>
    </main>
    )
}
