/**
 * Creates a webhook at a given url, sneezeData will be automatically posted there on any updates.
 * @param {string} webhookUrl The URL the sneezeData should be posted to.
 * @param {number} expires How long until the hook expires in MS (min of 60,000 (1 min), default of 600,000 (10 mins), max of (1 day)
 * @param {boolean} renews Whether it should automatically renew once the access has expired (default of true)
 * @param {boolean} sendInitial Whether it should send the initial data to the hook url, or if it should be for updates only (default of false)
 * @returns {object} Returns the initial data or any error message recieved as a response
 */

export default async function into(
  webhookUrl: string,
  expires: number = 600000,
  sendInitial: boolean = false,
  renews: boolean = true
): Promise<object> {
  console.log(
    `Creating${renews ? ' auto-renewing ' : ' '}post hook on '${webhookUrl}'${
      renews ? `, to expire in ${expires.toLocaleString()} ms.` : ''
    }`
  )

  const url = 'https://datacord.onrender.com/api/v1/webhook'

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      webhookUrl,
      expires,
      sendInitial,
    }),
  }

  let res = await fetch(url, options).catch((err) => console.error(err))

  let data = await res.json()

  if (renews) {
    setInterval(() => {
      fetch(url, options)
      console.log(`Renewed post hook on '${webhookUrl}'`)
    }, expires)
  }

  // Return the data recieved, or any error message
  return data as Object
}