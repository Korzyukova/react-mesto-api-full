export async function tokenCheck() {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(
      "https://api.korzuk.students.nomoredomains.club/users/me",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await checkResponse(response);
    if (data) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export async function signIn(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  const response = await fetch("https://api.korzuk.students.nomoredomains.club/signin", requestOptions);

  const data = await checkResponse(response);
  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.assign("/");
    return true;
  } else {
    return false;
  }
}

export async function signUp(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  const response = await fetch(
    "https://api.korzuk.students.nomoredomains.club/signup",
    requestOptions
  );
  const data = await checkResponse(response);

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.assign("/");
    return true;
  } else {
    return false;
  }
}

export async function checkResponse(res) {
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error(400);
  }
}
