function PromiseNoData(promiseState) {
  if (promiseState === undefined) {
    return <div class="noData">No data1</div>;
  } else if (!promiseState.promise) {
    return <div class="noData">No data</div>;
  } else if (promiseState.promise && !promiseState.data && !promiseState.error) {
    return (
      <img
        src="https://miro.medium.com/max/2400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
        class="waiting"
      />
    );
  } else if (promiseState.promise && !promiseState.data && promiseState.error) {
    return <div class="error">{promiseState.error}</div>;
  } else return;
}

export default PromiseNoData;
