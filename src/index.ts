import * as path from 'path'
import yargs from 'yargs'
import $c from 'ansi-colors'

import printMetrics from './runtime/metric-printer'
import QASMRuntime from './runtime/qasm-runtime'

const argv = yargs
  .version('0.0.1')
  .help()
  .alias('h', 'help')
  .option('file', {
    alias: 'f',
    type: 'string',
    description: 'QASM file to run and interpret'
  })
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
    description: 'Whether to run metrics on execution of QASM code',
  })
  .option('color', {
    alias: 'c',
    default: false,
    type: 'boolean',
    description: 'Whether to include ansi colors in log output',
  })
  .strictOptions()
  .showHelpOnFail(true)
  .parseSync()

$c.enabled = argv.color

const runtime = new QASMRuntime({ verbose: argv.verbose, runMetrics: argv.metrics })

if (!argv.file) {
  runtime.runREPL()
} else {
  const fileArg = argv.file
  const filename = path.resolve(process.cwd(), fileArg)
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
}