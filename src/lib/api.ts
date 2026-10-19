import {
  Certificate,
  Experience,
  PortfolioData,
  Project,
  Skill,
} from "@/types/portfolio";
import { mockPortfolioData } from "./mock-data";

const GLIO_API_URL = process.env.GLIO_API_URL || "https://api.glio.example.com";
const GLIO_API_KEY = process.env.GLIO_API_KEY;
const SEJATIDIMEDIA_API_URL =
  process.env.SEJATIDIMEDIA_API_URL || "https://api.sejatidimedia.com";

interface FetchOptions {
  timeoutMs?: number;
}

async function fetchWithTimeout(url: string, options: RequestInit & FetchOptions = {}) {
  const { timeoutMs = 8000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchFromGlio<T>(endpoint: string): Promise<T> {
  if (!GLIO_API_KEY) {
    throw new Error(
      `[Glio API] Missing GLIO_API_KEY. Required for build-time data synchronization.`
    );
  }

  const res = await fetchWithTimeout(`${GLIO_API_URL}${endpoint}`, {
    headers: {
      "x-api-key": GLIO_API_KEY,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(
      `[Glio API] Request failed for ${endpoint}: ${res.status} ${res.statusText}`
    );
  }

  return (await res.json()) as T;
}

async function fetchFeaturedFromSejatiDimedia(): Promise<Project[] | null> {
  try {
    const res = await fetchWithTimeout(
      `${SEJATIDIMEDIA_API_URL}/api/public/featured-projects`,
      {
        headers: { Accept: "application/json" },
      }
    );
    if (!res.ok) {
      console.warn(
        `[SejatiDimedia API] Returned status ${res.status}. Falling back to Glio featured projects.`
      );
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || null;
  } catch (err) {
    console.warn(
      `[SejatiDimedia API] Fetch failed (${(err as Error).message}). Falling back to Glio featured projects.`
    );
    return null;
  }
}

/**
 * Merges SejatiDimedia featured projects with comprehensive Glio project data.
 * Glio data overwrites/enriches projects matching the same slug.
 */
function mergeFeaturedProjects(
  sejatiFeatured: Project[] | null,
  allGlioProjects: Project[]
): { featuredProjects: Project[]; otherProjects: Project[] } {
  const glioMap = new Map<string, Project>();
  allGlioProjects.forEach((p) => glioMap.set(p.slug, p));

  let featuredList: Project[] = [];

  if (sejatiFeatured && sejatiFeatured.length > 0) {
    // Enrich SejatiDimedia featured with Glio project details
    featuredList = sejatiFeatured.slice(0, 6).map((sejatiProject) => {
      const glioProject = glioMap.get(sejatiProject.slug);
      if (glioProject) {
        return {
          ...sejatiProject,
          ...glioProject,
          isFeatured: true,
        };
      }
      return {
        ...sejatiProject,
        isFeatured: true,
      };
    });
  }

  // Fallback: If SejatiDimedia had no results or failed, take first 6 from Glio
  if (featuredList.length === 0) {
    const sorted = [...allGlioProjects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    featuredList = sorted.slice(0, 6).map((p) => ({ ...p, isFeatured: true }));
  }

  const featuredSlugs = new Set(featuredList.map((p) => p.slug));
  const otherProjects = allGlioProjects
    .filter((p) => !featuredSlugs.has(p.slug))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  return { featuredProjects: featuredList, otherProjects };
}

/**
 * Fetches all portfolio data for static page generation at build time.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const isCI = Boolean(process.env.CI);
  const hasKey = Boolean(GLIO_API_KEY);

  // If in CI and GLIO_API_KEY is missing, fail fast as specified in PRD (Criteria #6)
  if (isCI && !hasKey) {
    throw new Error(
      "[CI Build Failure] GLIO_API_KEY is missing in CI environment. Aborting build to preserve existing site."
    );
  }

  // If local development without API key or in test mode, return high-fidelity mock data
  if (!hasKey) {
    console.info(
      "[Info] No GLIO_API_KEY found in local environment. Using high-fidelity mock data for Timur Dian Radha Sejati."
    );
    return mockPortfolioData;
  }

  try {
    const [experiences, certificates, skills, allProjects, sejatiFeatured] =
      await Promise.all([
        fetchFromGlio<Experience[]>("/api/public/experiences"),
        fetchFromGlio<Certificate[]>("/api/public/certificates"),
        fetchFromGlio<Skill[]>("/api/public/skills"),
        fetchFromGlio<Project[]>("/api/public/projects"),
        fetchFeaturedFromSejatiDimedia(),
      ]);

    const { featuredProjects, otherProjects } = mergeFeaturedProjects(
      sejatiFeatured,
      allProjects
    );

    return {
      profile: mockPortfolioData.profile,
      featuredProjects,
      otherProjects,
      experiences: [...experiences].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
      skills: [...skills].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
      certificates: [...certificates].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
    };
  } catch (error) {
    if (isCI) {
      console.error("[CI Build Failure] Error fetching content from Glio:", error);
      throw error;
    }

    console.warn(
      `[Warning] Failed to fetch live Glio data (${(error as Error).message}). Falling back to mock data.`
    );
    return mockPortfolioData;
  }
}
