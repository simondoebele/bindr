import UserInfoView from "../views/userInfoView";
export default function userInfo(props) {
  function removeBookACB(book) {
    props.model.removeLikedBook(book);
  }
  function selectedBookACB(book) {
    props.model.setCurrentBook(book);
  }

  return (
    <UserInfoView
      likedBooks={props.model.likedBooks}
      removeBook={removeBookACB}
      selectedBook={selectedBookACB}
    />
  );
}
