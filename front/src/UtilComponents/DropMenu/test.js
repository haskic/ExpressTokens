// obj = {
//     start: {
//         childs: {
//             name: "Alexander",
//             lastName: "Karasinski",
            
//         }
//     }
// }

// function childsParse(obj) {
//     for (let key in obj) {
//         if (key == "childs") {
//             for (let cKey in obj[key]){
//                 console.log(obj[key][cKey]);
//             }
//             childsParse(obj[key]);
//         }
//     }
// }

// function parseObject(obj) {
//     for (let key in obj) {
//         childsParse(obj[key]);
//     }
// }

// parseObject(obj);


// mass = [];


// function massAppend(mass){
//     mass.push("1");
// }

// massAppend(mass);
// massAppend(mass);
// massAppend(mass);

// console.log(mass);




let obj = {
    name: "Alexander",
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear()

}

console.log(obj.name);
console.log(obj.date);

let str;
str = JSON.stringify(obj);
console.log(str);
console.log(obj);
console.log(JSON.parse(str).day);
console.log(JSON.parse(str).month);
console.log(JSON.parse(str).year);


