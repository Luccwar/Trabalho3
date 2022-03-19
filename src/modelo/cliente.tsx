export class Cliente {
  
    constructor() {
}
   
   public id: number;
   public nome: string;
   public sobrenome: string;    
   public email: string; 
   public senha: string; 
   public telefone: string;    
   
   toString() {
     return this.id+''+this.nome+''+this.sobrenome+''+this.email+''+this.senha+''+this.telefone;
   }
 }