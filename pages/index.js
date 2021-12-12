import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import portfolioImg from '../public/images/portfolio.jpg';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout pageTitle='Home'>
      <div>
        <Image src={portfolioImg} alt='portfolio' layout='responsive' />
        <h1 className='pageTitle'>Salut ! Je suis Dave Lopper</h1>

        <p className='p-6 pt-0'>
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

        <p className='p-6 pt-0'>
          Lorem Elsass ipsum quam, blottkopf, sit aliquam yeuh. jetz gehts los
          sit Chulien gewurztraminer ullamcorper Miss Dahlias id Gal. hopla
          dolor tellus id, pellentesque hoplageiss Wurschtsalad flammekueche und
          sed consectetur in, picon bière semper purus Chulia Roberstau munster
          sit so barapli wurscht eget Mauris lacus Pfourtz ! météor
          Kabinetpapier elit mamsell merci vielmols schpeck vielmols,
          suspendisse amet, non hopla Oberschaeffolsheim gravida amet
          kartoffelsalad hopla rucksack hopla ac porta baeckeoffe Salut bisamme
          varius ante knack Richard Schirmeck mollis Strasbourg Gal ! kougelhopf
          habitant ornare sed tristique Racing. Carola dignissim wie rossbolla
          schneck et Yo dû. amet adipiscing knepfle DNA, leo non libero. schnaps
          leverwurscht Huguette Pellentesque sagittis elementum placerat nüdle
          mänele vulputate turpis turpis, leo kuglopf réchime libero,
        </p>
      </div>
      <Link href='/projects' passHref>
        <a className='w-1/2 flex bg-orange-600 justify-center max-w-xs m-auto p-8 text-3xl text-center rounded-lg mt-8 mb-16 font-bold hover:bg-orange-300 hover:text-black'>
          Mes réalisations
        </a>
      </Link>
    </Layout>
  );
}
