const arr = ['d', 'a', 'b', 'c'];
const arr2 = [1, 2, 3];

arr.forEach((char) => {
  console.log(char);
  if (char === 'a') {
    return;
  }

  arr2.forEach((num) => {
    console.log(num);
  });
  console.log('\n');
});
