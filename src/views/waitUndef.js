function WaitUndef(obj) {
  if (typeof obj == "undefined") {
    return (
      <div class="details">
        <img src="https://i.stack.imgur.com/kOnzy.gif" class="waiting" />
      </div>
    );
  } else return;
}

export default WaitUndef;
