import Image from "next/image";

export default function FeedbackContainer() {
  return (
    <section className="bg-white mx-6 text-[13px] mt-4 rounded-lg">
      <article className="p-6">
        <h1 className="text-secondary-dark-gray font-bold">
          Add tags for solutions
        </h1>
        <p className="my-2 text-secondary-light-blue">
          Easier to search for solutions based on a specific stack.
        </p>
        <span className="bg-secondary-very-gray px-4 rounded-lg text-primary-light-blue text-[13px] font-semibold">
          Enhancement
        </span>
        <div className="flex justify-between mt-4 items-center">
          <div className="bg-secondary-very-gray rounded-lg w-[69px] h-8 inline-flex items-center justify-center ">
            <Image
              alt="down"
              src="/assets/shared/icon-arrow-up.svg"
              className="inline-block mr-2"
              width={8}
              height={4}
            />

            <span className="font-bold">112</span>
          </div>
          <div className="">
            <Image
              alt="down"
              src="/assets/shared/icon-comments.svg"
              className="inline-block mr-2"
              width={18}
              height={16}
            />
            <span className="font-bold ">2</span>
          </div>
        </div>
      </article>
    </section>
  );
}
