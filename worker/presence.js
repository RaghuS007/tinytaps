/**
 * TinyTaps presence counter.
 * One global Durable Object counts open WebSockets = devices playing now.
 * Privacy: no IDs, no IPs, no storage. The only state is the set of live sockets.
 * WebSocket Hibernation keeps idle connections free-tier friendly.
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export class Presence {
  constructor(state) {
    this.state = state;
  }

  liveCount() {
    return this.state.getWebSockets().filter(ws => ws.readyState === 1).length;
  }

  broadcast() {
    const msg = JSON.stringify({ count: this.liveCount() });
    for (const ws of this.state.getWebSockets()) {
      try { ws.send(msg); } catch (e) { /* socket already gone */ }
    }
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (request.headers.get('Upgrade') === 'websocket') {
      const pair = new WebSocketPair();
      this.state.acceptWebSocket(pair[1]); // hibernation API
      this.broadcast();
      return new Response(null, { status: 101, webSocket: pair[0] });
    }

    if (url.pathname === '/count') {
      return new Response(JSON.stringify({ count: this.liveCount() }), {
        headers: { 'content-type': 'application/json', ...CORS },
      });
    }

    return new Response('TinyTaps presence: use /ws or /count', { headers: CORS });
  }

  webSocketMessage(ws) {
    // client keepalive ping -> reply with current count
    try { ws.send(JSON.stringify({ count: this.liveCount() })); } catch (e) {}
  }

  webSocketClose() { this.broadcast(); }
  webSocketError() { this.broadcast(); }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    const id = env.PRESENCE.idFromName('global');
    return env.PRESENCE.get(id).fetch(request);
  },
};
