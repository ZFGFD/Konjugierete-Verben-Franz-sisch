const verbs = [

{
name:"être",
forms:{
present:["suis","es","est","sommes","êtes","sont"],
passe:["ai été","as été","a été","avons été","avez été","ont été"],
futur:["serai","seras","sera","serons","serez","seront"],
imparfait:["étais","étais","était","étions","étiez","étaient"]
}
},

{
name:"avoir",
forms:{
present:["ai","as","a","avons","avez","ont"],
passe:["ai eu","as eu","a eu","avons eu","avez eu","ont eu"],
futur:["aurai","auras","aura","aurons","aurez","auront"],
imparfait:["avais","avais","avait","avions","aviez","avaient"]
}
},

{
name:"aller",
forms:{
present:["vais","vas","va","allons","allez","vont"],
passe:["suis allé","es allé","est allé","sommes allés","êtes allés","sont allés"],
futur:["irai","iras","ira","irons","irez","iront"],
imparfait:["allais","allais","allait","allions","alliez","allaient"]
}
},

{
name:"faire",
forms:{
present:["fais","fais","fait","faisons","faites","font"],
passe:["ai fait","as fait","a fait","avons fait","avez fait","ont fait"],
futur:["ferai","feras","fera","ferons","ferez","feront"],
imparfait:["faisais","faisais","faisait","faisions","faisiez","faisaient"]
}
},

{
name:"prendre",
forms:{
present:["prends","prends","prend","prenons","prenez","prennent"],
passe:["ai pris","as pris","a pris","avons pris","avez pris","ont pris"],
futur:["prendrai","prendras","prendra","prendrons","prendrez","prendront"],
imparfait:["prenais","prenais","prenait","prenions","preniez","prenaient"]
}
},

{
name:"mettre",
forms:{
present:["mets","mets","met","mettons","mettez","mettent"],
passe:["ai mis","as mis","a mis","avons mis","avez mis","ont mis"],
futur:["mettrai","mettras","mettra","mettrons","mettrez","mettront"],
imparfait:["mettais","mettais","mettait","mettions","mettiez","mettaient"]
}
},

{
name:"lire",
forms:{
present:["lis","lis","lit","lisons","lisez","lisent"],
passe:["ai lu","as lu","a lu","avons lu","avez lu","ont lu"],
futur:["lirai","liras","lira","lirons","lirez","liront"],
imparfait:["lisais","lisais","lisait","lisions","lisiez","lisaient"]
}
},

{
name:"écrire",
forms:{
present:["écris","écris","écrit","écrivons","écrivez","écrivent"],
passe:["ai écrit","as écrit","a écrit","avons écrit","avez écrit","ont écrit"],
futur:["écrirai","écriras","écrira","écrirons","écrirez","écriront"],
imparfait:["écrivais","écrivais","écrivait","écrivions","écriviez","écrivaient"]
}
},

{
name:"savoir",
forms:{
present:["sais","sais","sait","savons","savez","savent"],
passe:["ai su","as su","a su","avons su","avez su","ont su"],
futur:["saurai","sauras","saura","saurons","saurez","sauront"],
imparfait:["savais","savais","savait","savions","saviez","savaient"]
}
},

{
name:"connaître",
forms:{
present:["connais","connais","connaît","connaissons","connaissez","connaissent"],
passe:["ai connu","as connu","a connu","avons connu","avez connu","ont connu"],
futur:["connaîtrai","connaîtras","connaîtra","connaîtrons","connaîtrez","connaîtront"],
imparfait:["connaissais","connaissais","connaissait","connaissions","connaissiez","connaissaient"]
}
}

];

const persons = [
"je",
"tu",
"il/elle",
"nous",
"vous",
"ils/elles"
];

const times = [
["present","Présent"],
["passe","Passé Composé"],
["futur","Futur Simple"],
["imparfait","Imparfait"]
];

let currentVerb = 0;

let mastered = JSON.parse(localStorage.getItem("mastered")) || 0;

function updateProgress(){
let percent = Math.round((mastered / verbs.length) * 100);

document.getElementById("progressFill").style.width =
percent + "%";

document.getElementById("progressText").innerText =
percent + "%";
}

function loadVerb(){

if(currentVerb >= verbs.length){

document.getElementById("verbTitle").innerHTML =
"🎉 Alle Verben geschafft!";

document.getElementById("quizForm").innerHTML = "";
return;
}

const verb = verbs[currentVerb];

document.getElementById("verbTitle").innerHTML =
"Konjugiere: " + verb.name;

let html = "";

times.forEach(time=>{

html += `<h3 class="timeTitle">${time[1]}</h3>`;

persons.forEach((person,index)=>{

html += `
<div class="question">
<label>${person}</label>
<input data-time="${time[0]}"
data-index="${index}">
</div>
`;

});

});

document.getElementById("quizForm").innerHTML = html;
}

function checkAnswers(){

const verb = verbs[currentVerb];

const inputs =
document.querySelectorAll("input");

let correct = 0;

inputs.forEach(input=>{

let time = input.dataset.time;
let index = input.dataset.index;

let solution =
verb.forms[time][index]
.toLowerCase();

let answer =
input.value.trim().toLowerCase();

if(answer === solution){

input.classList.add("correct");
correct++;

}else{

input.classList.add("wrong");
input.value += " ❌ → " + solution;
}

});

if(correct === 24){

mastered++;
localStorage.setItem(
"mastered",
mastered
);

updateProgress();

setTimeout(()=>{

currentVerb++;
loadVerb();

},1500);

}else{

alert(
`${correct}/24 richtig.
Für das nächste Verb müssen alle richtig sein.`
);
}
}

updateProgress();
loadVerb();
