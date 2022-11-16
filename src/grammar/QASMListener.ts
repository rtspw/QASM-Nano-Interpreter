// Generated from ./src/grammar/QASM.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ProgramContext } from "./QASMParser";
import { StatementContext } from "./QASMParser";
import { One_qubit_opContext } from "./QASMParser";
import { Two_qubit_opContext } from "./QASMParser";
import { Op_1Context } from "./QASMParser";
import { Op_2Context } from "./QASMParser";
import { QubitContext } from "./QASMParser";
import { CbitContext } from "./QASMParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `QASMParser`.
 */
export interface QASMListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `QASMParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `QASMParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `QASMParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `QASMParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `QASMParser.one_qubit_op`.
	 * @param ctx the parse tree
	 */
	enterOne_qubit_op?: (ctx: One_qubit_opContext) => void;
	/**
	 * Exit a parse tree produced by `QASMParser.one_qubit_op`.
	 * @param ctx the parse tree
	 */
	exitOne_qubit_op?: (ctx: One_qubit_opContext) => void;

	/**
	 * Enter a parse tree produced by `QASMParser.two_qubit_op`.
	 * @param ctx the parse tree
	 */
	enterTwo_qubit_op?: (ctx: Two_qubit_opContext) => void;
	/**
	 * Exit a parse tree produced by `QASMParser.two_qubit_op`.
	 * @param ctx the parse tree
	 */
	exitTwo_qubit_op?: (ctx: Two_qubit_opContext) => void;

	/**
	 * Enter a parse tree produced by `QASMParser.op_1`.
	 * @param ctx the parse tree
	 */
	enterOp_1?: (ctx: Op_1Context) => void;
	/**
	 * Exit a parse tree produced by `QASMParser.op_1`.
	 * @param ctx the parse tree
	 */
	exitOp_1?: (ctx: Op_1Context) => void;

	/**
	 * Enter a parse tree produced by `QASMParser.op_2`.
	 * @param ctx the parse tree
	 */
	enterOp_2?: (ctx: Op_2Context) => void;
	/**
	 * Exit a parse tree produced by `QASMParser.op_2`.
	 * @param ctx the parse tree
	 */
	exitOp_2?: (ctx: Op_2Context) => void;

	/**
	 * Enter a parse tree produced by `QASMParser.qubit`.
	 * @param ctx the parse tree
	 */
	enterQubit?: (ctx: QubitContext) => void;
	/**
	 * Exit a parse tree produced by `QASMParser.qubit`.
	 * @param ctx the parse tree
	 */
	exitQubit?: (ctx: QubitContext) => void;

	/**
	 * Enter a parse tree produced by `QASMParser.cbit`.
	 * @param ctx the parse tree
	 */
	enterCbit?: (ctx: CbitContext) => void;
	/**
	 * Exit a parse tree produced by `QASMParser.cbit`.
	 * @param ctx the parse tree
	 */
	exitCbit?: (ctx: CbitContext) => void;
}

