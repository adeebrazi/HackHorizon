import Image from 'next/image';
import planks from '@/assets/images/WoodPlanks.png';
import sponsorCard from '@/assets/svg/SponsorCard.svg';
// import udchalo from '@/assets/images/UdChalo.png' // TODO: Add UdChalo.png to assets
import backgroundImage from '@/assets/images/SponsorsBackground.png'
import headingEnds from '@/assets/svg/SponsorHeadingEnds.svg'
// import ethIndiaImage from '@/assets/svg/ETHIndiaLogo.png' // TODO: Add ETHIndiaLogo.png to assets
import codeComputeSociety from '@/assets/images/CodeComputeSociety.png';
// import keychainlogo from '@/assets/svg/keyChainLogo.svg'; // TODO: Add keyChainLogo.svg to assets
// import keplologo from "@/assets/images/keploLogo.png" // TODO: Add keploLogo.png to assets
// import givemycertificate from "@/assets/images/givemycertficateLogo.png"; // TODO: Add givemycertficateLogo.png to assets

export function Planks() {
  return (
    <div className="overflow-hidden">
      <Image
        src={planks}
        alt="planks"
        className="min-w-max md:h-30 h-18"
        draggable={false}
      />  
    </div>
  );
}

export function SponsorCardBorder() {
  return (
    <div >
      <Image src={sponsorCard} alt="sponsor card" draggable={false}/>
    </div>
  );
}

// TODO: Uncomment when UdChalo.png is added
// export function UdchaloImage() {
//   return (
//     <div className='max-w-[220px]'>
//       <Image src={udchalo} alt="sponsor card" draggable={false}/>
//     </div>
//   );
// }

export function BackgroundImage() {
  return (
    <div className='overflow-hidden'>
      <Image className="min-w-max h-auto w-screen" src={backgroundImage} alt="sponsor card" draggable={false}/>
    </div>
  );
}

export function HeadingEndLeft() {
  return (
    <div>
      <Image src={headingEnds} alt="sponsor card" draggable={false}/>
    </div>
  );
}

export function HeadingEndRight() {
  return (
    <div className='scale-x-[-1]'>
      <Image src={headingEnds} alt="sponsor card" draggable={false}/>
    </div>
  );
}



// TODO: Uncomment when ETHIndiaLogo.png is added
// export function ETHIndiaImage() {
//   return (
//     <div className='max-w-[85%]'>
//       <Image src={ethIndiaImage} alt="ETHIndia Sponsor" draggable={false}/>
//     </div>
//   );
// }


// TODO: Uncomment when keyChainLogo.svg is added
// export function Keychainlogo() {
//   return (
//     <div className='max-w-[80%]'>
//       <Image src={keychainlogo} alt="ETHIndia Sponsor" draggable={false} className='scale-140' />
//     </div>
//   );
// }

// TODO: Uncomment when keploLogo.png is added
// export function Keplologo() {
//   return (
//     <div className='max-w-[80%]'>
//       <Image src={keplologo} alt="ETHIndia Sponsor" draggable={false}/>
//     </div>
//   );
// }

export function CodeCraftersLogo() {
  return (
    <div className='max-w-[80%]'>
      <Image src={codeComputeSociety} alt="ETHIndia Sponsor" draggable={false}/>
    </div>
  );
}

// TODO: Uncomment when givemycertficateLogo.png is added
// export function Givemycertificate() {
//   return (
//     <div className='max-w-[76%]'>
//       <Image src={givemycertificate} alt="ETHIndia Sponsor" draggable={false} className='scale-130' />
//     </div>
//   );
// }