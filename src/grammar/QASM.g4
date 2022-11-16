grammar QASM;

VERSION: 'OPENQASM 2.0';
INCLUDE: 'include "qelib1.inc"';

QREG: 'qreg';
CREG: 'creg';

INT: [0-9]+;
WS: [ \t\n\r\f]+ -> skip;

Q: 'q';
C: 'c';
LBRAC: '[';
RBRAC: ']';
SEMIC: ';';
COMMA: ',';

H: 'h';
X: 'x';
T: 't';
TDG: 'tdg';
CX: 'cx';

program:
	VERSION SEMIC INCLUDE SEMIC QREG qubit SEMIC CREG cbit SEMIC statement* EOF;

statement: one_qubit_op | two_qubit_op;

one_qubit_op: op_1 qubit SEMIC;

two_qubit_op: op_2 qubit COMMA qubit SEMIC;

op_1: H | X | T | TDG;

op_2: CX;

qubit: Q LBRAC INT RBRAC;

cbit: C LBRAC INT RBRAC;