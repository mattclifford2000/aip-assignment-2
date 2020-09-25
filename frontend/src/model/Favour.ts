export interface Favour {
  //Primary key
  FavourId: number;
  //Foreign key, represents the one
  //who owes something
  DebitorID: number;
  //Foreign key, represents
  //the one who is owed something
  CreditorID: number;
  FavourContent: string;
  FavourStatus: boolean;
}
