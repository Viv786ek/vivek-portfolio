import { certifications, education, experience, faq, person, site, skillGroups } from "@/data/profile";

/** Person + ProfilePage + WebSite + FAQ structured data for rich results. */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: person.name,
        alternateName: "Vivek Srivastava",
        url: site.url,
        image: `${site.url}${person.photo}`,
        email: `mailto:${person.email}`,
        jobTitle: "AI Engineer",
        description: site.description,
        worksFor: { "@type": "Organization", name: experience[0].company },
        alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
        knowsAbout: skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
        knowsLanguage: ["en", "hi"],
        hasCredential: certifications.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          name: c.name,
          recognizedBy: { "@type": "Organization", name: c.issuer },
        })),
        sameAs: Object.values(person.socials),
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: site.title,
        mainEntity: { "@id": `${site.url}/#person` },
        inLanguage: "en",
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
