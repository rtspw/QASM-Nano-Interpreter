import QASMRuntimeMetrics from "./qasm-runtime-metrics";
import $c from 'ansi-colors'

export default function printMetrics(metrics: QASMRuntimeMetrics) {
  metrics.averageTimePerOp
  metrics.averageTimePerOpBreakdown
  metrics.opCounts
  metrics.totalOpCount
  metrics.totalParseTime
  metrics.totalRuntime

  console.log(`Total Parsing Time: ${$c.magenta(`${metrics.totalParseTime}ms`)}`)
  console.log(`Total Execution Time: ${$c.magenta(`${metrics.totalRuntime}ms`)}`)
  console.log(`Number of Operations: ${$c.magenta(`${metrics.totalOpCount} ops`)}`)
  console.log($c.bold.dim(`Opname\t| Count`))
  Object.entries(metrics.opCounts).sort().forEach(([k, v]) => { console.log(`  ${k}\t| ${$c.magenta(v.toString())}`) })
  console.log(`Average Time Per Operation: ${$c.magenta(`${metrics.averageTimePerOp}ms`)}`)
  console.log($c.bold.dim(`Opname\t| Average Time (ms)`))
  Object.entries(metrics.averageTimePerOpBreakdown).sort().forEach(([k, v]) => { console.log(`  ${k}\t| ${$c.magenta(v.toPrecision(5).toString())}`) })
}
