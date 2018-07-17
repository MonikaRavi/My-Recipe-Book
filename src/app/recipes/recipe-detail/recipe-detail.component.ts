import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {


 recipeDetail: Recipe ;
 id: number;

  constructor(private recipeService : RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(

      (para: Params) => {

        this.id = +para['id'];
        this.recipeDetail = this.recipeService.getRecipe(this.id);
      }
      
    );

  }

  onAddItemToShopping(){

this.recipeService.addIngredientstoShoppingList(this.recipeDetail.ingredients);

  }


  onEditRecipe(){

    this.router.navigate(['edit'], {relativeTo: this.route}); // we don't need id here because the id will already be in the URL - using relative path

    // Alternate way

  //  this.router.navigate(['../', this.id,'edit'], {relativeTo: this.route}); 

    // cobnstruncting complex path -> moving one step upwards, adding ID , edit to the URL

  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
