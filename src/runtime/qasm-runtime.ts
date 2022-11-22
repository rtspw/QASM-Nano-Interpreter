import * as fs from 'fs'
import $c from 'ansi-colors'
import { CharStreams, CommonTokenStream } from 'antlr4ts'
import Prompt from 'prompt-sync'

import { QASMLexer } from '../grammar/QASMLexer'
import { QASMParser } from '../grammar/QASMParser'

import BitCountVisitor from '../visitors/BitCountVisitor'
import RunnerVisitor from '../visitors/RunnerVisitor'
import QASMRuntimeMetrics from './qasm-runtime-metrics'
import QubitState from './qubit-state'
import { printRuntime } from './metric-printer'

const prompt = Prompt()
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
  private readonly DUMMY_HEADER = `OPENQASM 2.0;include "qelib1.inc";qreg q[16];creg c[16];`

  constructor(options: Partial<QASMRuntimeOptions> = {}) {
    this.options = { ...defaultRuntimeOptions, ...options }
  }

  private getQubitCountFromUser() {
    while (true) {
      const input = prompt('How many qubits? ')
      if (input === null) {
        process.exit(0)
      }
      const qubitCount = Number.parseInt(input)
      if (!Number.isNaN(qubitCount) && qubitCount > 0) {
        return qubitCount
      }
    }
  }

  private printMOTD() {
    console.log($c.bold.greenBright('QASM-- Interpreter REPL'))
    console.log(`Type ${$c.cyan(':quit')}, ${$c.cyan(':exit')}, or ${$c.grey('SIGINT')} to quit`)
    console.log(`Type ${$c.cyan(':help')} for help`)
    console.log()
  }

  private printHelpMenu() {
    console.log($c.bold.greenBright('Help Menu'))
    console.log(`${$c.cyan(':help')}: See this menu`)
    console.log(`${$c.cyan(':quit')}: Exit program`)
    console.log(`${$c.cyan(':exit')}: Exit program`)
    console.log(`${$c.cyan(':reset')}: Resets qubit state`)
    console.log(`${$c.cyan(':reset+')}: Resets qubit state with different number of qubits`)
  }

  runREPL() {
    this.printMOTD()
    const qubitCount = this.getQubitCountFromUser()
    let qubitState = new QubitState(qubitCount)
    while (true) {
      if (this.options.runMetrics) this.metrics.reset()
      console.log()
      console.log(qubitState.toString())
      const nextLine = prompt('> ')
      if (nextLine === null || nextLine === ':quit' || nextLine === ':exit') {
        console.log('Goodbye.')
        return
      }
      if (nextLine === ':help') {
        this.printHelpMenu()
        continue
      }
      if (nextLine === ':reset+') {
        const newQubitCount = this.getQubitCountFromUser()
        qubitState = new QubitState(newQubitCount)
        continue
      }
      if (nextLine === ':reset') {
        qubitState = new QubitState(qubitCount)
        continue
      }
      try {
        const statements = this.getParseTree(nextLine, true)
        const runnerVisitor = new RunnerVisitor(qubitState, this.options.verbose, this.metrics)
        const nextState = runnerVisitor.visit(statements)
        if (this.options.runMetrics)  {
          this.metrics.calculateResults()
          printRuntime(this.metrics)
        }
      
        qubitState = nextState
      } catch (err: any) {
        console.error($c.red('ERROR: ' + err.message))
      }
    }
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
    if (this.options.verbose) console.log(`${$c.dim('INFO || ')}Circuit has ${numOfQubits} qubits and ${numOfCbits} cbits`)
    const runnerVisitor = new RunnerVisitor(numOfQubits, this.options.verbose, this.metrics)
    const finalState = runnerVisitor.visit(program)
    if (this.options.runMetrics) this.metrics.calculateResults()
    return finalState
  }

  getParseTree(qasmCode: string, parseStatementsOnly = false) {
    if (this.options.runMetrics) this.metrics.startParserTimer()
    const lexer = new QASMLexer(CharStreams.fromString(parseStatementsOnly ? this.DUMMY_HEADER + qasmCode : qasmCode))
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new QASMParser(tokenStream)
    const parseTree = parser.program()
    if (this.options.runMetrics) this.metrics.endParserTimer()
    return parseTree
  }

  getMetrics() {
    return this.metrics
  }
}