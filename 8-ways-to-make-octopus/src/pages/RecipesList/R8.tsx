import React from 'react';
import './CommonRecipeStyles.css';

const R2: React.FC = () => {
  return (<>
        <b className={"text"}>Ingredients:</b>
        <ul>
            <li>2 pcs cucumbers</li>
            <li>100g Octopus (boiled)</li>
            <li>2 cloves Garlic</li>
            <li>1/2 tablespoon REGULAR SOY SAUCE</li>
            <li>2 pinches Salt</li>
            <li>as you need Black pepper (coarsely ground)</li>
            <li>1 tablespoon Olive oil</li>
        </ul>
        <p className={"text"}>
        <br/>
        <b>Directions:</b>  Chop off the both ends of cucumbers, and partially peel the skin. Cut the cucumbers and boiled octopus into rolling wedges. Slice garlic.
        <br/><br/> Put olive oil and garlic in a frying pan, and stir-fry over low heat until the garlic slightly browns.
        <br/><br/> Add cucumbers and octopus, and quickly stir-fry over high heat. Once coated with oil, pour A and stir-fry.
        <br/><br/> Taken from <a href="https://recipe.yamasa.com/en/recipes/1787">TADASUKE TOMITA on Happy Recipe</a>.
        <br/><br/> 
        </p>
      </>
  );
};

export default R2;
