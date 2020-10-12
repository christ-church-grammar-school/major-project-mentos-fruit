import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About Us.</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{textAlign: "center"}}>
        <div className="thing" style={{textAlign: "center"}}>
          <IonCard mode="ios">
          <IonCardHeader>
            <img src="./visionary.jpg" className="img"/>
            <IonCardSubtitle mode="ios">Mr Jian Yang</IonCardSubtitle>
            <IonCardTitle mode="ios">Our Visionary.</IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{textAlign: "left"}}>
          <p className="norm">Question for you: What is better than octopus recipe? Answer for you: 8 Different traditional recipes for octopus.</p> <br/>
          <p className="norm">
            What if I told you that there is a app on the market that is this dream app.
          </p>
          <p className="norm">
            Our app is greatest revolution in technological advancement. <br/>
            Never before we have a recipe app.<br/> We are innovation.<br/>
            Our app will cost $99 to use one-time, and $999 to use forever.<br/>
            We are the best company. <br/><br/>
            Next things to build:
          </p>
          <ol className="norm">
            <li>Google but for a chinese market</li>
            <li>pied piper but for a chinese market</li>
            <li>twitter but for a chinese market</li>
            <li>instagram but for a chinese market</li>
            <li>tesla but for a chinese market</li>
            <li>christ church but for a chinese market</li>
            <li>apple but for a chinese market</li>
            <li>etc.</li>
            <li>It is a very sophisticated strategy!</li>
          </ol>
          </IonCardContent>
        </IonCard>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
