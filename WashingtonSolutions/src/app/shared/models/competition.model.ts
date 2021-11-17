export class Competition {
  constructor(
    public competitionID: number, 
    public name: string, 
    public gameTypeID: number, 
    public winnerID?: number
    ) { }
}
