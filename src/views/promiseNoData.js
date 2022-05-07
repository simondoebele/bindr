function PromiseNoData(promiseState) {
  if (promiseState === undefined) {
    return <div class="details">No data1</div>;
  } else if (!promiseState.promise) {
    return <div class="details">No data</div>;
  } else if (
    promiseState.promise &&
    !promiseState.data &&
    !promiseState.error
  ) {
    return (
      <div class="details">
        <img src="https://i.stack.imgur.com/kOnzy.gif" class="waiting" />
      </div>
    );
  } else if (promiseState.promise && !promiseState.data && promiseState.error) {
    return <div class="error">{promiseState.error}</div>;
  } else return;
}

export default PromiseNoData;
