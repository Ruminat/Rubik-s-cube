class Move {
  constructor ({ letter, isReverse, isDouble }) {
    this.letter = letter
    this.isReverse = isReverse
    this.isDouble = isDouble
  }
}

class Algorithm {
  constructor (moves, { name = '' } = {}) {
    if (typeof moves === 'string') {
      moves = moves.trim()
        .replace(/\s+/g, ' ')
        .replace(/\(|\)|\[|\]/g, '')
      this.moves = moves.split(' ').map(this.parseMove)
    } else if (moves instanceof Array) {
      this.moves = moves
    }
    this.name = name
  }

  parseMove (move) {
    if (!move) {
      console.error('Empty move!', move)
      return null
    }
    return new Move({
      letter: move[0],
      isReverse: move.includes(`'`),
      isDouble: move.replace(/'/g, '').endsWith('2')
    })
  }
  
  reverse () {
    return new Algorithm(
      [...this.moves].reverse().map(move => {
        const newMove = Object.assign({}, move)
        if (!move.isDouble) newMove.isReverse = !newMove.isReverse
        return newMove
      })
    )
  }

  otherHand () {
    return new Algorithm(
      this.moves.map(move => {
        const newMove = Object.assign({}, move)
        if (!move.isDouble && move.letter !== 'M') newMove.isReverse = !newMove.isReverse
        if      (move.letter == 'R') newMove.letter = 'L'
        else if (move.letter == 'r') newMove.letter = 'l'
        else if (move.letter == 'L') newMove.letter = 'R'
        else if (move.letter == 'l') newMove.letter = 'r'
        return newMove
      })
    )
  }

  stringify () {
    return this.moves
      .map(move => `${move.letter}${move.isDouble ? '2' : ''}${move.isReverse ? '\'' : ''}`)
      .join(' ')
  }
}

const alg = new Algorithm(`  l U' R' U R' F R F' l'     `)

const moves = alg.moves.length
const singleMoves = alg.moves.filter(m => !m.isDouble).length
const doubleMoves = alg.moves.filter(m => m.isDouble).length
console.log(`${moves} moves: ${singleMoves} single moves + ${doubleMoves} double moves`)
console.log('alg  ', alg.stringify())
console.log(`alg' `, alg.reverse().stringify())
console.log(`algH `, alg.otherHand().stringify())
console.log(`algH'`, alg.otherHand().reverse().stringify())
