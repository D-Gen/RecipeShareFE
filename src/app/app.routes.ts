import {Routes} from '@angular/router';
import {AddRecipePage} from './addRecipe/app.addrecipe.component';
import {HomePage} from './home/app.home.component';

export const routes: Routes = [
  {
    title: "Home",
    path : "",
    component: HomePage
  },
  {
    title: "Add Recipe",
    path : "add-recipe",
    component: AddRecipePage
  },
  {
    title: "Update Recipe",
    path : "update-recipe/:id",
    component: AddRecipePage
  },

];
