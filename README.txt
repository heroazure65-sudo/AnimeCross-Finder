AnimeCross Finder v3

- Google and JustWatch are removed from the user flow.
- Search happens inside AnimeCross.
- "Where to watch" opens direct official provider websites.
- Redirect sound is included.
- 300+ built-in anime titles remain.
- GitHub Pages compatible.

Important technical note:
A static GitHub Pages site cannot securely perform live, cross-provider availability
verification. This version therefore does not falsely claim a provider has a title;
it opens the provider directly with the title prefilled.

For a truly automatic version that returns only currently available providers,
AnimeCross needs a streaming-availability API/backend. Watchmode currently advertises
a free non-commercial developer plan with 2,500 monthly credits and up to 3 countries,
but it requires an API account/key and has attribution and usage requirements.
