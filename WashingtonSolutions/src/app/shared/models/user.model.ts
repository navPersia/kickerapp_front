export class User {
  constructor(
      public userID: number, 
      public roleID: number, 
      public groupID: number, 
      public firstName: string, 
      public lastName: string, 
      public username: string, 
      public password:string, 
      public email: string, 
      public role: {
        roleID: number, name: string
      }, 
      public dob: string,
      public token: string, 
    public userPictureID: number,
    public teamUsers?) {
  }

}
