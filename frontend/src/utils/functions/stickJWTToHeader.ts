const stickJWTToHeader = () => {
  const token = window.localStorage.getItem("token");

  if (token) {
    return {
      headers: { authorization: `Bearer ${token}` },
    };
  } 
};

export default stickJWTToHeader;
