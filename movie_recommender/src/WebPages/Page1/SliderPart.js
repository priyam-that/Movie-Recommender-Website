import React,{useState} from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import style from '../Styles/style.module.css'
import Trailer from '../Page5/Trailer'
import { useNavigate } from 'react-router-dom';

//creating a static array of objects containg what to show in the slider 
const slideImages = [
  {
    url: './images/img1.jpg',
    title: 'The Batman',
    caption: 'Batman ventures into Gotham City\'s underworld when a sadistic killer leaves behind a trail of cryptic clues. As the scale of the perpetrator\'s plans become clear, he must bring justice to the abuse of power and corruption that plagues the metropolis.',
    trailerUrl:"https://youtu.be/mqqft2x_Aa4?si=v3MWisUPyM7rhC7G"
  },
  {
    url: './images/img2.jpg',
    title: 'Saaho',
    caption: 'This action thriller is about a power battle which is taking place in the higher echelons of power unrelated and unconnected episodes occurring in different parts of the globe, Intertwine in an unforeseen manner to a revelation of mind games.',
    trailerUrl:"https://youtu.be/8N7Zh7Qg_v8?si=oyBECiwqzOne0-hu"
  },
  {
    url: './images/img3.jpg',
    title: 'Joker',
    caption: 'Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he\'s part of the world around him. Isolated, bullied and disregarded by society, Fleck begins a slow descent into madness as he transforms into the criminal mastermind known as the Joker.',
    trailerUrl:"https://youtu.be/zAGVQLHvwOY?si=2zbx-8xLhVgHihuH"
  },
  {
    url: './images/img4.jpg',
    title: 'Avatar',
    caption: 'On the lush alien world of Pandora live the Na\'vi, beings who appear primitive but are highly evolved. Because the planet\'s environment is poisonous, human/Na\'vi hybrids, called Avatars, must link to human minds to allow for free movement on Pandora. Jake Sully (Sam Worthington), a paralyzed former Marine, becomes mobile again through one such Avatar and falls in love with a Na\'vi woman (Zoe Saldana). As a bond with her grows, he is drawn into a battle for the survival of her world.',
    trailerUrl:"https://youtu.be/5PSNL1qE6VY?si=wt9E4n5EWHqxSokO"
  },
  {
    url: './images/img5.jpg',
    title: 'Student of the Year',
    caption: 'It\'s a story of three students at St. Theresa\'s College, Rohan Nanda, Abhimanyu Singh, and Shanaya Singhania, who compete for the prestigious title of "Student of the Year" through various academic and extracurricular activities .',
    trailerUrl:"https://youtu.be/fivOhPjX9YM?si=JiwtMif-NuqZJ5BH"
  },
  {
    url: './images/img6.jpg',
    title: 'The Marvels',
    caption: 'Carol Danvers, aka Captain Marvel, has reclaimed her identity from the tyrannical Kree and taken revenge on the Supreme Intelligence. However, unintended consequences see her shouldering the burden of a destabilized universe. When her duties send her to an anomalous wormhole linked to a Kree revolutionary, her powers become entangled with two other superheroes to form the Marvels.',
    trailerUrl:"https://youtu.be/wS_qbDztgVY?si=ZLj6xNDmXbhZBt2v"
  },
  {
    url: './images/img7.jpg',
    title: 'Interstellar',
    caption: 'In Earth\'s future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth\'s population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper (Matthew McConaughey) and a team of researchers through the wormhole and across the galaxy to find out which of three planets could be mankind\'s new home.',
    trailerUrl:"https://youtu.be/zSWdZVtXT7E?si=1eFvySJ_KgAF8S6f"
  },
  {
    url:'./images/img8.jpg',
    title:'RRR',
    caption:'RRR is an entirely fictitious story incorporating the lives of two real-life Indian revolutionaries, namely Alluri Sitarama Raju and Komaram Bheem, who fought against the British Raj and the Nizam of Hyderabad respectively. Charan plays Rama Raju while Rama Rao plays Komaram Bheem.',
    trailerUrl:"https://youtu.be/f_vbAtFSEc0?si=PZ9NU6qZspSe8U-Y"
  },
  {
    url: './images/img9.jpg',
    title: 'Thor: The Dark World',
    caption: 'In ancient times, the gods of Asgard fought and won a war against an evil race known as the Dark Elves. The survivors were neutralized, and their ultimate weapon -- the Aether -- was buried in a secret location. Hundreds of years later, Jane Foster (Natalie Portman) finds the Aether and becomes its host, forcing Thor (Chris Hemsworth) to bring her to Asgard before Dark Elf Malekith (Christopher Eccleston) captures her and uses the weapon to destroy the Nine Realms -- including Earth.',
    trailerUrl:"https://youtu.be/npvJ9FTgZbM?si=V4w0a-t0lQ7qsbFI"
  },
  {
    url: './images/img10.jpg',
    title: 'Star Wars: The Force Awakens',
    caption: 'A new order threatens to destroy the New Republic. Finn, Rey and Poe, backed by the Resistance and the Republic, must find a way to stop them and find Luke, the last surviving Jedi.',
    trailerUrl:"https://youtu.be/sGbxmsDFVnE?si=2BUSQNDayP6AczCG"
  },


];
const SliderPart = () => {
  const [showTrailer,setShowTrailer]=useState(false);
  const [imageTrailerUrl,setImageTrailerUrl]=useState('');
  const navigateToDetails=useNavigate();


  //getting the link of the particular movie in the slider and set the link in a state function to pass as props 
  const showTrailerBox=(link)=>{
    setShowTrailer(true);
    setImageTrailerUrl(link);
  }
  

  return (
    <>
      {/* creating the slider container */}
      <div id='slider' className={style.container}>

        {/* creating the slider */}
        <Slide arrows={true} 
       prevArrow={<div style={{ fontSize: "30px", color: "white", marginLeft: "10px" }}>❮</div>} 
       nextArrow={<div style={{ fontSize: "30px", color: "white", marginRight: "10px" }}>❯</div>}>
          {slideImages.map((image, index) => (
            <div key={index}>
              <div className={style.slider} style={{ 'backgroundImage': `url(${image.url})` }}></div>
              <div className={style.slideTitle}>{image.title}</div>
              <div className={style.slideCaption}>{image.caption.length<200?image.caption:image.caption.slice(0,200)+" ..."}</div>
              <div className={style.slideShowInfo}>
                <button onClick={()=>{navigateToDetails("/Details",{state:{movieTitle:(image.title)}})}}>Details</button>
                <button onClick={()=>{showTrailerBox(image.trailerUrl)}}>Trailer</button>
              </div>
            </div>
          ))}
        </Slide>
      </div>

      {/* if button clicked then only show the trailer  */}
      {
        showTrailer &&<Trailer setShowTrailer={setShowTrailer} imageTrailerUrl={imageTrailerUrl} />
      }
      
    </>
  )
}

export default SliderPart
