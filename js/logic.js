class Logic {
    constructor(apikey) {
        this.apikey = apikey
        this.imageUrl = ''
    }

    

    //GET all crypto names to show in select/option:
    async getAllCrypto() {
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`
        
        const urlGetCoins = await fetch(url)
         
        const crypto = await urlGetCoins.json()

        // console.log(crypto)
        return crypto
        
            
    }

    //get info of the selected crypto
    async getCryptoSelectedData (coin, crypto) {
        //show message when coin or crypto not selected
        if (!coin || !crypto) throw ('Fiat or Crypto not selected')

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}&api_key=${this.apikey}`

        const getSelectedData = await fetch(url)
        
        const result = await getSelectedData.json()

        return result
    }

    async setCryptoImage (selectedCrypto) {
        this.getAllCrypto()
            .then(res => {

                const imageURL = res.Data[selectedCrypto].ImageUrl
                const completeUrl = `https://www.cryptocompare.com${imageURL}`

                this.imageUrl = completeUrl

            })
    }

    async getCryptoImage() {
        console.log('from logic' + this.imageUrl)
        return this.imageUrl
    }
}