import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class RecipeOrganizer extends React.Component {
  constructor(props) {
    super(props);
    var recipes = this.localStorageFinder();
    this.state = recipes;
  }
  localStorageFinder() {
    if (localStorage.getItem('_localrecipebox')) {
      var temp = localStorage.getItem('_localrecipebox');
      return { recipes: JSON.parse(temp) };
    } else {
      return {
        recipes: [
          {
            edit: false,
            name: "Banana Bread",
            ingredients: "flour, eggs, bananas",
            key: "key1"
          }, {
            edit: false,
            name: "Chocolate Chip Cookies",
            ingredients: "flour, eggs, baking soda, butter, sugar, chocolate chips",
            key: "key2"
          }, {
            edit: false,
            name: "Sugar Cookies",
            ingredients: "flour, eggs, baking soda, butter, sugar",
            key: "key3"
          }
        ]
      }
    }
  }
  addRecipe() {
    this.closeAllOpen();
    this.state.recipes.push({
      edit: true,
      name: "Recipe Name",
      ingredients: "Ingredients",
      key: "key" + (Math.random() * Math.random())
    });
    var heightProp = document.getElementById("app").clientHeight;
    document.getElementById("app").style.height = ((heightProp + 102) + "px");
    this.forceUpdate();
  }
  closeAllOpen() {
    var allList = this.state.recipes;
    var list = allList.filter(function (item) {
      return item = true;
    });
    for (let i = 0; i < list.length; i++) {
      list[i].edit = false;
    }
    this.forceUpdate;
  }
  editRecipe(index) {
    this.closeAllOpen();
    this.state.recipes[index].edit = true;
    this.forceUpdate();
  }
  deleteRecipe(index) {
    delete this.state.recipes[index];
    this.forceUpdate();
    var save = this.state.recipes.filter(function (item) {
      return item = true
    });
    localStorage.setItem('_localrecipebox', JSON.stringify(save));
    var heightProp = document.getElementById("app").clientHeight;
    document.getElementById("app").style.height = ((heightProp - 162) + "px");
  }
  cancelEdit(index) {
    this.state.recipes[index].edit = false;
    if (this.state.recipes[index].name === 'Recipe Name' && this.state.recipes[index].ingredients === 'Ingredients') {
      this.deleteRecipe(index);
    }
    this.forceUpdate();
  }
  saveRecipe(index) {
    const newRecipe = this.refs.newRecipe.value;
    const newIngredients = this.refs.newIngredients.value;
    this.state.recipes[index].edit = false;
    this.state.recipes[index].name = newRecipe;
    this.state.recipes[index].ingredients = newIngredients;
    this.forceUpdate();
    var save = this.state.recipes.filter(function (item) {
      return item = true
    });
    localStorage.setItem('_localrecipebox', JSON.stringify(save));
  }
  render() {
    const displayItems = this.state.recipes.map((item, index) => (
      <div key={"major_" + index}>
        {item.edit
          ? (
            <div className="recipeEdit" key={"keyEdit_" + index}>Recipe:
              <textarea ref="newRecipe" type="text" id="editName" defaultValue={item.name}></textarea>
              <button onClick={() => this.saveRecipe(index)}>Save</button>
              <button onClick={() => this.cancelEdit(index)}>Cancel</button><br />Ingredients:
              <textarea ref="newIngredients" id="editIngredients" defaultValue={item.ingredients}></textarea>
            </div>
          )
          : (
            <div className="recipe" key={"key_" + index}>
              <h3 id="recipeName">{item.name}
                <button onClick={() => this.editRecipe(index)}>Edit</button>
                <button onClick={() => this.deleteRecipe(index)}>Remove</button>
              </h3>
              <h4 id="recipeIngredients">{item.ingredients}</h4>
            </div>
          )
        }
      </div>
    ));

    return (
      <div>
        <h1>React Recipe Box</h1>
        {displayItems
        }
        <div id="footer">
          <button onClick={() => this.addRecipe()}>
            Add Recipe
        </button>
          <footer>Created by Elliott Alexander</footer>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <RecipeOrganizer />, document.getElementById("app"));
