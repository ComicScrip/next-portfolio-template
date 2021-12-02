import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import portfolioImg from '../public/images/portfolio.jpg';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout pageTitle='Home'>
      <div className={styles.container}>
        <h1>Bienvenue sur mon portfolio</h1>
        <Image src={portfolioImg} alt='portfolio' layout='responsive' />

        <p className={styles.bio}>
          Lorem Elsass Ipsum mitt picon bière munster du ftomi! Ponchour bisame.
          Bibbeleskaas jetz rossbolla sech choucroute un schwanz geburtstàg,
          Chinette dû, ìch bier deppfele schiesser. Flammekueche de knèkes
          Seppele gal! a hopla geburtstàg, alles fraü Chulia Roberts oder
          knäckes dûû blottkopf. Noch bredele schissabibala, yeuh e schmutz. E
          gewurtztraminer doch Carola schneck, schmutz a riesling de chambon eme
          rucksack Roger dû hopla geiss, jetz Chorchette de Scharrarbergheim.
          Kouglopf ech ìch wurscht gueut mitt schneck jetz a schiss mannele,
          knèkes saucisse de Niederhausbergen of fill mauls schéni fleischwurcht
          schnaps de eme gal nüdle blottkopf, de Chulien Roger hop pfourtz! bett
          mer ech schpeck un salami schmutz. Gal!
        </p>
      </div>
    </Layout>
  );
}
