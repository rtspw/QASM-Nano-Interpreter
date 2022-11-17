import * as fs from 'fs'
import * as path from 'path'

import QASMRuntime from './qasm-runtime'

const fileArg = process.argv?.[2] ?? ''
const filename = path.join(__dirname, '../', fileArg)
const runtime = new QASMRuntime()

try {
  console.log(runtime.executeFromFile(filename).toString())
} catch (err: any) {
  if (err.code === 'ENOENT') {
    console.error(`File '${filename}' does not exist`)
  } else {
    throw err
  }
}
