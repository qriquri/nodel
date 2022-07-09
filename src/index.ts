import Curl from "./Curl";
 
const test = async () => {
    const curl = new Curl();
    console.log(process.argv);
    const res = await curl.send(process.argv);
    console.log(res?.status);
    console.log(res?.statusText);
    // console.log(res?.config);
    console.log(JSON.stringify(res?.data));
    // console.log(res?.headers);
}

test();