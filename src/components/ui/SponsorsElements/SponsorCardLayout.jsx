import SponsorCard from './SponsorCard';
import { CodeCraftersLogo } from '@/components/ui/SponsorsElements/SponsorsImages';

const sponsors1 = [
  // { image: UdchaloImage, alt: 'Udchalo Sponsor' },
  // { image: Keychainlogo, alt: 'Sponsor 2' }, // TODO: Add keyChainLogo.svg
];

const sponsors2 = [
  // { image: ETHIndiaImage, alt: 'Sponsor 2' },
  // { image: UdchaloImage, alt: 'Sponsor 3' },
];

const sponsors3 = [
  // { image: ETHIndiaImage, alt: 'Udchalo Sponsor' }, // TODO: Add ETHIndiaLogo.png
  // { image: Givemycertificate, alt: 'Sponsor 2' }, // TODO: Add givemycertficateLogo.png
  // { image: Keplologo, alt: 'Sponsor 3' }, // TODO: Add keploLogo.png
  { image: CodeCraftersLogo, alt: 'Sponsor 4' },
];

const sponsors4 = [
  // { image: ETHIndiaImage, alt: 'Udchalo Sponsor' }, // TODO: Add ETHIndiaLogo.png
  // { image: UdchaloImage, alt: 'Sponsor 2' },
  // { image: UdchaloImage, alt: 'Sponsor 3' },
];

const sponsors5 = [
  // { image: UdchaloImage, alt: 'Sponsor 2' },
  // { image: UdchaloImage, alt: 'Sponsor 3' },
];

export function SponsorCardLayout1() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center items-center scale-50 sm:scale-75 lg:scale-100 mx-[10%]  -mt-12 sm:-mt-1 md:-mt-15 lg:-my-4 xl:my-0">
      {sponsors1.map((sponsor, idx) => (
        <div key={idx} className="w-full sm:w-1/2 lg:w-1/4 flex justify-center">
          <SponsorCard image={sponsor.image} alt={sponsor.alt} />
        </div>
      ))}
    </div>
  );
}

export function SponsorCardLayout2() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center items-center scale-50 sm:scale-75 lg:scale-100 mx-[10%] mb-2 -mt-10  sm:mt-2 md:-mt-10 lg:-my-4 xl:my-0">
      {sponsors2.map((sponsor, idx) => (
        <div key={idx} className="w-full sm:w-1/2 lg:w-1/4 flex justify-center">
          <SponsorCard image={sponsor.image} alt={sponsor.alt} />
        </div>
      ))}
    </div>
  );
}

export function SponsorCardLayout3() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center items-center scale-50 sm:scale-75 lg:scale-100 mx-[10%] -mt-42 -mb-42 sm:mb-0 sm:-mt-12 md:-mt-25 lg:-my-4 xl:my-0">
      {sponsors3.map((sponsor, idx) => (
        <div key={idx} className="w-full sm:w-1/2 lg:w-1/4 flex justify-center">
          <SponsorCard image={sponsor.image} alt={sponsor.alt} />
        </div>
      ))}
    </div>
  );
}

export function SponsorCardLayout4() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center items-center scale-50 sm:scale-75 lg:scale-100 mx-[10%] -my-25 sm:-mt-2 md:-mt-15 lg:-my-4 xl:my-0">
      {sponsors4.map((sponsor, idx) => (
        <div key={idx} className="w-full sm:w-1/2 lg:w-1/4 flex justify-center">
          <SponsorCard image={sponsor.image} alt={sponsor.alt} />
        </div>
      ))}
    </div>
  );
}
export function SponsorCardLayout5() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-10 justify-center items-start scale-50 sm:scale-75 lg:scale-100 mx-[10%] -my-5 lg:-my-4 xl:my-0">
      {sponsors5.map((sponsor, idx) => (
        <div key={idx} className="w-full sm:w-1/2 lg:w-1/4 flex justify-center">
          <SponsorCard image={sponsor.image} alt={sponsor.alt} />
        </div>
      ))}
    </div>
  );
}