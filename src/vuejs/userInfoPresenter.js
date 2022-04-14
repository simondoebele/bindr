import UserInfoView from "../views/userInfoView";
import PromiseNoData from "../views/promiseNoData";
export default function userInfo(props) {
  function removeBookACB(book) {
    props.model.removeLikedBook(book);
  }
  function selectedBookACB(book) {
    props.model.setCurrentBook(book);
  }

  return (
    PromiseNoData(props.model.likedBooksPromise) || <UserInfoView
                                                      likedBooks={props.model.likedBooksPromise.data}
                                                      removeBook={removeBookACB}
                                                      selectedBook={selectedBookACB}
                                                      currentUser = {props.model.currentUser}
                                                    />
  );
}
