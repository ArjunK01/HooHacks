import React,{useContext, useEffect,useState} from "react";
import { Navigate } from "react-router";
import styled from "styled-components";
import colors from "../Constants/Colors";
import {AuthContext} from "../context/AuthProvider";
import {ApiContext} from "../context/ApiProvider"
import firebase from "../firebase/firebase"


const PendingGame = ({ game }) => {

  const { games } = useContext(ApiContext);
  const { user } = useContext(AuthContext);
  const [gameKey, setGameKey]=useState(null)
  const[done, setDone] = useState(false)

  const [nav, setNav] = useState(false)

  const joinGame = (user,key) => {
    
    firebase.firestore().collection('Games').doc(key).update({
      players: [...game.players, {card:30,stock:0,money:0,name:[user.username,user.uid]}]
    }).then((doc)=>{
        setGameKey(key)
      })
      
    }


  

  //en game is full and im in the game, redirect to games/(id of pending)
    //in the game/askdljsalkdj, if doesnt exist, and creator of pending game with same id create new game
    // pendingGames.find(game=>{
    //   if(game.players.find(g=>g.id==user.uid) && game.players.length==4){
    //     console.log('in hereee');
    //     setNav(true)

    //   }
    // })

  

        if(gameKey) {
        return <Navigate to={`/games/${gameKey}`}/>
        }
        if(!game) return <p>Loading</p>
  return (
    <Container>
      
      <Name>{game.name}</Name>
      <Creator>{game?.createdBy}</Creator>
      <Players>
        <svg
          style={{ width: 30, opacity: 0.7 }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {game?.players?.length}/4
      </Players>
      {/*<Join>Join game</Join>*/}
      
      { game?.players?.find(m => m.name[0] == user.username)?<p>Waiting for more players</p> :<Join onClick={() => joinGame(user,game.key)}>Join Game</Join> }
    </Container>
  );
};

const Container = styled.div`
  margin: 24px 0px;
  border: 2px solid ${colors.gray600};
  padding: 16px;
  background-color: ${colors.gray700};
  display: flex;
  border-radius: 5px;
  align-items: baseline;
`;

const Name = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const Creator = styled.p`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  opacity: 0.6;
  margin-left: 24px;
`;

const Join = styled.div`
  margin-left: auto;
  font-size: 20px;
`;
const Players = styled.div`
  display: flex;
  align-self: center;
  margin-left: 24px;
  font-size: 18px;
  align-items: center;
  gap: 6px;
`;

const Create = styled.div`
  font-size: 18px;
  border: 2px solid ${colors.gray500};
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
`;

export default PendingGame;
