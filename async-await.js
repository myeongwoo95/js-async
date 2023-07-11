// 참고로 async가 promise 대안으로 나온건 맞지만, promise를 사용하는게 더 가독성이 높은 경우가 있다.
// async/await를 함께 사용하면 읽고, 쓰기 쉬운 비동기 코드를 작성할 수 있습니다.
// async/await를 사용하면 promise.then/catch가 거의 필요 없습니다. 하지만 가끔 가장 바깥 스코프에서
// 비동기 처리가 필요할 때같이 promise.then/catch를 써야만 하는 경우가 생기기 때문에 async/await가
// 프라미스를 기반으로 한다는 사실을 알고 계셔야 합니다.

// 함수 앞에 async를 붙이면 해당 함수는 항상 promise를 반환
// await은 async가 붙은 함수안에서만 사용 가능
// await 키워드를 만나면 프라미스가 처리될 때까지 기다린다. let result = await promise;
// await는 최상위 레벨 코드에서 작동하지 않는다.. -> 익명 async 함수로 코드를 감싸면 최상위 레벨 코드에도 await를 사용할 수 있음
// await는 오류처리는 try{} catch(){}로 한다.

// 1. async
async function getUsers() {
  return "userA";
}

const user = getUsers();
user.then((data) => {
  console.log(data);
});

// 2. await
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(3000);
  return "Apple";
}

async function getBanana() {
  await delay(3000);
  return "Banana";
}

async function getFruits() {
  // # 이렇게하면 병렬적으로 수행하지않아서 3초 +3초 = 6초를 기달려야함
  // const apple = await getApple();
  // const banana = await getBanana();

  // # 이렇게해야 병렬적으로 수행해서 3초면 됨 (JS에서는 더 좋은 방식으로 코딩할 수 있게 Promise.all 메서드를 제공함)
  // const applePromise = getApple();
  // const bananaPromise = getBanana();
  // const apple = await applePromise;
  // const banana = await bananaPromise;

  // return `async+await: ${apple} + ${banana}`;

  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(" + ")
  );
}
getFruits().then((data) => {
  console.log(data);
});

function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then((data) => {
  console.log(`first fruit:  ${data}`);
});

// 3. promise를 사용해서 getFruits -> async/await와 비교를 위해
function getFruitsByPromise() {
  return getApple().then((apple) => {
    return getBanana().then((banana) => {
      return `promise: ${apple} + ${banana}`;
    });
  });
}
getFruitsByPromise().then((data) => {
  console.log(data);
});
