import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

// Lightweight StaggeredMenu replacement with a page overlay and a slide-in panel.
export default function StaggeredMenu({
  position = 'right',
  items = [],
  socialItems = [],
  displaySocials = false,
  displayItemNumbering = false,
  menuButtonColor = '#17616E',
  openMenuButtonColor = '#17616E',
  changeMenuColorOnOpen = false,
  logoUrl = '',
  onMenuOpen = () => {},
  onMenuClose = () => {},
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) onMenuOpen(); else onMenuClose();
  }, [open]);

  const portalRoot = typeof document !== 'undefined' ? document.body : null;

  // overlay + panel markup to portal so it escapes any stacking context on the page
  const overlayAndPanel = (
    <>
      {/* page overlay */}
      {open && (
        <div
          role="presentation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50"
          style={{ zIndex: 99980 }}
        />
      )}

      {/* slide-in panel */}
      <div
        role="dialog"
        aria-hidden={!open}
        className={`fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} h-full w-full sm:w-[420px] bg-[#FFEBD0] text-[#EA892C] transform transition-transform duration-300 ${open ? 'translate-x-0' : position === 'right' ? 'translate-x-full' : '-translate-x-full'}`}
        style={{ zIndex: 99990 }}
      >
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            {logoUrl && (
              <div className="mb-6">
                <img src={logoUrl} alt="logo" className="h-10" />
              </div>
            )}

            <nav className="flex flex-col gap-6">
              {/* Home link for easy navigation */}
              <Link to="/" aria-label="Home" className="text-2xl font-bayon font-light hover:opacity-80" onClick={() => setOpen(false)}>
                Home
              </Link>

              {items.map((it, idx) => {
                const isInternal = typeof it.link === 'string' && it.link.startsWith('/');
                const content = (
                  <>
                    {displayItemNumbering ? `${String(idx + 1).padStart(2, '0')} ` : ''}
                    {it.label}
                  </>
                );

                return isInternal ? (
                  <Link key={idx} to={it.link} aria-label={it.ariaLabel} className="text-2xl font-bayon font-light hover:opacity-80" onClick={() => setOpen(false)}>
                    {content}
                  </Link>
                ) : (
                  <a key={idx} href={it.link} aria-label={it.ariaLabel} className="text-2xl font-bayon font-light hover:opacity-80" onClick={() => setOpen(false)}>
                    {content}
                  </a>
                );
              })}
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
    </>
  );

  // button markup moved into the portal so it isn't affected by transformed ancestors
  const buttonElement = (
    <button
      aria-label={open ? 'Close menu' : 'Open menu'}
      onClick={() => setOpen(v => !v)}
      className="md:hidden flex items-center justify-center w-11 h-11"
      style={{
        position: 'fixed',
        top: 8,
        right: 8,
        zIndex: 100000,
        background: 'transparent',
        border: 'none',
        padding: 6,
        // prefer a high-contrast close icon when menu is open unless a custom open color is requested
        color: open ? (changeMenuColorOnOpen ? openMenuButtonColor : '#FFFFFF') : menuButtonColor,
      }}
    >
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
  );

  return (
    <div className="staggered-menu-root">
      {/* portal the overlay + panel and the hamburger button so they escape stacking contexts */}
      {portalRoot ? createPortal(
        <>
          {buttonElement}
          {overlayAndPanel}
        </>,
        portalRoot
      ) : (
        <>
          {buttonElement}
          {overlayAndPanel}
        </>
      )}
    </div>
  );
}
