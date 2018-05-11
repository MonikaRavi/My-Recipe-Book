import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {


// making recipes array as type model Recipe

  recipes : Recipe[] = [
  
      new Recipe('Idli','Healthy Breakfast of rice and lentils','https://i.ndtvimg.com/i/2017-11/oats-idli_620x330_71510224674.jpg'),

      new Recipe('Idli','Healthy Breakfast of rice and lentils','https://i.ndtvimg.com/i/2017-11/oats-idli_620x330_71510224674.jpg')

  ] ;  


  constructor() { }

  ngOnInit() {
  }

}
