function isTeaspotsOpen(){
   //If it's after 10am and after 10:30am 
    return (10 < getHours()) && (getHours == 10 && getHours < 30)
}
