export class Tournament {
  constructor(
    public tournamentID: number, 
    public name: string, 
    public startDate: Date, 
    public endDate: Date, 
    public competitionID : number, 
    public winnerID?: number
    ) {

  }
}
