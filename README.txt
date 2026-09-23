AnimeCross Finder v4
====================

Upload index.html and redirect.wav to the ROOT of your GitHub Pages repository.

This build intentionally does NOT send users through JustWatch and does NOT claim that a provider homepage is an anime page.

For a title with a verified direct page in the build, Watch opens that exact provider page.
For other titles, the site shows a provider-search button instead of inventing a dead direct URL.

Important limitation:
A static GitHub Pages site cannot securely query live cross-provider availability by itself.
A true automatic "search -> current country availability -> exact provider/episode link" version needs a server-side availability API.
Watchmode provides streaming sources, country availability and web links, but its free developer plan has limits and its API terms require parent/guardian approval for minors. Do not put an API key in index.html.
