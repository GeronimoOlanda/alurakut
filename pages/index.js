
import React from 'react';

import { MainGrid } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';

import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/alurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(props){
  return(
    <Box as="aside">
    <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}} />
    <hr />
    <p>
      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser} 
      </a>
    </p>
    <hr />
    <AlurakutProfileSidebarMenuDefault/>
   </Box>
  );
}

function ProfileRelationsBox(props){
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle"> {props.title}({props.items.length})</h2>
    <ul>
        {/* seguidores.map((itemAtual)=>{
            return(
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`} >
              <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })*/}
       </ul>
    </ProfileRelationsBoxWrapper>
  )
}
export default function Home() {
 
  const githubUser = 'GeronimoOlanda';
  const [comunidades, setComunidades] =  React.useState([{
    id: '0313123131',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  

  const pessoasFavoritas = [
    'juunegreiros',
    'GeronimoOlanda',
    'peas', 
    'rafaballerini', 
    'marcobrunodev', 
    'felipefialho'
  ];
  // 0 - Pegar o array de dados do github
const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function(){
      fetch('https://api.github.com/users/GeronimoOlanda/followers')

    .then(function(respostaDoServidor){
        return respostaDoServidor.json();
      })

      .then(function(RespostaCompleta){
       setSeguidores(RespostaCompleta);
      })

  }, []);
  // 1 - criar um box que vai ter um map, baseado nos itens do array do github
  return (
    <>
      <AlurakutMenu/>
      <MainGrid>
        {/*"grid-area: profileArea;"*/}
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">bem vindo</h1>
            <OrkutNostalgicIconSet />
          </Box>
          
          <Box>
              <h2 className="subTitle">O que voce deseja fazer?</h2>
              <form onSubmit={function handleCriarComunidade(event) {
                event.preventDefault();

                const dataDoForm = new FormData(event.target);// pega os dados do formulario

                const comunidade = {
                  id: new Date().toISOString(),
                  titulo: dataDoForm.get('title'),
                  imagem: dataDoForm.get('image'),
                }

               
                const comunidadesAtualizada = [...comunidades, comunidade];

                setComunidades(comunidadesAtualizada);
              }}>

                <div>
                  <input type="text" placeholder="Qual vai ser o nome da sua comunidade?" name="title" aria-label="Qual vai ser o nome da sua comunidade?"  style={{opacity: '0.4', fontWeight: 700}} />
                </div>
                <div>
                  <input placeholder="Colocar URL para usar de capa" name="image" aria-label="Colocar URL para usar de capa?"  style={{opacity: '0.4', fontWeight: 700}} />
                </div>
              <button style={{fontWeight: 700}}> Criar Comunidade</button>
              </form> 
          </Box>
        </div>
     
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        
        <ProfileRelationsBox title="Seguidores" items={seguidores} />
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle"> Comunidades ({comunidades.length})</h2>
        <ul>
            {comunidades.map((itemAtual)=>{
                return(
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`} >
                  <img src={itemAtual.image} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}
           </ul>
        </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da Comunidade ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((itemAtual)=>{
               
                return(
                  <li  key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            
          </ProfileRelationsBoxWrapper>
        </div>
        <div>
        </div>
      </MainGrid>
    </>
    );
}
