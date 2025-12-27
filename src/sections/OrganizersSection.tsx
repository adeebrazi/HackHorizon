"use client";
import Image, { StaticImageData } from "next/image";
import Tilt from "react-parallax-tilt";

// Import your assets
import ArvindKrPandey from "../assets/organisers/ArvindKrPandey.png";
import Ashwini from "../assets/organisers/Ashwini.png";
import souviksir from "../assets/organisers/souviksir.png";
import mamatha from "../assets/organisers/mamatha.jpg";
import akashsir from "../assets/organisers/akashsir.png";
import sayantanimam from "../assets/organisers/sayantanimam.png";
import KhushiRani from "../assets/organisers/Khushi rani.jpg";
import anjali from "../assets/organisers/anjali.jpg";
import ritesh from "../assets/organisers/ritesh.jpg";
import gourav from "../assets/organisers/gourav.jpg";
import preet from "../assets/organisers/preet.jpg";
import nikita from "../assets/organisers/nikita.jpg";
import sonali from "../assets/organisers/sonali.jpg";
import sohail from "../assets/organisers/sohail.jpg";
import adeeb from "../assets/organisers/adeeb.jpg";
import sanchit from "../assets/organisers/sanchit.jpg";
import aaditya from "../assets/organisers/aaditya.jpg";
import avijeet from "../assets/organisers/avijeet.jpg";
import umeshsir from "../assets/organisers/umeshsir.png";
import meghamam from "../assets/organisers/meghamam.jpg";
import utkarshsir from "../assets/organisers/utkarsh sir.png";

// Import the Header Image
import OrganisersHeaderImg from "@/assets/webp/ORGANISERS.png";

// --- REUSABLE CARD COMPONENT ---
interface OrganizerCardProps {
  name: string;
  role?: string;
  team: string;
  image: StaticImageData;
  theme?: "gold" | "purple" | "red" | "dark";
}

const OrganizerCard = ({ name, role, team, image, theme = "purple" }: OrganizerCardProps) => {
  const themeStyles = {
    gold: {
      container: "bg-[linear-gradient(180deg,#fdd05c_0%,#e9a907_50%,#c6661c_100%)] outline-[#e9a907]",
      badge: "bg-[#c6661c]"
    },
    purple: {
      container: "bg-[linear-gradient(180deg,#a855f7_0%,#6b21a8_50%,#4a044e_100%)] outline-[#452A76]",
      badge: "bg-[#4a044e]"
    },
    red: {
      container: "bg-[linear-gradient(180deg,#bd5341_0%,#A52D1C_50%,#62180f_100%)] outline-[#802b1e]",
      badge: "bg-[#62180f]"
    },
    dark: {
      container: "bg-[linear-gradient(180deg,#443E3F_0%,#33302F_50%,#131314_100%)] outline-[#5B524A]",
      badge: "bg-[#131314]"
    },
  };

  const styles = themeStyles[theme];

  return (
    <Tilt
      glareEnable={false}
      scale={1.05}
      transitionSpeed={1500}
      className="flex flex-col items-center justify-center"
    >
      <div className={`
          relative flex flex-col items-center 
          w-[290px] h-[450px] 
          p-4 pt-8 rounded-3xl 
          shadow-[0px_12px_0px_0px_rgba(0,0,0,0.4)] 
          outline-8 -outline-offset-8 
          overflow-hidden 
          ${styles.container}
      `}>
        
        {/* Decorative Screws */}
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-black/40 border border-white/20 shadow-inner z-20" />
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-black/40 border border-white/20 shadow-inner z-20" />

        {/* Profile Image Container */}
        <div className="relative w-48 h-48 mb-4 shrink-0 rounded-2xl overflow-hidden border-4 border-black/40 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] bg-black/50 z-10">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="12rem"
          />
           <div className="absolute inset-0 border-2 border-white/10 rounded-2xl pointer-events-none"></div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col items-center w-full z-10 flex-grow">
            
            {/* Name - Standard Font */}
            <div className="h-[4.5rem] w-full flex items-center justify-center px-2 mb-1">
                <h4 className="text-2xl md:text-3xl font-bold text-white text-center leading-tight drop-shadow-[0_2px_0_rgba(0,0,0,1)] line-clamp-2">
                {name}
                </h4>
            </div>

            {/* Role Badge */}
            <div className="h-[3rem] w-full flex items-start justify-center">
                {role && (
                <div className={`px-4 py-1.5 rounded-lg ${styles.badge} border-t-2 border-black/20 shadow-inner flex justify-center items-center max-w-[90%]`}>
                    <p className="text-[#7BCAF8] text-center font-bold text-xs uppercase tracking-wider drop-shadow-sm leading-tight">
                    {role}
                    </p>
                </div>
                )}
            </div>

            {/* Team */}
            <div className="mt-auto pb-2">
                <p className="text-white/70 text-center text-[10px] font-bold uppercase tracking-widest">
                {team}
                </p>
            </div>
        </div>

        {/* Subtle bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent z-0"></div>
      </div>
    </Tilt>
  );
};

export default function OrganizersSection() {
  const convenors = [
    { name: "Dr. Arvind Kumar Pandey", role: "Dean, School of Engineering & IT", institution: "ARKA JAIN University", image: ArvindKrPandey },
    { name: "Dr. Ashwini Kumar", role: "Asst. Dean, School of Engineering & IT", institution: "ARKA JAIN University", image: Ashwini },
  ];

  const facultyCoordinators = [
    { name: "Dr. Souvik Singh Rathore", role: "Assistant Professor", institution: "ARKA JAIN University", image: souviksir },
    { name: "Prof. Mamatha V", role: "Assistant Professor", institution: "ARKA JAIN University", image: mamatha },
    { name: "Prof. Akash Bhagat", role: "Assistant Professor", institution: "ARKA JAIN University", image: akashsir },
    { name: "Prof. Sayantani De", role: "Assistant Professor", institution: "ARKA JAIN University", image: sayantanimam },
  ];

  const studentCoordinators = [
    { name: "Khushi Rani", role: "General Secretary", team: "Code & Compute Society", image: KhushiRani },
    { name: "Ritesh Kumar", role: "President", team: "Code & Compute Society", image: ritesh },
    { name: "Gourav Kr Pandey", role: "Vice-President", team: "Code & Compute Society", image: gourav },
    { name: "Anjali Singh", role: "Organiser", team: "GDG on Campus AJU", image: anjali },
    { name: "Singh Preet", role: "Technical Lead", team: "Code & Compute Society", image: preet },
    { name: "Nikita Mishra", role: "PR Lead", team: "GDG on Campus AJU", image: nikita },
    { name: "Sonali Mahato", role: "Social Media Lead", team: "GDG on Campus AJU", image: sonali },
    { name: "Sohail Khan", role: "Creative Lead", team: "GDG on Campus AJU", image: sohail },
    { name: "Adeeb Razi", role: "Community Lead", team: "GDG on Campus AJU", image: adeeb },
    { name: "Sanchit Agarwal", role: "Co-Technical Lead", team: "GDG on Campus AJU", image: sanchit },
    { name: "Aaditya Singh", role: "Design Lead", team: "GDG on Campus AJU", image: aaditya },
    { name: "Avijeet Ghosal", role: "Management Lead", team: "GDG on Campus AJU", image: avijeet },
  ];

  const technicalCoordinators = [
    { name: "Mr. Umesh Tiwari", role: "I.T Head", team: "ARKA JAIN University", image: umeshsir },
    { name: "Megha Shrivastava", role: "Technical", team: "ARKA JAIN University", image: meghamam },
    { name: "Mr. Utkarsh", role: "Technical", team: "ARKA JAIN University", image: utkarshsir },
  ];

  return (
    <div data-section="organisers" className="relative bg-black px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Background texture overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a1a_0%,#000000_100%)] opacity-90"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* ==========================================
            MAIN HEADER (Using Image)
        ========================================== */}
        <div className="relative w-[300px] md:w-[600px] mb-16 md:mb-24 z-20 select-none">
          <Image 
            src={OrganisersHeaderImg} 
            alt="Organisers Header" 
            draggable={false}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* ==========================================
            CONVENORS (Gold Theme)
        ========================================== */}
        <div className="mb-20 md:mb-32 w-full">
          <h3 className="text-3xl md:text-5xl font-bold text-center mb-12 text-[#FFC52C] drop-shadow-[0_2px_0_rgba(0,0,0,1)] uppercase tracking-wide">
            Convenors
          </h3>
          <div className="flex flex-wrap justify-center gap-12">
            {convenors.map((person, index) => (
              <OrganizerCard 
                key={index} 
                name={person.name} 
                role={person.role} 
                team={person.institution} 
                image={person.image} 
                theme="gold" 
              />
            ))}
          </div>
        </div>

        {/* ==========================================
            FACULTY COORDINATORS (Purple Theme)
        ========================================== */}
        <div className="mb-20 md:mb-32 w-full">
          <h3 className="text-3xl md:text-5xl font-bold text-center mb-12 text-[#C084FC] drop-shadow-[0_2px_0_rgba(0,0,0,1)] uppercase tracking-wide">
            Faculty Coordinators
          </h3>
          <div className="flex flex-wrap justify-center gap-10">
            {facultyCoordinators.map((person, index) => (
              <OrganizerCard 
                key={index} 
                name={person.name} 
                role={person.role} 
                team={person.institution} 
                image={person.image} 
                theme="purple" 
              />
            ))}
          </div>
        </div>

        {/* ==========================================
            STUDENT COORDINATORS (Red Theme)
        ========================================== */}
        <div className="mb-20 md:mb-32 w-full">
          <h3 className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#F87171] drop-shadow-[0_2px_0_rgba(0,0,0,1)] uppercase tracking-wide">
            Core Team
          </h3>
          <p className="text-2xl text-[#7BCAF8] text-center mb-12 font-medium drop-shadow-sm">Student Coordinators</p>
          <div className="flex flex-wrap justify-center gap-10">
            {studentCoordinators.map((person, index) => (
              <OrganizerCard 
                key={index} 
                name={person.name} 
                role={person.role} 
                team={person.team} 
                image={person.image} 
                theme="red" 
              />
            ))}
          </div>
        </div>

        {/* ==========================================
            TECHNICAL TEAM (Dark Theme)
        ========================================== */}
        <div className="w-full pb-20">
          <h3 className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#94A3B8] drop-shadow-[0_2px_0_rgba(0,0,0,1)] uppercase tracking-wide">
            Technical Team
          </h3>
          <p className="text-2xl text-[#7BCAF8] text-center mb-12 font-medium drop-shadow-sm">Technical Coordinators</p>
          <div className="flex flex-wrap justify-center gap-10">
            {technicalCoordinators.map((person, index) => (
              <OrganizerCard 
                key={index} 
                name={person.name} 
                role={person.role} 
                team={person.team} 
                image={person.image} 
                theme="dark" 
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}