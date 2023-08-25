function fetchToken() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("value after one second");

        }, 10000);
    })
}

async function getTokenAndCallFunction() {
    try {
      const token = await fetchToken();
      // Code here will only execute after the token is fetched
      //   await someFunction(token);
      console.log(token);
    } catch (error) {
      // Handle any errors that occurred during the async operations
      console.error(error);
    }
}
  
  getTokenAndCallFunction();
  console.log("hi");