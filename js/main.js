const logic = new Logic('e3d6ee5686723326f1f7e826afe4343736d87187e56f801fb8cb9a1a28ed2767')
const view = new View()


const form = document.querySelector('#form')

form.addEventListener('submit', event => {
    event.preventDefault()
    
    const fiatSelector = document.querySelector('#fiatCoin')
    const selectedCoin = fiatSelector.options[fiatSelector.selectedIndex].value
    
    const cryptoSelector = document.querySelector('#cryptoCoin')
    const selectedCrypto = cryptoSelector.options[cryptoSelector.selectedIndex].value 

    const cryptoImage = logic.imageUrl
    
    try {

        logic.setCryptoImage(selectedCrypto)
            .then(() => logic.getCryptoSelectedData(selectedCoin, selectedCrypto))
            .then(data => {
                view.showResults(data.RAW, selectedCoin, selectedCrypto)
            })
            .catch(err => view.showMessage(err, 'alert bg-danger text-center'))

    } catch (err) {
        
        view.showMessage(err, 'alert bg-danger text-center')
    }

})