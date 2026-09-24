AnimeCross Finder v6
=====================

NEW
- Automatic anime banner artwork from AniList.
- Cover-art fallback when a banner is unavailable.
- Mobile-friendly cards and search.
- Search box keeps focus while typing.
- Redirect sound on provider links.
- No JustWatch or Google detour.
- Exact title links are marked DIRECT.
- Other provider buttons are marked SEARCH and do not claim availability.
- Static GitHub Pages compatible: no server, npm, or API key.

DEPLOY
Replace your existing index.html and redirect.wav in the GitHub repository, then commit.
GitHub Pages should redeploy automatically.

LIMITATION
A static site cannot securely verify live country-specific streaming rights across every provider.
This version therefore avoids pretending that a generic provider search is confirmed availability.
