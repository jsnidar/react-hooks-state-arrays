import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] =useState('All')
  
  const foodsToDisplay = foods.filter((food) => {
    if(filterBy === 'All') {
      return true;
    }else{
      return food.cuisine === filterBy;
    }
  });

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray);
  }

  function handleClick (id) {
    //My solution
    const newFoodArray = [...foods]
    const index = newFoodArray.findIndex(food => food.id === id)
    newFoodArray[index].heatLevel++
    //Their solution. 
    // const newFoodArray = foods.map((food) => {
    //   if (food.id === id) {
    //     return {
    //       ...food,
    //       heatLevel: food.heatLevel + 1,
    //     };
    //   } else {
    //     return food;
    //   }
    // });
    //I don't know which is better. Mine covers less lines. At first I thought I liked theirs better but now I don't know. 
    setFoods(newFoodArray)
  }
  
  const list = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleClick (food.id)}>
      { food.name }| Cuisine: { food.cuisine } | Heat: { food.heatLevel}
    </li> 
  ))
  
  function handleDropdownFilter (event){
    setFilterBy(event.target.value)
    console.log(foods)
  }
 
  return (
    <div>
      <select onChange={handleDropdownFilter}name="filter">
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{list}</ul>
    </div>
  );
}

export default SpicyFoodList;
