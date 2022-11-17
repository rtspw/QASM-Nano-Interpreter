import Perfy from 'perfy'

export default class QASMRuntimeMetrics {
  private _parseTime: ReturnType<typeof Perfy.end> | null = null
  private _totalRuntime: ReturnType<typeof Perfy.end> | null = null
  private _avgTimePerOp: number | null = null
  private _avgTimePerOpBreakdown: {
    [op: string]: number
  } = {}
  private _totalOpCount: number = 0
  private _opCounter: {
    [op: string]: number
  } = {}
  private _totalOpTimes: {
    [op: string]: number
  } = {}

  get totalParseTime() {
    return this._parseTime?.fullMilliseconds
  }

  get totalRuntime() {
    return this._totalRuntime?.fullMilliseconds
  }

  get averageTimePerOp() {
    return this._avgTimePerOp
  }

  get averageTimePerOpBreakdown() {
    return this._avgTimePerOpBreakdown
  }

  get totalOpCount() {
    return this._totalOpCount
  }

  get opCounts() {
    return this._opCounter
  }

  reset() {
    this._parseTime = null
    this._totalRuntime = null
    this._avgTimePerOp = null
    this._avgTimePerOpBreakdown = {}
    this._totalOpCount = 0
    this._opCounter = {}
    this._totalOpTimes = {}
  }

  startParserTimer() {
    Perfy.start('parse')
  }

  endParserTimer() {
    this._parseTime = Perfy.end('parse')
  }

  startExecutionTimer() {
    Perfy.start('execution')
  }

  endExecutionTimer() {
    this._totalRuntime = Perfy.end('execution')
  }

  startOpTimer(opname: string) {
    this._totalOpCount += 1
    this._opCounter[opname] = (this._opCounter?.[opname] ?? 0) + 1
    Perfy.start(opname)
  }

  endOpTimer(opname: string) {
    const result = Perfy.end(opname)
    this._totalOpTimes[opname] = (this._totalOpTimes?.[opname] ?? 0) + result.fullMilliseconds
  }

  calculateResults() {
    if (this._totalRuntime === null) {
      throw new Error('Cannot call calculateResults before running execution timer')
    }
    for (const opname of Object.keys(this._opCounter)) {
      this._avgTimePerOpBreakdown[opname] = this._totalOpTimes[opname] / this._opCounter[opname]
    }
    this._avgTimePerOp = this._totalRuntime.fullMilliseconds / this._totalOpCount
  }
}