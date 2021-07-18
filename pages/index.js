

import React from 'react';
import ReactDOM from 'react-dom'
import Favicon from 'react-favicon'

import nookies from 'nookies';
import jwt from 'jsonwebtoken';

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

    </ProfileRelationsBoxWrapper>
  )
}
export default function Home(props) {
  const usuarioAleatorio = props.githubUser;

  const githubUser = 'GeronimoOlanda';
  const [comunidades, setComunidades] =  React.useState([]);


  const pessoasFavoritas = [
    'juunegreiros',
    'GeronimoOlanda',
    'peas', 
    'rafaballerini', 
    'marcobrunodev', 
    'felipefialho'
  ];
  const pessoasSeguidoras = [
    'juunegreiros',
    'GeronimoOlanda',
    'peas'
  ]
  React.useEffect(()=>{
      document.title = "Alurakut- A sua imersão total!";
  }, []);

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

      //API GraphQL
      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': '361aa11281fbc877d8d7f4fd582be0',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }, 
        body: JSON.stringify({ "query": `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }` })
      })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesVindasDoDato)
        setComunidades(comunidadesVindasDoDato)
      })

  }, []);
  // 1 - criar um box que vai ter um map, baseado nos itens do array do github
  return (
    <>
     <Favicon url='https://iconape.com/wp-content/files/sz/283706/svg/283706.svg'  title="AkuraKut" />
      <AlurakutMenu/>
      <MainGrid>
        {/*"grid-area: profileArea;"*/}
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={usuarioAleatorio}/>
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
                  imageUrl: dataDoForm.get('image'),
                  creatorSlug: usuarioAleatorio,
                }

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)

                const comunidadesAtualizada = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizada);
                })

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
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Seguidores({pessoasSeguidoras.length})</h2>
            <ul>
              {pessoasSeguidoras.map((itemAtual)=>{
               
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
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle"> Comunidades ({comunidades.length})</h2>
        <ul>
            {comunidades.map((itemAtual)=>{
                return(
                <li key={itemAtual.id}>
                  <a href={`/comunidades/${itemAtual.id }`} >
                  <img src={itemAtual.imageUrl} />
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
      </MainGrid>
    </>
    );
}
export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}