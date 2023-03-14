const auctions = [
  {
    item: 'Rodney Mullen Skate',
    lastPrice: 4000,
    lastAuctioneer: 'Pepe Morales',
    initialPrice: 100,
    amountAuctioneer: 4,
    id: 1,
  },
  {
    item: 'Cristiano Ronaldo Gucci Jacket',
    lastPrice: 45000,
    lastAuctioneer: 'Juan Cruz Palo',
    initialPrice: 1800,
    amountAuctioneer: 10,
    id: 2,
  },
  {
    item: 'Di Caprio Lamborghini',
    lastPrice: 499999,
    lastAuctioneer: 'Aitor Tilla',
    initialPrice: 200000,
    amountAuctioneer: 98,
    id: 3,
  },
  {
    item: 'Old Statue from Paris',
    lastPrice: 500,
    lastAuctioneer: 'Juan Pedro Rivera',
    initialPrice: 140,
    amountAuctioneer: 190,
    id: 4,
  },
];

const main = () => {
  //Init actuals Auctions
  const listOfAuctions = document.querySelector('#listOfAuctions');
  const addAuction = document.querySelector('#addAuction');
  const searchAuction = document.querySelector('#searchAuction');

  for (let auction of auctions) {
    buildAuction(auction, listOfAuctions);
  }

  addAuction.onclick = () => {
    let validBid = false;
    let validItem = false;
    let item;
    let initialPrice = 0;

    while (!validItem) {
      item = prompt('Ingrese el nombre del Item que desea subastar:');
      if (!item) return;
      let itemExist = auctions.some(auction => auction.item === item);
      if (!itemExist) {
        validItem = true;
      } else {
        alert('El nombre del item ya esta tomado, ingrese uno distinto.');
      }
    }

    while (!validBid) {
      initialPrice = prompt('Ingrese la oferta inicial:');
      if (!initialPrice) return;
      if (initialPrice > 0) {
        validBid = true;
      } else {
        alert('Por favor, Ingrese una oferta mayor a 0$!!');
      }
    }

    let auctioneer = prompt('Ingrese su nombre:');
    if (!auctioneer) return;

    let auction = {
      item,
      lastPrice: initialPrice,
      lastAuctioneer: auctioneer,
      initialPrice,
      amountAuctioneer: 0,
      id:
        auctions.sort((x, y) => {
          if (x.id > y.id) {
            return -1;
          }
          if (x.id < y.id) {
            return 1;
          }
          return 0;
        })[0].id + 1,
    };

    auctions.push(auction);
    buildAuction(auction, listOfAuctions);
    alert('Felicitaciones ' + auctioneer + '! Se registro el inicio de la Subasta "' + item + '" a ' + initialPrice + '$.');
  };

  searchAuction.onclick = () => {
    let searchValue = document.querySelector('#inputAuction');
    let auctionsNodes = document.querySelectorAll('.auction');

    let auctionsFinded = auctions.filter(auction => auction.item.includes(searchValue.value));

    for (let auctionNode of auctionsNodes) {
      if (!auctionsFinded.some(auction => auction.id == auctionNode.id)) {
        auctionNode.style.display = 'none';
      } else {
        auctionNode.style.display = '';
      }
    }
  };
};

const buildAuction = auction => {
  let auctionNode = document.createElement('div');
  auctionNode.id = auction.id;
  auctionNode.className = 'auction';
  let itemNameNode = document.createElement('div');
  itemNameNode.className = 'itemName';
  let lastPriceNode = document.createElement('div');
  lastPriceNode.className = 'lastPrice';
  let lastAuctioneerNode = document.createElement('div');
  lastAuctioneerNode.className = 'lastAuctioneer';
  let initialPriceNode = document.createElement('div');
  initialPriceNode.className = 'initialPrice';
  let amountAuctioneerNode = document.createElement('div');
  amountAuctioneerNode.className = 'amountAuctioneer';
  let bidButton = document.createElement('button');
  bidButton.className = 'bidButton';

  itemNameNode.innerHTML = auction.item;
  lastPriceNode.innerHTML = auction.lastPrice + '$';
  lastAuctioneerNode.innerHTML = 'Ultimo Postor: ' + auction.lastAuctioneer;
  initialPriceNode.innerHTML = 'Oferta Inicial: ' + auction.initialPrice + '$';
  amountAuctioneerNode.innerHTML = 'En linea: ' + auction.amountAuctioneer + ' Postores';
  bidButton.innerHTML = 'Ofertar';

  bidButton.onclick = () => {
    let lastPrice = auction.lastPrice;
    let validBid = false;
    let bid = 0;
    while (!validBid) {
      bid = prompt('Ingrese una oferta mayor a ' + lastPrice + '$ :');
      if (bid > lastPrice) {
        validBid = true;
      } else {
        alert('Por favor, Ingrese una oferta mayor a ' + lastPrice + '$!!');
      }
    }

    let auctioneer = prompt('Para entrar en la subasta "' + auction.item + '", debe ingresar su apodo:');

    alert(
      'Felicitaciones ' + auctioneer + '! Estas posicionado como el mejor postor en la subasta "' + auction.item + '" con el precio "' + bid + '"!'
    );

    lastPriceNode.innerHTML = bid + '$';
    lastAuctioneerNode.innerHTML = 'Ultimo Postor: ' + auctioneer;
  };

  auctionNode.append(itemNameNode, lastPriceNode, lastAuctioneerNode, initialPriceNode, amountAuctioneerNode, bidButton);
  listOfAuctions.append(auctionNode);
};

main();
