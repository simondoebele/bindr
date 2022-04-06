import UserInfoView from "../views/userInfoView";
export default 

function userInfo(props) {
  return (<UserInfoView likedBooks={props.model.likedBooks} />)
}
