'use client';
import Image from "next/image";
import TrackBgImg from "../assets/webp/tracks/TrackBgImg.png"
import TrackBgImgUpper from "../assets/webp/tracks/TrackBgImgUpper.webp"
import TrackCard from "@/components/ui/TracksElements/TrackCard";
import AgricultureImg from "../assets/svg/Traks/agriculture.svg"
import GovernanceImg from "../assets/svg/Traks/Governance.svg"
import CityImg from "../assets/svg/Traks/city.svg"
import CommunityImg from "../assets/svg/Traks/community.svg"
import HealthImg from "../assets/svg/Traks/health.svg"
import EnvironmentImg from "../assets/svg/Traks/environment.svg"
import BlueCornerImg from "../assets/svg/Traks/BlueCorner.svg"
import OrangeCornerImg from "../assets/svg/Traks/OrangeCornerImg.svg"
import PurpleCornerImg from "../assets/svg/Traks/PurpleCornerImg.svg"
import TrackButton from "@/components/ui/TracksElements/TrackButton";
import Galaxy from "@/components/ui/TracksElements/Glaxy";
import { useEffect, useState } from "react";

const TRACKS_CARDS_DATA = [
    {
        BgColor: "bg-[#2860BC]",
        BC1: "border-[#579BEC]",
        BC2: "border-[#FFBF64]",
        Logo: AgricultureImg,
        CornerImg: BlueCornerImg,
        Title: "Agriculture and Food"
    },
    {
        BgColor: "bg-[#E4630E]",
        BC1: "border-[#FFDC53]",
        BC2: "border-[#FBC3C1]",
        Logo: GovernanceImg,
        CornerImg: OrangeCornerImg,
        Title: "Governance and Civic Tech"
    },
    {
        BgColor: "bg-[#CA4CFA]",
        BC1: "border-[#E6ADFD]",
        BC2: "border-[#FFBF64]",
        Logo: CityImg,
        CornerImg: PurpleCornerImg,
        Title: "Cities and Infrastructure"
    },
    {
        BgColor: "bg-[#2860BC]",
        BC1: "border-[#579BEC]",
        BC2: "border-[#FFBF64]",
        Logo: CommunityImg,
        CornerImg: BlueCornerImg,
        Title: "Community and Social Impact"
    },
    {
        BgColor: "bg-[#E4630E]",
        BC1: "border-[#FFDC53]",
        BC2: "border-[#FBC3C1]",
        Logo: HealthImg,
        CornerImg: OrangeCornerImg,
        Title: "Health and Wellness"
    },
    {
        BgColor: "bg-[#CA4CFA]",
        BC1: "border-[#E6ADFD]",
        BC2: "border-[#FFBF64]",
        Logo: EnvironmentImg,
        CornerImg: PurpleCornerImg,
        Title: "Environment and Sustainability"
    },
    // {
    //     BgColor: "bg-[#2860BC]",
    //     BC1: "border-[#579BEC]",
    //     BC2: "border-[#FFBF64]",
    //     Logo: TrackBlockChain,
    //     CornerImg: BlueCornerImg,
    //     Title: "BlockChain"
    // },
    // {
    //     BgColor: "bg-[#E4630E]",
    //     BC1: "border-[#FFDC53]",
    //     BC2: "border-[#FBC3C1]",
    //     Logo: TrackLogistics,
    //     CornerImg: OrangeCornerImg,
    //     Title: "Logistics"
    // },
    // {
    //     BgColor: "bg-[#CA4CFA]",
    //     BC1: "border-[#E6ADFD]",
    //     BC2: "border-[#FFBF64]",
    //     Logo: DefenceLogo,
    //     CornerImg: PurpleCornerImg,
    //     Title: "Defence"
    // }
]

export default function TrackSection() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="relative w-full flex  flex-col items-center justify-center bg-[#010101] pt-26 px-10" >
            {/* <div className="absolute inset-0 bg-linear-to-b from-transparent via-black to-black/0 pointer-events-none z-10" /> */}
            <div className="absolute inset-0 z-0 w-full/2 h-[]">
                <Galaxy
                    mouseRepulsion={true}
                    mouseInteraction={!isMobile}
                    density={3}
                    glowIntensity={0.2}
                    saturation={0}
                    hueShift={240}
                />
            </div>
            <TrackButton />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[164px] z-10 md:gap-y-16 md:my-20">
                {TRACKS_CARDS_DATA.map((card, index) => (
                    <div key={index} className="flex flex-col items-center justify-center">
                        <TrackCard
                            BgColor={card.BgColor}
                            BC1={card.BC1}
                            BC2={card.BC2}
                            Logo={card.Logo}
                            CornerImg={card.CornerImg}
                            Title={card.Title}
                        />
                    </div>
                ))}
            </div>
            <div className="h-[50vh]"  />
            <div className="absolute w-full z-0 bottom-0 h-[90vh] ">
                <Image src={TrackBgImg} alt="background image" fill style={{ objectFit: 'cover' }} className="z-0" draggable={false} sizes="100vw" />
                <Image src={TrackBgImgUpper} alt="background image upper" fill style={{ objectFit: 'cover' }} className="z-10" draggable={false} sizes="100vw" />
                <div className="absolute inset-0 bg-linear-to-b from-black via-black/80 to-transparent " />
            </div>
        </section>
    )
}
