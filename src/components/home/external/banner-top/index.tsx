import Link from "next/link";

export default function BannerTop({breadcrumb, title} : {breadcrumb: string, title: string}) {
  return (
    <section className="page-banner">
      <div className="container">
        <div className="page-breadcrumbs">
          <ul className="list-unstyled">
            <li><Link href="/">Beranda</Link></li>
            <li>{breadcrumb}</li>
          </ul>
        </div>
        <div className="page-banner-title">
          <h3>{title}</h3>
        </div>
      </div>
    </section>
  );
}