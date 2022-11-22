import $c from 'ansi-colors'

import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { ProgramContext, StatementContext } from '../grammar/QASMParser'
import { QASMVisitor } from '../grammar/QASMVisitor'

import QASMRuntimeMetrics from '../runtime/qasm-runtime-metrics'
import QubitState from '../runtime/qubit-state'
import StatementInfoVisitor from './StatementVisitor'


export default class RunnerVisitor extends AbstractParseTreeVisitor<QubitState> implements QASMVisitor<QubitState> {
  qubitState: QubitState
  numOfQubits: number
  verbose: boolean
  metrics: QASMRuntimeMetrics | null

  constructor(initialState: number | QubitState, verbose = false, metrics: QASMRuntimeMetrics | null = null) {
    super()
    if (initialState instanceof QubitState) {
      this.numOfQubits = initialState.numQubits
      this.qubitState = initialState
    } else {
      this.numOfQubits = initialState
      this.qubitState = new QubitState(initialState)
    }
    this.verbose = verbose
    this.metrics = metrics
  }

  protected defaultResult(): QubitState {
    return this.qubitState
  }

  visitProgram(ctx: ProgramContext): QubitState {
    if (this.metrics) this.metrics.startExecutionTimer()
    const statements = ctx.statement()

    const statementInfoVisitor = new StatementInfoVisitor()
    for (const statement of statements) {
      const { operation, args } = statementInfoVisitor.visit(statement)

      if (this.verbose) {
        console.log(`${$c.dim('INFO || ')}State: ${this.qubitState.clean()}`)
        console.log(`${$c.dim('INFO || ')}Operation: ${operation} ${args.map(arg => `q[${arg}]`).join(', ')}`)
      }

      if (this.metrics) {
        this.metrics.startOpTimer(operation ?? 'unknown')
      }

      if (args[0] < 0 || args[0] >= this.numOfQubits)
        throw new Error(`Tried to run ${operation} but qubit ${args[0]} is out of range`)
      switch (operation) {
        case 'x':
          this.qubitState.x(args[0])
          break
        case 'h':
          this.qubitState.h(args[0])
          break
        case 't':
          this.qubitState.t(args[0])
          break
        case 'tdg':
          this.qubitState.tdg(args[0])
          break
        case 'cx':
          if (args.length < 2)
            throw new Error(`Tried to run ${operation} but qubit missing argument`)
          if (args[1] < 0 || args[1] >= this.numOfQubits)
            throw new Error(`Tried to run ${operation} but qubit ${args[1]} is out of range`)
          if (args[0] === args[1])
            throw new Error(`Tried to run ${operation} but target ${args[1]} cannot equal control ${args[0]}`)
          this.qubitState.cx(args[0], args[1])
          break
      }

      if (this.metrics) {
        this.metrics.endOpTimer(operation ?? 'unknown')
      }
    }
    const cleanedState = this.qubitState.clean()
    if (this.metrics) this.metrics.endExecutionTimer()
    return cleanedState
  }
}