const myPromise = new Promise((resolve, reject) => {
  const success = true; // 成功か失敗かを切り替えて試してみてください

  setTimeout(() => {
    if (success) {
      resolve("成功しました！");
    } else {
      reject("失敗しました...");
    }
  }, 2000);
});

myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("処理が終了しました。");
  });