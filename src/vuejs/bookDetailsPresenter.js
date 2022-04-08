import BookDetailsView from "../views/bookDetailsView";
export default function BookDetails(props) {
  return <BookDetailsView currentBook={props.model.currentBook} />;
}
