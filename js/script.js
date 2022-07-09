pizzaJson.map((item, index) => {
    //função cloneNode faz uma copia de um elemento HTMLm parametro TRUE faz a copia de todos os elementos do pai
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
    document.querySelector('.pizza-area').append(pizzaItem)

    //preencher os dados de cada pizza:

    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    //pizza clicada

    pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
        e.preventDefault()

        //abrir janela modal
        document.querySelector('.pizzaWindowArea').style.display = 'flex'
    
        //preenchimento dos dados

        pizzaItem.querySelector('.pizza-item--img img').src = item.img
        pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
        pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
        pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    })

    document.querySelector('.pizzaInfo--cancelButton').addEventListener('click', () => {
        document.querySelector('.pizzaWindowArea').style.display = 'none'
    })

    document.querySelector('.pizzaInfo--cancelMobileButton').addEventListener('click', () => {
        document.querySelector('.pizzaWindowArea').style.display = 'none'
    })
})