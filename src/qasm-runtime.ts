import * as fs from 'fs'
import { CharStreams, CommonTokenStream } from 'antlr4ts'

import { QASMLexer } from './grammar/QASMLexer'
import { QASMParser } from './grammar/QASMParser'

import BitCountVisitor from './visitors/BitCountVisitor'
import RunnerVisitor from './visitors/RunnerVisitor'
import QASMRuntimeMetrics from './qasm-runtime-metrics'

export interface QASMRuntimeOptions {
  verbose: boolean;
  runMetrics: boolean;
}

const defaultRuntimeOptions: QASMRuntimeOptions = {
  verbose: false,
  runMetrics: false,
}

export default class QASMRuntime {

  private options: QASMRuntimeOptions
  private metrics: QASMRuntimeMetrics = new QASMRuntimeMetrics()

  constructor(options: Partial<QASMRuntimeOptions> = {}) {
    this.options = { ...defaultRuntimeOptions, ...options }
  }

  executeFromFile(filename: string) {
    const code = fs.readFileSync(filename, { encoding: 'utf8' })
    return this.execute(code)
  }

  execute(qasmCode: string) {
    if (this.options.runMetrics) this.metrics.reset()
    const program = this.getParseTree(qasmCode)
    const bitCountVisitor = new BitCountVisitor()
    const { qubits: numOfQubits, cbits: numOfCbits } = bitCountVisitor.visit(program)
    if (this.options.verbose) console.log(`INFO || Circuit has ${numOfQubits} qubits and ${numOfCbits} cbits`)
    const runnerVisitor = new RunnerVisitor(numOfQubits, this.options.verbose, this.metrics)
    const finalState = runnerVisitor.visit(program)
    if (this.options.runMetrics) this.metrics.calculateResults()
    return finalState
  }

  getParseTree(qasmCode: string) {
    if (this.options.runMetrics) this.metrics.startParserTimer()
    const lexer = new QASMLexer(CharStreams.fromString(qasmCode))
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new QASMParser(tokenStream)
    const program = parser.program()
    if (this.options.runMetrics) this.metrics.endParserTimer()
    return program
  }

  getMetrics() {
    return this.metrics
  }
}