/**
 * SEO Component
 *
 * Manages meta tags for SEO using react-helmet-async
 * Supports CMS-driven meta data with smart fallbacks
 */

import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export default function SEO({
  title,
  description,
  ogImage,
  ogImageAlt,
  keywords = [],
  noIndex = false,
  canonicalUrl,
}) {
  // Default SEO values
  const defaultTitle = "McKenna's Cleaning Services | Medina County";
  const defaultDescription =
    'Professional cleaning services in Medina County. Residential, commercial, window cleaning, and electrostatic disinfectant spraying.';
  const siteUrl = window.location.origin;

  // Use provided values or fallback to defaults
  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const canonical = canonicalUrl || window.location.href;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />

      {/* Keywords */}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Robots directive */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:alt" content={ogImageAlt || metaTitle} />
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      {ogImage && (
        <>
          <meta property="twitter:image" content={ogImage} />
          <meta property="twitter:image:alt" content={ogImageAlt || metaTitle} />
        </>
      )}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ogImage: PropTypes.string,
  ogImageAlt: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  noIndex: PropTypes.bool,
  canonicalUrl: PropTypes.string,
};
