const users = [
    { id: 1, name: 'Alice', age: 23 },
    { id: 2, name: 'Alice', age: 23 },
    { id: 3, name: 'Alice', age: 23 },
]
const result = [...users, { id: 1, name: 'Alice', age: 23 },];
console.log(result);
console.log(result.map(x => x.name)); //output name of object array
console.log(result.filter(n => n.age != 23)); //output object whose age is not 23.
[1, 2, 3, 4].map(n => n + 1);
[1, 2, 3, 4].filter(n => n > 2); //output number which is greater than 2