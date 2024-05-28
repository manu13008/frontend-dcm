import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from "../components/Header";

const CguScreen = () => {
  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Conditions Générales d'Utilisation</Text>
        
        <Text style={styles.sectionTitle}>Ce que nous proposons</Text>
        <Text style={styles.text}>
          Partager des expériences du quotidien avec les gens. Notre plateforme permet aux utilisateurs de publier leurs histoires, leurs conseils et leurs expériences pour aider et inspirer les autres.
        </Text>
        
        <Text style={styles.sectionTitle}>Ce que vous pouvez faire</Text>
        <Text style={styles.text}>
          Publier vos expériences du quotidien et interagir avec les publications des autres. Que ce soit des moments joyeux, des défis personnels ou des conseils pratiques, nous croyons que tout partage peut contribuer à un avenir meilleur.
        </Text>
        
        <Text style={styles.sectionTitle}>Qui sommes-nous ?</Text>
        <Text style={styles.text}>
          Nous sommes un groupe d'étudiants passionnés par la création d'une communauté en ligne positive et utile. Ce projet est actuellement un examen, mais nous aspirons à en faire une plateforme durable pour le partage d'expériences.
        </Text>
        
        <Text style={styles.sectionTitle}>Vos Droits et Obligations</Text>
        <Text style={styles.text}>
          En utilisant notre plateforme, vous acceptez de respecter les autres utilisateurs et de publier du contenu approprié. Nous nous réservons le droit de modérer et de supprimer tout contenu jugé inapproprié ou nuisible.
        </Text>
        
        <Text style={styles.sectionTitle}>Confidentialité et Sécurité</Text>
        <Text style={styles.text}>
          Nous prenons votre confidentialité au sérieux. Vos informations personnelles seront protégées et ne seront jamais partagées sans votre consentement.
        </Text>
        
        <Text style={styles.sectionTitle}>Contactez-nous</Text>
        <Text style={styles.text}>
          Si vous avez des questions ou des préoccupations concernant nos CGU, n'hésitez pas à nous contacter à devdcm@dcm.com.
        </Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#0468BE',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
  },
});

export default CguScreen;
