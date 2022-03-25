const Show={props:["hash"],

data(){
    return{
        state: window.location.hash
    }
},

created(){
    const component = this;

    function hashListenerACB(e){ component.state = window.location.hash;}

    window.addEventListener("hashchange", hashListenerACB),
    this.listener = hashListenerACB
},

unmounted(){
    window.removeEventListener("hashchange", this.listener)
},



render(){
    if(this.state !== this.hash){
        return(
         <div class = "hidden">
            {this.$slots.default()}       
        </div>
        );
    }
    return(
        <div class = "">
            {this.$slots.default()}       
        </div>
    )
}
}

export default Show