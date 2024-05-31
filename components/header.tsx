import Image from "next/image";

export default function Header() {
  return (
    <nav className="bg-bg-header">
      <article className="flex justify-between mx-6 items-center ">
        <article className="py-4 ">
          <h1 className="font-bold text-white text-[15px]">Frontend Mentor</h1>
          <p className="font-medium text-[13px] text-white opacity-50">
            Feedback Board
          </p>
        </article>
        <Image
          alt="burger"
          src="/assets/shared/mobile/icon-hamburger.svg"
          className=""
          width={20}
          height={17}
        />
      </article>
    </nav>
  );
}
