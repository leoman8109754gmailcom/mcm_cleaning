import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './assets/brand-logo.png';
import StaggeredMenu from './components/StaggeredMenu';
import { useSiteSettings, useNavigation, useSocialLinks } from './lib/cms/helpers';
import LoadingSpinner, { LoadingSkeleton } from './components/LoadingSpinner';

export default function TopNav() {
  const location = useLocation();
  const pathname = location && location.pathname ? location.pathname : '/';

  // Fetch CMS data
  const { data: siteSettings, isLoading: settingsLoading, error: settingsError } = useSiteSettings();
  const { data: navigation, isLoading: navLoading, error: navError } = useNavigation();
  const { data: socialLinks, isLoading: socialsLoading, error: socialsError } = useSocialLinks();

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

  // Prepare navigation items (use CMS data if available, fallback to hardcoded)
  // Filter out disabled items
  const navItems = navigation?.mainNav?.filter(item => !item.disabled) || [
    { label: 'About', href: '/about-us' },
    { label: 'Electrostatic Spraying', href: '/electrostatic-cleaning' },
    { label: 'Residential Cleaning', href: '/residential-cleaning' },
    { label: 'Commercial Cleaning', href: '/commercial-cleaning' },
    { label: 'Window Cleaning', href: '/windowser' },
  ];

  // Prepare social links (use CMS data if available)
  const socialItems = [];
  if (socialLinks?.displaySocials) {
    if (socialLinks.facebook) socialItems.push({ label: 'Facebook', link: socialLinks.facebook });
    if (socialLinks.instagram) socialItems.push({ label: 'Instagram', link: socialLinks.instagram });
    if (socialLinks.twitter) socialItems.push({ label: 'Twitter', link: socialLinks.twitter });
    if (socialLinks.linkedin) socialItems.push({ label: 'LinkedIn', link: socialLinks.linkedin });
  }

  // Use CMS logo if available, fallback to local logo
  const logoUrl = siteSettings?.logo?.url || Logo;
  const logoAlt = siteSettings?.logo?.alt || 'logo';

  // when nav is visible and route applies, show the translucent backdrop; otherwise transparent
  const navClass = `fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${applies && isVisible ? 'nav-backdrop' : 'bg-transparent'}`;

  // Show loading state while fetching CMS data
  if (settingsLoading || navLoading) {
    return (
      <nav className={navClass}>
        <div className="flex items-center">
          <LoadingSkeleton width="3.5rem" height="3.5rem" />
        </div>
        <div className="hidden md:flex items-center gap-8">
          <LoadingSkeleton width="4rem" height="1.5rem" />
          <LoadingSkeleton width="6rem" height="1.5rem" />
          <LoadingSkeleton width="6rem" height="1.5rem" />
        </div>
      </nav>
    );
  }

  // If there's an error, fall back to hardcoded values (silent failure)
  if (settingsError || navError) {
    console.error('Error loading navigation data:', settingsError || navError);
  }

  return (
    <nav className={navClass}>
      <div className="flex items-center">
        <Link to="/" aria-label="Go to home">
          <img src={logoUrl} alt={logoAlt} className="h-14" />
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item, index) => (
          <Link
            key={item.key || index}
            to={item.href}
            className="text-[#17616E] hover:text-teal-700 transition-colors font-medium"
          >
            {item.label}
          </Link>
        ))}
        <a href="#contact" className="font-bayon inline-block bg-teal-700 text-[#EA892C] px-4 py-1 rounded-md hover:bg-teal-800 transition-colors font-medium tracking-wide text-lg">CONTACT</a>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <StaggeredMenu
          position="right"
          items={[
            ...navItems.map(item => ({
              label: item.label,
              ariaLabel: item.label,
              link: item.href
            })),
            { label: 'CONTACT', ariaLabel: 'Contact', link: '#contact' }
          ]}
          socialItems={socialItems}
          displaySocials={socialLinks?.displaySocials ?? false}
          menuButtonColor="#17616E"
          openMenuButtonColor="#17616E"
          changeMenuColorOnOpen={true}
          logoUrl={logoUrl}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
        />
      </div>
    </nav>
  );
}
