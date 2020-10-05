import React, {useState, useEffect, useRef} from 'react';
import { IonSearchbar, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { motion, useViewportScroll, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import './Recipes.css';
import { scanOutline } from 'ionicons/icons';

const Tab1: React.FC = () => {
  const [scale, setScale] = useState(40);
  const [zoom, setZoom] = useState(false);
  const [zoomN, setZoomN] = useState(10);
  const [complete, setComplete] = useState(false);
  
  const recipes = [{title: "Name 1"},
  {title: "Name 2"},
  {title: "Name 3"},
  {title: "Name 4"},
  {title: "Name 5"},
  {title: "Name 6"},
  {title: "Name 7"},
  {title: "Name 8"}];
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
            max: { ...commonMax, y: -(topOffset-headerHeight), height: String(window.innerHeight - headerHeight - navBarHeight)+"px" },
            min: { ...commonMin, height: String(cardHeight)+"px"},
        });
    } else {
        setcardVariants({
            max: { ...commonMax, y: -(topOffset-headerHeight), height: String(window.innerHeight - headerHeight - navBarHeight)+"px" },
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
    
    console.log(String(window.innerHeight - headerHeight ));    
    console.log(cardHeight);
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
                Description
                </IonCardContent>
                <AnimatePresence>
                    
                    {(zoomN == index && zoom && complete) &&
                    <motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{margin: 0}}>
                        <p>
                        First 
                        you think about what you did
                        <br></br>
                        Then make the octopus
                        
                        </p>
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
