import { plot } from 'nodeplotlib'
import QASMRuntime from './qasm-runtime'

/* Generates a integer between [0, max) */
function generateRandomNumber(max: number) {
  return Math.floor(Math.random() * max)
}

function generateFakeQASMOp(numQubits: number) {
  if (numQubits <= 1) throw new Error(`Number of qubits must be greater than 1`)
  const supportedOps = [
    { op: 'x', arity: 1 },
    { op: 'h', arity: 1 },
    { op: 't', arity: 1 },
    { op: 'tdg', arity: 1 },
    { op: 'cx', arity: 2 },
  ]
  const { op, arity } = supportedOps[generateRandomNumber(supportedOps.length)]
  if (arity === 1) {
    const index = generateRandomNumber(numQubits)
    return `${op} q[${index}];`
  } else if (arity === 2) {
    const index = generateRandomNumber(numQubits)
    let index2 = generateRandomNumber(numQubits)
    while (index2 === index) {
      index2 = generateRandomNumber(numQubits)
    }
    return `${op} q[${index}], q[${index2}];`
  }
}

function generateFakeQASMFile(numQubits: number, numOps: number) {
  const header = `OPENQASM 2.0;\ninclude "qelib1.inc";\nqreg q[${numQubits}];\ncreg c[16];`
  const ops = [...Array(numOps)].map(_ => generateFakeQASMOp(numQubits))
  return `${header}\n${ops.join('\n')}`
}



const numQubitsTests = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
const numOpsTests = [100, 200, 300] //1000, 2500, 5000, 10000]
const avgTimePerOpResult: { [key: string]: number } = {}
const totalTimeResult: { [key: string]: number } = {}

for (const numOps of numOpsTests) {
  for (const numQubits of numQubitsTests) {
    console.log(`Running test for (qubits: ${numQubits}, ops: ${numOps})`)
    const fakeQASMFile = generateFakeQASMFile(numQubits, numOps)
    const runtime = new QASMRuntime({ runMetrics: true })
    const finalState = runtime.execute(fakeQASMFile)
    const metrics = runtime.getMetrics()
    avgTimePerOpResult[String([numQubits, numOps])] = metrics.averageTimePerOp ?? 0
    totalTimeResult[String([numQubits, numOps])] = metrics.totalRuntime ?? 0
    console.log(`Took ${metrics.totalRuntime}ms`)
  }
}

function getXYZFromResults(results: { [key: string]: number }) {
  const entries = Object.entries(results)
  const x = []
  const y = []
  const z = []
  for (const [k, v] of entries) {
    const [numQubits, numOps] = k.split(',').map(x => Number.parseInt(x))
    x.push(numQubits)
    y.push(numOps)
    z.push(v)
  }
  return [x, y, z]
}

function plotResult(result: { [key: string]: number }) {
  const [x, y, z] = getXYZFromResults(result)
  plot([{
    x,
    y,
    z,
    type: 'scatter3d',
    mode: 'markers',
  }])
}

plotResult(avgTimePerOpResult)
plotResult(totalTimeResult)