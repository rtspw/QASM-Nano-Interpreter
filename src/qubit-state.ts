import * as cxjs from 'complex.js'

interface InternalQubitState {
  [bitstring: string]: cxjs.Complex;
}

export default class QubitState {
  numQubits: number
  qubits: InternalQubitState

  private readonly HADAMARD = 1 / Math.sqrt(2)
  private readonly T_CONST = cxjs.Complex(Math.sqrt(2) / 2, Math.sqrt(2) / 2)
  private readonly TDG_CONST = cxjs.Complex(Math.sqrt(2) / 2, -Math.sqrt(2) / 2)
  private readonly FLOAT_PRECISION = 10

  constructor(numQubits: number) {
    this.numQubits = numQubits
    const initialState = [...Array(numQubits)].fill(0).join('')
    this.qubits = {
      [initialState]: cxjs.Complex(1)
    }
  }

  private get_bs_flipped_at(idx: number, bs: string) {
    let new_bit = '0'
    if (bs[idx] === '0') {
      new_bit = '1'
    }
    return bs.substring(0, idx) + new_bit + bs.substring(idx + 1);
  }

  private get_bs_pair(flip_idx: number, bs: string) {
    const otherBS = this.get_bs_flipped_at(flip_idx, bs)
    if (bs[flip_idx] === '0') {
      return [bs, otherBS]
    } else {
      return [otherBS, bs]
    }
  }

  cx(control_idx: number, target_idx: number) {
    const nextState: InternalQubitState = {}
    for (const [bs, amp] of Object.entries(this.qubits)) {
      if (bs[control_idx] === '0') {
        nextState[bs] = (nextState?.[bs] ?? cxjs.Complex(0)).add(amp)
        continue
      }
      const targetBS = this.get_bs_flipped_at(target_idx, bs)
      nextState[targetBS] = (nextState?.[targetBS] ?? cxjs.Complex(0)).add(amp)
    }
    this.qubits = nextState
  }

  x(bit_idx: number) {
    const nextState: InternalQubitState = {}
    for (const [bs, amp] of Object.entries(this.qubits)) {
      const targetBS = this.get_bs_flipped_at(bit_idx, bs)
      nextState[targetBS] = amp
    }
    this.qubits = nextState
  }

  h(bit_idx: number) {
    const nextState: InternalQubitState = {}
    for (const [bs, amp] of Object.entries(this.qubits)) {
      const [bsWithZero, bsWithOne] = this.get_bs_pair(bit_idx, bs)
      const targetQubit = bs[bit_idx]
      nextState[bsWithZero] = (nextState?.[bsWithZero] ?? cxjs.Complex(0)).add(amp.mul(this.HADAMARD))
      if (targetQubit === '0') {
        nextState[bsWithOne] = (nextState?.[bsWithOne] ?? cxjs.Complex(0)).add(amp.mul(this.HADAMARD))
      } else {
        nextState[bsWithOne] = (nextState?.[bsWithOne] ?? cxjs.Complex(0)).sub(amp.mul(this.HADAMARD))
      }
    }
    this.qubits = nextState
  }

  t(bit_idx: number) {
    const nextState: InternalQubitState = {}
    for (const [bs, amp] of Object.entries(this.qubits)) {
      const targetQubit = bs[bit_idx]
      if (targetQubit === '0') {
        nextState[bs] = (nextState?.[bs] ?? cxjs.Complex(0)).add(amp)
      } else {
        nextState[bs] = (nextState?.[bs] ?? cxjs.Complex(0)).add(amp.mul(this.T_CONST))
      }
    }
    this.qubits = nextState
  }

  tdg(bit_idx: number) {
    const nextState: InternalQubitState = {}
    for (const [bs, amp] of Object.entries(this.qubits)) {
      const targetQubit = bs[bit_idx]
      if (targetQubit === '0') {
        nextState[bs] = (nextState?.[bs] ?? cxjs.Complex(0)).add(amp)
      } else {
        nextState[bs] = (nextState?.[bs] ?? cxjs.Complex(0)).add(amp.mul(this.TDG_CONST))
      }
    }
    this.qubits = nextState
  }

  /* Rounds amplitudes to remove floating point errors, and removes 0 amplitude kets */
  clean() {
    for (const [bs, amp] of Object.entries(this.qubits)) {
      const cleanAmp = amp.round(this.FLOAT_PRECISION)
      if (cleanAmp.re === 0 && cleanAmp.im === 0) {
        delete this.qubits[bs]
      } else {
        this.qubits[bs] = cleanAmp
      }
    }
    return this
  }

  toString() {
    const keys = Object.keys(this.qubits)
    keys.sort((x, y) => Number.parseInt(x, 2) - Number.parseInt(y, 2))
    const kets = keys.map(bs => {
      const amp = this.qubits[bs]
      if (amp.im !== 0 || amp.re < 0) {
        return `(${amp.toString()})|${bs}⟩`
      } else {
        return `${amp.toString()}|${bs}⟩`
      }
    })
    return kets.join(' + ')
  }

  /* Debug function to check if the total probability across all kets add up to around 1 */
  get_total_prob() {
    let total = 0
    for (const [bs, amp] of Object.entries(this.qubits)) {
      total += amp.abs() ** 2
    }
    return total
  }
}
