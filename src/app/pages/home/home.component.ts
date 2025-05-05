import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from '@angular/material/toolbar';
import { GameState, GameViewModel, GameVM } from './game.viewmodel';

@Component({
    selector: 'home-root',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [MatToolbarModule, CommonModule, MatCardModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class HomeComponent implements OnInit {
  
  gameViewModel: GameViewModel;

  game!: GameVM;

  input: String = "";

  constructor() {
    this.gameViewModel = new GameViewModel();
  }

  ngOnInit(): void {
      this.game = this.gameViewModel.newGame();
  }

  submit(): void {
    this.game = this.gameViewModel.guess(Number(this.input));
    this.input = "";
  }

}
