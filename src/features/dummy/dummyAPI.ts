// A mock function to mimic making an async request for data
export function fetchDummy() {
    return new Promise<any>((resolve) =>
        fetch('https://getpantry.cloud/apiv1/pantry/f335f7b0-f9e7-4493-8f74-fcfa82435647/basket/TestList')
            .then(res => resolve(res.json()))
    );
}