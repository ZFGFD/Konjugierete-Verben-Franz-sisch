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

let correctAnswers =
parseInt(localStorage.getItem("correctAnswers")) || 0;

let verbIndex = 0;
let timeIndex = 0;
let personIndex = 0;

function updateProgress(){

const total = 240;

const percent =
((correctAnswers / total) * 100).toFixed(2);

document.getElementById("progressFill").style.width =
percent + "%";

document.getElementById("progressText").innerText =
`${correctAnswers} / ${total} (${percent}%)`;

const level =
Math.floor(correctAnswers / 25) + 1;

document.getElementById("levelText").innerText =
`Level ${level}`;
}

function loadQuestion(){

if(verbIndex >= verbs.length){

document.getElementById("questionArea").innerHTML =
"<h2>🏆 Alles geschafft!</h2>";

return;
}

const verb = verbs[verbIndex];

document.getElementById("verbTitle").innerText =
`Verb: ${verb.name}`;

document.getElementById("timeTitle").innerText =
times[timeIndex][1];

document.getElementById("personText").innerText =
persons[personIndex];

document.getElementById("answerInput").value = "";

document.getElementById("answerInput").focus();
}

function nextQuestion(){

personIndex++;

if(personIndex > 5){

personIndex = 0;
timeIndex++;
}

if(timeIndex > 3){

timeIndex = 0;
verbIndex++;

if(verbIndex < verbs.length){

alert(
`🎉 ${verbs[verbIndex-1].name} abgeschlossen!`
);
}
}

loadQuestion();
}

function checkAnswer(){

const verb = verbs[verbIndex];

const solution =
verb.forms[times[timeIndex][0]][personIndex]
.toLowerCase();

const answer =
document.getElementById("answerInput")
.value
.trim()
.toLowerCase();

const feedback =
document.getElementById("feedback");

if(answer === solution){

correctAnswers++;

localStorage.setItem(
"correctAnswers",
correctAnswers
);

updateProgress();

feedback.innerHTML =
"<span class='success'>✅ Richtig</span>";

setTimeout(()=>{
feedback.innerHTML="";
nextQuestion();
},600);

}else{

feedback.innerHTML =
`<span class='error'>
❌ Falsch<br>
Richtig: ${solution}
</span>`;
}
}

document.addEventListener("DOMContentLoaded",()=>{

updateProgress();
loadQuestion();

document
.getElementById("answerInput")
.addEventListener("keydown",e=>{

if(e.key==="Enter"){

e.preventDefault();

checkAnswer();
}

});

});
