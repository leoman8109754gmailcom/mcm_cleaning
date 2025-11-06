/**
 * Layer 1: CMS Client
 *
 * Handles all direct communication with Sanity CMS API.
 * Centralizes API configuration, authentication, and error handling.
 */

import { createClient } from '@sanity/client';

// Initialize Sanity client with environment variables
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "6q20c2o5",
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Use CDN for faster response times (set to false for real-time data)
  token: import.meta.env.SANITY_AUTH_TOKEN, // Optional: only needed for mutations
});

/**
 * Execute a GROQ query against Sanity
 * @param {string} query - GROQ query string
 * @param {object} params - Query parameters
 * @returns {Promise<any>} Query results
 */
export async function executeQuery(query, params = {}) {
  try {
    const result = await sanityClient.fetch(query, params);
    return result;
  } catch (error) {
    console.error('Sanity query error:', error);
    throw new Error(`Failed to fetch from Sanity: ${error.message}`);
  }
}

/**
 * Health check to verify Sanity connection
 * @returns {Promise<boolean>} Connection status
 */
export async function checkConnection() {
  try {
    await sanityClient.fetch(`*[_type == "sanity.imageAsset"][0]`);
    return true;
  } catch (error) {
    console.error('Sanity connection failed:', error);
    return false;
  }
}

export default sanityClient;
