Before launch
-------------

- TODO: header/main/footer layout breaks
  - TODO: ToolBar - too far down on mobile
  - TODO: ScrollToTop


- TODO: pm2 not running on VPS restart
  - cd /home/replicated/beta.10parishesfestival.org.uk && /home/replicated/.nvm/versions/node/v11.9.0/bin/npx pm2 start ./ecosystem.config.js --env production

- TODO: NavBar - responsive spacing/sizing of title/left/right (title trunc on mobile)
- TODO: webpack dotenv - is it necessary, because its baked in
- TODO: Google Analytics
- TODO: package.json - version and repository field
- TODO: image caching, is no client caching sensible, max-age?
- TODO: Move 2019 admin to own domain
- TODO: Move beta to 2019

Outstanding
-------------

- TODO: favicon.ico not found (produces 200 response)
- TODO: styled-components - add SSR stylesheet, createGlobalStyles, remove base.less
- TODO: styled-components - production output to CSS?
- TODO: manifest.json gets deleted on watched build, not written
- TODO: webpack - package size exceeds guidelines for production build
- TODO: webpack - code split to remove mapbox and react-map-gl from initial bundle
- TODO: Jest testing
- TODO: GitGuardian - Google API key in git history
- TODO: Carousel - pause/prev/next
- TODO: Carousel - lazy loading
- TODO: Carousel - Circular loop
- TODO: Carousel - dots/thumbnails
- TODO: Images - Server performance
- TODO: Images - no image supplied SVG placeholder
- TODO: Images - loading spinner/progress
- TODO: Images - prevent stretch for small images in all contexts
- TODO: Image Middleware - group sizes by breakpoint
- TODO: FontAwesome - render client only
- TODO: TabBar - make hit area larger
- TODO: Map - InfoWindow formatting
- TODO: Map - InfoWindow links to events
- TOOD: Map - Check bottom margin (might need height 100%)
- TODO: Event Page - Heading Styling
- TODO: Event Page - multi-column on wide screen
- TODO: Event Grid - Filter panel (also restore resultText in FilteredEventList)
- TODO: Event Grid - Fav indicator should have tooltip
- TODO: NavBar - responsive search/filter dropdown
- TODO: Scroll restoration - save offset on tab change, restore on back button on returning to grid
- TODO: Font Size - check responsive sizing
- TODO: Favourites - debounce/fade out on deselection
- TODO: White background
- TODO: Cookie Notice?
- TODO: Admin - self registration?
- TODO: serialize sync - is it needed?
- TODO: URLs - redirect old to new style
- TODO: .htaccess - enable redirect to force HTTPS
