# Lyft Node Starter Kit

Node-based starter kit for building an application with [Lyft's public API](https://www.lyft.com/developers).

### Installation (requires [node](https://nodejs.org))

```bash
git clone https://github.com/jordanpatton/lyft-node-starter-kit.git
cd lyft-node-starter-kit
npm install
node app.js
```

### Configuration

1. Sign up for a developer account at [lyft.com/developers](https://www.lyft.com/developers).
2. Update your [config](config/config.js) or add the following environment variables:
  - `CONFIG_LYFT_CLIENT_ID`
  - `CONFIG_LYFT_CLIENT_SECRET`
3. Stop your server (`Ctrl + C`) and restart it (`node app.js`).

### Usage

- Open [localhost](http://localhost:3000) in your favorite web browser.

### Resources

- [Lyft Developer Portal](https://www.lyft.com/developers)
- [Lyft Public API Documentation](https://developer.lyft.com/docs)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
- [Google Material Icons](https://design.google.com/icons/)

### Questions

**Q:** What do I do if I get `500 Internal Server Error`?

**A:** Stop your server (`Ctrl + C`) and restart it (`node app.js`). In your browser, [hard reload](https://en.wikipedia.org/wiki/Wikipedia:Bypass_your_cache).
