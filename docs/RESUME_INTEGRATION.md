# Resume Integration Guide

The site has **two resume paths**:

| Path | What it is | When to use |
|---|---|---|
| `/resume` | Generated from `src/data/profile.ts`. Single-column, ATS-parsable, "Save as PDF" through the browser's print engine (selectable text, A4). | Always up to date with the site. Share this link. |
| `/Vivek_Kumar_Srivastava_Resume.pdf` | Your original AI Engineer resume, served as-is. | For portals that require an upload. |

> ⚠️ The original PDF includes your **phone number**. Once deployed it's public and crawlable. If you don't want that, replace the file with a version without the phone number, or remove it and point `person.resumePdf` to `/resume`.

## Updating

1. Edit `src/data/profile.ts`. The `/resume` page, site sections, JSON-LD and the AI assistant all update.
2. To replace the PDF, overwrite `public/Vivek_Kumar_Srivastava_Resume.pdf` with the same filename, or change `person.resumePdf`.

## Tailoring per country and role

- **EU (DE, CH, NL, LU):** keep it to 2 pages; add "EU Blue Card eligible" once confirmed; no photo needed on the PDF (expected in DE/CH, optional elsewhere).
- **UK / US:** no photo, no date of birth; 1–2 pages; lead with impact.
- **UAE:** a photo is common; state visa status and availability clearly.
- **Role lens:** for AI roles, lead with the RAG and LangGraph bullets; for frontend roles, lead with auth UX (+25%), performance (+30%) and the Polymer → React migration.

## ATS checklist (the `/resume` page already does this)

- Standard headings: Summary, Skills, Experience, Projects, Education, Certifications.
- No tables, columns, icons or images in the body.
- Keywords written out exactly ("Retrieval-Augmented Generation (RAG)", "Next.js", "FastAPI").
- Dates in a consistent `Mon YYYY — Mon YYYY` format.

## Linking

Add the portfolio URL in the resume header, the LinkedIn Featured section, the GitHub profile README and your email signature. The AI assistant gives recruiters a reason to click.
