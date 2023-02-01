import './css/index.css';
console.log('hello main');
console.log('hello world');
console.log('hello 111111');
console.log('hello 2222222');
var a = 1, b =2;

const sum = (...args) => {
    return args.reduce((sum, item) => { return sum + item}, 0);
}