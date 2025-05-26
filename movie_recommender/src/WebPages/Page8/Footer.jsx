import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="h-[23vw] relative font-['Arial',_sans-serif] md:h-auto md:py-6 xl:h-[23vw]" style={{ background: `url(./images/pic1.jpg) no-repeat center / cover` }}>
            <div className="absolute inset-0 w-full h-[75%] bg-black/60 z-10 md:h-full"></div>
            {/* Main Container */}
            <div className="flex justify-evenly h-[75%] pl-8 shadow-text-custom-footer relative z-20 md:flex-col md:items-center md:pl-4 md:pr-4 md:gap-6 xl:text-[1.4vw] xl:h-[75%]">

                {/* About-Section */}
                <div className="w-full mt-8 text-gray-200/80 z-20 md:w-11/12 md:mt-0 md:text-center xl:mt-8">
                    <h3 className="text-xl text-center md:text-lg xl:text-[1.7vw]">About Us</h3>
                    <p className="mt-2 text-center md:text-sm xl:mt-2">
                        Discover the best movies tailored to your taste on our movie recommendation website. Explore top picks, trending films, and hidden gems, making it easy to find your next favorite movie!
                    </p>
                </div>
                <div className="w-full mt-8 z-20 md:w-11/12 md:mt-0 xl:mt-8">
                    <h3 className="text-center text-xl font-bold text-gray-200/80 md:text-lg xl:text-[1.7vw]">Quick Links</h3>
                    <ul className="text-center mt-2 text-sm leading-relaxed md:text-sm xl:text-[1.4vw] xl:mt-2">
                        <li><Link className="no-underline text-gray-200/80 transition-colors duration-300 ease-in-out hover:text-pink-500" to="/">Home</Link></li>
                        <li><HashLink className="no-underline text-gray-200/80 transition-colors duration-300 ease-in-out hover:text-pink-500" to="/#mostPopular">Most Popular</HashLink></li>
                        <li><HashLink className="no-underline text-gray-200/80 transition-colors duration-300 ease-in-out hover:text-pink-500" to="/#topRated">Top Rated</HashLink></li>
                        <li><Link className="no-underline text-gray-200/80 transition-colors duration-300 ease-in-out hover:text-pink-500" to="/Blogs">Blogs</Link></li>
                    </ul>
                </div>

                {/* Contact Us-Section */}
                <div className="w-full mt-8 text-gray-200/80 z-20 md:w-11/12 md:mt-0 md:text-center xl:mt-8">
                    <h3 className="text-xl text-center md:text-lg xl:text-[1.7vw]">Contact Us</h3>
                
                    <div className="flex justify-center mt-5 md:mt-4 xl:mt-5">
                        <a href="https://www.facebook.com" target="_blank" aria-label="Facebook" className="mr-2.5 no-underline text-gray-200/80 text-xl transition-colors duration-300 ease-in-out hover:text-pink-500 md:text-lg xl:text-[1.5vw] xl:mr-[15px]"><FaFacebook /></a>
                        <a href="https://www.twitter.com" target="_blank" aria-label="Twitter" className="mr-2.5 no-underline text-gray-200/80 text-xl transition-colors duration-300 ease-in-out hover:text-pink-500 md:text-lg xl:text-[1.5vw] xl:mr-[15px]"><FaTwitter /></a>
                        <a href="https://www.instagram.com" target="_blank" aria-label="Instagram" className="mr-2.5 no-underline text-gray-200/80 text-xl transition-colors duration-300 ease-in-out hover:text-pink-500 md:text-lg xl:text-[1.5vw] xl:mr-[15px]"><FaInstagram /></a>
                        <a href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn" className="mr-2.5 no-underline text-gray-200/80 text-xl transition-colors duration-300 ease-in-out hover:text-pink-500 md:text-lg xl:text-[1.5vw] xl:mr-[15px]"><FaLinkedinIn /></a>
                        <a href="https://www.youtube.com" target="_blank" aria-label="YouTube" className="mr-2.5 no-underline text-gray-200/80 text-xl transition-colors duration-300 ease-in-out hover:text-pink-500 md:text-lg xl:text-[1.5vw] xl:mr-[15px]"><FaYoutube /></a>
                    </div>
                </div>
            </div>

            {/* Bottom-Section */}
            <div className="flex justify-center items-center py-5 bg-[#222] text-gray-100 text-sm h-[25%] relative z-20 md:text-sm md:py-4 md:h-auto xl:text-[1.5vw] xl:h-[25%]">
                <p className="z-20">©2025 Cineva.com | All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;

