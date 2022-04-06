import DinnerModel from "../DinnerModel.js";
import BinderModel from "../binderModel.js";
import App from "../views/app.js";

let proxyModel;
const VueRoot={
    data(){
        return {rootModel: new BinderModel()} ;
    } ,
    render(){
        return <App model={this.rootModel} />;
    },

    // We export the VueRoot model to other packages for lab purposes
    created(){
        proxyModel=this.rootModel;
    },
};

export default VueRoot;

export {proxyModel};
