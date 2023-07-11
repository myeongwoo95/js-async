// promise는 비동기적인 것을 수행할 때 callback 함수 대신 유용하게 사용할 수 있는 오브젝트이다.
// promise는 만드는 순간 전달된 executor(함수)가 바로 실행된다.
// promise의 then은 promise를 반환하기 때문에 catch를 쓸 수 있는 것이다. 당연히 catch또한 promise를 반환해서 finally를 사용하는것
// promise의 then은 값을 반환할 수 있고, 또 promise를 반환할 수 있다. 그러면 연속적으로 then을 사용할 수 있다.
// promise 체이닝의 오류처리는 catch를 맨 마지막에 하나만 넣거나, 중간중간에 then이 실패한 경우에 바로바로 catch를 넣어줄 수 도 있다.
// promise는 상태와 producer/consumer를 이해하면된다.
// 상태: pending -> fullfilled(성공) or rejected(실패)

// 1. Producer : 비동기적으로
const promise = new Promise((resolve, reject) => {
  const value = true;
  console.log("doing something...");

  setTimeout(() => {
    if (value === true) return resolve("Good");
    else return reject("Bad");
  }, 2000);
});

// 2. Consumer : then, catch, finally
promise
  .then((value) => {
    console.log(value); // Good
  })
  .catch((err) => {
    console.log(err); // Bad
  })
  .finally(() => {
    console.log("--END--");
  });

// 3. 체이닝
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => {
    setTimeout(() => resolve(1));
  }, 2000);
});

fetchNumber
  .then((num) => {
    console.log(num + 1);
    return num + 1;
  })
  .then((num) => {
    console.log(num + 1);
    return num + 1;
  })
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(num + 10);
      }, 2000);
    });
  })
  .then((num) => {
    console.log(num);
  });
