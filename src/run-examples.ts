import path from 'path'
import printMetrics from './metric-printer'
import QASMRuntime from './qasm-runtime'
import $c from 'ansi-colors'
import yargs from 'yargs'
import fs from 'fs'

const argv = yargs
  .help()
  .option('color', {
    alias: 'c',
    default: false,
    type: 'boolean',
    description: 'Whether to include ansi colors in log output',
  })
  .parseSync()

$c.enabled = argv.color

const examplesDirectory = path.resolve(__dirname, '../', './examples')

const exampleFilenames = fs.readdirSync(examplesDirectory)

for (const filename of exampleFilenames) {
  console.log(`--------------------------------`)
  console.log(`${filename}`)
  console.log(`--------------------------------`)
  const filepath = path.join(examplesDirectory, filename)
  const runtime = new QASMRuntime({ runMetrics: true })
  const finalState = runtime.executeFromFile(filepath)
  const metrics = runtime.getMetrics()
  console.log(`Final state for (${filename}): ${finalState}`)
  printMetrics(metrics)
  console.log()
}
