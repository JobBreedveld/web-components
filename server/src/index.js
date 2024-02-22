import http from 'http'
import fs from 'fs'

if (process.env.NODE_ENV !== 'production') {
  import('dotenv')
    .then((dotenv) => {
      dotenv.config({ path: './server/.env' })
    })
    .catch((err) => {
      throw new Error('Error loading .env file', err)
    })
}

const makeGetHtmlPage = () => {
  const html = fs.readFileSync('client/public/index.html', 'utf8')

  const getHtmlPage = () => {
    return html
  }

  return { getHtmlPage }
}

const { getHtmlPage } = makeGetHtmlPage()

const mimeTypes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  ico: 'image/x-icon',
}

http
  .createServer((req, res) => {
    if (req.url.indexOf('/public/') !== -1 || req.url.indexOf('/src/') !== -1) {
      let urlParts = req.url.split('/').filter(Boolean)

      if (process.env.NODE_ENV === 'development') {
        urlParts = ['client', ...urlParts]
      }

      const file = fs.readFileSync(urlParts.join('/'), 'utf8')

      const mimeType = urlParts[urlParts.length - 1].split('.')[1]

      res.writeHead(200, { 'Content-Type': mimeTypes[mimeType] })
      res.end(file)
    } else if (req.url.indexOf('/api') !== -1) {
      // return api routes
    } else {
      // return frontend
      const html = getHtmlPage()
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(html)
    }
  })
  .listen(process.env.PORT || 3000)
