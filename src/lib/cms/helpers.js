/**
 * Layer 3: Helper Functions
 *
 * Provides convenient, reusable functions and React Query hooks
 * that abstract CMS interactions from components.
 */

import { useQuery } from '@tanstack/react-query';
import imageUrlBuilder from '@sanity/image-url';
import { executeQuery, sanityClient } from './client';
import { queries } from './queries';

/**
 * Initialize Sanity image URL builder
 */
const builder = imageUrlBuilder(sanityClient);

/**
 * Generate optimized image URL from Sanity image reference
 * @param {object} source - Sanity image reference
 * @param {object} options - Image options (width, height, quality, format)
 * @returns {string} Optimized image URL
 */
export function getImageUrl(source, options = {}) {
  if (!source) return '';

  let imageBuilder = builder.image(source);

  if (options.width) imageBuilder = imageBuilder.width(options.width);
  if (options.height) imageBuilder = imageBuilder.height(options.height);
  if (options.quality) imageBuilder = imageBuilder.quality(options.quality);
  if (options.format) imageBuilder = imageBuilder.format(options.format);
  if (options.fit) imageBuilder = imageBuilder.fit(options.fit);

  return imageBuilder.url();
}

/**
 * Generic content fetcher
 * @param {string} queryKey - Key from queries object
 * @returns {Promise<any>} Transformed data
 */
export async function getContent(queryKey) {
  const queryConfig = queries[queryKey];

  if (!queryConfig) {
    throw new Error(`Query "${queryKey}" not found in queries module`);
  }

  const { query, reformat } = queryConfig;
  const rawData = await executeQuery(query);

  return reformat(rawData);
}

/**
 * React Query hook for site settings
 * @returns {object} React Query result with site settings
 */
export function useSiteSettings() {
  return useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => getContent('siteSettings'),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
}

/**
 * React Query hook for navigation
 * @returns {object} React Query result with navigation data
 */
export function useNavigation() {
  return useQuery({
    queryKey: ['navigation'],
    queryFn: () => getContent('navigation'),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
}

/**
 * React Query hook for social links
 * @returns {object} React Query result with social links
 */
export function useSocialLinks() {
  return useQuery({
    queryKey: ['socialLinks'],
    queryFn: () => getContent('socialLinks'),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
}

/**
 * Combined hook for all global data (useful for pages that need everything)
 * @returns {object} Object with all global data queries
 */
export function useGlobalData() {
  const siteSettings = useSiteSettings();
  const navigation = useNavigation();
  const socialLinks = useSocialLinks();

  return {
    siteSettings,
    navigation,
    socialLinks,
    isLoading: siteSettings.isLoading || navigation.isLoading || socialLinks.isLoading,
    isError: siteSettings.isError || navigation.isError || socialLinks.isError,
    error: siteSettings.error || navigation.error || socialLinks.error,
  };
}
