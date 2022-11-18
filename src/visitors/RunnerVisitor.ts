import $c from 'ansi-colors'

import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { ProgramContext } from '../grammar/QASMParser'
import { QASMVisitor } from '../grammar/QASMVisitor'

import QASMRuntimeMetrics from '../runtime/qasm-runtime-metrics'
import QubitState from '../runtime/qubit-state'
import StatementInfoVisitor from './StatementVisitor'


export default class RunnerVisitor extends AbstractParseTreeVisitor<QubitState> implements QASMVisitor<QubitState> {
  numOfQubits: number
  verbose: boolean
  metrics: QASMRuntimeMetrics | null

  constructor(numOfQubits: number, verbose = false, metrics: QASMRuntimeMetrics | null = null) {
    super()
    this.numOfQubits = numOfQubits
    this.verbose = verbose
    this.metrics = metrics
  }

  protected defaultResult(): QubitState {
    return new QubitState(this.numOfQubits)
  }

  visitProgram(ctx: ProgramContext): QubitState {
    if (this.metrics) this.metrics.startExecutionTimer()
    const statements = ctx.statement()
    const qubitState = new QubitState(this.numOfQubits)

    const statementInfoVisitor = new StatementInfoVisitor()
    for (const statement of statements) {
      const { operation, args } = statementInfoVisitor.visit(statement)

      if (this.verbose) {
        console.log(`${$c.dim('INFO || ')}State: ${qubitState.clean()}`)
        console.log(`${$c.dim('INFO || ')}Operation: ${operation} ${args.map(arg => `q[${arg}]`).join(', ')}`)
      }

      if (this.metrics) {
        this.metrics.startOpTimer(operation ?? 'unknown')
      }

      if (args[0] < 0 || args[0] >= this.numOfQubits)
        throw new Error(`Tried to run ${operation} but qubit ${args[0]} is out of range`)
      switch (operation) {
        case 'x':
          qubitState.x(args[0])
          break
        case 'h':
          qubitState.h(args[0])
          break
        case 't':
          qubitState.t(args[0])
          break
        case 'tdg':
          qubitState.tdg(args[0])
          break
        case 'cx':
          if (args[1] < 0 || args[1] >= this.numOfQubits)
            throw new Error(`Tried to run ${operation} but qubit ${args[1]} is out of range`)
          if (args[0] === args[1])
            throw new Error(`Tried to run ${operation} but target ${args[1]} cannot equal control ${args[0]}`)
          qubitState.cx(args[0], args[1])
          break
      }

      if (this.metrics) {
        this.metrics.endOpTimer(operation ?? 'unknown')
      }
    }
    const cleanedState = qubitState.clean()
    if (this.metrics) this.metrics.endExecutionTimer()
    return cleanedState
  }
}