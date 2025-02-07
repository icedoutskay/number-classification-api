const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors()); 

const port = process.env.PORT || 3000; 


function isArmstrong(num) {
  const numStr = num.toString();
  const n = numStr.length;
  let sumOfPowers = 0;
  for (let digit of numStr) {
    sumOfPowers += Math.pow(parseInt(digit), n);
  }
  return sumOfPowers === num;
}

function getDigitSum(num) {
  const numStr = num.toString();
  let sum = 0;
  for (let digit of numStr) {
    sum += parseInt(digit);
  }
  return sum;
}

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function isPerfect(num) {
    if (num <= 1) return false;
    let sumOfDivisors = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sumOfDivisors += i;
            if (i * i !== num) {
                sumOfDivisors += num / i;
            }
        }
    }
    return sumOfDivisors === num;
}


app.get('/api/classify-number', async (req, res) => {
  try {
    const numberStr = req.query.number;
    if (!numberStr) {
      return res.status(400).json({ error: 'Number parameter is required' });
    }

    const number = parseInt(numberStr);
    if (isNaN(number)) {
      return res.status(400).json({ number: numberStr, error: true });
    }

    let funFact = "Fun fact not available.";
    try {
        const funFactResponse = await axios.get(`http://numbersapi.com/${number}/math`);
        funFact = funFactResponse.data.trim();
    } catch (error) {
        console.error("Error fetching fun fact:", error); 
    }

    const isPrimeNum = isPrime(number);
    const isPerfectNum = isPerfect(number);
    let properties = [];
    if (isArmstrong(number)) {
      properties.push('armstrong');
    }
    if (number % 2 === 0) {
      properties.push('even');
    } else {
      properties.push('odd');
    }

    res.json({
      number,
      is_prime: isPrimeNum,
      is_perfect: isPerfectNum,
      properties,
      digit_sum: getDigitSum(number),
      fun_fact: funFact,
    });
  } catch (error) {
    console.error("Server error:", error); 
    res.status(500).json({ error: 'Internal server error' }); 
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
