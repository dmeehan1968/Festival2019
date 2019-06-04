export const get = (req, res) => {
  res.type('text/plain')
  res.send(
`Sitemap: # All robots allowed
User-agent: *
Disallow: /map
Disallow: /favourites

# Sitemap files
Sitemap: ${req.protocol || 'http'}://${req.headers.host}/sitemap.xml
`
)
}
