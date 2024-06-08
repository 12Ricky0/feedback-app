import Image from "next/image";

export default function Upvotes({ vote }: { vote: number }) {
  return (
    <div className="bg-secondary-very-gray hover:bg-tetiary-hov cursor-pointer rounded-lg w-[69px] h-8 md:w-10 md:h-[53px] items-center md:flex-col justify-center hidden md:inline-flex">
      <Image
        alt="down"
        src="/assets/shared/icon-arrow-up.svg"
        className="inline-block mr-2 md:mr-0 md:mb-2"
        width={8}
        height={4}
      />

      <span className="font-bold">{vote}</span>
    </div>
  );
}
