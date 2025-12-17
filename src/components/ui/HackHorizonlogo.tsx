import Image from "next/image"
import LogoHeading from "../../assets/webp/heading1.png"


export default function HackHorizonHeadingLogo() {
    return ( 
        <div className="animate-float -ml-4 sm:-ml-6 md:-ml-8 lg:-ml-10">
            <Image src={LogoHeading} alt="Hack Horizon Logo" className="w-[90vw] sm:w-[85vw] md:w-[75vw] lg:w-[60vw] xl:w-[55vw] max-w-[1100px] h-auto relative z-40" draggable={false}/>
        </div>
    )
}