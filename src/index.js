'use strict'
const glob = require('glob')
const prependFile = require('prepend-file')
const pkg = require(`${process.cwd()}/package.json`)

function banner (options) {
	options = options || {}
	options.name = options.name || pkg.name || 'unknown'
	options.tag = options.tag || pkg.version || '0.0.0'
	options.homepage = options.homepage || pkg.homepage || `https://npm.com/${options.name}`
	options.license = options.license || pkg.license
	options.author = options.author || pkg.author.split('<')[0].trim() || ''
	options.year = options.year || new Date().getFullYear()

	const template = options.template || `/*!
 * ${options.name.charAt(0).toUpperCase() + options.name.slice(1)} v${options.tag}
 * ${options.homepage}
 *
 * Copyright (c) ${options.year} ${options.author}
 *${options.license ? ` Licensed under the ${options.license} license\n *` : ''}/\n
`

	if (!options.source) throw new Error(`File not found!`)

	const files = glob.sync(options.source)
	files.map(file => prependFile.sync(file, template))
}

module.exports = banner
