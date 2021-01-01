function a() {
  let a = 5;
  if (true) {
    const b = 10;
    console.log("a and b");
    console.log(b); // 10
    console.log(a); // 5
  }
  console.log("a and b");
  console.log(b); // undefine
  console.log(a); // 5
}

console.log(b); // undefined
console.log(a); // undefined

//

const array1 = [1, 2, 3, 4, 5];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const reducer = (acc, curr) => {
  acc.name = curr;
  return acc;
};

//acc last value

1 + 2 = 3;
3 + 3 = 6;
6 + 4 = 10;
10 + 5 = 15;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));

5 + 1 = 6;
6 + 2 = 8;
8 + 3 = 11;
11 + 4 = 15;
