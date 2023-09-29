import exp from "constants";
import { off } from "process";

interface Operators {
    [key: string]: {
        priority: number,
        operation: (a: number, b: number) => number
            
    } }

const OPERATORS: Operators = {
    '+': {
        priority: 1,
        operation: (a, b) => {return a+b}
    },
    '-': {
        priority: 1,
        operation: (a, b) => {return a-b},
    },
    '*': {
        priority: 2,
        operation: (a, b) => {return a*b},
    },
    '/':{
        priority: 2,
        operation: (a, b) => {return a/b},
    },
    '^': {
        priority: 3,
        operation: (a, b) => {return a**b},
    },
};

function shuntingYard(expression: string):string[] {
    const q: string[] = []
    const s: string[] = []
    for(let i = 0; i < expression.length; i++) {
        const char = expression[i]
        // numeric
        if (isNum(char)) {
            let offset = 1
            while(i+offset <= expression.length && isNum(expression[i+offset])) {
                offset+=1
            }
            q.push(expression.substring(i, offset+i))       
            i += offset-1
        }
        // operator
        else if(char in OPERATORS){
            while(s.length > 0 
                && s[s.length-1] in OPERATORS
                && OPERATORS[char].priority <= OPERATORS[s[s.length-1]].priority){
                
                q.push(s.pop()!)
            }
            s.push(char)
        }
        // start paranthesis
        else if (char === "("){
            s.push(char)
        }
        // end parenthesis
        else if (char === ")") {
            while(s[s.length-1] !== "(") {
                q.push(s.pop()!)
            }
            s.pop()
        }
    }
    while(s.length > 0){ 
        q.push(s.pop()!)
    }
    
    return q
}

function reversePolish(expression: string[]) {
    const s: string[] = []
    expression.forEach((term:string) => {
        if (isNum(term)) {
            s.push(term) 
        } else {
            const a = parseFloat(s.pop()!)
            const b = parseFloat(s.pop()!)
            s.push(OPERATORS[term].operation(b,a).toString())
        }
    })
    return s.pop()!
}

function compute(expression:string) {
    if(expression.length === 0) {return 0}
    console.log(shuntingYard(expression))
    return parseFloat(reversePolish(shuntingYard(expression)))
}

function isNum(str:string) {
    // return/\d*\.?\d*/.test(str)

    return /\d/.test(str)
}

function checkValidity(expression: string) {
    if(expression.length === 0){return true}
    // check edges are numbers or parentheses
    if (!((isNum(expression[0]) || expression[0] === '(') && (isNum(expression[expression.length-1]) || expression[expression.length-1] === ')'))) {
        return false
    }
    // no duplicate operators
    // parenthesis have operator next to them
    let open = expression[0] === '(' ? 1 : 0
    let close = expression[expression.length-1] === ')' ? 1 : 0
    for(let i = 1; i < expression.length-1; i++) {
        const char = expression[i]
        if (char in OPERATORS && (expression[i-1] in OPERATORS || expression[i+1] in OPERATORS)){
            return false
        }
        if (char === '(') {
            open+=1
            if (![...Object.keys(OPERATORS), '('].includes(expression[i-1])) {
                return false
            }
        }
        if (char === ')') {
            close+=1
            if (![...Object.keys(OPERATORS), ')'].includes(expression[i+1])) {
                return false
            }
        }
        console.log([...Object.keys(OPERATORS)])
    }
    console.log(open, close)
    if (open !== close) {
        return false
    }
    return true
  }

    //doesn't support negative numbers
    //doesnt support decimal inputs
    //

export {compute, checkValidity}