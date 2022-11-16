// Generated from ./src/grammar/QASM.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ProgramContext } from "./QASMParser";
import { StatementContext } from "./QASMParser";
import { One_qubit_opContext } from "./QASMParser";
import { Two_qubit_opContext } from "./QASMParser";
import { Op_1Context } from "./QASMParser";
import { Op_2Context } from "./QASMParser";
import { QubitContext } from "./QASMParser";
import { CbitContext } from "./QASMParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `QASMParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface QASMVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `QASMParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `QASMParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `QASMParser.one_qubit_op`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOne_qubit_op?: (ctx: One_qubit_opContext) => Result;

	/**
	 * Visit a parse tree produced by `QASMParser.two_qubit_op`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTwo_qubit_op?: (ctx: Two_qubit_opContext) => Result;

	/**
	 * Visit a parse tree produced by `QASMParser.op_1`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOp_1?: (ctx: Op_1Context) => Result;

	/**
	 * Visit a parse tree produced by `QASMParser.op_2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOp_2?: (ctx: Op_2Context) => Result;

	/**
	 * Visit a parse tree produced by `QASMParser.qubit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQubit?: (ctx: QubitContext) => Result;

	/**
	 * Visit a parse tree produced by `QASMParser.cbit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCbit?: (ctx: CbitContext) => Result;
}

