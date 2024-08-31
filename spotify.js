module.exports = {
  getToken: async () => {
    // token url
    const url = "https://accounts.spotify.com/api/token";
    // post, urlencoded, client id&secret from .env
    const options = {
      method: 'POST',
      headers: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': process.env.spotify_client_id,
        'client_secret': process.env.spotify_client_secret,
      }),
    }
    
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
      const json = await res.json();
      // { access_token, token_ type, expires_in }
      return(json);
    } catch (error) {
      console.error(error.message);
    }
  },
}