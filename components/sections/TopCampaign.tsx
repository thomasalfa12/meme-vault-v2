"use client";

import { useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

const campaigns = [
  { name: "Meme Rocket", img: "/campaigns/meme-rocket.jpg" },
  { name: "Pepe World", img: "/campaigns/pepe-world.jpg" },
  { name: "Shiba Universe", img: "/campaigns/shiba-universe.jpg" },
  { name: "Cat Coin", img: "/campaigns/cat-coin.jpg" },
  { name: "Fomo Inu", img: "/campaigns/fomo-inu.jpg" },
  { name: "Doggy Party", img: "/campaigns/doggy-party.jpg" },
  { name: "Elon Pepe", img: "/campaigns/elon-pepe.jpg" },
  { name: "Moon Shiba", img: "/campaigns/moon-shiba.jpg" },
  { name: "Space Cat", img: "/campaigns/space-cat.jpg" },
  { name: "Lambo Memes", img: "/campaigns/lambo-memes.jpg" },
];

export default function TopCampaigns() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;

    const move = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
      animationId = requestAnimationFrame(move);
    };

    animationId = requestAnimationFrame(move);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-[#0D1B3E] via-[#0D1B3E] to-[#070707] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold animate-fade-in">
          🔥 Top Meme Campaigns
        </h2>
      </div>

      <div
        ref={containerRef}
        className="flex space-x-8 w-full overflow-hidden"
        style={{
          whiteSpace: "nowrap",
        }}
      >
        {[...campaigns, ...campaigns].map((campaign, idx) => (
          <div key={idx} className="flex-shrink-0">
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              transitionSpeed={800}
              scale={1.02}
              gyroscope={true}
              glareEnable={true}
              glareMaxOpacity={0.2}
              className="bg-gradient-to-br from-blue-700 via-purple-800 to-black rounded-2xl overflow-hidden shadow-xl min-w-[300px] hover:scale-105 transition-transform duration-500"
            >
              <Image
                src={campaign.img}
                alt={campaign.name}
                width={300}
                height={200}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{campaign.name}</h3>
              </div>
            </Tilt>
          </div>
        ))}
      </div>
    </section>
  );
}
