import { getCollection, render, type CollectionEntry } from "astro:content";

export async function getProfile() {
  const profiles = await getCollection("profile");
  const profile = profiles[0];
  if (!profile) {
    throw new Error("Add a profile entry in src/content/profile/");
  }
  return profile;
}

function byOrderDesc<T extends { data: { order: number } }>(items: T[]) {
  return [...items].sort((a, b) => b.data.order - a.data.order);
}

export async function getSiteData() {
  const profile = await getProfile();
  const [writing, music, research] = await Promise.all([
    getCollection("writing"),
    getCollection("music"),
    getCollection("research"),
  ]);

  const papers = research.filter((item) => item.data.kind !== "intro");
  const intro = research.find((item) => item.data.kind === "intro");

  return {
    profile,
    writing: byOrderDesc(writing),
    music: byOrderDesc(music),
    research: byOrderDesc(papers),
    researchIntro: intro ? await render(intro) : null,
    socials: socialsFrom(profile.data),
  };
}

export async function renderProfile() {
  const profile = await getProfile();
  return render(profile);
}

export type Social = {
  href: string;
  label: string;
  icon: "twitter" | "github" | "linkedin" | "scholar" | "pen" | "instagram";
};

function socialsFrom(data: CollectionEntry<"profile">["data"]): Social[] {
  const links: Social[] = [
    { href: data.twitter, label: "Twitter/X", icon: "twitter" },
    { href: data.github, label: "GitHub", icon: "github" },
    { href: data.linkedin, label: "LinkedIn", icon: "linkedin" },
  ];

  if (data.scholar) {
    links.push({ href: data.scholar, label: "Google Scholar", icon: "scholar" });
  }

  links.push({ href: data.substack, label: "Substack", icon: "pen" });

  if (data.instagram) {
    links.push({ href: data.instagram, label: "Instagram", icon: "instagram" });
  }

  return links;
}
