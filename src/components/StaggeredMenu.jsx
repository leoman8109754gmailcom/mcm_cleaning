import React from 'react';

// Lightweight StaggeredMenu replacement. It accepts the props from your snippet
// and renders a simple slide-in panel from the right. This is not a full GSAP
// staggered animation version, but it's accessible and easy to extend.

export default function StaggeredMenu({
  position = 'right',
  items = [],
  socialItems = [],
  displaySocials = false,
  displayItemNumbering = false,
  menuButtonColor = '#17616E',
  openMenuButtonColor = '#17616E',
  changeMenuColorOnOpen = false,
  colors = [],
  logoUrl = '',
  accentColor = '#ff6b6b',
  onMenuOpen = () => {},
  onMenuClose = () => {},
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) onMenuOpen(); else onMenuClose();
  }, [open]);

  return (
    <div className="staggered-menu-root">
      {/* explicit top-right hamburger button (mobile-only) */}
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(v => !v)}
        className="md:hidden"
        style={{
          position: 'fixed',
          top: 8,
          right: 8,
          zIndex: 99999,
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          padding: 6,
          color: open && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor,
        }}
      >
        {/* SVG hamburger / close icon */}
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div
        role="dialog"
        aria-hidden={!open}
        className={`fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} h-full w-full sm:w-[420px] bg-[#111] text-[#EA892C] transform transition-transform duration-300 ${open ? 'translate-x-0' : position === 'right' ? 'translate-x-full' : '-translate-x-full'}`}
        style={{ zIndex: 60 }}
      >
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            {logoUrl && (
              <div className="mb-6">
                <img src={logoUrl} alt="logo" className="h-10" />
              </div>
            )}

            <nav className="flex flex-col gap-6">
              {items.map((it, idx) => (
                <a key={idx} href={it.link} aria-label={it.ariaLabel} className="text-2xl font-bold hover:opacity-80" onClick={() => setOpen(false)}>
                  {displayItemNumbering ? `${String(idx + 1).padStart(2, '0')} ` : ''}
                  {it.label}
                </a>
              ))}
            </nav>
          </div>

          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="pt-6 border-t border-white/10">
              <div className="flex gap-4 mt-4">
                {socialItems.map((s, i) => (
                  <a key={i} href={s.link} className="text-sm text-[#17616E] hover:text-white">{s.label}</a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
