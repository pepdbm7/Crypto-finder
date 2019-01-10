class View {

    constructor() {
        this.buildCryptoSelector()
    }

    buildCryptoSelector() {
        //use the method of instance of class Logic created in main.js:
        logic.getAllCrypto()
            .then(cryptos => {
                //cryptos = {..., Data: {crypto : {id : ..., url : ... img : ... }}, ...}
                const cryptoSelector = document.querySelector('#cryptoCoin')

                //iterate through cryptos, and create an option into the select for each coin:
                Object.entries(cryptos.Data).forEach( ([ key, val ]) => { 
                    //object.entries to return an array whose elements are arrays corresponding to the enumerable property [key, value] pairs found directly upon object; in this case, only use the 'value' of each element of the obj:
                    
                    const option = document.createElement('option')
                    //set as value of each option, the crypto acronym:
                    option.value = val.Symbol

                    //if we want to show the logo in each option:
                        // const option = `<option value="${val.Symbol}" data-content='<img src="${url}">'> ${val.CoinName} </option>`
                        // cryptoSelector.insertAdjacentHTML('beforeend', option)

                    //and we'll show the crypto name:
                    const name = document.createTextNode(val.CoinName)

                    option.append(name)
                    cryptoSelector.appendChild(option)
                })
            })
    }

    showMessage(text, classname) {
        const message = document.createElement('div')
        message.className = classname
        message.appendChild(document.createTextNode(text))

        const messageContainer = document.querySelector('.message')
        messageContainer.appendChild(message)

        setTimeout(() => {
            while (messageContainer.firstChild) {
                messageContainer.removeChild(messageContainer.firstChild)
            }
            //or: document.querySelector('.message div').remove()

        }, 2000)
    }

    showResults(result, coin, crypto) {

        if (!result) throw (`Crypto ${crypto} Not Found. Try another!`)
        
        //delete previous results:
        const previousResult = document.querySelector('#result > div')
        
        if(previousResult) previousResult.remove()
        
        const coinData = result[crypto][coin]
        
        let currentPrice = coinData.PRICE.toFixed(5),
            changePercentageToday = coinData.CHANGEPCT24HOUR.toFixed(2),
            lastUpdate = new Date(coinData.LASTUPDATE * 1000).toLocaleDateString(),
            fiat = coinData.TOSYMBOL,
            marketCap = coinData.MKTCAP.toFixed(2).toLocaleString('de-DE'),
            cryptoImg = logic.imageUrl,
            defaultImg = './img/btc-placeholder.jpg'

        let templateResults = `
        <div class="card">
            <div class="card-body text-light">
                <h2 class="card-title">${crypto}</h2>
                <p><span class="card-left-text">MCap:</span> ${marketCap}</p>
                <p><span class="card-left-text">Current price is:</span> ${currentPrice} ${fiat}</p>
                <p><span class="card-left-text">Change last 24h:</span> %${changePercentageToday}</p>
                <p><span class="card-left-text">Last Update:</span> ${lastUpdate}</p>
            </div>
            <div class="image__container"><img src="${cryptoImg ? cryptoImg : defaultImg}" alt="crypto logo"></div>
        </div>`
        
        //we show spinner:
        this.showSpinner('block')

        setTimeout(() => {
            //after 3 secs of showing spinner, we show templateResults:
            document.querySelector('#result').innerHTML =templateResults

            this.showSpinner('none')
        }, 1000)
    }

    showSpinner(visibility) {
        const spinner = document.querySelector('#spinner__container')

        spinner.style.display = visibility
    }
}