import React from 'react';
import './CommonRecipeStyles.css';

const R2: React.FC = () => {
  return (<>
        <b className={"text"}>Ingredients:</b>
        <ul>
            <li>1 Octopus, very fresh</li>
        </ul>
        <p className={"text"}>
        <br/>
        <b>Cooking tips:</b> I think that the boiling window for your fresh octopus will be anywhere from 15 minutes to 5 minutes for an octopus of similar size to ours which was a bit over one foot long.  15 minutes is what was recommended by our fish vendor and will probably give you a well cooked but still tender octopus.  5 minutes is how long we actually cooked and this gave us octopus cooked more on the rare side: the outer layer cooked crunchy but sashimi soft for the inner bits.  It really depends on your preference!  Of course please adjust the cooking time if your octopus is smaller or larger.
        <br/><br/>
        <b>Directions:</b>  Separate the head from the tentacles if your fish guy hasn't done it yet.  Remove the eyes, teeth, cartilage spine and whatever else that is in the octopus head.  Rinse your octopus in running water for a minute.  DO NOT cut up the octopus now.  Cook first and slice it up later.
        <br/><br/> In a large pot, heat enough water to cover the octopus by an inch or so.  When the water boils add the octopus.  When the water reboils, cover and cook 5-15 minutes according to your preference.  (See cooking tips above.)  Remove from water immediately and let cool completely.  Slice tentacles at an angle into 1/4" thick slices and the head meat into neat strips with a good sharp sashimi knife (if you have one.)  Arrange nicely on plate and serve with a dip of your best soy sauce with a dash of wasabi!
        <br/><br/> Taken from <a href="http://www.thehongkongcookery.com/2015/01/boiled-fresh-octopus.html">The Hong Kong Cookery</a>.
        <br/><br/> 
        </p>
      </>
  );
};

export default R2;
