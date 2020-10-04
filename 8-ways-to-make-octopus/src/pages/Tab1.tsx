import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonSearchbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader mode="ios" translucent={true}>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

    <IonContent fullscreen>
      <IonHeader collapse="condense">
        
        <IonToolbar>
          <IonTitle size="large">Settings</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <IonButton expand="block">Recipe 1</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
