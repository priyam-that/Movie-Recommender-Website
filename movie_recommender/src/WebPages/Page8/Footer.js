import React from 'react';
import style  from '../Styles/NewFooter.module.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";



const Footer = () => {
    return (
        <footer className={style.footer} style={{ background: `url(./images/pic1.jpg) no-repeat center / cover` }}>
            
            {/* Main Container */}
            <div className={style.container}>

                {/* About-Section */}
                <div className={style.footerSectionAbout}>
                    <h3>About Us</h3>
                    <p>
                        Discover the best movies tailored to your taste on our movie recommendation website. Explore top picks, trending films, and hidden gems, making it easy to find your next favorite movie!
                    </p>
                </div>
                <div className={style.footerSectionLinks}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link className={style.all} to="/">Home</Link></li>
                        <li><HashLink className={style.all} to="/#mostPopular">Most Popular</HashLink></li>
                        <li><HashLink className={style.all} to="/#topRated">Top Rated</HashLink></li>
                        <li><Link className={style.all} to="/Blogs">Blogs</Link></li>
                    </ul>
                </div>

                {/* Contact Us-Section */}
                <div className={style.footerSectionContact}>
                    <h3>Contact Us</h3>
                
                    <div className={style.socials}>
                        <a href="https://www.facebook.com" target="_blank" aria-label="Facebook"><FaFacebook className={style.socialIcon} /></a>
                        <a href="https://www.twitter.com" target="_blank" aria-label="Twitter"><FaTwitter className={style.socialIcon} /></a>
                        <a href="https://www.instagram.com" target="_blank" aria-label="Instagram"><FaInstagram className={style.socialIcon} /></a>
                        <a href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn"><FaLinkedinIn className={style.socialIcon} /></a>
                        <a href="https://www.youtube.com" target="_blank" aria-label="YouTube"><FaYoutube className={style.socialIcon} /></a>
                    </div>
                </div>
            </div>

            {/* Bottom-Section */}
            <div className={style.footerBottom}>
                <p>©2025 Cineva.com | All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;

