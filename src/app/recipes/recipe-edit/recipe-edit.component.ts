import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormControlDirective, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {


  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(

      (para: Params) => {

        this.id = +para['id'];
        this.editMode = para['id'] != null;  // true when edit and false for new
        this.initForm();

      }

    );


  }

  onSubmit() {

    // option 1 - creating a recipe object and then passing it

    /* const newRecipe = new Recipe(this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else

    this.recipeService.addRecipe(newRecipe);
*/

    //option 2 - since the form has the same structure and control names as the reicpe model , we can directly use the form value 

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else

      this.recipeService.addRecipe(this.recipeForm.value);
 this.onCancel(); // take us one step back from the current page
  }

  onAddIngredient() {

    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number){

    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);  // removes the ingredient
  }

  onCancel(){
this.router.navigate(['../'], {relativeTo: this.route}) // takes us one step back 
  }

  
  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {  // form definition / configuration 

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]); // form array initialized with empty array
    // If in edit mode, pull the existing recipe information - if not just a blank form => for adding new recipe
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({   // form group because we have 2 elements that define ingredients - name and amount
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])  //accept amount only > 0
          })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }



}
