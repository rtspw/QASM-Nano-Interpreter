import * as fs from 'fs'
import { CharStreams, CommonTokenStream } from 'antlr4ts'

import { QASMLexer } from './grammar/QASMLexer'
import { QASMVisitor } from './grammar/QASMVisitor'
import { QASMParser } from './grammar/QASMParser'

import BitCountVisitor from './visitors/BitCountVisitor'
import RunnerVisitor from './visitors/RunnerVisitor'

export interface QASMRuntimeOptions {
  verbose: boolean;
}

const defaultRuntimeOptions: QASMRuntimeOptions = {
  verbose: false,
}

export default class QASMRuntime {

  private options: QASMRuntimeOptions

  constructor(options: Partial<QASMRuntimeOptions> = {}) {
    this.options = { ...defaultRuntimeOptions, ...options }
  }

  executeFromFile(filename: string) {
    const code = fs.readFileSync(filename, { encoding: 'utf8' })
    return this.execute(code)
  }

  execute(qasmCode: string) {
    const program = this.getParseTree(qasmCode)
    const bitCountVisitor = new BitCountVisitor()
    const { qubits: numOfQubits, cbits: numOfCbits } = bitCountVisitor.visit(program)
    if (this.options.verbose) console.log(`INFO || Circuit has ${numOfQubits} qubits and ${numOfCbits} cbits`)
    const runnerVisitor = new RunnerVisitor(numOfQubits, this.options.verbose)
    const finalState = runnerVisitor.visit(program)
    return finalState
  }

  getParseTree(qasmCode: string) {
    const lexer = new QASMLexer(CharStreams.fromString(qasmCode))
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new QASMParser(tokenStream)
    const program = parser.program()
    return program
  }
}