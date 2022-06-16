import test from 'ava'
import { mock } from '@depay/web3-mock'
import { readFile } from 'fs/promises'
import { claim } from '../src/lib/protocol.js'

async function getAbi (contract = 'Registrar') {
  const file = await readFile(new URL(`./${contract}.json`, import.meta.url))
  return JSON.parse(file)
}

test('should throw when there is no provider', async (t) => {
  return t.throwsAsync(claim('me3.eth', 'charchar'))
})

test('claim a subdomain', async (t) => {
  const registrar = await getAbi()

  let registerMock = mock({
    blockchain: 'ethereum',
    transaction: {
      to: '0x9f2daf90c4323b529c31a40520a5fa63eb601b84',
      api: registrar.abi,
      method: 'register',
      params: ['0x868437061435f35898f8ed7fb95d62ca53b460f0bb9d1c6be3bfd796e38d8636', 'charchar', '0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc', []]
    },
    accounts: { return: ['0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc'] }
  })

  await claim('me3.eth', 'charchar', { provider: global.ethereum })
  t.true(registerMock.calls.count() >= 1)
})
