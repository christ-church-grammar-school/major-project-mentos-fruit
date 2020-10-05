import React, {useState, useEffect, useRef} from 'react';
import { IonSearchbar, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { motion, useViewportScroll, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import './Recipes.css';
import { scanOutline } from 'ionicons/icons';
import { R1, R2, R3, R4, R5, R6, R7, R8 } from './RecipesList/index';

const Tab1: React.FC = () => {
  const [scale, setScale] = useState(40);
  const [zoom, setZoom] = useState(false);
  const [zoomN, setZoomN] = useState(10);
  const [complete, setComplete] = useState(false);
  const recipes = [
  {title: "Boiled Fresh Octopus", text: <R1/>, description: "Served simply with a soy sauce and wasabi dip.  So fresh and yummilicious!", src: "https://lh3.googleusercontent.com/mjfmoWDs83qZDDDkjg9tyQT55C-Fjhncn7c08VAklX3xcByZ0qfdc77eMhEvrqhZd6p7DQdvq6S5sZVIiQTKNfllH15GODAvGYZHwu_hmmUsncccOqFYdsRmi0v63npcAf-lg6tVUzldlfXWPyb9vn93XoFxrVgLAYY0GI4e3xVRhd6ytxrCP-q-owOtntQAJ25E2hMO1SU298XyUFSLjeAFtQi6sGMpC0lnUNop0U21leRxiPhd_eez1qjjY2pLCyYJy2bTvnuTz3ZoQsYxfTFEzoBB-6OMvq42XbFwHQZfIRR6Rrx6pG0ljxRyLQcaV2aoIAltRxythqn4ejV3NBQo8Wja_BxwZs19C81eNkBcPvVubAm0lE4f6SS3QXhLhGZY6Eeivn5Q6zfe5wINKTXoCMengayAR8wUvOUBQ5mgNathDXJK1f5XMTkVCmhmmDhXwYcrqZGxGS92yXdCRq711AbUltnWRTjlj-D_MjPK1Eu6Bifp-gRpO8txWhL6P34vgA-Ey-1uO1_ha7-yTpB8lEJQ61u5jQqEWZKW4ZSPwbWHAXc51bUQUfR4o6K7uXT4RsJGDiNwl36QgGd_tTJAJJwRSQlKf2y4gUaDGm8KBqF4Wr60szvwHNOUHri764sNKE-YJDA2BIq0FheoN4Q7BqkiCzNESl7FSPdb60sDnizoTa7nhRhQ-Crh6Rx54P6tdpjOamd6Vr5mQg=s500-no" },
  {title: "Grilled Octopus with Korean Barbecue Sauce and Baby Bok Choy Slaw", text: <R2/>, description: "A flavorful and aromatic octopus with a bold, caramelized flavor and crispy char.", photoSrc: "Photo: Kelsey Hansen; Food Styling: Rishon Hanners; Prop Styling: Audrey Davis", src: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1533154068%2FOcto495.jpg%3Fitok%3DUhnth-4x" },
  {title: "Chinese Celery and Baby Octopus", text: <R3/>, description: "The Vietnamese way.", src: "https://images.food52.com/tMt1q_4Vgvvb0OY-zhCTEPdfKdo=/1008x672/filters:format(webp)/939ed1fc-61b9-4284-a366-b93bf8f83376--celeryoctopus.jpg" },
  {title: "Fried Octopus with Garlic", text: <R4/>, description: "A quick and easy dish.", src: "https://misschinesefood.com/ezoimgfmt/misschinesefood.s3.us-west-1.amazonaws.com/wp-content/uploads/2020/03/21120842/Fried-Octopus-With-Garlic.jpg?ezimgfmt=ng:webp/ngcb2" },
  {title: "Stir-fried Spicy Squid and Octopus", text: <R5/>, description: "It tastes nice.", src: "https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/food/2015/03/19/7320aac4d40149279da84ed5d3903468/stir-fried-spicy-squid-and-octopus.jpg?width=922&height=768&mode=crop&anchor=topcenter&quality=75" },
  {title: "Spicy Vegetable Stir Fried Octopus", text: <R6/>, description: "Nakji Bokum is a very spicy octopus dish enjoyed by many Koreans.", src: "https://sparkpeo.hs.llnwd.net/e1/resize/630m620/e4/nw/8/4/l848331050.jpg" },
  {title: "Fiery Octopus (Ojingeo bokkeum)", text: <R7/>, description: "Korean red chilli paste and red chilli powder add an unusual dimension to this spicy octopus dish.", src: "https://www.hairybikers.com/uploads/images/_recipeImage/FieryOctopus.jpg" },
  {title: "Octopus and Cucumber Stir-Fry Seasoned with Garlic Soy Sauce", text: <R8/>, description: "Stir-fry cucumbers with garlic oil to make this simple-and-easy summer dish.", src: "https://secure.yamasa.com/recipe-img/1787.jpg" }];
  const [heights, setHeights] = useState([
    "unset",
    "unset",
    "unset",
    "unset",
    "unset",
    "unset",
    "unset",
    "unset",
  ]);
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
    e = e.currentTarget.parentElement;
    if (headerElement.current === null) return;
    const topOffset = e.getBoundingClientRect().top;
    const cardHeight = e.getBoundingClientRect().height;
    const headerHeight = headerElement.current.getBoundingClientRect().height;
    if (!zoom && heights[index] === "unset") {
        console.log("set to",cardHeight, index);
        setcardVariants({
            max: { ...commonMax, y: -(topOffset-headerHeight), height: String(window.innerHeight - headerHeight - navBarHeight + 10)+"px" },
            min: { ...commonMin, height: String(cardHeight)+"px"},
        });
        var temp = [...heights]
        temp[index]=String(cardHeight)+"px";
        setHeights(temp);
    } else {
        setcardVariants({
            max: { ...commonMax, y: -(topOffset-headerHeight), height: String(window.innerHeight - headerHeight - navBarHeight + 10)+"px" },
            min: { ...commonMin, height: heights[index]},
        });
    }
    console.log(heights[index]);
    if (zoom && e.firstElementChild.scrollTop !== 0) {
        const time = 500;
        scrollToY(0,time,e.firstElementChild);
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

        <p style={{textAlign: "center"}}> 8 Different ways to make Chinese Octopus, Recipe. </p>

        {recipes.map((recipe, index) => (
            <motion.div onAnimationComplete={onComplete} transition={cardTransition} variants={cardVariants} animate={(zoomN == index && zoom) ? "max" : "min"} className={"animationContainer"} key={index} >
            <IonCard mode="ios" className={!zoom && !complete ? "ionCards" : "ionCardsScroll"} >
              <div onClick={(e) => {triggerZoom(e, index)}}>
                <img src={recipe.src} />
                <h4>{recipe.photoSrc}</h4>
                <IonCardHeader>
                <IonCardSubtitle mode="ios">Recipe Number {index+1}!</IonCardSubtitle>
                <IonCardTitle mode="ios">{recipe.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent mode="ios">
                  {recipe.description}
                </IonCardContent>
              </div>
                <AnimatePresence>
                    {(zoomN == index && zoom && complete) &&
                    <motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{margin: 0}}>
                        {recipe.text}
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
