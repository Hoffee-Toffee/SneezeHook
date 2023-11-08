import request from 'request'

/**
 * Creates a webhook at a given url, sneezeData will be automatically posted there on any updates.
 * @param {string} webhookUrl The URL the sneezeData should be posted to.
 * @param {number} expires How long until the hook expires in MS (min of 60,000 (1 Minute), default of 600,000 (10 mins), max of )
 * @param {boolean} renews Whether it should automatically renew once the access has expired (default of true)
 */

async function into(
  webhookUrl: string,
  expires: number = 600000,
  renews: boolean = true
) {
  console.log(expires)

  const options = {
    url: 'https://datacord.onrender.com/api/v1/webhook',
    method: 'POST',
    json: true,
    body: {
      webhookUrl,
      expires,
    },
  }

  request.post(options)
  

  if (renews) {
    setInterval(() => {
      request.post(options)
      console.log('Renewed Connection')
    }, expires)
  }
}

into('test')

export default { into }
