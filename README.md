# Coin Toss

A browser-based coin toss game built with PixiJS and TypeScript. Pick heads or tails, watch the coin spin, and see if you win.

## Launch

```bash
# Terminal 1 — API server (port 3000)
pnpm server

# Terminal 2 — dev client (port 8080)
pnpm dev
```

## Configuration

Artificial response latency can be adjusted in [server.js](server.js).

Client-side settings (viewport size, result display duration, etc...) live in [src/config.ts](src/config.ts).

## Architecture

The app follows an MVC structure with a finite state machine at its core. Game states (`Init`, `Idle`, `CoinFlight`, `Result`) are managed by `StateMachine`, which drives transitions and keeps `GameModel` as the single source of truth. Views are pure PixiJS display objects that react to state changes via a shared event bus (`mitt`). Coin animation is handled through Spine, and audio through Howler.
