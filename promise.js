// promise는 비동기적인 것을 수행할 때 callback 함수 대신 유용하게 사용할 수 있는 오브젝트이다.
// 비동기적 코드는 promise안이 executor 콜백 함수 안에 작성하면 된다.
// promise는 선언하는 순간 전달된 executor 콜백 함수가 바로 실행된다.
// promise의 then은 promise를 반환하기 때문에 catch를 쓸 수 있는 것이다. 당연히 catch또한 promise를 반환해서 finally를 사용하는것
// promise의 then은 값이나 promise를 반환할 수 있다. (값을 반환해도 promise가 반환되고 promise안에 PromiseResult에 값이 들어가있는것)
// promise 체이닝의 오류처리는 catch를 맨 마지막에 하나만 넣거나, 중간중간에 then이 실패한 지점에 바로바로 catch를 넣어줄 수 도 있다.
// promise는 state와 producer/consumer 개념이 있다.
// promise를 생성하고 executor 콜백함수에서 resolve와 reject를 호출하지않으면 promise의 state는 pending 상태로 머무르게 된다.
// reslove를 호출하게되면 fullfilled, rejct를 호출하면 rejected 상태로 바뀐다. 상태: pending -> fullfilled(성공) or rejected(실패)

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
