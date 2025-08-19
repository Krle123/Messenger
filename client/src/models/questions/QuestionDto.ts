export class QuestionDto {
  public id: number;
  public pitanje: string;
  public tezina: number;

  public constructor(id: number = 0, pitanje: string = "", tezina: number = 1) {
    this.id = id;
    this.pitanje = pitanje;
    this.tezina = tezina;
  }
}
