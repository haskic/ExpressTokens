
let mass = [];
let massObj = [];


for(let i = 0;i<10;i++){
    mass.push(i);
    if (i%3 == 0){
        massObj.push(mass);
        mass = [];
    }
}


