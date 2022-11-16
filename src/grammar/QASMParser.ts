// Generated from ./src/grammar/QASM.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { QASMListener } from "./QASMListener";
import { QASMVisitor } from "./QASMVisitor";


export class QASMParser extends Parser {
	public static readonly VERSION = 1;
	public static readonly INCLUDE = 2;
	public static readonly QREG = 3;
	public static readonly CREG = 4;
	public static readonly INT = 5;
	public static readonly WS = 6;
	public static readonly Q = 7;
	public static readonly C = 8;
	public static readonly LBRAC = 9;
	public static readonly RBRAC = 10;
	public static readonly SEMIC = 11;
	public static readonly COMMA = 12;
	public static readonly H = 13;
	public static readonly X = 14;
	public static readonly T = 15;
	public static readonly TDG = 16;
	public static readonly CX = 17;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_one_qubit_op = 2;
	public static readonly RULE_two_qubit_op = 3;
	public static readonly RULE_op_1 = 4;
	public static readonly RULE_op_2 = 5;
	public static readonly RULE_qubit = 6;
	public static readonly RULE_cbit = 7;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "one_qubit_op", "two_qubit_op", "op_1", "op_2", 
		"qubit", "cbit",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'OPENQASM 2.0'", "'include \"qelib1.inc\"'", "'qreg'", "'creg'", 
		undefined, undefined, "'q'", "'c'", "'['", "']'", "';'", "','", "'h'", 
		"'x'", "'t'", "'tdg'", "'cx'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "VERSION", "INCLUDE", "QREG", "CREG", "INT", "WS", "Q", "C", 
		"LBRAC", "RBRAC", "SEMIC", "COMMA", "H", "X", "T", "TDG", "CX",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(QASMParser._LITERAL_NAMES, QASMParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return QASMParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "QASM.g4"; }

	// @Override
	public get ruleNames(): string[] { return QASMParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return QASMParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(QASMParser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, QASMParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 16;
			this.match(QASMParser.VERSION);
			this.state = 17;
			this.match(QASMParser.SEMIC);
			this.state = 18;
			this.match(QASMParser.INCLUDE);
			this.state = 19;
			this.match(QASMParser.SEMIC);
			this.state = 20;
			this.match(QASMParser.QREG);
			this.state = 21;
			this.qubit();
			this.state = 22;
			this.match(QASMParser.SEMIC);
			this.state = 23;
			this.match(QASMParser.CREG);
			this.state = 24;
			this.cbit();
			this.state = 25;
			this.match(QASMParser.SEMIC);
			this.state = 29;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << QASMParser.H) | (1 << QASMParser.X) | (1 << QASMParser.T) | (1 << QASMParser.TDG) | (1 << QASMParser.CX))) !== 0)) {
				{
				{
				this.state = 26;
				this.statement();
				}
				}
				this.state = 31;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 32;
			this.match(QASMParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, QASMParser.RULE_statement);
		try {
			this.state = 36;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QASMParser.H:
			case QASMParser.X:
			case QASMParser.T:
			case QASMParser.TDG:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 34;
				this.one_qubit_op();
				}
				break;
			case QASMParser.CX:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 35;
				this.two_qubit_op();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public one_qubit_op(): One_qubit_opContext {
		let _localctx: One_qubit_opContext = new One_qubit_opContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, QASMParser.RULE_one_qubit_op);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 38;
			this.op_1();
			this.state = 39;
			this.qubit();
			this.state = 40;
			this.match(QASMParser.SEMIC);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public two_qubit_op(): Two_qubit_opContext {
		let _localctx: Two_qubit_opContext = new Two_qubit_opContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, QASMParser.RULE_two_qubit_op);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 42;
			this.op_2();
			this.state = 43;
			this.qubit();
			this.state = 44;
			this.match(QASMParser.COMMA);
			this.state = 45;
			this.qubit();
			this.state = 46;
			this.match(QASMParser.SEMIC);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public op_1(): Op_1Context {
		let _localctx: Op_1Context = new Op_1Context(this._ctx, this.state);
		this.enterRule(_localctx, 8, QASMParser.RULE_op_1);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 48;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << QASMParser.H) | (1 << QASMParser.X) | (1 << QASMParser.T) | (1 << QASMParser.TDG))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public op_2(): Op_2Context {
		let _localctx: Op_2Context = new Op_2Context(this._ctx, this.state);
		this.enterRule(_localctx, 10, QASMParser.RULE_op_2);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 50;
			this.match(QASMParser.CX);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qubit(): QubitContext {
		let _localctx: QubitContext = new QubitContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, QASMParser.RULE_qubit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 52;
			this.match(QASMParser.Q);
			this.state = 53;
			this.match(QASMParser.LBRAC);
			this.state = 54;
			this.match(QASMParser.INT);
			this.state = 55;
			this.match(QASMParser.RBRAC);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public cbit(): CbitContext {
		let _localctx: CbitContext = new CbitContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, QASMParser.RULE_cbit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 57;
			this.match(QASMParser.C);
			this.state = 58;
			this.match(QASMParser.LBRAC);
			this.state = 59;
			this.match(QASMParser.INT);
			this.state = 60;
			this.match(QASMParser.RBRAC);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x13A\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x07\x02\x1E\n\x02\f\x02\x0E" +
		"\x02!\v\x02\x03\x02\x03\x02\x03\x03\x03\x03\x05\x03\'\n\x03\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03" +
		"\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\t\x03\t" +
		"\x03\t\x03\t\x03\t\x03\t\x02\x02\x02\n\x02\x02\x04\x02\x06\x02\b\x02\n" +
		"\x02\f\x02\x0E\x02\x10\x02\x02\x03\x03\x02\x0F\x12\x02:\x02\x12\x03\x02" +
		"\x02\x02\x04&\x03\x02\x02\x02\x06(\x03\x02\x02\x02\b,\x03\x02\x02\x02" +
		"\n2\x03\x02\x02\x02\f4\x03\x02\x02\x02\x0E6\x03\x02\x02\x02\x10;\x03\x02" +
		"\x02\x02\x12\x13\x07\x03\x02\x02\x13\x14\x07\r\x02\x02\x14\x15\x07\x04" +
		"\x02\x02\x15\x16\x07\r\x02\x02\x16\x17\x07\x05\x02\x02\x17\x18\x05\x0E" +
		"\b\x02\x18\x19\x07\r\x02\x02\x19\x1A\x07\x06\x02\x02\x1A\x1B\x05\x10\t" +
		"\x02\x1B\x1F\x07\r\x02\x02\x1C\x1E\x05\x04\x03\x02\x1D\x1C\x03\x02\x02" +
		"\x02\x1E!\x03\x02\x02\x02\x1F\x1D\x03\x02\x02\x02\x1F \x03\x02\x02\x02" +
		" \"\x03\x02\x02\x02!\x1F\x03\x02\x02\x02\"#\x07\x02\x02\x03#\x03\x03\x02" +
		"\x02\x02$\'\x05\x06\x04\x02%\'\x05\b\x05\x02&$\x03\x02\x02\x02&%\x03\x02" +
		"\x02\x02\'\x05\x03\x02\x02\x02()\x05\n\x06\x02)*\x05\x0E\b\x02*+\x07\r" +
		"\x02\x02+\x07\x03\x02\x02\x02,-\x05\f\x07\x02-.\x05\x0E\b\x02./\x07\x0E" +
		"\x02\x02/0\x05\x0E\b\x0201\x07\r\x02\x021\t\x03\x02\x02\x0223\t\x02\x02" +
		"\x023\v\x03\x02\x02\x0245\x07\x13\x02\x025\r\x03\x02\x02\x0267\x07\t\x02" +
		"\x0278\x07\v\x02\x0289\x07\x07\x02\x029:\x07\f\x02\x02:\x0F\x03\x02\x02" +
		"\x02;<\x07\n\x02\x02<=\x07\v\x02\x02=>\x07\x07\x02\x02>?\x07\f\x02\x02" +
		"?\x11\x03\x02\x02\x02\x04\x1F&";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!QASMParser.__ATN) {
			QASMParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(QASMParser._serializedATN));
		}

		return QASMParser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public VERSION(): TerminalNode { return this.getToken(QASMParser.VERSION, 0); }
	public SEMIC(): TerminalNode[];
	public SEMIC(i: number): TerminalNode;
	public SEMIC(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(QASMParser.SEMIC);
		} else {
			return this.getToken(QASMParser.SEMIC, i);
		}
	}
	public INCLUDE(): TerminalNode { return this.getToken(QASMParser.INCLUDE, 0); }
	public QREG(): TerminalNode { return this.getToken(QASMParser.QREG, 0); }
	public qubit(): QubitContext {
		return this.getRuleContext(0, QubitContext);
	}
	public CREG(): TerminalNode { return this.getToken(QASMParser.CREG, 0); }
	public cbit(): CbitContext {
		return this.getRuleContext(0, CbitContext);
	}
	public EOF(): TerminalNode { return this.getToken(QASMParser.EOF, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QASMParser.RULE_program; }
	// @Override
	public enterRule(listener: QASMListener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: QASMListener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QASMVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public one_qubit_op(): One_qubit_opContext | undefined {
		return this.tryGetRuleContext(0, One_qubit_opContext);
	}
	public two_qubit_op(): Two_qubit_opContext | undefined {
		return this.tryGetRuleContext(0, Two_qubit_opContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QASMParser.RULE_statement; }
	// @Override
	public enterRule(listener: QASMListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: QASMListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QASMVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class One_qubit_opContext extends ParserRuleContext {
	public op_1(): Op_1Context {
		return this.getRuleContext(0, Op_1Context);
	}
	public qubit(): QubitContext {
		return this.getRuleContext(0, QubitContext);
	}
	public SEMIC(): TerminalNode { return this.getToken(QASMParser.SEMIC, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QASMParser.RULE_one_qubit_op; }
	// @Override
	public enterRule(listener: QASMListener): void {
		if (listener.enterOne_qubit_op) {
			listener.enterOne_qubit_op(this);
		}
	}
	// @Override
	public exitRule(listener: QASMListener): void {
		if (listener.exitOne_qubit_op) {
			listener.exitOne_qubit_op(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QASMVisitor<Result>): Result {
		if (visitor.visitOne_qubit_op) {
			return visitor.visitOne_qubit_op(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Two_qubit_opContext extends ParserRuleContext {
	public op_2(): Op_2Context {
		return this.getRuleContext(0, Op_2Context);
	}
	public qubit(): QubitContext[];
	public qubit(i: number): QubitContext;
	public qubit(i?: number): QubitContext | QubitContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QubitContext);
		} else {
			return this.getRuleContext(i, QubitContext);
		}
	}
	public COMMA(): TerminalNode { return this.getToken(QASMParser.COMMA, 0); }
	public SEMIC(): TerminalNode { return this.getToken(QASMParser.SEMIC, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QASMParser.RULE_two_qubit_op; }
	// @Override
	public enterRule(listener: QASMListener): void {
		if (listener.enterTwo_qubit_op) {
			listener.enterTwo_qubit_op(this);
		}
	}
	// @Override
	public exitRule(listener: QASMListener): void {
		if (listener.exitTwo_qubit_op) {
			listener.exitTwo_qubit_op(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QASMVisitor<Result>): Result {
		if (visitor.visitTwo_qubit_op) {
			return visitor.visitTwo_qubit_op(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Op_1Context extends ParserRuleContext {
	public H(): TerminalNode | undefined { return this.tryGetToken(QASMParser.H, 0); }
	public X(): TerminalNode | undefined { return this.tryGetToken(QASMParser.X, 0); }
	public T(): TerminalNode | undefined { return this.tryGetToken(QASMParser.T, 0); }
	public TDG(): TerminalNode | undefined { return this.tryGetToken(QASMParser.TDG, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QASMParser.RULE_op_1; }
	// @Override
	public enterRule(listener: QASMListener): void {
		if (listener.enterOp_1) {
			listener.enterOp_1(this);
		}
	}
	// @Override
	public exitRule(listener: QASMListener): void {
		if (listener.exitOp_1) {
			listener.exitOp_1(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QASMVisitor<Result>): Result {
		if (visitor.visitOp_1) {
			return visitor.visitOp_1(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Op_2Context extends ParserRuleContext {
	public CX(): TerminalNode { return this.getToken(QASMParser.CX, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QASMParser.RULE_op_2; }
	// @Override
	public enterRule(listener: QASMListener): void {
		if (listener.enterOp_2) {
			listener.enterOp_2(this);
		}
	}
	// @Override
	public exitRule(listener: QASMListener): void {
		if (listener.exitOp_2) {
			listener.exitOp_2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QASMVisitor<Result>): Result {
		if (visitor.visitOp_2) {
			return visitor.visitOp_2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QubitContext extends ParserRuleContext {
	public Q(): TerminalNode { return this.getToken(QASMParser.Q, 0); }
	public LBRAC(): TerminalNode { return this.getToken(QASMParser.LBRAC, 0); }
	public INT(): TerminalNode { return this.getToken(QASMParser.INT, 0); }
	public RBRAC(): TerminalNode { return this.getToken(QASMParser.RBRAC, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QASMParser.RULE_qubit; }
	// @Override
	public enterRule(listener: QASMListener): void {
		if (listener.enterQubit) {
			listener.enterQubit(this);
		}
	}
	// @Override
	public exitRule(listener: QASMListener): void {
		if (listener.exitQubit) {
			listener.exitQubit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QASMVisitor<Result>): Result {
		if (visitor.visitQubit) {
			return visitor.visitQubit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CbitContext extends ParserRuleContext {
	public C(): TerminalNode { return this.getToken(QASMParser.C, 0); }
	public LBRAC(): TerminalNode { return this.getToken(QASMParser.LBRAC, 0); }
	public INT(): TerminalNode { return this.getToken(QASMParser.INT, 0); }
	public RBRAC(): TerminalNode { return this.getToken(QASMParser.RBRAC, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QASMParser.RULE_cbit; }
	// @Override
	public enterRule(listener: QASMListener): void {
		if (listener.enterCbit) {
			listener.enterCbit(this);
		}
	}
	// @Override
	public exitRule(listener: QASMListener): void {
		if (listener.exitCbit) {
			listener.exitCbit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QASMVisitor<Result>): Result {
		if (visitor.visitCbit) {
			return visitor.visitCbit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


