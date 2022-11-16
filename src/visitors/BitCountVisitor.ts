import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { ProgramContext } from '../grammar/QASMParser';
import { QASMVisitor } from '../grammar/QASMVisitor'

export interface BitCount {
  qubits: number;
  cbits: number;
}

export default class BitCountVisitor extends AbstractParseTreeVisitor<BitCount> implements QASMVisitor<BitCount> {
  defaultResult() {
    return {
      qubits: 0,
      cbits: 0,
    }
  }

  visitProgram(ctx: ProgramContext) {
    return {
      qubits: Number.parseInt(ctx.qubit().INT().text),
      cbits: Number.parseInt(ctx.cbit().INT().text),
    }
  }
}