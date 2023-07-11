// 콜백은 동기콜백과 비동기콜백으로 나뉜다.

// 동기콜백
function printImmediately(print) {
  print();
}

printImmediately(() => {
  console.log("동기콜백");
});

// 비동기콜백
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}

printWithDelay(() => console.log("비동기콜백"), 2000);
