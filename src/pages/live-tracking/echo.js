import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const token = localStorage.getItem("CabinetToken");

const echoConfig = {
    broadcaster: 'pusher',
    key: 's3cr3t',
    cluster: 'mt1',
    encrypted: true,
    authEndpoint: '/broadcasting/auth',
    auth: {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
};

const pusher = new Pusher('s3cr3t', {
    cluster: 'mt1',
    encrypted: true,
    authEndpoint: '/broadcasting/auth',
    auth: {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
});

const echo = new Echo(echoConfig);

export default echo;
