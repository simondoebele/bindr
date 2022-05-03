import UserInfoView from "../views/userInfoView";
import PromiseNoData from "../views/promiseNoData";
export default function userInfo(props) {
  function removeBookACB(book) {
    props.model.removeLikedBook(book);
  }
  function selectedBookACB(book) {
    props.model.setCurrentBook(book);
  }

  function resetBooksACB(){
    location.reload()
    props.model.resetBooks();
  }
  function fetchSubACB() {
    props.model.fetchNextSub()
  }

  return (
    PromiseNoData(props.model.likedBooksPromise) || <UserInfoView
                                                      likedBooks={props.model.likedBooks}
                                                      resetBooks = {resetBooksACB}
                                                      removeBook={removeBookACB}
                                                      selectedBook={selectedBookACB}
                                                      currentUser = {props.model.currentUser}
                                                      fetchSub = {fetchSubACB}
                                                    />
  );
}
