import Image from "next/image"
import shieldLogo from "../../assets/svg/shield.png"

export default function HackHorizonNavbarLogo() {
    return ( 
        <Image 
            src={shieldLogo}
            alt="Innerve Logo" 
            width={56}
            height={56}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" 
            draggable={false}
        />
    )
}
