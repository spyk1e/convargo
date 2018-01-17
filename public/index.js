'use strict';

//Datas

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
    'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
    'name': 'les-routiers-bretons',
    'pricePerKm': 0.05,
    'pricePerVolume': 5
}, {
    'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
    'name': 'geodis',
    'pricePerKm': 0.1,
    'pricePerVolume': 8.5
}, {
    'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
    'name': 'xpo',
    'pricePerKm': 0.10,
    'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
    'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
    'shipper': 'bio-gourmet',
    'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
    'distance': 100,
    'volume': 4,
    'options': {
        'deductibleReduction': false
    },
    'price': 0,
    'commission': {
        'insurance': 0,
        'treasury': 0,
        'convargo': 0
    }
}, {
    'id': '65203b0a-a864-4dea-81e2-e389515752a8',
    'shipper': 'librairie-lu-cie',
    'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
    'distance': 650,
    'volume': 12,
    'options': {
        'deductibleReduction': true
    },
    'price': 0,
    'commission': {
        'insurance': 0,
        'treasury': 0,
        'convargo': 0
    }
}, {
    'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
    'shipper': 'otacos',
    'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
    'distance': 1250,
    'volume': 30,
    'options': {
        'deductibleReduction': true
    },
    'price': 0,
    'commission': {
        'insurance': 0,
        'treasury': 0,
        'convargo': 0
    }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
    'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
    'payment': [{
        'who': 'shipper',
        'type': 'debit',
        'amount': 0
  }, {
        'who': 'trucker',
        'type': 'credit',
        'amount': 0
  }, {
        'who': 'insurance',
        'type': 'credit',
        'amount': 0
  }, {
        'who': 'treasury',
        'type': 'credit',
        'amount': 0
  }, {
        'who': 'convargo',
        'type': 'credit',
        'amount': 0
  }]
}, {
    'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
    'payment': [{
        'who': 'shipper',
        'type': 'debit',
        'amount': 0
  }, {
        'who': 'trucker',
        'type': 'credit',
        'amount': 0
  }, {
        'who': 'insurance',
        'type': 'credit',
        'amount': 0
  }, {
        'who': 'treasury',
        'type': 'credit',
        'amount': 0
  }, {
        'who': 'convargo',
        'type': 'credit',
        'amount': 0
  }]
}, {
    'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
    'payment': [{
        'who': 'shipper',
        'type': 'debit',
        'amount': 0
  }, {
        'who': 'trucker',
        'type': 'credit',
        'amount': 0
  }, {
        'who': 'treasury',
        'type': 'credit',
        'amount': 0
  }, {
        'who': 'insurance',
        'type': 'credit',
        'amount': 0
  }, {
        'who': 'convargo',
        'type': 'credit',
        'amount': 0
  }]
}];


//Functions
function setPrice() {
    deliveries.forEach(function (deliverie) {

        //Get price from the trucker
        var priceKm = 0
        var priceVol = 0
        truckers.forEach(function (truck) {
            if (truck.id == deliverie.truckerId) {
                priceKm = truck.pricePerKm
                priceVol = truck.pricePerVolume
                return
            }
        })

        //Distance price
        var distancePrice = priceKm * deliverie.distance


        //Volume price

        //Discount
        if (deliverie.volume > 5 && deliverie.volume <= 10) {
            priceVol *= 0.9
        } else if (deliverie.volume > 10 && deliverie.volume <= 25) {
            priceVol *= 0.7
            console.log(deliverie.id)
        } else if (deliverie.volume > 25) {
            priceVol *= 0.5
        }


        //Calculate price for volume
        var volumePrice = priceVol * deliverie.volume


        //Calcul the total price of the shippment
        var shippingPrice = distancePrice + volumePrice


        //Pay everyone
        var comm = shippingPrice * 0.15 //15% of the price 
        deliverie.commission.insurance = comm
        deliverie.commission.treasury = parseInt(deliverie.distance / 500)
        deliverie.commission.convargo = comm - deliverie.commission.treasury
        



        //Set price in variable
        deliverie.price = shippingPrice
    })
}


setPrice()






console.log(truckers);
console.log(deliveries);
console.log(actors);
