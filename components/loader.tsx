import Image from "next/image"

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-4 h-4 relative animate-spin">
        <Image
          alt="Logo"
          src="/logo.png"
          fill
        />
      </div>
    </div>
  );
};