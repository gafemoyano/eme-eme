import firebase from 'firebase';

export async function getMediaURL(gsUrl) {
  const storage = firebase.storage();
  const gsReference = storage.refFromURL(gsUrl);
  const url = await gsReference.getDownloadURL();
  return url;
}

