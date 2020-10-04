import React, {useState, useEffect} from 'react';
import { IonSearchbar, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { motion, useViewportScroll, useTransform } from "framer-motion";
import './Recipes.css';
import { scanOutline } from 'ionicons/icons';

const Tab1: React.FC = () => {
  const [scale, setScale] = useState(40);
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

  function textScroll(e) {
    var scrollTop = e.target.scrollTop;
    if ( scrollTop < step ) {
      setScale(max-(scrollTop/modifier));
    } else {
      setScale(max-(step/modifier));
    }
  }

  return (
    <IonPage>

      <IonContent scrollEvents={true} fullscreen={true}  className={"content"}>

    <div className={"innerScroll"} onScroll={(e) => {textScroll(e)}}>
     
      <IonHeader mode="md" className={"Header"} style={{position: "fixed"}}>
        <IonTitle style={{fontSize: scale}}>Octopus Recipes</IonTitle>
      </IonHeader>

      <div className={"centerAlign"}>
        <br></br><br></br><br></br>

        <p> 8 Different ways to make Chinese Octopus Recipe. </p>

        {recipes.map((recipe, index) => (
            <IonCard mode="ios" key={index}>
                <img src="https://www.maangchi.com/wp-content/uploads/2018/03/nakjibokkeum.jpg" />
                <IonCardHeader>
                <IonCardSubtitle>Recipe Number {index+1}!</IonCardSubtitle>
                <IonCardTitle>{recipe.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                Description
                </IonCardContent>
            </IonCard>))}
        </div>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
