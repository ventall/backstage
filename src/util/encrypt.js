import store from 'store'
import JSEncrypt from 'jsencrypt'
import instance from '@/api/common'

export default
  async function encrypt (value) {
  let key = store.get(process.env.VUE_APP_PUBKEY_NAME)
  try {
    if (!key || key === 'undefined') {
      let result = await instance.get('/getPubKey')
      key = result.data.pubKey
      key = key.replace(/\. +/g, '')
      key = key.replace(/[\r\n]/g, '')
      store.set(process.env.VUE_APP_PUBKEY_NAME, key)
    }
    let encrypt = new JSEncrypt()
    encrypt.setPublicKey(key)
    return encrypt.encrypt(value)
  } catch (err) {
    console.log(err)
  }
}
