// Procurar o botão
document.querySelector("#add-time")
//Quando clicar no botão
.addEventListener('click', cloneField)


//Executar uma ação
function cloneField() {
    //Duplicar os campos. Que campos?
    const newFielContainer = document.querySelector('.schedule-item').cloneNode(true) // boolean: true or false
    
    //pegar os campos. Que campos?
    const fields = newFielContainer.querySelectorAll('input')

    // para cada campo, limpar
    fields.forEach(function(field){
        field.value = ""
    })

    //Colocar na página: onde?
    document.querySelector('#schedule-items').appendChild(newFielContainer)
}
