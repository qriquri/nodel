import Curl from '../src/Curl';

let curl: Curl;
beforeEach(() => {
  curl = new Curl();
})
describe('指定したURLにGETリクエストを送れる', () => {
  test('"https://www.google.com"にGETリクエストを送るとステータス200が返ってくる', async () => {
    // 前準備
    process.argv.push("https://www.google.com");
    // 実行
    const res = await curl.send(process.argv);
    // 前が実測値、後ろが期待値
    expect(res?.status).toEqual(200);
  });
});

describe('引数に -X POST が指定されたとき 指定したURLにPOSTリクエストを送れる', () => {
  test('引数に -X POST が指定されたとき "http://httpbin.org/post" に　POSTリクエストを送り、ステータス200が返ってくる', async () => {
    // 前準備
    process.argv.push("http://httpbin.org/post");
    process.argv.push('-X');
    process.argv.push('POST');
    // 実行
    const res = await curl.send(process.argv);
    // 前が実測値、後ろが期待値
    expect(res?.status).toEqual(200);
  });
})

describe('"???=???&???=???"をURLSearchParamsに変換する', () => {
  test('"text=hello&index=5"をURLSearchParamsに変換できる', () => {
    // 前準備
    const params = new URLSearchParams()
    params.append('text', 'hello');
    params.append('index', '5')
    // 実行と検証 convertParamはプライベートメソッドだからこうする
    expect(curl["convertParam"]("text=hello&index=5")).toEqual(params);

  })
  test('引数ミスった"texthello&index=5"をURLSearchParamsに変換できる', () => {
    // 前準備
    const params = new URLSearchParams()
    params.append('index', '5')
    // 実行と検証 convertParamはプライベートメソッドだからこうする
    expect(curl["convertParam"]("texthello&index=5")).toEqual(params);

  })
})

describe('引数に -d "???=???&???=???" が指定されたとき 指定したURLにパラメータ付きでPOSTリクエストを送れる', () => {
  test('引数に -d "text=hello" が指定されたとき "http://httpbin.org/post" にパラメータ付きでPOSTリクエストを送り、レスポンスのdata.form.textの値が"hello"', async () => {
    // <前準備>
    // 引数設定
    process.argv.push("http://httpbin.org/post");
    process.argv.push('-X');
    process.argv.push('POST');
    process.argv.push('-d');
    process.argv.push('text=hello');
    // </前準備>
    // 実行
    const res = await curl.send(process.argv);
    // 前が実測値、後ろが期待値
    expect(res?.data.form.text).toEqual("hello");
  })
})

