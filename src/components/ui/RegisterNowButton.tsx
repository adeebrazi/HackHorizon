
import Image from "next/image";
import applyWDBG from '@/assets/webp/ApplyWDBG.webp';
import { useRouter } from "next/navigation";

export default function RegisterNowButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/registration");
  };
  return (
    <button
      onClick={handleClick}
      className="relative flex items-center justify-center px-8 py-3 text-2xl font-bold text-yellow-900 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
      style={{ background: 'none', border: 'none' }}
    >
      <Image
        src={applyWDBG}
        alt="Register Now Background"
        fill
        style={{ objectFit: "cover", borderRadius: "0.5rem", zIndex: 0 }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        draggable={false}
      />
      <span className="relative z-10" style={{ color: '#7A4B00', textShadow: '0 2px 4px #fff' }}>
        Register now
      </span>
    </button>
  );
}
