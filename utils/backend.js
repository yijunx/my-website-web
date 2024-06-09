export const userLogin = async (id_token) => {
  try {
    const response = await fetch(process.env.INTERNAL_USER_LOGIN_URI, {
      method: "POST",
      headers: {
        // 'Accept': "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${id_token}`,
      },
      // body: JSON.stringify({
      //   id: id,
      //   userName: userName,
      //   picture: picture,
      //   email: email,
      // }),
    });

    if (!response.ok) {
      console.log(response.text());
    } else {
      const data = await response.json();
      return data.payload;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (email) => {
  console.log("getting user");
  try {
    const response = await fetch(
      `${process.env.BACKEND_USERS_URI}?email=${email}`
    );

    if (!response.ok) {
      console.log("user cannot get");
      return;
    } else {
      const data = await response.json();
      return data.response;
    }
  } catch (error) {
    console.log(error);
  }
};
