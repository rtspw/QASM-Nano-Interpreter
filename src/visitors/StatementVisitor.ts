import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { One_qubit_opContext, ProgramContext, StatementContext, Two_qubit_opContext } from '../grammar/QASMParser';
import { QASMVisitor } from '../grammar/QASMVisitor'

export type Operation = 'h' | 'x' | 't' | 'tdg' | 'cx'

export interface StatementInfo {
  operation: Operation | null;
  args: number[];
}

export default class StatementInfoVisitor extends AbstractParseTreeVisitor<StatementInfo> implements QASMVisitor<StatementInfo> {
  defaultResult(): StatementInfo {
    return {
      operation: null,
      args: [],
    }
  }

  visitOne_qubit_op(ctx: One_qubit_opContext): StatementInfo {
    const operation = ctx.op_1().text as Operation
    const args = [Number.parseInt(ctx.qubit().INT().text)]
    return {
      operation,
      args,
    }
  }

  visitTwo_qubit_op(ctx: Two_qubit_opContext): StatementInfo {
    const operation = ctx.op_2().text as Operation
    const args = ctx.qubit().map(qubitCtx => Number.parseInt(qubitCtx.INT().text))
    return {
      operation,
      args,
    }
  }

  visitStatement(ctx: StatementContext): StatementInfo {
    return ctx.one_qubit_op()?.accept(this)
      ?? ctx.two_qubit_op()?.accept(this)
      ?? this.defaultResult()
  }
}
