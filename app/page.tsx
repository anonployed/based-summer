"use client";

import Image from "next/image";
// import MintButton from "/workspaces/based-summer/public/components/MintButton"; // Commented out

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#344afb] relative">
      <div className="absolute top-0 right-0 w-1/6 h-1/6 overflow-hidden">
        <Image
          className="objectContain"
          src="/img/gm.svg"
          alt="gm Logo"
          fill
          priority
        />
      </div>
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <div className="absolute top-24 w-full flex justify-center items-center">
        </div>
        <div className="flex items-center justify-center mt-12 relative">
          <Image
            className="w-80 h-80"
            src="/img/bulmita.png"
            alt="Left Image"
            width={320}
            height={320}
            priority
          />
          <Image
            className="w-80 h-80"
            src="/img/vgtbase.png"
            alt="Right Image"
            width={320}
            height={320}
            priority
          />
          <button className="click-me-button absolute bottom-12">CLICK ME</button> {/* Adjusted position */}
        </div>
      </div>
      <div className="absolute bottom-0 w-full overflow-hidden">
        <div className="my-8 flex w-full overflow-hidden whitespace-nowrap text-2xl uppercase text-white">
          <div className="inline-block marquee flex flex-row items-center whitespace-nowrap">
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(254, 224, 2)' }}></div>BᗩᔑEᗪ ᔑᑌᗰᗰEᖇ
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(255, 141, 207)' }}></div>higher.
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(254, 224, 2)' }}></div>send it
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(255, 141, 207)' }}></div>it's time to build
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(254, 224, 2)' }}></div>WE ARE SO BACK
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(255, 141, 207)' }}></div>OᑎᑕᕼᗩIᑎ ᔑᑌᗰᗰEᖇ
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(254, 224, 2)' }}></div>⌐◨-◨
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(255, 141, 207)' }}></div>GM 🎩
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(254, 224, 2)' }}></div>get me in lil degen
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(255, 141, 207)' }}></div>points, points, points
            {/* Repeat as needed */}
            {/* Duplicate the content to create a seamless loop */}
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(254, 224, 2)' }}></div>BᗩᔑEᗪ ᔑᑌᗰᗰEᖇ
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(255, 141, 207)' }}></div>higher.
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(254, 224, 2)' }}></div>send it
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(255, 141, 207)' }}></div>it's time to build
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(254, 224, 2)' }}></div>WE ARE SO BACK
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(255, 141, 207)' }}></div>OᑎᑕᕼᗩIᑎ ᔑᑌᗰᗰEᖇ
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(254, 224, 2)' }}></div>⌐◨-◨
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(255, 141, 207)' }}></div>GM 🎩
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(254, 224, 2)' }}></div>get me in lil degen
            <div className="mx-4 h-4 w-4 rounded-full" style={{ background: 'rgb(255, 141, 207)' }}></div>points, points, points
          </div>
        </div>
      </div>
      <style jsx>{`
        .objectContain {
          object-fit: contain;
        }
        .marquee {
          animation: marquee 10s linear infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .click-me-button {
          background-color: rgba(255, 141, 207, var(--tw-bg-opacity)); /* Pink background with opacity variable */
          color: white;
          padding: 15px 30px;
          border: none;
          border-radius: 5px;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
          position: absolute;
          bottom: 12px; /* Adjusted to be higher */
        }
        .click-me-button:hover {
          background-color: rgba(255, 141, 207, calc(var(--tw-bg-opacity) - 0.1)); /* Darker pink on hover with adjusted opacity */
        }
      `}</style>
    </main>
  );
}
