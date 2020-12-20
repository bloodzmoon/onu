interface JoinGameAction {
  action: 'join'
  payload: {
    player: string
    gameId: string
  }
}

type Message = JoinGameAction

export const joinGameAction = (player: string, gameId: string) => {
  const msg: Message = {
    action: 'join',
    payload: { player, gameId },
  }
  return JSON.stringify(msg)
}
