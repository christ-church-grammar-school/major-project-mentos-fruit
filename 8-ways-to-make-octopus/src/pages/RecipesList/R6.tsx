import React from 'react';
import './CommonRecipeStyles.css';

const R2: React.FC = () => {
  return (<>
        <b className={"text"}>Ingredients:</b>
        <ul>
            <li>1 lb octopus (squid can be used as a substitute).</li>
            <li>1 cup onion, diced.</li>
            <li>2 chilies or jalapenos, sliced on the bias.</li>
            <li>2 green onions, sliced on the bias.</li>
            <li>1 cup zucchini strips.</li>
            <li>1/2 cup carrots thin strips.</li>
            <li>1 red or green peppers, sliced in long strips.</li>
        </ul>
        <b className={"text"}>Sauce Ingredients:</b>
        <ul>
            <li>1 cup mushrooms, quartered (optional).</li>
            <li>2 1/2 tbsp kochujang (chili paste).</li>
            <li>2 tbsp chili powder.</li>
            <li>1 tbsp soy sauce.</li>
            <li>2 tbsp sesame oil.</li>
            <li>1 tbsp sesame seeds.</li>
            <li>2 tbsp minced garlic.</li>
        </ul>
        <p className={"text"}>
        <br/>
        <b>Directions:</b>  Wash and rinse octopus, cut the legs into 2â€-3" lengths, open head and take out inside, quarter the head. Drain well.
        <br/><br/> Prepare and mix all ingredients for sauce
        <br/><br/> Combine final sauce with octopus and marinate for 10 minutes.
        <br/><br/> Heat pan on a medium high heat, cook for 8-10 minutes or until done.
        <br/><br/> Taken from <a href="https://misschinesefood.com/fried-octopus-with-garlic/">KIERAE on SparkRecipes</a>.
        <br/><br/> 
        </p>
      </>
  );
};

export default R2;
