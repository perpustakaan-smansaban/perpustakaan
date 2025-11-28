// api/gas.js
const DEFAULT_GAS_URL = process.env.GAS_URL || "https://script.google.com/macros/s/AKfycbwv-A0W_FZCfqxrVAAuISfbwAXgefmJsk2C0xJRHAVWkK9BGgpSHbeJVw8MRty7dvDm6Q/exec";

export default async function handler(req, res) {
  try {
    const qs = req.url.split('?')[1] || '';
    const target = qs ? `${DEFAULT_GAS_URL}?${qs}` : DEFAULT_GAS_URL;

    // read raw body for non-GET
    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', c => data += c);
        req.on('end', () => resolve(data));
        req.on('error', e => reject(e));
      });
    }

    const forwardHeaders = { ...req.headers };
    delete forwardHeaders.host;

    const resp = await fetch(target, {
      method: req.method,
      headers: forwardHeaders,
      body: body || undefined,
    });

    // copy basic headers
    const contentType = resp.headers.get('content-type');
    if (contentType) res.setHeader('Content-Type', contentType);
    const cache = resp.headers.get('cache-control');
    if (cache) res.setHeader('Cache-Control', cache);

    const text = await resp.text();
    res.status(resp.status).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: String(err) });
  }
}
