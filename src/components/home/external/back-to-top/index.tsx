import { useEffect, useState } from "react"

export default function BackToTop() {
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
            setScrolled(true);
            } else {
            setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (<a href="#" className={`scroll-to-top scroll-to-target ${scrolled ? 'd-block' : 'd-none'}`} data-target="html"><i className="fa-solid fa-arrow-up"></i></a>);
}