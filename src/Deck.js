export class Deck {
    cards = [];
    pictures = [ 'candycane', 'gingerbread', 'gumdrops', 'icecream', 'lollipop', 'lovehearts', 'peanuts' ];

    quantities = {
        orange: 7,
        purple: 7,
        yellow: 7,
        green: 7,
        pink: 8,
        blue: 8,
        double_orange: 2,
        double_purple: 2,
        double_yellow: 2,
        double_green: 2,
        double_pink: 2,
        double_blue: 3
    };

    index = -1;

    constructor() {
        this.cards = [];
    
        // Pictures
        for(let picture of this.pictures) {
            this.cards.push({
                squares: 0,
                className: picture
            });
        }
    
        // Singles
        for (let i=0; i < this.quantities.orange; i++) {
            this.cards.push({
                squares: 1,
                className: 'orange'
            });
        }
    
        for (let i=0; i < this.quantities.purple; i++) {
            this.cards.push({
                squares: 1,
                className: 'purple'
            });
        }
    
        for (let i=0; i < this.quantities.yellow; i++) {
            this.cards.push({
                squares: 1,
                className: 'yellow'
            });
        }
    
        for (let i=0; i < this.quantities.green; i++) {
            this.cards.push({
                squares: 1,
                className: 'green'
            });
        }
    
        for (let i=0; i < this.quantities.pink; i++) {
            this.cards.push({
                squares: 1,
                className: 'pink'
            });
        }
    
        for (let i=0; i < this.quantities.orange; i++) {
            this.cards.push({
                squares: 1,
                className: 'blue'
            });
        }
    
        // Doubles
        for (let i=0; i < this.quantities.double_orange; i++) {
            this.cards.push({
                squares: 2,
                className: 'orange'
            });
        }
    
        for (let i=0; i < this.quantities.double_purple; i++) {
            this.cards.push({
                squares: 2,
                className: 'purple'
            });
        }
    
        for (let i=0; i < this.quantities.double_yellow; i++) {
            this.cards.push({
                squares: 2,
                className: 'yellow'
            });
        }
    
        for (let i=0; i < this.quantities.double_green; i++) {
            this.cards.push({
                squares: 2,
                className: 'green'
            });
        }
    
        for (let i=0; i < this.quantities.double_pink; i++) {
            this.cards.push({
                squares: 2,
                className: 'pink'
            });
        }
    
        for (let i=0; i < this.quantities.double_orange; i++) {
            this.cards.push({
                squares: 2,
                className: 'blue'
            });
        }
    }

    next() {
        if (this.index + 1  < this.cards.length) {
            this.index++;
        }
        else {
            this.setup();
        }

        return this.cards[this.index];
    }

    restart() {
        this.setup();
    }
    
    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
    
    setup() {
        this.index = 0;
        this.cards = this.shuffle(this.cards);
    }
    
}

