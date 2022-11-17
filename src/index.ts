import * as path from 'path'
import yargs from 'yargs'

import QASMRuntime from './qasm-runtime'

const argv = yargs
  .usage('$0 <filename>')
  .version('0.0.1')
  .help()
  .alias('h', 'help')
  .option('verbose', {
    alias: 'v',
    default: false,
    type: 'boolean',
    description: 'Output state and operation of each step in simulation',
  })
  .demandCommand(1)
  .strictOptions()
  .showHelpOnFail(true)
  .parseSync()

const fileArg = process.argv[2]
const filename = path.resolve(process.cwd(), fileArg)
const runtime = new QASMRuntime({ verbose: argv.verbose })

try {
  console.log(runtime.executeFromFile(filename).toString())
} catch (err: any) {
  if (err.code === 'ENOENT') {
    console.error(`File '${filename}' does not exist`)
  } else if (err.code === 'EISDIR') {
    console.error(`File ${filename} is a directory`)
  } else {
    throw err
  }
}
