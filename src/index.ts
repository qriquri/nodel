import Curl from "./Curl";
 
const test = async () => {
    const curl = new Curl();
    // console.log(process.argv);
    // httpリクエスト開始
    await curl.send(process.argv);
    
    // console.log(res?.status);
    // console.log(res?.statusText);
    // console.log(res?.data);
    // console.log(res?.headers);
    // console.log(res?.config);
    
}

test();