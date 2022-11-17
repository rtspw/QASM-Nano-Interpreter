import * as fs from 'fs'
import { CharStreams, CommonTokenStream } from 'antlr4ts'

import { QASMLexer } from './grammar/QASMLexer'
import { QASMVisitor } from './grammar/QASMVisitor'
import { QASMParser } from './grammar/QASMParser'

import BitCountVisitor from './visitors/BitCountVisitor'
import RunnerVisitor from './visitors/RunnerVisitor'

export default class QASMRuntime {
  executeFromFile(filename: string) {
    const code = fs.readFileSync(filename, { encoding: 'utf8' })
    return this.execute(code)
  }

  execute(qasmCode: string) {
    const program = this.getParseTree(qasmCode)
    const bitCountVisitor = new BitCountVisitor()
    const { qubits: numOfQubits } = bitCountVisitor.visit(program)
    const runnerVisitor = new RunnerVisitor(numOfQubits)
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