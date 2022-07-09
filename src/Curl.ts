import axios from 'axios';

/**
 * curlコマンドのクローン
 */
export default class Curl {
    private method = 'GET';
    private params = new URLSearchParams();
    private url = '';
    /**
     * 
     * @param {string[]} args
     * @return {any}
     */
    public async send(args: string[]) {
        // <引数読み取り>
        for (let i = 0; i < args.length; i++) {
            if (args[i] == '-X') {
                // メソッドをPOSTに変換
                if (args[i + 1] == 'POST') {
                    this.method = 'POST';
                    i++;
                }
            } else if (args[i] == '-d') {
                // 引数をパラメータに変換
                this.params = this.convertParam(args[i + 1]);
                i++;
            } else {
                this.url = args[i];
            }
        }
        // </引数読み取り>
        // リクエスト送信
        switch (this.method) {
            case 'GET':
                return await axios.get(this.url);
            case 'POST':
                return await axios.post(this.url, this.params);
        }
    }

    /**
     * 
     * @param {string} arg 
     * @return {URLSearchParams}
     */
    private convertParam(arg: string): URLSearchParams {
        const params = new URLSearchParams();
        // &で区切ってその数だけループ ???=???&###=### => [???=???, ###=###]
        for (const item of arg.split('&')) {
            if (!item.includes('=')) {
                // 何らかのミスで=が含まれていないときがあるかもしれない
                // その時はスキップ
                continue;
            }
            // =で区切ってパラメータに変換
            const name = item.split('=')[0];
            const val = item.split('=')[1];
            params.append(name, val);

        }
        return params;
    }
}
