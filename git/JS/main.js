// alert("welcome")
// prompt("hii")
// confirm("got it")
const name="nayan";
const number= 21;
const good=false;
const u = undefined;
const n = null;
console.log(typeof n + typeof u)
console.log("my name is"+name+"my age is"+number)
console.log(`my name is ${name} my age is${number}`)
const value =`my name is ${name} my age is${number}`
console.log(value)

console.log(value.lastIndexOf(number))
console.log(value.split('n'))

//array
const a= new Array(1,2,3,4,5,true)
console.log(a[0])
const b = ['name','number',123,null]
b[3]=77
b.unshift="hello"
b.push="hii"
b.pop()
console.log(b)
console.log(b.indexOf('name'))
console.log(b[2])

//object

const info={
    Name: "Rahul",
    city:"surat",
    hobby:"cricket",
    subject:{
        maths:"dilipsir",
        iot:"meenakshimadam"
    }
}
info.number=354320648

console.log(info)

const obj=[
    {
        id:1,
        name:"meet"
    },
    {
        id:2,
        name:"rahul"
    },
    {
        id:3,
        name:"daksh"
    }
]

console.log(obj[1])
const jason=JSON.stringify(obj)
console.log(jason)

//loop
let k = 10
for(let i = 2 ;i<=k+1;i++){
    //document.write(i+" *")
   let m=" ";
     for(let y=2;y<=i-2;y++){
        m+="*"
        for(let z=1;z<=1;z++){
            m+=" "
        } 
    }
    document.write(m + "<br>")
}

    

    // Outer loop for 5 rows
for (let row = 1; row <= 5; row++) {
    let rowText = ""; // 1. Start with an empty row

    // Inner loop adds stars horizontally
    for (let col = 1; col <= row; col++) {
        rowText += "* "; // 2. Keep adding to the same line
    }

    console.log(rowText); // 3. Print the completed row
}
for (let number= 1; number<=40; number++ ){

    if(number % 2 === 0){
        let num= 'number';
         console.log(num)
        }
   
}

const x =18
if(x<=19){
console.log('is eligible to vote')
}else{
    console.log('is under 18 ')
}
try{
const x = 18
if(x==19){
console.log('is eligible to vote')
 }
}
catch{
const x =18
if(x==18){
console.log('is equal to 18')
}
}
finally{
console.log('------------hellooo--------')
}

const c = 'green';
switch (c){
    case 'red':
        console.log('color is red');
        break;
        case 'blue':
            console.log('color is blue')
            break;
            default:
                console.log('color is yellow')
}
//function


function add(n1,n2){
    const n =n1+n2;
    console.log(n)
}
    
add(1,8)
function mul(n1,n2){
    return n1*n2;
}
    
console.log(mul(1,8));

const Arrow = (n1,n2)=>{ return n1 /n2;
}
console.log(Arrow(4,4))

//constarctor

function Info(firstname,lastname,city,age){
    this.firstname=firstname;
    this.lastname=lastname;
    this.city=city;
    this.age=age
}

const person= new Info('NAYAN','PATEL','SURAT','8')
console.log(person)

class car{
    constructor(name,year){
        this.name=name;
        this.moDel=year;
    }
}

const car1= new car('BMW','2004-10')
const car2= new car('porse','2020',)

const caryear= new Date(car1.moDel)

console.log(caryear.getFullYear())

//document.getElementById('car2').innerHTML= car1.name
