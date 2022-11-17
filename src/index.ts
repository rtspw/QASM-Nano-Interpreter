import * as path from 'path'
import yargs from 'yargs'

import printMetrics from './metric-printer'
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
  .option('metrics', {
    alias: 'm',
    default: false,
    type: 'boolean',
    description: 'Whether to run metrics on execution of QASM code'
  })
  .demandCommand(1)
  .strictOptions()
  .showHelpOnFail(true)
  .parseSync()

const fileArg = process.argv[2]
const filename = path.resolve(process.cwd(), fileArg)
const runtime = new QASMRuntime({ verbose: argv.verbose, runMetrics: argv.metrics })

try {
  const finalState = runtime.executeFromFile(filename)
  console.log(`Final state: ${finalState}`)
  if (argv.metrics) {
    console.log()
    printMetrics(runtime.getMetrics())
  }
} catch (err: any) {
  if (err.code === 'ENOENT') {
    console.error(`File '${filename}' does not exist`)
  } else if (err.code === 'EISDIR') {
    console.error(`File ${filename} is a directory`)
  } else {
    throw err
  }
}
