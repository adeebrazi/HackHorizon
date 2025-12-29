import Image from "next/image";
import FooterImg from "./../../assets/webp/footerImg.webp";
import { FaInstagram, FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaMeta, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineMail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="relative flex justify-center items-center w-full min-h-screen py-8 md:py-10">
      <Image
        src={FooterImg}
        alt="Footer Image"
        fill
        style={{ objectFit: 'cover' }}
        className="z-0"
        draggable={false}
        sizes="100vw"
      />
      <div className="flex flex-col items-center mx-auto z-10 text-white px-4 md:px-8">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] mb-8 md:mb-12 lg:mb-18 text-center">
          Contact Us
        </div>
        <div className="space-y-6 md:space-y-8 lg:space-y-12 text-xl sm:text-2xl md:text-3xl lg:text-[36px]">
          <div className="flex flex-col items-center">
            <p className="mb-2 md:mb-3 whitespace-pre-line text-center">
              Dr. Ashwini Kumar
              <br />Assistant Dean
              <br />School of Engineering & IT
            </p>
            <a
              className="relative flex justify-center items-center  gap-6 px-6 p-2 text-white  w-fit  shadow-[0_3px_0_#000] text-xl  md:text-2xl  font-medium border-t-4 border-b-4 border-b-[#EC8F01]  border-t-[#FFF] text-shadow  rounded-xl cursor-pointer transition-transform duration-200 hover:scale-[1.01] active:scale-95"
              style={{
                background:
                  "linear-gradient(180deg, #FFEA92 0%, #FFFABC 24%, #FFE673 50%, #FFC610 80%)",
              }}
              href={`tel:8210353795`}
            >
              +91 82103 53795
            </a>
          </div>
          <div className="flex flex-col items-center">
            <p className="mb-2 md:mb-3 whitespace-pre-line text-center">
              MS Anjali Kumari
              <br />Student Coordinator
            </p>
            <a
              href={`tel:6205120426`}
              className="relative flex justify-center items-center  gap-6 px-6 p-2 text-white  w-fit  shadow-[0_3px_0_#000] text-xl  md:text-2xl  font-medium border-t-4 border-b-4 border-b-[#EC8F01]  border-t-[#FFF] text-shadow  rounded-xl cursor-pointer transition-transform duration-200 hover:scale-[1.01] active:scale-95"
              style={{
                background:
                  "linear-gradient(180deg, #FFEA92 0%, #FFFABC 24%, #FFE673 50%, #FFC610 80%)",
              }}

            >
              +91 62051 20426
            </a>
          </div>
        </div>
        <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
  {/* Responsive Title */}
  <div className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] mt-6 md:mt-8 lg:mt-10 mb-4 md:mb-5 text-center font-bold">
    Venue
  </div>

  {/* Responsive Map Container */}
  <div className="w-full border-4 md:border-8 border-[#fbdd66] rounded-3xl overflow-hidden">
    <div className="relative w-full aspect-video sm:aspect-[21/9]">
      <iframe
        title="Venue Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58842.60725308107!2d86.09784817698247!3d22.814949605614032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e5f1b496777f%3A0x1d506033b3ed835d!2sEmversity%20Campus%2C%20Jamshedpur!5e0!3m2!1sen!2sin!4v1766128633582!5m2!1sen!2sin"
        className="absolute top-0 left-0 w-full h-full rounded-2xl"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</div>
      </div>
      <div className="w-full absolute bottom-0 px-4 sm:px-8 md:px-12 lg:px-20 py-3 md:py-4 border-t-2 border-[#FFFFFF1F] z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 bg-black/20 backdrop-blur-sm">
        <div className="text-white font-sans text-xs sm:text-sm md:text-base lg:text-xl text-center order-1 md:order-1">
          Built in Collaboration with GDGoC AJU & CCS
        </div>
        <div className="text-white font-sans flex text-lg sm:text-xl md:text-2xl lg:text-xl gap-3 sm:gap-4 md:gap-5 order-2 md:order-2">
          <Link
            href="mailto:hackhorizon@arkajainuniversity.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdOutlineMail className="hover:text-pink-500 transition-colors cursor-pointer" />
          </Link>
          <Link
            href="https://www.instagram.com/hackhorizon_aju"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="hover:text-pink-500 transition-colors cursor-pointer" />
          </Link>
          
          <Link
            href="https://github.com/hackhorizon-aju"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="hover:text-gray-300 transition-colors cursor-pointer" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/hackhorizon-aju-50827a352/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="hover:text-blue-600 transition-colors cursor-pointer" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
