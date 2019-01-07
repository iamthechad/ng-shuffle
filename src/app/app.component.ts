import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private readonly ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  private readonly suits = ["♥", "♦", "♠", "♣"];

  suitColor = {
    "♠": "black",
    "♣": "black",
    "♦": "red",
    "♥": "red"
  };
  cards = [];
  isDeckShuffled = false;
  shuffleCount = 0;
  shuffleSpeed = "shuffleMedium";
  shuffleTypes = ["Slow", "Medium", "Fast"];

  ngOnInit(): void {
    this.displayInitialDeck();
  }

  displayInitialDeck() {
    this.cards = [];
    this.shuffleCount = 0;
    let id = 0;
    this.suits.forEach(suit => {
      this.ranks.forEach(rank => {
        this.cards.push({
          id: id++,
          rank,
          suit
        });
      });
    });
    this.isDeckShuffled = false;
  }

  shuffleDeck() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);

      const temp = this.cards[i];
      this.cards[i] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
    this.isDeckShuffled = true;
    this.shuffleCount ++;
  }

  shuffleSpeedName(type: string): string {
    return `shuffle${type}`;
  }
}
