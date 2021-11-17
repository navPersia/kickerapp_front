export class Table {
  constructor(
    public tableID: number, 
    public tableName: string, 
    public companyName: string, 
    public address: string, 
    public contactPersonID: number, 
    public tablePictureID?: number
    ) {

  }
}
