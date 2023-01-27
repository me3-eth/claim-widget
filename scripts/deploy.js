#!/usr/bin/env node

import { join, resolve } from 'node:path'
import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import dotenv from 'dotenv'
import { getFilesFromPath, Web3Storage } from 'web3.storage'
import * as Name from 'w3name'

dotenv.config()

const { WEB3STORAGE_API_KEY } = process.env
const PROJECT_NAME = 'me3-claim-widget'

async function main (commit, buildPath) {
  const files = await getFilesFromPath(resolve(buildPath))

  const name = `${PROJECT_NAME}_${buildPath}-${commit}`
  console.log(`Uploading to ${name}`)

  const web3Client = new Web3Storage({ token: WEB3STORAGE_API_KEY })
  const cid = await web3Client.put(files, {
    name,
    wrapWithDirectory: false
  })
  console.log(`Application CID is ${cid}`)

  const key = await readFile('.w3name.private.key')
  const ipns = await Name.from(key)
  const address = `/ipfs/${cid}`

  let nextRev
  try {
    const currentRev = await Name.resolve(ipns)
    nextRev = await Name.increment(currentRev, address)
    console.log(`Incremented to ${nextRev}`)
  } catch (err) {
    assert.match(err.toString(), /record not found for key/)
    nextRev = await Name.v0(ipns, address)
    console.log(`First rev is ${nextRev}`)
  }

  await Name.publish(nextRev, ipns.key)

  return ipns.toString()
}

main(...process.argv.slice(2))
  .then(published => {
    if (!published) console.log('Deployment finished but not published')
    else console.log('Deployment finished', { published })
  })
  .catch(err => {
    console.error({ err })
    process.exit(1)
  })
