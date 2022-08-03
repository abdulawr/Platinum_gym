class Helper {
    instance = null;
    timer;
 
    static getInstance(){
     if(this.instance == null){
       this.instance = new Helper();
     }
     return this.instance;
    }
 
    static validInput(string){
     switch (string) {
       case "":
       case 0:
       case "0":
       case null:
       case false:
       case undefined:
         return false;
       default:
         return true;
     }
    }
 
    static validateEmail(email){
     return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
    }
 
 }
 
 export default Helper;
