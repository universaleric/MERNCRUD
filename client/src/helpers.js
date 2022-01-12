//save login response > (user's name and token) to session storage
export const authenticate = (response, next) => {
  if (window !== "undefined") {
    sessionStorage.setItem("user", JSON.stringify(response.data.name));
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
  }
  next();
};

//access user's name from session storage
export const getUser = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

//access token from session storage
export const getToken = () => {
    if (window !== "undefined") {
      if (sessionStorage.getItem("token")) {
        return JSON.parse(sessionStorage.getItem("token"));
      } else {
        return false;
      }
    }
  };
  
//remove token from session storage
export const logout = next => {
    if (window !== "undefined") {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    }
    next();
  };