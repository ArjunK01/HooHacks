

export function createGame(name, players,range, transactions,currentMarket){
    let game={
        name:name,
        players:players,
        round:0,
        revealed:[],
        range:range,
        transactions:transactions,
        currentMarket:currentMarket,
        active:false, 
        mm:0,
        purchasing:false
    }
    return game

    
}

export function createPendingGame(name, players){
    let pendingGame={
        name:name,
        players:players
    }
    return pendingGame

}



export function createTransaction(playerName,makeMarket,sell,ask,askSize,bid,bidSize,quantity,f){
    let thing={}
    if(makeMarket==true){
        const trans={
            playerName:playerName,
            makeMarket:true,
            sell:true,
            ask:ask,
            askSize:askSize,
            bid:bid,
            bidSize:bidSize,
            quantity:0,
            for:0
        }
        thing=trans
    }else{
        const trans={
            playerName:playerName,
            makeMarket:false,
            sell:sell,
            ask:0,
            askSize:0,
            bid:0,
            bidSize:0,
            quantity:quantity,
            for:f
        }
        thing=trans

    }
    return thing

}


export function createPlayer(name){
    const player={
        stock:0,
        money:0,
        card:-1,
        name:name
    }
    return player

}


export function createCurrentMarket(ask,askVolume,bid,bidVolume){
    let currentMarket={
        ask:ask,
        askVolume:askVolume,
        bid:bid,
        bidVolume:bidVolume
    }
    return currentMarket

}
