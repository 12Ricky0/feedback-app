"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Back({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <div
      onClick={router.back}
      className={`${className}mx-6 md:mx-0 mt-[35px] md:mt-0 cursor-pointer`}
    >
      <Image
        alt="ar-left"
        src="/assets/shared/icon-arrow-left.svg"
        className="inline-block mr-4"
        width={8}
        height={8}
      />

      <span
        className={`${className} font-bold text-[13px] md:text-[14px] text-secondary-light-blue`}
      >
        Go Back
      </span>
    </div>
  );
}
