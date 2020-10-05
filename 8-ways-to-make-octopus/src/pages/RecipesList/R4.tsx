import React from 'react';
import './CommonRecipeStyles.css';

const R2: React.FC = () => {
  return (<>
        <b className={"text"}>Ingredients:</b>
        <ul>
            <li>500g Octopus</li>
            <li>Ginger</li>
            <li>1 Spoon soy sauce</li>
            <li>1 Spoon Oyster sauce</li>
            <li>1 Spoon vinegar</li>
            <li>1 Red pepper</li>
            <li>Salt</li>
            <li>Oil</li>
        </ul>
        <p className={"text"}>
        <br/>
        <b>Directions:</b>  Remove the viscera and teeth, and scrub.
        <br/><br/> Cut into large pieces and drain.
        <br/><br/> Cut garlic into sections.
        <br/><br/> Heat oil in a pan, add ginger and stir-fry.
        <br/><br/> Add octopus and stir fry for 1 or 2 minutes. Add soy sauce, oil, vinegar and salt and stir well.
        <br/><br/> Add the garlic and red pepper, and fry until the garlic is soft and ready to serve.
        <br/><br/> Taken from <a href="https://misschinesefood.com/fried-octopus-with-garlic/">QingH on Miss Chinese Food</a>.
        <br/><br/> 
        </p>
      </>
  );
};

export default R2;
