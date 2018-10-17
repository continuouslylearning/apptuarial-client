export function normalizeResponseError(res){
  if(!res.ok){
    if(res.headers.has('Content-Type') && res.headers.get('Content-Type').startsWith('application/json')){
      return res.json()
        .then(res => Promise.reject(res));
    }
    return Promise.reject({
      code: res.status,
      message: res.statusTest
    });
  }
  return res.json();
}