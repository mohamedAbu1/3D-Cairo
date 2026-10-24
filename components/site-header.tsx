"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

type IconProps = { size?: number; strokeWidth?: number };

function IconBase({ children, size = 21, strokeWidth = 1.8 }: IconProps & { children: React.ReactNode }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function SearchIcon(props: IconProps) { return <IconBase {...props}><circle cx="10.9" cy="10.9" r="6.9" /><path d="m16.2 16.2 4.4 4.4" /></IconBase>; }
function MenuIcon(props: IconProps) { return <IconBase {...props}><path d="M4 7h16M4 12h16M4 17h16" /></IconBase>; }
function CloseIcon(props: IconProps) { return <IconBase {...props}><path d="m6 6 12 12M18 6 6 18" /></IconBase>; }

const navLinks = [
  { label: "Home", href: "/", icon: "/nav-home-3d.png" },
  { label: "Trips", href: "/trips", icon: "/nav-trips-3d.png" },
  { label: "About", href: "/about", icon: "/nav-about-3d.png" },
  { label: "Contact", href: "/contact", icon: "/nav-contact-3d.png" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="nav-surface relative z-20 mx-auto flex items-center justify-between rounded-b-[22px] border-x border-b border-white/15 px-3 py-3 sm:px-4 sm:py-3.5 lg:px-5" id="top">
      <a href="/" className="brand-lockup group shrink-0 text-left leading-none" aria-label="Nilora home">
        <span className="flex items-center justify-start gap-2">
          <span className="brand-mark hidden lg:inline-flex" aria-hidden="true">N</span>
          <span className="font-display block text-[31px] tracking-[-0.05em] text-cream transition-colors duration-200 group-hover:text-[#ffe6b5] sm:text-[38px]">Nilora</span>
        </span>
        <span className="block -mt-1 text-[9px] tracking-[0.4em] text-cyan-100/80 sm:text-[10px]">≈≈≈</span>
        <span className="mt-1 block whitespace-nowrap text-[8px] tracking-[0.02em] text-white/60 sm:text-[10px]">Egypt — closer than you imagine</span>
      </a>

      <nav className="hidden items-center gap-1 text-sm text-white/75 md:flex lg:gap-2" aria-label="Primary navigation">
        {navLinks.map((link) => {
          const isCurrent = link.href === "/" ? pathname === "/" : pathname === link.href;
          return <a key={link.href} className={`nav-link ${isCurrent ? "nav-link-active" : ""}`} href={link.href} aria-current={isCurrent ? "page" : undefined}><img src={link.icon} alt="" className="nav-link-icon" /><span>{link.label}</span><span className="nav-link-dot" aria-hidden="true" /></a>;
        })}
      </nav>

      <div className="relative flex items-center gap-2.5">
        <a href="/#journey" className="nav-icon-button hidden sm:inline-flex" aria-label="Open search" title="Open search"><SearchIcon size={19} /></a>
        <button type="button" onClick={() => setMobileNavOpen((open) => !open)} className="nav-menu-button md:hidden" aria-label={mobileNavOpen ? "Close menu" : "Open menu"} aria-expanded={mobileNavOpen}>
          {mobileNavOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
        <button type="button" onClick={() => setProfileOpen((open) => !open)} className="profile-trigger" aria-label="Open Mo Abu profile" aria-expanded={profileOpen}>
          <span className="user-avatar" aria-hidden="true">MA</span>
          <span className="profile-trigger-copy"><strong>Mo Abu</strong><small>Traveler</small></span>
          <span className="profile-chevron" aria-hidden="true">⌄</span>
        </button>
        {profileOpen && (
          <div className="profile-menu" role="menu" aria-label="User profile menu">
            <div className="profile-menu-heading"><span className="user-avatar user-avatar-large" aria-hidden="true">MA</span><span><strong>Mo Abu</strong><small>Nilora traveler</small></span></div>
            <a href="/plan?destination=Cairo" role="menuitem" onClick={() => setProfileOpen(false)}>Build a journey <span>↗</span></a>
            <a href="/contact" role="menuitem" onClick={() => setProfileOpen(false)}>Talk to Nilora <span>↗</span></a>
          </div>
        )}
        {mobileNavOpen && (
          <nav className="mobile-nav absolute right-0 top-12 z-50 w-56 rounded-2xl p-2 md:hidden" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const isCurrent = link.href === "/" ? pathname === "/" : pathname === link.href;
              return <a key={link.href} href={link.href} onClick={() => setMobileNavOpen(false)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-white/10 hover:text-cream ${isCurrent ? "bg-white/10 text-cream" : "text-white/85"}`} aria-current={isCurrent ? "page" : undefined}><img src={link.icon} alt="" className="nav-link-icon" />{link.label}</a>;
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
