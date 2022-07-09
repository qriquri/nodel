import Curl from '../src/Curl';

describe('指定したURLにGETリクエストを送れる', () => {
  test('"https://www.google.com"にGETリクエストを送るとステータス200が返ってくる', async () => {
    // 前準備
    const curl = new Curl();
    // 実行
    const res = await curl.send("https://www.google.com", process.argv);
    // 前が実測値、後ろが期待値
    expect(res?.status).toEqual(200);
  });
});

describe('引数に -X POST が指定されたとき 指定したURLにPOSTリクエストを送れる', () => {
  test('引数に -X POST が指定されたとき "http://httpbin.org/post" に　POSTリクエストを送り、ステータス200が返ってくる', async () => {
    // 前準備
    const curl = new Curl();
    process.argv.push('-X');
    process.argv.push('POST');
    // 実行
    const res = await curl.send("http://httpbin.org/post", process.argv);
    // 前が実測値、後ろが期待値
    expect(res?.status).toEqual(200);
  });
})

