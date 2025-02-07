const isPrime = (num) => {
  if( num <= 1) 
      return false
  if ( num <= 3 )
      return true 
  if (num % 2 === 0 || num % 3 === 0)
      return false
  for (let i = 5; i * i <=num; i += 6){
      if (num % i === 0 || num % (i + 2) === 0)
          return false
  }
  return true
}


const isPerfect = (num) => {
  if (num <= 1) 
      return false
  let sum = 1
  for (let i = 2; i * i <=num; i++){
      if (num % i === 0) {
          sum += i
          if (i !== num / i) sum += num /i
      }
  }
  return sum === num
}



const isArmStrong = (num) => {
  const digits = String(num).split('') 
  const length = digits.length
  const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), length), 0)
  return sum === num
}


const getDigitSum = (num) => {
  return String(num).split('').reduce((acc, digit) => acc + Number(digit), 0)
}


const getParity = (num) => {
  return num % 2 === 0 ? 'even' : 'odd'
}


const getArmstrongFact = (num) => {
  const digits = String(num).split('')
  const length = digits.length
  const explanation = digits.map(d => `${d}^${length}`).join(' + ')
  return `${num} is an Armstrong number because ${explanation} = ${num}`;
}

module.exports = {
  isPrime,
  isPerfect,
  isArmStrong,
  getDigitSum,
  getParity,
  getArmstrongFact
}