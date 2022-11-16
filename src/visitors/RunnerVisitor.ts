import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { ProgramContext } from '../grammar/QASMParser'
import { QASMVisitor } from '../grammar/QASMVisitor'

import QubitState from '../qubit-state'
import StatementInfoVisitor from './StatementVisitor'

export default class RunnerVisitor extends AbstractParseTreeVisitor<QubitState> implements QASMVisitor<QubitState> {
  numOfQubits: number

  constructor(numOfQubits: number) {
    super()
    this.numOfQubits = numOfQubits
  }

  protected defaultResult(): QubitState {
    return new QubitState(this.numOfQubits)
  }

  visitProgram(ctx: ProgramContext): QubitState {
    const statements = ctx.statement()
    const qubitState = new QubitState(this.numOfQubits)

    const statementInfoVisitor = new StatementInfoVisitor()
    for (const statement of statements) {
      const { operation, args } = statementInfoVisitor.visit(statement)
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
    }
    return qubitState.clean()
  }
}