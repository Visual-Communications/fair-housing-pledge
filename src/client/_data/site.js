const site = {
  title: 'Fair Housing Pledge',
  description: 'Take the pledge to stand up for fair housing.',
  company: 'Anywhere Real Estate Inc',
  lang: 'en-US',
  year: new Date().getFullYear(),
  timestamp: new Date(),
  pwa: false,
  colors: {
    primary: '#2e3191'
  }
}

site.copyright = `&copy; ${site.year} ${site.company}. All rights reserved.`

module.exports = site
