import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './assets/brand-logo.png';
import StaggeredMenu from './components/StaggeredMenu';

export default function TopNav() {
  const location = useLocation();
  const pathname = location && location.pathname ? location.pathname : '/';

  // pages where the nav backdrop should be available
  const backdropPages = ['/', '/windowser', '/commercial-cleaning'];
  const applies = backdropPages.some(p => pathname === p || pathname.startsWith(p));

  // track mobile menu open so nav stays visible while menu is open
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // show/hide nav on scroll (hide on scroll down, show on scroll up)
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  React.useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY || window.pageYOffset;
      const isUp = currentY < lastScrollY.current;
      if (isMenuOpen) {
        setIsVisible(true);
      } else {
        setIsVisible(isUp || currentY < 10);
      }
      lastScrollY.current = Math.max(0, currentY);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen]);

  // when nav is visible and route applies, show the translucent backdrop; otherwise transparent
  const navClass = `fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${applies && isVisible ? 'nav-backdrop' : 'bg-transparent'}`;

  return (
    <nav className={navClass}>
      <div className="flex items-center">
        <Link to="/" aria-label="Go to home">
          <img src={Logo} alt="logo" className="h-14" />
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/about-us" className="text-[#17616E] hover:text-teal-700 transition-colors font-medium">About</Link>
        <Link to="/electrostatic-cleaning" className="text-[#17616E] hover:text-teal-700 transition-colors font-medium">Electrostatic Spraying</Link>
        <Link to="/residential-cleaning" className="text-[#17616E] hover:text-teal-700 transition-colors font-medium">Residential Cleaning</Link>
        <Link to="/commercial-cleaning" className="text-[#17616E] hover:text-teal-700 transition-colors font-medium">Commercial Cleaning</Link>
        <Link to="/windowser" className="text-[#17616E] hover:text-teal-700 transition-colors font-medium">Window Cleaning</Link>
        <a href="#contact" className="font-bayon inline-block bg-teal-700 text-[#EA892C] px-4 py-1 rounded-md hover:bg-teal-800 transition-colors font-medium tracking-wide text-lg">CONTACT</a>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <StaggeredMenu
          position="right"
          items={[
            { label: 'About', ariaLabel: 'About', link: '/about-us' },
            { label: 'Electrostatic Spraying', ariaLabel: 'Electrostatic Spraying', link: '/electrostatic-cleaning' },
            { label: 'Residential Cleaning', ariaLabel: 'Residential Cleaning', link: '/residential-cleaning' },
            { label: 'Commercial Cleaning', ariaLabel: 'Commercial Cleaning', link: '/commercial-cleaning' },
            { label: 'Window Cleaning', ariaLabel: 'Window Cleaning', link: '/windowser' },
            { label: 'CONTACT', ariaLabel: 'Contact', link: '#contact' }
          ]}
          socialItems={[
            { label: 'Twitter', link: 'https://twitter.com' },
            { label: 'GitHub', link: 'https://github.com' },
            { label: 'LinkedIn', link: 'https://linkedin.com' }
          ]}
          displaySocials={false}
          displayItemNumbering={false}
          menuButtonColor="#17616E"
          openMenuButtonColor="#17616E"
          changeMenuColorOnOpen={true}
          logoUrl={Logo}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
        />
      </div>
    </nav>
  );
}
