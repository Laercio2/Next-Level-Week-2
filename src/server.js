// EXPRESS = Library of frameworks to run a properly server-side. //
// Nunjucks = Template Engine which allows us to manipulate our html easily. //

// Const var to shortly refer express when it's needed. //
const express = require('express');
// Const var to server expressions use. //
const server = express();
// Nunjucks configuration. //
// Basically we are refering which dir has the html that will be futher manipulated. //
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

// Array of Proffys (teachers). //
const proffys = [
    { 
        name: "Laercio Almeida", 
        avatar: "https://media-exp1.licdn.com/dms/image/C4E03AQGS2-YxxqdTKA/profile-displayphoto-shrink_100_100/0?e=1602115200&v=beta&t=ZjnxRxR9QBhtybKOznv9a0Hqz8thk3ZFWauCQC_jSbk", 
        whatsapp: "7598828-7453",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências.Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    { 
        name: "Wumpus Discord", 
        avatar: "https://qph.fs.quoracdn.net/main-qimg-30fa7f9924184dc4ac60586f2467db9f", 
        whatsapp: "7598828-7453",
        bio: "Elleston Trevor, who wrote a series of children's books about a character named Wumpus Discord (software), a chat application which features a Wumpus as its mascot.",
        subject: "Física",
        cost: "40",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    }
]
// Array of available subjects. //
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Portugês",
    "Química",
];
// Array of Weekdays. //
const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];


// ROUTES INFO:
// 'req' is basically the info you are sending to the endpoint 
// 'res' is the return of this endpoint

// Main Page config //
function pageLanding(req, res) {
    return res.render("index.html")
}

// Study Page config //
function pageStudy(req, res) {
    const filters = req.query;
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

// this function takes the index of the subject and return his name //
function getSubject(subjectNumber) {
    const position = +subjectNumber -1;
    return subjects[position];
}

// Give-Classes Page Config //
function pageGiveClasses(req, res) {

    // Storing the data that we are sending through the 'req' parameter //
    // basically this 'req' will have all form data from the Give-Classes //
    // when the 'save' button is clicked. //
    const data = req.query;
    // Checking if the data returned is not null (empty) //
    const isNotEmpty = Object.keys(data).length > 0;

    // If the data is complete, we are going to record this new Proffy user //
    if(isNotEmpty) {
        // Consulting the name of the subject, using the function bellow. //
        data.subject = getSubject(data.subject);
        // Pushing the new data into the Proffys array. //
        proffys.push(data);
        // Redirect to the Study page. //
        return res.redirect("/study");
    }
    
    return res.render("give-classes.html", {subjects, weekdays})
}

// every '.use()' function its a server config settings //
// config the static files for the server (css, scripts, img) //
server.use(express.static("public"))

// ROUTES CONFIG (endpoints) //
// * INDEX Page //
.get("/", pageLanding)
// * STUDY Page //
.get("/study", pageStudy)
// * GIVE CLASSES Page //
.get("/give-classes", pageGiveClasses)
// PORT CONFIG //
.listen(5500);