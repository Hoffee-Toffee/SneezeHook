var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Creates a webhook at a given url, sneezeData will be automatically posted there on any updates.
 * @param {string} webhookUrl The URL the sneezeData should be posted to.
 * @param {number} expires How long until the hook expires in MS (min of 60,000 (1 min), default of 600,000 (10 mins), max of (1 day)
 * @param {boolean} renews Whether it should automatically renew once the access has expired (default of true)
 * @param {boolean} sendInitial Whether it should send the initial data to the hook url, or if it should be for updates only (default of false)
 * @returns {object} Returns the initial data or any error message recieved as a response
 */
export default function into(webhookUrl, expires = 600000, sendInitial = false, renews = true) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Creating${renews ? ' auto-renewing ' : ' '}post hook on '${webhookUrl}'${renews ? `, to expire in ${expires.toLocaleString()} ms.` : ''}`);
        const url = 'https://datacord.onrender.com/api/v1/webhook';
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
        };
        let res = (yield fetch(url, options).catch((err) => console.error(err)));
        let data = yield res.json();
        if (renews) {
            setInterval(() => {
                fetch(url, options);
                console.log(`Renewed post hook on '${webhookUrl}'`);
            }, expires);
        }
        // Return the data recieved, or any error message
        return data;
    });
}
