// Please note that the code provided above assumes that you have the necessary implementations for DataResult, MessageCode, userRepository, getToken(), getAPIVersion(), Receipt, and _lock in your JavaScript code. Also, the timeout handling is done using a custom timeout function, as there is no direct equivalent for timeout in the fetch API. You may need to implement the timeout function accordingly or use a third-party library to handle timeouts.


function getAPIVersion() {
  return "0.1";
}

export default async function uploadFile(url, token, imageFile) {
  try {
    // const stream = imageFile.stream();
    // const length = imageFile.size;

    const headers = new Headers();
    headers.append("api-version", getAPIVersion());
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    const formData = new FormData();
    // formData.append("file", stream, imageFile.name);
    formData.append("file", imageFile, "receipt1.jpeg");

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: formData,
      redirect: 'follow'
    };

    const response = await fetch(url, requestOptions);
    console.log(response.status);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      // Log an error
      return {
        msgCode: response.status,
        msg: "HTTP response code: " + response.status.toString(),
      }
    }
  } catch (error) {
    if (error.name === "TimeoutError") {
      return {
        msgCode: 9000,
        msg: "Time out!",
      }
    } else {
      // Log an error
      return {
        msgCode: -1,
        msg: error.toString(),
      }
    }
  }
}
