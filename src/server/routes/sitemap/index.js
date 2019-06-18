import React from 'react'
import ReactDOMServer from 'react-dom/server'

const Url = ({
  base,
  uri,
  lastmod = new Date(),
  changefreq,
  priority,
}) => {
  return (
    <url>
      <loc>{(new URL(uri, base)).toString()}</loc>
      <lastmod>{lastmod.toISOString()}</lastmod>
      <changefreq>{changefreq}</changefreq>
      {priority && <priority>{priority}</priority>}
    </url>
  )
}

export const get = (req, res) => {
  const db = req.app.get('db')

  return db.models.events.scope('sitemap').findAll().then(events => {

    res.type('text/xml')
    const urlsetProps = {
      xmlns:"http://www.sitemaps.org/schemas/sitemap/0.9",
      ['xmlns:xsi']:"http://www.w3.org/2001/XMLSchema-instance",
      ['xsi:schemalocation']:"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
    }
    const epoch = new Date(0)
    const base = `${req.protocol}://${req.headers.host}`
    const sitemap = (
      <urlset {...urlsetProps}>
        <Url
          base={base}
          uri="/"
          changefreq="daily"
          priority="0.8"
        />
        {events.map(event => {
          const lastmod = event.event_notes.reduce((acc, note) => note.created > acc ? note.created : acc, epoch)
          return (
            <Url
              key={event.id}
              base={base}
              uri={`events/${event.id}`}
              lastmod={lastmod.valueOf() > 0 && lastmod || undefined}
              changefreq="monthly"
              priority={0.8}
            />
          )
        })}
      </urlset>
    )
    const sitemapText = ReactDOMServer.renderToString(sitemap)
    res.send(`<?xml version="1.0" encoding="utf-8"?>${sitemapText}`)
  })
}
