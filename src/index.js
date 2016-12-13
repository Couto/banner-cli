'use strict'

const fs = require('fs')
const path = require('path')
const prependFile = require('prepend-file')

function add (argv) {
  const info = require(`${process.cwd()}/package.json`)
  const name = info.name.charAt(0).toUpperCase() + info.name.slice(1) || 'Project name'
  const version = info.version || '0.0.0'
  const homepage = info.homepage || 'http://your-homepage.com'
  const license = info.license || 'your'
  const author = info.author.split('<')[0].trim() || 'Author name'
  const year = new Date().getFullYear()
  const banner = `/*!
 * ${name} v${version}
 * ${homepage}
 *
 * Copyright (c) ${year} ${author}
 * Licensed under the ${license} license
 */\n
`
  if (!fs.existsSync(path.dirname(argv[0]))) {
    console.log(`${argv[0]} Not found!`)
    process.exit(1)
  }

  argv.map(file => {
    if (path.extname(file) === path.extname(argv[0])) {
      prependFile(file, banner, (error) => {
        if (error) {
          console.log(`${file} Not found!`)
          process.exit(1)
        }
      })
    }
  })
}

exports.add = add