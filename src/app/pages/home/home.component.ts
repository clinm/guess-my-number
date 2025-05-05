import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from '@angular/material/toolbar';
import { GameState, GameVM } from './game.viewmodel';

@Component({
    selector: 'home-root',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [MatToolbarModule, CommonModule, MatCardModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class HomeComponent {
  
  game: GameVM = {
    state: GameState.WIN,
    guesses: [
      {
        userGuess: 10,
        response: "Trop grand"
      }, {
        userGuess: 5,
        response: "Trop petit"
      }, {
        userGuess: 8,
        response: "Trouvé !"
      }
    ]
  };


  constructor() {}

}
