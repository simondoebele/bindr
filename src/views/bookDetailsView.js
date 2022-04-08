function BookDetailsView(props) {
  return (
    <div class="detailsView">
      <div class="bookInfo">
        <div
          class="bookCover"
          style="display:inline-block;vertical-align:top; float: left;"
        >
          <img src={props.currentBook.img}></img>
        </div>
        <div style="display:inline-block; float: right; position: relative; top:50px; font-size:30px">
          {props.currentBook.title}
        </div>

        <div style="position: relative; top:60px; right: 45px">Description</div>
      </div>
    </div>
  );
}

export default BookDetailsView;
