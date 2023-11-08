var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import request from 'request';
/**
 * Creates a webhook at a given url, sneezeData will be automatically posted there on any updates.
 * @param {string} webhookUrl The URL the sneezeData should be posted to.
 * @param {number} expires How long until the hook expires in MS (min of 60,000 (1 Minute), default of 600,000 (10 mins), max of )
 * @param {boolean} renews Whether it should automatically renew once the access has expired (default of true)
 */
function into(webhookUrl, expires = 600000, renews = true) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(expires);
        const options = {
            url: 'https://datacord.onrender.com/api/v1/webhook',
            method: 'POST',
            json: true,
            body: {
                webhookUrl,
                expires,
            },
        };
        request.post(options);
        if (renews) {
            setInterval(() => {
                request.post(options);
                console.log('Renewed Connection');
            }, expires);
        }
    });
}
into('test');
export default { into };
