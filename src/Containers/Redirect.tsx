import React from "react";
import queryString from "query-string";

function b64EncodeUnicode(str: string) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      const num: number = Number("0x" + p1);
      return String.fromCharCode(num);
    })
  );
}

const Redirect = (props: any) => {
  const { code, state } = queryString.parse(props.location.search);

  fetch(`http://localhost:3001/?code=${code}`)
    .then(resp => resp.json())
    .then(json => console.log("****", json));

  console.log(process.env.REACT_APP_CLIENT_ID);
  console.log(process.env.REACT_APP_CLIENT_SECRET);
  console.log("code", code);
  const encoded = btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  );
  console.log(encoded);
  // const encoded = b64EncodeUnicode(
  //   `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  // );
  const redirectUrl = "http://localhost:3000/redirect";

  fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encoded}`
    },
    body: JSON.stringify({
      // eslint-disable-next-line @typescript-eslint/camelcase
      grant_type: "authorization_code",
      code: code,
      // eslint-disable-next-line @typescript-eslint/camelcase
      redirect_uri: redirectUrl
    })
  })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  return <div>redirect page</div>;
};

export default Redirect;
