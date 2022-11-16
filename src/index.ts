import * as fs from 'fs'
import * as path from 'path'

import { CharStreams, CommonTokenStream } from 'antlr4ts'
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'

import { QASMLexer } from './grammar/QASMLexer'
import { QASMVisitor } from './grammar/QASMVisitor'
import { QASMParser } from './grammar/QASMParser'

import BitCountVisitor from './visitors/BitCountVisitor'
import RunnerVisitor from './visitors/RunnerVisitor'

const fileArg = process.argv?.[2] ?? ''
const filename = path.join(__dirname, '../', fileArg)
console.log(filename)
const testText = fs.readFileSync(filename, { encoding: 'utf8' })
const lexer = new QASMLexer(CharStreams.fromString(testText))
const tokenStream = new CommonTokenStream(lexer)
const parser = new QASMParser(tokenStream)
const program = parser.program()

const bitCountVisitor = new BitCountVisitor()
const { qubits: numOfQubits } = bitCountVisitor.visit(program)

const runnerVisitor = new RunnerVisitor(numOfQubits)
const finalState = runnerVisitor.visit(program)

console.log(finalState.toString())
