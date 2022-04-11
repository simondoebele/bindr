import UserInfoView from "../views/userInfoView";
export default function userInfo(props) {
  function removeBookACB(title) {
    props.model.removeLikedBook(title);
  }
  function selectedBookACB(isbn) {
    props.model.setCurrentBook(isbn);
    //props.model.changeCurrentBook();
  }

  return (
    <UserInfoView
      likedBooks={props.model.likedBooks}
      removeBook={removeBookACB}
      selectedBook={selectedBookACB}
    />
  );
}
