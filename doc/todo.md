
Javascript(node.js) を利用して、次の機能を満たすアプリケーションを作る

1. curl https://example.com 相当のことができる機能
2. curl -o file https://example.com 相当のことができる機能
3. curl -v  https://example.com 相当のことができる機能
4. curl -X POST https://example.com 相当のことができる機能
5. curl -X POST -d "key=value" https://example.com 相当のことができる機能

コマンドオプションは (1) ~ (5) に記載された組み合わせだけではなく、
任意の組み合わせができるようにしてください。


- [×] 指定したURLにGETリクエストを送れる
    - [×] "https://www.google.com"にGETリクエストを送るとステータス200が返ってくる


- [×] 引数に -X POST が指定されたとき 指定したURLにPOSTリクエストを送れる
    - [×] "引数に -X POST が指定されたとき "http://httpbin.org/post" に　POSTリクエストを送り、ステータス200が返ってくる"

- [×] "???=???&???=???"をURLSearchParamsに変換する
    - [×] "text=hello&index=5"をURLSearchParamsに変換できる
    - [×] 引数ミスった"texthello&index=5"をURLSearchParamsに変換できる

- [×] 引数に -d "???=???&???=???" が指定されたとき 指定したURLにパラメータ付きでPOSTリクエストを送れる
    -[×] 引数に -d "text=hello" が指定されたとき "http://httpbin.org/post" にパラメータ付きでPOSTリクエストを送り、レスポンスのdata.form.textの値が"hello"

- [] 引数を取得できる

- [×] 引数に-v が指定されたとき、リクエストのhttp ヘッダーとレスポンスのhttp ヘッダーを見れる
- [×] 引数に-o "ファイル名"　が指定されたとき、レスポンスをファイルに出力できる
    -[×] "hello.txt"に"hello"と書き込める
