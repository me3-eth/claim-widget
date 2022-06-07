let global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global) ||
  {};    

function parseRequest (input, options) {
  let result = {}
  if (typeof input === 'object') {
    result.method = options.method || input.method || 'GET'
    result.url = input.url
    result.body = options.body || input.body || null
  } else {
    result.method = options.method || 'GET'
    result.url = input
    result.body = options.body || null
  }

  return result
}

async function createResponse (url, status, body) {
  let responseBody = body
  if (body instanceof Promise) {
    responseBody = await body
  }

  return {
    url,
    status,
    ok: ((status / 100) | 0) === 2,
    json: () => Promise.resolve(responseBody)
  }
}

export default async function init (mocks) {
  const _mocks = mocks

  global.realFetch = global.fetch
  global.fetch = mockFetch

  function mockFetch (input, options) {
    const request = parseRequest(input, options);
    const { url, method } = request;
    const matched = _mocks.find(m => m.url === url && m.method === method)

    if (matched) {
      const { response, status} = matched;
      return new Promise((resolve) => {
        if (typeof response === 'function') {
          resolve(createResponse(url, status, response(request)));
        } else {
          resolve(createResponse(url, status, response));
        }
      })
    }
    // eslint-disable-next-line no-restricted-globals
    return global.realFetch(input, options);
  }
}
