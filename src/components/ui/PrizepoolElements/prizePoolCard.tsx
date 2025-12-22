"use client";
import Tilt from "react-parallax-tilt";
import GlowAnimation from "./glowAnimation";
import {
  AxeImage,
  GoldStorage1Image,
  Rectangle,
} from "./prizePoolImages";

export default function PrizePoolCard() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col justify-center items-center p-4 overflow-x-hidden gap-10">
      
      {/* Header for the section */}
      <div className="text-center">
        <h2 className="text-4xl mt-20 md:text-5xl font-bold text-white uppercase tracking-wider [text-shadow:0px_4px_0px_rgba(0,0,0,0.5)]">
          Total Prize Pool
        </h2>
      </div>

      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.3}
        glareColor="#ffffff"
        glarePosition="all"
        scale={1.05}
        transitionSpeed={1500}
      >
        <div className="w-[346px] md:w-[461px] inline-flex flex-col justify-start items-start">
          
          {/* --- TOP HEADER SECTION --- */}
          <div className="w-72 md:w-96 h-24 md:h-32 relative overflow-hidden z-20">
            {/* The Badge */}
            <div className="w-60 md:w-80 px-2 md:px-2.5 py-3 md:py-4 left-9 md:left-12 top-[50px] md:top-[66px] absolute bg-linear-to-r from-violet-900 to-violet-950 rounded-tl-md rounded-tr-md border-l-4 md:border-l-[5px] border-r-4 md:border-r-[5px] border-t-4 md:border-t-[5px] border-yellow-500 inline-flex justify-center items-center gap-2">
              <div className="text-center text-stroke-h4 justify-start text-white text-lg md:text-2xl font-normal [[text-shadow:0px_1.5px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_2px_0px_rgb(0_0_0/1.00)]]">
                PRIZE POOL
              </div>
            </div>
            
            {/* The Axe/Decoration Layer */}
            <div className="w-60 ml-3 md:ml-4 md:w-80 h-15 md:h-20 left-0 top-0 absolute overflow-hidden">
              <div className="w-54 md:w-72 h-8 md:h-10 left-6 md:left-[32.11px] top-5 md:top-[27.16px] absolute">
                <div className="w-54 md:w-72 h-8 md:h-10 left-0 top-1 md:top-1.5 absolute">
                  <Rectangle />
                </div>
                <div className="left-[51px] md:left-[67.89px] top-[7px] md:top-[9.84px] absolute text-center justify-start text-yellow-700 text-base md:text-xl font-normal ">
                  STORE BONUS
                </div>
              </div>
              <div className="w-21 md:w-28 h-15 md:h-20 left-0 top-1 absolute z-10">
                <AxeImage />
              </div>
            </div>
          </div>

          {/* --- MAIN BODY SECTION (Gold Background) --- */}
          <div className="self-stretch px-2 md:px-3 pt-10 md:pt-14 pb-2 md:pb-3 bg-linear-to-b from-[#fdd05c] via-[#e9a907] to-[#e9a907] rounded-2xl md:rounded-3xl shadow-[0px_10px_0px_0px_rgba(0,0,0,0.25)] md:shadow-[0px_14px_0px_0px_rgba(0,0,0,0.25)] outline-8 md:outline-10 -outline-offset-8 md:outline-offset-[-10px] outline-[#e9a907] flex flex-col justify-start items-center gap-1.5 md:gap-2 overflow-hidden">
            
            <div className="self-stretch relative flex flex-col justify-center items-center">
              {/* UPDATED PRICE TEXT HERE */}
              <div className="self-stretch text-stroke-h text-center justify-start text-white text-6xl md:text-8xl font-normal [text-shadow:0px_3px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_4px_0px_rgb(0_0_0/1.00)] z-10">
                50K+
              </div>
              
              {/* Glow Behind Image */}
              <div className="w-72 md:w-96 h-72 md:h-96 left-6 md:left-8 top-18 md:top-24 absolute">
                <GlowAnimation />
              </div>
              
              {/* Main Image */}
              <div className="w-60 md:w-80 h-60 md:h-80 z-1 relative">
                <GoldStorage1Image />
              </div>
            </div>

            {/* Bottom Info Box */}
            <div className="w-[344px] md:w-[458px] px-4 md:px-6 py-3 md:py-4 bg-[#c6661c] inline-flex justify-center items-center gap-2 md:gap-3 overflow-hidden rounded-b-lg">
              <div className="flex-1 text-stroke-h5 text-center justify-start text-white text-base md:text-xl font-normal leading-5 md:leading-6 [text-shadow:0px_1.5px_0px_rgb(0_0_0/1.00)] md:[text-shadow:0px_2px_0px_rgb(0_0_0/1.00)]">
                Win prizes worth up to ₹50,000 and
                <br /> take home exciting goodies.
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
}