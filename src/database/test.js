const Database = require('./db')
const createProffy = require('./createProffy')
Database.then( async (db) =>{
    // Inserir dados

    proffyValue = {
        name: 'Laercio Almeida',
        avatar: 'https://media-exp1.licdn.com/dms/image/C4E03AQGS2-YxxqdTKA/profile-displayphoto-shrink_100_100/0?e=1602115200&v=beta&t=ZjnxRxR9QBhtybKOznv9a0Hqz8thk3ZFWauCQC_jSbk',
        whatsapp: '74988287451',
        bio: 'Sou apaixonado por resolver problemas utilizando a programação. Sou um FullStack Developer em evolução.'
    }

    classValue = {
        subject: 1,
        cost: '20',
        // o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // class_id virá pelo banco de dados, após cadastrarmos o class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

  // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // createProffy(db, {proffyValue, classValue, classScheduleValue})

    // Consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dado do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo é das 8h -18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa ser acima
    const selectClassesSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
        
    `)

    console.log(selectClassesSchedule)
})