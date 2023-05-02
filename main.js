fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials&client_id=db37bc919a7045229c8e5fffc8fa5f4e&client_secret=4f2b4a03f28642c8876c840589c0d39d"
})
.then(response => response.json())
.then(data => {
    console.log(data.access_token);
    console.log(data.token_type);
    console.log(data.expires_in);
})
.catch(error => console.error(error));

console.log(data)

fetch("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb", {
  method: "GET",
  headers: {
    "Authorization": "Bearer BQDBKJ5eo5jxbtpWjVOj7ryS84khybFpP_lTqzV7uV-T_m0cTfwvdn5BnBSKPxKgEb11"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
console.log(data)
