

const num = "flower.png";
const formattedNum = num.replace(/\..*/g, "");
console.log(formattedNum); // "1,234,567,890"


const srcs = ["flower.png", "flower2.png", "flower3.png"];


let srcsFormatted = srcs.map((src) => { return src.replace(/\..*/g, "") });
console.log(srcsFormatted);