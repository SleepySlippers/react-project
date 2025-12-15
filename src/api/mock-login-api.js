import users from '../assets/users.json'

const DURATION = 1000;
const SESSION_DURATION = 10000;

const generateSessionToken = () => {
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
};

function hash(data) {
    // TODO apply some hash
    return data + 'MyGreatestSalt'
}

var sessionTokensOnServer = {};

function verify(username, password, resolve, reject) {
    const passHash = hash(password);
    const fisrtMatch = users.find(item => item.username == username && passHash == item.passwordHash);
    if (fisrtMatch) {
        const newSesstionToken = generateSessionToken();
        console.log("verify success: " + newSesstionToken);
        sessionTokensOnServer[newSesstionToken] = true;
        setTimeout(() => { delete sessionTokensOnServer[newSesstionToken] }, SESSION_DURATION)
        resolve(newSesstionToken);
    } else {
        reject("No such user")
    }
}

export async function verifySessionToken(sessionToken) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (sessionToken in sessionTokensOnServer) {
                resolve(true);
            } else {
                reject("Has no such session or session is expired");
            }
        }, DURATION)
    })
}

// NOTE: on success returns `resolve(sessionToken)`
export async function verifyLogin(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => verify(username, password, resolve, reject), DURATION)
    })
}

function verifyRegister(username, password, resolve, reject) {
    const fisrtMatch = users.find(item => item.username == username);
    if (fisrtMatch) {
        reject("There is already use with such username");
    } else {
        const passHash = hash(password);
        users.push({username: username, passwordHash: passHash});
        resolve(true);
    }
}

export async function registerAccount(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => verifyRegister(username, password, resolve, reject), DURATION)
    })
}
