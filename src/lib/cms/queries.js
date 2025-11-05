/**
 * Layer 2: Queries Module
 *
 * Centralized location for all CMS queries and their transformation logic.
 * Each query object contains:
 * - query: The GROQ query string
 * - reformat: Function to transform raw CMS data into component-friendly format
 */

/**
 * Query for global site settings (singleton)
 */
export const siteSettingsQuery = {
  query: `*[_type == "siteSettings"][0] {
    _id,
    companyName,
    logo {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    phone,
    email,
    businessHours
  }`,
  reformat: (data) => {
    if (!data) return null;

    return {
      id: data._id,
      companyName: data.companyName || 'McKenna\'s Cleaning Services',
      logo: data.logo
        ? {
            url: data.logo.asset?.url,
            alt: data.logo.alt || data.companyName,
            width: data.logo.asset?.metadata?.dimensions?.width,
            height: data.logo.asset?.metadata?.dimensions?.height,
          }
        : null,
      phone: data.phone || '',
      email: data.email || '',
      businessHours: data.businessHours || '',
    };
  },
};

/**
 * Query for navigation structure
 */
export const navigationQuery = {
  query: `*[_type == "navigation"][0] {
    _id,
    mainNav[] {
      _key,
      label,
      href,
      isExternal,
      disabled
    }
  }`,
  reformat: (data) => {
    if (!data) return null;

    return {
      id: data._id,
      mainNav: (data.mainNav || []).map((item) => ({
        key: item._key,
        label: item.label,
        href: item.href,
        isExternal: item.isExternal || false,
        disabled: item.disabled || false,
      })),
    };
  },
};

/**
 * Query for social media links
 */
export const socialLinksQuery = {
  query: `*[_type == "socialLinks"][0] {
    _id,
    facebook,
    instagram,
    twitter,
    linkedin,
    displaySocials
  }`,
  reformat: (data) => {
    if (!data) return null;

    return {
      id: data._id,
      facebook: data.facebook || '',
      instagram: data.instagram || '',
      twitter: data.twitter || '',
      linkedin: data.linkedin || '',
      displaySocials: data.displaySocials ?? true,
    };
  },
};

/**
 * Export all queries as a single object for easy access
 */
export const queries = {
  siteSettings: siteSettingsQuery,
  navigation: navigationQuery,
  socialLinks: socialLinksQuery,
};

export default queries;
