"use client";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import GlowAnimation from "@/components/ui/PrizepoolElements/glowAnimation";
import {
  AxeImage,
  Rectangle,
} from "@/components/ui/PrizepoolElements/prizePoolImages";

// Import images
import CodeComputerSociety from "@/assets/images/CodeComputeSociety.png";
import GDG from "@/assets/images/GDG.png";
import IBM from "@/assets/images/IBM.png";
import iic from "@/assets/images/iic.png";
import CollaborationHeaderImg from "@/assets/webp/COLLABORATIONS.webp";

export default function CollaborationSection() {
  return (
    <section data-section="collaboration" className="relative w-full flex flex-col items-center justify-center pt-10 md:pt-20">
      
      {/* HEADER SECTION */}
      <div className="relative w-[340px] md:w-[703px] mb-12 md:mb-20 z-20 select-none">
        <Image 
          src={CollaborationHeaderImg} 
          alt="Collaborations Header" 
          draggable={false}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* CARDS GRID */}
      <div className="gap-7 md:gap-10 mb-14 md:mb-18 flex flex-wrap justify-center items-start p-3 md:p-4 overflow-x-hidden w-full z-10">
        
        {/* --- CARD 1: IBM --- */}
        <Tilt>
          <div className="w-[346px] md:w-[461px] inline-flex flex-col justify-start items-start">
            <div className="w-72 md:w-96 h-24 md:h-32 relative overflow-hidden">
              <div className="w-60 md:w-80 px-2 md:px-2.5 py-3 md:py-4 left-9 md:left-12 top-[50px] md:top-[66px] absolute bg-linear-to-r from-violet-900 to-violet-950 rounded-tl-md rounded-tr-md border-l-4 md:border-l-[5px] border-r-4 md:border-r-[5px] border-t-4 md:border-t-[5px] border-yellow-500 inline-flex justify-center items-center gap-2">
                <div className="text-center text-stroke-h4 justify-start text-white text-lg md:text-2xl font-normal [[text-shadow:0px_1.5px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_2px_0px_rgb(0_0_0/1.00)]]">
                  COLLABORATION
                </div>
              </div>
              <div className="w-60 ml-3 md:ml-4 md:w-80 h-15 md:h-20 left-0 top-0 absolute overflow-hidden">
                <div className="w-54 md:w-72 h-8 md:h-10 left-6 md:left-[32.11px] top-5 md:top-[27.16px] absolute">
                  <div className="w-54 md:w-72 h-8 md:h-10 left-0 top-1 md:top-1.5 absolute">
                    <Rectangle />
                  </div>
                  <div className="left-[51px] md:left-[67.89px] top-[7px] md:top-[9.84px] absolute text-center justify-start text-yellow-700 text-base md:text-xl font-normal ">
                    MAIN PARTNER
                  </div>
                </div>
                <div className="w-21 md:w-28 h-15 md:h-20 left-0 top-1 absolute z-10">
                  <AxeImage />
                </div>
              </div>
            </div>
            <div className="self-stretch px-2 md:px-3 pt-10 md:pt-14 pb-2 md:pb-3 bg-linear-to-b from-[#fdd05c] via-[#e9a907] to-[#e9a907] rounded-2xl md:rounded-3xl shadow-[0px_10px_0px_0px_rgba(0,0,0,0.25)] md:shadow-[0px_14px_0px_0px_rgba(0,0,0,0.25)] outline-8 md:outline-10 -outline-offset-8 md:outline-offset-[-10px] outline-[#e9a907] flex flex-col justify-start items-center gap-1.5 md:gap-2 overflow-hidden">
              <div className="self-stretch relative flex flex-col justify-center items-center h-[350px]">
                <div className="self-stretch text-stroke-h text-center justify-start text-white text-6xl md:text-8xl font-normal [text-shadow:0px_3px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_4px_0px_rgb(0_0_0/1.00)] mb-4">
                  IBM
                </div>
                
                {/* --- Image Container (Increased Size) --- */}
                <div className="relative w-[90%] h-[75%] flex justify-center items-center z-10">
                  <Image 
                    src={IBM} 
                    alt="IBM Logo"
                    className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                    fill
                  />
                </div>
                
                {/* --- Glow Commented Out --- */}
                {/* <div className="w-72 md:w-96 h-72 md:h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <GlowAnimation />
                </div> */}
              </div>
              
              <div className="w-[344px] md:w-[458px] px-4 md:px-6 py-3 md:py-4 bg-[#c6661c] inline-flex justify-center items-center gap-2 md:gap-3 overflow-hidden rounded-b-xl">
                <div className="flex-1 text-stroke-h5 text-center justify-start text-white text-base md:text-xl font-normal leading-5 md:leading-6 [text-shadow:0px_1.5px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_2px_0px_rgb(0_0_0/1.00)]">
                  Collaboration with IBM
                </div>
              </div>
            </div>
          </div>
        </Tilt>

        {/* --- CARD 2: CCS --- */}
        <Tilt>
          <div className="w-[346px] md:w-[461px] inline-flex flex-col justify-start items-start">
            <div className="w-72 md:w-96 h-24 md:h-32 relative overflow-hidden">
              <div className="w-60 md:w-80 px-2 md:px-2.5 py-3 md:py-4 left-9 md:left-12 top-[50px] md:top-[66px] absolute bg-linear-to-r from-violet-900 to-violet-950 rounded-tl-md rounded-tr-md border-l-4 md:border-l-[5px] border-r-4 md:border-r-[5px] border-t-4 md:border-t-[5px] border-yellow-500 inline-flex justify-center items-center gap-2">
                <div className="text-center text-stroke-h4 justify-start text-white text-lg md:text-2xl font-normal [[text-shadow:0px_1.5px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_2px_0px_rgb(0_0_0/1.00)]]">
                  ASSOCIATE
                </div>
              </div>
              <div className="w-60 ml-3 md:ml-4 md:w-80 h-15 md:h-20 left-0 top-0 absolute overflow-hidden">
                <div className="w-54 md:w-72 h-8 md:h-10 left-6 md:left-[32.11px] top-5 md:top-[27.16px] absolute">
                  <div className="w-54 md:w-72 h-8 md:h-10 left-0 top-1 md:top-1.5 absolute">
                    <Rectangle />
                  </div>
                  <div className="left-[51px] md:left-[67.89px] top-[7px] md:top-[9.84px] absolute text-center justify-start text-yellow-700 text-base md:text-xl font-normal ">
                    COMMUNITY
                  </div>
                </div>
                <div className="w-21 md:w-28 h-15 md:h-20 left-0 top-1 absolute z-10">
                  <AxeImage />
                </div>
              </div>
            </div>
            <div className="self-stretch px-2 md:px-3 pt-10 md:pt-14 pb-2 md:pb-3 bg-linear-to-b from-violet-500 via-purple-800 to-fuchsia-950 rounded-2xl md:rounded-3xl shadow-[0px_10px_0px_0px_rgba(0,0,0,0.25)] md:shadow-[0px_14px_0px_0px_rgba(0,0,0,0.25)] outline-8 md:outline-10 -outline-offset-8 md:outline-offset-[-10px] outline-[#452A76] flex flex-col justify-start items-center gap-1.5 md:gap-2 overflow-hidden">
              <div className="self-stretch relative flex flex-col justify-center items-center h-[350px]">
                <div className="self-stretch text-stroke-h text-center justify-start text-white text-6xl md:text-8xl font-normal [text-shadow:0px_3px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_4px_0px_rgb(0_0_0/1.00)] mb-4">
                  CCS
                </div>
                
                {/* --- Image Container (Increased Size) --- */}
                <div className="relative w-[90%] h-[75%] flex justify-center items-center z-10">
                  <Image 
                    src={CodeComputerSociety} 
                    alt="Code Computer Society Logo"
                    className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                    fill
                  />
                </div>

                {/* --- Glow Commented Out --- */}
                {/* <div className="w-72 md:w-96 h-72 md:h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <GlowAnimation />
                </div> */}
              </div>
              <div className="w-[344px] md:w-[458px] px-4 md:px-6 py-3 md:py-4 bg-[#875bff]/75 inline-flex justify-center items-center gap-2 md:gap-3 overflow-hidden rounded-b-xl">
                <div className="flex-1 text-stroke-h5 text-center justify-start text-white text-base md:text-xl font-normal leading-5 md:leading-6 [text-shadow:0px_1.5px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_2px_0px_rgb(0_0_0/1.00)]">
                  In Association with
                  <br /> CCS
                </div>
              </div>
            </div>
          </div>
        </Tilt>

        {/* --- CARD 3: GDG --- */}
        <Tilt>
          <div className="w-[346px] md:w-[461px] inline-flex flex-col justify-start items-start">
            <div className="w-72 md:w-96 h-24 md:h-32 relative overflow-hidden">
              <div className="w-60 md:w-80 px-2 md:px-2.5 py-3 md:py-4 left-9 md:left-12 top-[50px] md:top-[66px] absolute bg-linear-to-r from-violet-900 to-violet-950 rounded-tl-md rounded-tr-md border-l-4 md:border-l-[5px] border-r-4 md:border-r-[5px] border-t-4 md:border-t-[5px] border-yellow-500 inline-flex justify-center items-center gap-2">
                <div className="text-center text-stroke-h4 justify-start text-white text-lg md:text-2xl font-normal [[text-shadow:0px_1.5px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_2px_0px_rgb(0_0_0/1.00)]]">
                  ASSOCIATE
                </div>
              </div>
              <div className="w-60 ml-3 md:ml-4 md:w-80 h-15 md:h-20 left-0 top-0 absolute overflow-hidden">
                <div className="w-54 md:w-72 h-8 md:h-10 left-6 md:left-[32.11px] top-5 md:top-[27.16px] absolute">
                  <div className="w-54 md:w-72 h-8 md:h-10 left-0 top-1 md:top-1.5 absolute">
                    <Rectangle />
                  </div>
                  <div className="left-[51px] md:left-[67.89px] top-[7px] md:top-[9.84px] absolute text-center justify-start text-yellow-700 text-base md:text-xl font-normal ">
                    CAMPUS
                  </div>
                </div>
                <div className="w-21 md:w-28 h-15 md:h-20 left-0 top-1 absolute z-10">
                  <AxeImage />
                </div>
              </div>
            </div>
            <div className="self-stretch px-2 md:px-3 pt-10 md:pt-14 pb-2 md:pb-3 bg-[linear-gradient(180deg,#bd5341_0%,#A52D1C_36%,#62180f_71%)] rounded-2xl md:rounded-3xl shadow-[0px_10px_0px_0px_rgba(0,0,0,0.25)] md:shadow-[0px_14px_0px_0px_rgba(0,0,0,0.25)] outline-8 md:outline-10 -outline-offset-8 md:outline-offset-[-10px] outline-[#802b1e] flex flex-col justify-start items-center gap-1.5 md:gap-2 overflow-hidden">
              <div className="self-stretch relative flex flex-col justify-center items-center h-[350px]">
                <div className="self-stretch text-stroke-h text-center justify-start text-white text-6xl md:text-8xl font-normal [text-shadow:0px_3px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_4px_0px_rgb(0_0_0/1.00)] mb-4">
                  GDG
                </div>
                
                {/* --- Image Container (Increased Size) --- */}
                <div className="relative w-[90%] h-[75%] flex justify-center items-center z-10">
                  <Image 
                    src={GDG} 
                    alt="GDG Logo"
                    className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                    fill
                  />
                </div>

                {/* --- Glow Commented Out --- */}
                {/* <div className="w-72 md:w-96 h-72 md:h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <GlowAnimation />
                </div> */}
              </div>
              <div className="w-[344px] md:w-[458px] px-4 md:px-6 py-3 md:py-4 bg-[#dd6c45] inline-flex justify-center items-center gap-2 md:gap-3 overflow-hidden rounded-b-xl">
                <div className="flex-1 text-stroke-h5 text-center justify-start text-white text-base md:text-xl font-normal leading-5 md:leading-6 [text-shadow:0px_1.5px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_2px_0px_rgb(0_0_0/1.00)]">
                  GDG on Campus AJU
                </div>
              </div>
            </div>
          </div>
        </Tilt>

        {/* --- CARD 4: IIC --- */}
        <Tilt>
          <div className="w-[346px] md:w-[461px] inline-flex flex-col justify-start items-start">
            <div className="w-72 md:w-96 h-24 md:h-32 relative overflow-hidden">
              <div className="w-60 md:w-80 px-2 md:px-2.5 py-3 md:py-4 left-9 md:left-12 top-[50px] md:top-[66px] absolute bg-linear-to-r from-violet-900 to-violet-950 rounded-tl-md rounded-tr-md border-l-4 md:border-l-[5px] border-r-4 md:border-r-[5px] border-t-4 md:border-t-[5px] border-yellow-500 inline-flex justify-center items-center gap-2">
                <div className="text-center text-stroke-h4 justify-start text-white text-lg md:text-2xl font-normal [[text-shadow:0px_1.5px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_2px_0px_rgb(0_0_0/1.00)]]">
                  ASSOCIATE
                </div>
              </div>
              <div className="w-60 ml-3 md:ml-4 md:w-80 h-15 md:h-20 left-0 top-0 absolute overflow-hidden">
                <div className="w-54 md:w-72 h-8 md:h-10 left-6 md:left-[32.11px] top-5 md:top-[27.16px] absolute">
                  <div className="w-54 md:w-72 h-8 md:h-10 left-0 top-1 md:top-1.5 absolute">
                    <Rectangle />
                  </div>
                  <div className="left-[51px] md:left-[67.89px] top-[7px] md:top-[9.84px] absolute text-center justify-start text-yellow-700 text-base md:text-xl font-normal ">
                    COUNCIL
                  </div>
                </div>
                <div className="w-21 md:w-28 h-15 md:h-20 left-0 top-1 absolute z-10">
                  <AxeImage />
                </div>
              </div>
            </div>
            <div className="self-stretch px-2 md:px-3 pt-10 md:pt-14 pb-2 md:pb-3 bg-[linear-gradient(180deg,#443E3F_0%,#33302F_40%,#131314_80%)] rounded-2xl md:rounded-3xl shadow-[0px_10px_0px_0px_rgba(0,0,0,0.25)] md:shadow-[0px_14px_0px_0px_rgba(0,0,0,0.25)] outline-8 md:outline-10 -outline-offset-8 md:outline-offset-[-10px] outline-[#5B524A] flex flex-col justify-start items-center gap-1.5 md:gap-2 overflow-hidden">
              <div className="self-stretch relative flex flex-col justify-center items-center h-[350px]">
                <div className="self-stretch text-stroke-h text-center justify-start text-white text-6xl md:text-8xl font-normal [text-shadow:0px_3px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_4px_0px_rgb(0_0_0/1.00)] mb-4">
                  IIC
                </div>
                
                {/* --- Image Container (Increased Size) --- */}
                <div className="relative w-[90%] h-[75%] flex justify-center items-center z-10">
                  <Image 
                    src={iic} 
                    alt="Institution's Innovation Council Logo"
                    className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                    fill
                  />
                </div>

                {/* --- Glow Commented Out --- */}
                {/* <div className="w-72 md:w-96 h-72 md:h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <GlowAnimation />
                </div> */}
              </div>
              <div className="w-[344px] md:w-[458px] px-4 md:px-6 py-3 md:py-4 bg-[#32302E] inline-flex justify-center items-center gap-2 md:gap-3 overflow-hidden rounded-b-xl">
                <div className="flex-1 text-stroke-h5 text-center justify-start text-white text-base md:text-xl font-normal leading-5 md:leading-6 [text-shadow:0px_1.5px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_2px_0px_rgb(0_0_0/1.00)]">
                  Institution's Innovation Council
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  );
}