import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';
import { artionFApolloClient } from '@/plugins/apollo/apollo-provider.js';
import { getBearerToken } from '@/modules/account/auth.js';

export async function uploadUserFile(_file, _type = 'avatar') {
    const options = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + getBearerToken(),
        },
    };

    let data = new FormData();
    data.append('file', _file[0]);
    options.body = data;

    let url = artionFApolloClient.httpProviderOrigin + '/upload-image/user-' + _type;

    try {
        let response = await fetch(url, options);
        console.log(response);
        if (response.status === 200) {
            notifications.add({
                type: 'success',
                text: `You successfully upload your ${_type}`,
            });
        }
    } catch (err) {
        notifications.add({
            type: 'error',
            text: `Sorry, something went wrong. Your ${_type} wasn't uploaded`,
        });
    }
}
