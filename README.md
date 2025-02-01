# Wigo Monitoring Browser Extension

This is the browser extension for [Wigo](https://github.com/root-gg/wigo). Wigo, aka "What Is Going On" is a light pull/push monitoring tool written in Golang.

## Features

- Monitor multiple Wigo instances from your browser
- Get instant notifications when issues occur
- Quick overview of your infrastructure status
- Works with both Firefox and Chrome browsers

## Installation

### Chrome

Download from the [Chrome Web Store](https://chromewebstore.google.com/detail/wigo-monitoring/eaoeankffafdpnhgnamdlifgaknjdcog)

### Firefox

Download from the [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/wigo-monitoring/)

## Development

### Building

Requirements:
- make
- zip
- jq

Build both Firefox and Chrome extensions:

```bash
make all
```

Files will be located in the `release` directory.
