'use client';
import BrochureButton from "../ui/BrochureButton";
import InnerveNavbarLogo from "../ui/HackHorizonNavbarlogo";
import NavigationBar from "../ui/NavigationBar";
import ArkaJainLogo from "../ui/ArkaJainLogo";

export default function Navbar() {

  return (
    <nav className="absolute z-50 top-0 w-full bg-transparent">
      <div className="flex justify-between items-center w-full p-3 px-4 sm:p-4 sm:px-6 md:p-5 md:px-8 lg:px-14">
        
        
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6"> 
         
          <div className="transform scale-90 sm:scale-100 origin-left flex items-center gap-2 sm:gap-4 md:gap-6">
             <InnerveNavbarLogo />
             <ArkaJainLogo />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <NavigationBar />
          
       
          <div className="hidden md:block">
            <BrochureButton />
          </div>
        </div>

      </div>
    </nav>
  );
}