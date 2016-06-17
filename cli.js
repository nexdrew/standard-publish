#!/usr/bin/env node

const path = require('path')
const requireInject = require('require-inject')
const execa = require('execa')
const np = requireInject.withEmptyCache('np', {
  execa: {
    sync: function (cmd, args, opts) {
      if (cmd === 'npm' && args[0] === 'version') {
        cmd = path.join(__dirname, 'node_modules', '.bin', 'standard-version')
        args = process.argv.slice(2) // TODO needs better CLI support
      }
      return execa.sync(cmd, args, opts)
    }
  }
})

try {
  np()
} catch (err) {
  console.error(process.platform === 'win32' ? '×' : '✖', err.message)
  process.exit(1)
}
