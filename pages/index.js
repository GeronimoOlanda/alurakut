
import { MainGrid } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/alurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(props){
  return(
    <Box>
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

export default function Home() {
  const githubUser = 'GeronimoOlanda';
  const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'juunegreiros',
    'GeronimoOlanda',
    'peas', 
    'rafaballerini', 
    'marcobrunodev', 
    'felipefialho'
  ];

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
                comunidades.push('Alura Kut');
                console.log(comunidades)
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
        <h2 className="smallTitle"> Comunidades ({comunidades.length})</h2>
        <ul>
            {comunidades.map((itemAtual)=>{
                return(
                <li>
                  <a href={`/users/${itemAtual}`} key={itemAtual}>
                  <img src={`http://placehold.it/300x300`} />
                    <span>{itemAtual}</span>
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
                  <li>
                    <a href={`/users/${githubUser}`} key={githubUser}>
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
