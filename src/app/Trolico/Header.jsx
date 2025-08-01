'use client';
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Header = () => {
  const menuRef = useRef(null);
  const desktopItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/About' },
    { name: 'Works', href: '/Works' },
    { name: 'Contact', href: '/Contact' }
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/yourprofile',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          viewBox="0 0 24 24"
          
        >
          <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775a4.932 4.932 0 002.163-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.379 4.482A13.94 13.94 0 011.671 3.149a4.916 4.916 0 001.523 6.56 4.897 4.897 0 01-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.923 4.923 0 004.6 3.417A9.867 9.867 0 010 19.54 13.9 13.9 0 007.548 22c9.142 0 14.307-7.721 13.995-14.646a9.936 9.936 0 002.411-2.325z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yourprofile',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          viewBox="0 0 24 24"
          
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11.667 20h-3.333v-9h3.333v9zm-1.667-10.167c-1.067 0-1.933-.867-1.933-1.933s.867-1.933 1.933-1.933c1.067 0 1.933.867 1.933 1.933s-.867 1.933-1.933 1.933zm13.334 10.167h-3.334v-4.833c0-1.15-.02-2.633-1.6-2.633-1.6 0-1.845 1.25-1.845 2.543v4.923h-3.334v-9h3.2v1.23h.045c.445-.843 1.53-1.732 3.15-1.732 3.369 0 3.993 2.219 3.993 5.102v4.4z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/yourprofile',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          viewBox="0 0 24 24"
          
        >
          <path d="M7.75 2h8.5c3.18 0 5.75 2.57 5.75 5.75v8.5c0 3.18-2.57 5.75-5.75 5.75h-8.5c-3.18 0-5.75-2.57-5.75-5.75v-8.5c0-3.18 2.57-5.75 5.75-5.75zm0 2c-2.06 0-3.75 1.69-3.75 3.75v8.5c0 2.06 1.69 3.75 3.75 3.75h8.5c2.06 0 3.75-1.69 3.75-3.75v-8.5c0-2.06-1.69-3.75-3.75-3.75h-8.5zm8.25 2.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm-4.25 1a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zm0 2a2.75 2.75 0 110 5.5 2.75 2.75 0 010-5.5z" />
        </svg>
      ),
    },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Animate header slide down on mount
  useEffect(() => {
    gsap.fromTo(
      menuRef.current,
      { yPercent: -150 },
      { yPercent: 0, duration: 0.6, ease: "power2.out",delay: 7 }
    );
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", pointerEvents: "auto" }
      );
      // Animate each mobile menu item staggered (including social links)
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll("a > span"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.1 }
      );
    } else if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        autoAlpha: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  // Add refs for desktop menu items for hover effect
useEffect(() => {
  desktopItemsRef.current.forEach((el) => {
    if (!el) return;

    const spans = el.querySelectorAll("span");
    const topSpan = spans[0];
    const bottomSpan = spans[1];

    // Initial setup
    gsap.set(bottomSpan, { yPercent: 100 }); // bottom span hidden below

    const hoverIn = () => {
      gsap.to(topSpan, { yPercent: -100, duration: 0.3, ease: "power2.out" });
      gsap.to(bottomSpan, { yPercent: 0, duration: 0.3, ease: "power2.out" });
    };

    const hoverOut = () => {
      gsap.to(topSpan, { yPercent: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(bottomSpan, { yPercent: 100, duration: 0.3, ease: "power2.out" });
    };

    el.addEventListener("mouseenter", hoverIn);
    el.addEventListener("mouseleave", hoverOut);

    return () => {
      el.removeEventListener("mouseenter", hoverIn);
      el.removeEventListener("mouseleave", hoverOut);
    };
  });
}, []);


  return (
    <header className="w-full z-10 fixed top-0  flex items-start font-Inter font-bold ">
      <div
        ref={menuRef}
        className="relative right-0 w-full flex flex-col lg:flex-row justify-between text-black lg:py-3 lg:px-8 transition-all duration-300"
      >
        <div>
          <span className="uppercase hidden lg:block cursor-pointer">TRELLIO</span>
        </div>
        {/* Desktop Menu Items */}
<nav className="hidden lg:flex gap-6 items-center">
  {menuItems.map(({ name, href }, index) => (
    <Link key={name} href={href} >

        {/* Main Text */}
        <span
          ref={(el) => (desktopItemsRef.current[index] = el)}
          className="block transition-transform duration-300 group-hover:-translate-y-full"
        >
          {name}
        </span>


    </Link>
  ))}
</nav>


        {/* Mobile Menu Toggle */}
        <div
          className="lg:hidden absolute top-2 right-6 z-20 cursor-pointer"
          onClick={toggleMenu}
        >
          <span className="underline text-lg">{isOpen ? "close" : "menu"}</span>
        </div>
                <div
          className="lg:hidden absolute top-2 left-6 z-20 cursor-pointer" >
          <span className="uppercase text-lg">TRELLIO</span>
        </div>

        {/* Mobile Menu Content */}
        <div
          ref={mobileMenuRef}
          className={`flex bg-white flex-col relative w-screen  justify-center items-center h-screen lg:hidden space-y-6 pointer-events-none opacity-0`}
        >
          {/* Menu Items */}
          {menuItems.map(({ name, href }, index) => (
            <Link key={name} href={href} onClick={toggleMenu}>
              <span className="uppercase text-2xl underline flex items-center gap-2 cursor-pointer">
                <span className="ml-2 text-xl">0{index + 1}</span> {name}
              </span>
            </Link>
          ))}

          {/* Social Links */}
          <div className="flex gap-8 mt-10">
            {socialLinks.map(({ name, href, svg }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-black hover:text-gray-600 transition"
              >
                {svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;