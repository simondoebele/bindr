import BookDetailsView from "../views/bookDetailsView";
import PromiseNoData from "../views/promiseNoData";
export default function BookDetails(props) {
  return (
    PromiseNoData(props.model.currentBookDetailsPromiseState) || (
      <BookDetailsView
        currentBookDetails={props.model.currentBookDetails}
        detailsPromiseState={props.model.currentBookDetailsPromiseState}
      />
    )
  );
}
