import React, {useState, useEffect, useRef} from 'react';
import { IonSearchbar, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { motion, useViewportScroll, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import './Recipes.css';
import { receipt, scanOutline } from 'ionicons/icons';

const Tab1: React.FC = () => {
  const [scale, setScale] = useState(40);
  const [zoom, setZoom] = useState(false);
  const [zoomN, setZoomN] = useState(10);
  const [complete, setComplete] = useState(false);
  const Rec1: React.FC = () => {
    return(
    <>
    <IonCardContent mode="ios">
      <strong>Cooking tips:</strong>
     I think that the boiling window for your fresh octopus will be 
    anywhere from 15 minutes to 5 minutes for an octopus of similar size to ours which was a bit over one foot long. 
    15 minutes is what was recommended by our fish vendor and will probably give you a well cooked but still tender octopus. 
    5 minutes is how long we actually cooked and this gave us octopus cooked more on the rare side: the outer layer cooked crunchy but sashimi soft for the inner bits. 
    It really depends on your preference! 
    Of course please adjust the cooking time if your octopus is smaller or larger.
    <br/>
    <br/>
      Ingredients:<br/>1 octopus, very fresh
    <ol>
      <li>Separate the head from the tentacles if your fish guy hasn't done it yet. Remove the eyes, teeth, cartilage spine and whatever else that is in the octopus head.</li>
      <li>Rinse your octopus in running water for a minute. DO NOT cut up the octopus now. Cook first and slice it up later.</li>
      <li>In a large pot, heat enough water to cover the octopus by an inch or so. When the water boils add the octopus.</li>
      <li>When the water reboils, cover and cook 5-15 minutes according to your preference.  (See cooking tips above.)</li>
      <li>Remove from water immediately and let cool completely.  Slice tentacles at an angle into 1/4" thick slices and the head meat into neat strips with a good sharp sashimi knife (if you have one.)</li>
      <li>Arrange nicely on plate and serve with a dip of your best soy sauce with a dash of wasabi!</li>
    </ol>
    <br/>
    <br/>
    Retrieved from <a href="http://www.thehongkongcookery.com/2015/01/boiled-fresh-octopus.html">The Hong Kong Cookery</a>
    </IonCardContent>
    </>
  )}
  
  const recipes = [{title: "Boiled Fresh Octopus Recipe  白灼新鮮八爪魚", description: <Rec1/>},
  {title: "Name 2", description: "<p>Blah</p>"},
  {title: "Name 3", description: "<p>Blah</p>"},
  {title: "Name 4", description: "<p>Blah</p>"},
  {title: "Name 5", description: "<p>Blah</p>"},
  {title: "Name 6", description: "<p>Blah</p>"},
  {title: "Name 7", description: "<p>Blah</p>"},
  {title: "Name 8", description: "<p>Blah</p>"}];
  const modifier = 1.5;
  const max = 40;
  const step = 20;
  const navBarHeight = 56;
  const headerElement = useRef<HTMLIonHeaderElement>(null);
  const commonMax = {borderRadius : "0px", marginLeft: "0px", marginRight: "0px", zIndex: 5}
  const commonMin = {borderRadius : "8px", marginLeft: "24px", marginRight: "24px", y: 0, transitionEnd: { zIndex: 0, }}
  const [cardVariants, setcardVariants] = useState({
    max: { ...commonMax,  y: 0, height: "unset" },
    min: { ...commonMin, height: "unset" },
  })

  function textScroll(e) {
    var scrollTop = e.currentTarget.scrollTop;
    if ( scrollTop < step ) {
      setScale(max-(scrollTop/modifier));
    } else {
      setScale(max-(step/modifier));
    }
  }

  function triggerZoom(e, index) {
    if (headerElement.current === null) return;
    const topOffset = e.currentTarget.getBoundingClientRect().top;
    const cardHeight = e.currentTarget.getBoundingClientRect().height;
    const headerHeight = headerElement.current.getBoundingClientRect().height;
    if (!zoom && cardVariants.min.height === "unset") {
        console.log("set to",cardHeight);
        setcardVariants({
            max: { ...commonMax, y: -(topOffset-headerHeight), height: String(window.innerHeight - headerHeight - navBarHeight + 10)+"px" },
            min: { ...commonMin, height: String(cardHeight)+"px"},
        });
    } else {
        setcardVariants({
            max: { ...commonMax, y: -(topOffset-headerHeight), height: String(window.innerHeight - headerHeight - navBarHeight + 10)+"px" },
            min: { ...commonMin, height: cardVariants.min.height},
        });
    }
    if (zoom && e.currentTarget.firstElementChild.scrollTop !== 0) {
        const time = 500;
        scrollToY(0,time,e.currentTarget.firstElementChild);
        setTimeout(() => {
            setZoomN(index);
            setZoom(!zoom);
        },time )
    } else {
        setZoomN(index);
        setZoom(!zoom);
    }
  }

  function onComplete() {
        if (zoomN !== 10) {
            if (zoom) {
                setComplete(true);
            } else {
                setComplete(false);
            }
        }
    }

  const cardTransition = {
      duration: 0.4
  }

  function scrollToY(y, duration, element) {
    // cancel if already on target position
    if (element.scrollTop === y) return;
  
    const cosParameter = (element.scrollTop - y) / 2;
    let scrollCount = 0, oldTimestamp = null;
  
    function step (newTimestamp) {
      if (oldTimestamp !== null) {
        // if duration is 0 scrollCount will be Infinity
        // @ts-ignore
        scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
        if (scrollCount >= Math.PI) return element.scrollTop = y;
        element.scrollTop = cosParameter + y + cosParameter * Math.cos(scrollCount);
      }
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  return (
    <IonPage>

      <IonContent fullscreen={true}  className={"content"}>

    <div className={zoom ? "innerScrollDisallow" : "innerScrollAllow"} onScroll={(e) => {textScroll(e)}}>
    
      <IonHeader mode="md" className={zoom ? "headerOpaque" : "headerTranslucent"} style={{position: "fixed"}} ref={headerElement}>
        <IonTitle style={{fontSize: scale}}>Octopus Recipes</IonTitle>
      </IonHeader>

      <div className={"centerAlign"}>
        <br></br><br></br><br></br>

        <p style={{textAlign: "center"}}> 8 Different ways to make Chinese Octopus Recipe. </p>

        {recipes.map((recipe, index) => (
            <motion.div onAnimationComplete={onComplete} transition={cardTransition} variants={cardVariants} animate={(zoomN == index && zoom) ? "max" : "min"} className={"animationContainer"} key={index} onClick={(e) => {triggerZoom(e, index)}}>
            <IonCard mode="ios" className={!zoom ? "ionCards" : "ionCardsScroll"} >
                <img src="https://www.maangchi.com/wp-content/uploads/2018/03/nakjibokkeum.jpg" />
                <IonCardHeader>
                <IonCardSubtitle mode="ios">Recipe Number {index+1}!</IonCardSubtitle>
                <IonCardTitle mode="ios">{recipe.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent mode="ios">
                The {index+1}th delicious recipe on offer
                </IonCardContent>
                <AnimatePresence>
                    
                    {(zoomN == index && zoom && complete) &&
                    <motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{margin: 0}}>
                      {recipe.description}
                    </motion.div>}
                </AnimatePresence>
            </IonCard>
            </motion.div>))}
        </div>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
