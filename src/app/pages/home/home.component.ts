
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from '@angular/material/toolbar';
import { RandomGenerator } from '../../infra/random/random.infra';
import { GameViewModel, GameVM } from './game.viewmodel';

@Component({
    selector: 'home-root',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [MatToolbarModule, MatCardModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class HomeComponent implements OnInit {
  
  gameViewModel: GameViewModel;

  game!: GameVM;

  input: String = "";

  constructor(private readonly randomGenerator: RandomGenerator) {
    this.gameViewModel = new GameViewModel(randomGenerator, { max: 20, attempt: 5});
  }

  ngOnInit(): void {
    this.restartGame();
  }

  submit(): void {
    this.game = this.gameViewModel.guess(Number(this.input));
    this.input = "";
  }

  restartGame(): void {
    this.game = this.gameViewModel.newGame();
  }

}
