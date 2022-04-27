function PromiseNoData(promiseState) {
  if (promiseState === undefined) {
    return <div class="details">No data1</div>;
  } else if (!promiseState.promise) {
    return <div class="details">No data</div>;
  } else if (promiseState.promise && !promiseState.data && !promiseState.error) {
    return (
      <div class = "details">
                <img src="https://miro.medium.com/max/2400/1*CsJ05WEGfunYMLGfsT2sXA.gif" class="waiting" />
      </div>
    );
  } else if (promiseState.promise && !promiseState.data && promiseState.error) {
    return <div class="error">{promiseState.error}</div>;
  } else return;
}

export default PromiseNoData;
