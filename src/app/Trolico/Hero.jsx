'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(Flip, SplitText, CustomEase);

export default function Hero() {
  const wordRef = useRef(null);
  const videoRef = useRef(null);
  const heroH1Ref = useRef(null);
const heroH2Ref = useRef(null);

  const words = ['Innovate', 'Create', 'Design', 'Build', 'Deliver'];

useEffect(() => {
  const textTl = gsap.timeline();
  const videoTl = gsap.timeline({ paused: true });
  const heroTl = gsap.timeline({ paused: true });
  const mainTl = gsap.timeline();

  words.forEach((word) => {
    const wordTimeline = gsap.timeline();

    wordTimeline.call(() => {
      if (wordRef.current) {
        wordRef.current.innerText = word;
      }
    });

    wordTimeline.fromTo(
      wordRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );

    wordTimeline.to(wordRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      delay: 0.5,
      ease: "power2.in",
    });

    textTl.add(wordTimeline);
  });

  // FLIP animation
  textTl.call(() => {
    const videoEl = document.querySelector('.main');
    const videoContainer = document.querySelector('.images');
    const state = Flip.getState(videoEl);

    videoContainer.classList.add('video-preview');
    videoRef.current.appendChild(videoEl);

    gsap.set(videoEl, { clearProps: 'all' });

    videoTl.add(
      Flip.from(state, {
        duration: 2,
        ease: "power3.inOut",
        absolute: true,
      })
    );

    videoTl.play();
  });

  // Hero heading animation
heroTl.fromTo(
  heroH2Ref.current,
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
);

heroTl.fromTo(
  heroH1Ref.current,
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
  "-=0.4" // slightly overlap with h2 fade-in
);


  videoTl.eventCallback("onComplete", () => {
    heroTl.play();
  });

  mainTl.add(textTl).add(videoTl);
}, []);


  return (
    <section className="w-screen h-screen relative overflow-hidden">
      {/* Text Content */}
      <div className="w-full h-full flex flex-col lg:mt-0 mt-20 lg:justify-center py-3 px-4 md:pl-16 lg:mb-0 mb-7">
        <h2  ref={heroH2Ref} className="text-xl lg:text-2xl font-poppinsIta py-2">
          Diesel Fuel, solutions delivered 
        </h2>

        <h1
          ref={heroH1Ref}
          className="relative z-10 opacity-0 text-[2.5rem] md:text-[5rem] leading-tight md:leading-none font-Lora font-extrabold"
        >
          DEF, Diesel Fuel <br />
          solutions delivered <br /> Anywhere
        </h1>
      </div>

      {/* Final Video Container */}
      <div
        ref={videoRef}
        className="video-preview absolute md:top-[35%] bottom-4 right-4 w-[90%] md:w-[700px] h-auto md:h-[800px] -z-2"
      ></div>

      {/* Fullscreen Intro Loader */}
      <div className="fixed top-0 left-0 w-full h-full z-40 images">
        <div className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-60">
          <h1 ref={wordRef} className="text-2xl font-extrabold">
            {words[0]}
          </h1>
        </div>

        <video
          src="/videos/Trolico.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover rounded-lg shadow-xl video main"
        />
      </div>
    </section>
  );
}
