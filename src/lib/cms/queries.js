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
 * Query for hero section
 */
export const heroQuery = {
  query: `*[_type == "hero"][0] {
    _id,
    title,
    description,
    ctaText,
    ctaLink,
    carouselImages[] {
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
      alt,
      caption
    },
    carouselInterval
  }`,
  reformat: (data) => {
    if (!data) return null;

    return {
      id: data._id,
      title: data.title || "MCKENNA'S CLEANING SERVICES",
      description: data.description || '',
      ctaText: data.ctaText || 'CONTACT',
      ctaLink: data.ctaLink || '#contact',
      carouselImages: (data.carouselImages || []).map((img) => ({
        url: img.asset?.url,
        alt: img.alt || 'Hero image',
        caption: img.caption || '',
        width: img.asset?.metadata?.dimensions?.width,
        height: img.asset?.metadata?.dimensions?.height,
      })),
      carouselInterval: data.carouselInterval || 3,
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
 * Query for window service
 */
export const windowServiceQuery = {
  query: `*[_type == "windowService"][0] {
    _id,
    pageTitle,
    description,
    gallery[] {
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
      alt,
      caption
    },
    carouselInterval
  }`,
  reformat: (data) => {
    if (!data) return null;

    return {
      id: data._id,
      pageTitle: data.pageTitle || 'Window Cleaning Services',
      description: data.description || '',
      gallery: (data.gallery || []).map((img) => ({
        url: img.asset?.url,
        alt: img.alt || 'Window cleaning image',
        caption: img.caption || '',
        width: img.asset?.metadata?.dimensions?.width,
        height: img.asset?.metadata?.dimensions?.height,
      })),
      carouselInterval: data.carouselInterval || 3,
    };
  },
};

/**
 * Query for commercial service
 */
export const commercialServiceQuery = {
  query: `*[_type == "commercialService"][0] {
    _id,
    pageTitle,
    description,
    gallery[] {
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
      alt,
      caption
    },
    carouselInterval
  }`,
  reformat: (data) => {
    if (!data) return null;

    return {
      id: data._id,
      pageTitle: data.pageTitle || 'Commercial Cleaning Services',
      description: data.description || '',
      gallery: (data.gallery || []).map((img) => ({
        url: img.asset?.url,
        alt: img.alt || 'Commercial cleaning image',
        caption: img.caption || '',
        width: img.asset?.metadata?.dimensions?.width,
        height: img.asset?.metadata?.dimensions?.height,
      })),
      carouselInterval: data.carouselInterval || 3,
    };
  },
};

/**
 * Query for residential service
 */
export const residentialServiceQuery = {
  query: `*[_type == "residentialService"][0] {
    _id,
    pageTitle,
    description,
    gallery[] {
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
      alt,
      caption
    },
    carouselInterval
  }`,
  reformat: (data) => {
    if (!data) return null;

    return {
      id: data._id,
      pageTitle: data.pageTitle || 'Residential Cleaning Services',
      description: data.description || '',
      gallery: (data.gallery || []).map((img) => ({
        url: img.asset?.url,
        alt: img.alt || 'Residential cleaning image',
        caption: img.caption || '',
        width: img.asset?.metadata?.dimensions?.width,
        height: img.asset?.metadata?.dimensions?.height,
      })),
      carouselInterval: data.carouselInterval || 3,
    };
  },
};

/**
 * Query for electrostatic service
 */
export const electrostaticServiceQuery = {
  query: `*[_type == "electrostaticService"][0] {
    _id,
    pageTitle,
    description,
    gallery[] {
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
      alt,
      caption
    },
    carouselInterval
  }`,
  reformat: (data) => {
    if (!data) return null;

    return {
      id: data._id,
      pageTitle: data.pageTitle || 'Electrostatic Cleaning Services',
      description: data.description || '',
      gallery: (data.gallery || []).map((img) => ({
        url: img.asset?.url,
        alt: img.alt || 'Electrostatic cleaning image',
        caption: img.caption || '',
        width: img.asset?.metadata?.dimensions?.width,
        height: img.asset?.metadata?.dimensions?.height,
      })),
      carouselInterval: data.carouselInterval || 3,
    };
  },
};

/**
 * Query for About Us page
 */
export const aboutUsQuery = {
  query: `*[_type == "aboutUs"][0] {
    _id,
    pageTitle,
    heroImage {
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
    companyStatement,
    experienceStatement,
    whatWeDoTitle,
    whatWeDoContent,
    ourServicesTitle,
    ourServicesContent,
    gallery[] {
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
    carouselInterval
  }`,
  reformat: (data) => {
    if (!data) return null;

    return {
      id: data._id,
      pageTitle: data.pageTitle || 'ABOUT US.',
      heroImage: data.heroImage?.asset?.url || null,
      heroImageAlt: data.heroImage?.alt || 'About McKenna\'s Cleaning',
      companyStatement: data.companyStatement || 'McKenna\'s Cleaning is a company with the clear purpose of leaving your windows, houses, and offices SPOTLESS.',
      experienceStatement: data.experienceStatement || 'With years of experience that guarantees we can offer you the best service.',
      whatWeDoTitle: data.whatWeDoTitle || 'What We Do?',
      whatWeDoContent: data.whatWeDoContent || 'We are a cleaning company established in _____ prepared to tackle your cleaning needs',
      ourServicesTitle: data.ourServicesTitle || 'Our Services?',
      ourServicesContent: data.ourServicesContent || 'We offer Residential, Commercial, and Window Cleaning plus Electrostatic Disinfectant Spraying',
      gallery: (data.gallery || []).map((img) => ({
        url: img.asset?.url,
        alt: img.alt || 'Gallery image',
        width: img.asset?.metadata?.dimensions?.width,
        height: img.asset?.metadata?.dimensions?.height,
      })),
      carouselInterval: data.carouselInterval || 4,
    };
  },
};

/**
 * Query for testimonials
 */
export const testimonialsQuery = {
  query: `*[_type == "testimonial" && disabled != true] | order(displayOrder asc, _createdAt desc) {
    _id,
    customerName,
    reviewText,
    rating,
    reviewDate,
    customerPhoto {
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
    role,
    displayOrder
  }`,
  reformat: (data) => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((testimonial) => ({
      id: testimonial._id,
      customerName: testimonial.customerName || 'Anonymous',
      text: testimonial.reviewText || '',
      rating: testimonial.rating || 5,
      date: testimonial.reviewDate || null,
      photo: testimonial.customerPhoto?.asset?.url || null,
      photoAlt: testimonial.customerPhoto?.alt || testimonial.customerName || 'Customer',
      role: testimonial.role || '',
      displayOrder: testimonial.displayOrder || 100,
    }));
  },
};

/**
 * Export all queries as a single object for easy access
 */
export const queries = {
  siteSettings: siteSettingsQuery,
  navigation: navigationQuery,
  socialLinks: socialLinksQuery,
  hero: heroQuery,
  windowService: windowServiceQuery,
  commercialService: commercialServiceQuery,
  residentialService: residentialServiceQuery,
  electrostaticService: electrostaticServiceQuery,
  testimonials: testimonialsQuery,
  aboutUs: aboutUsQuery,
};

export default queries;
