import axios, { AxiosResponse } from 'axios';

/**
 * curlコマンドのクローン
 */
export default class Curl {
    private method = 'GET';
    private params = new URLSearchParams();
    private isVisibleHeaders = false;
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
            } else if (args[i] == '-v') {
                this.isVisibleHeaders = true;
            } else {
                this.url = args[i];
            }
        }
        // </引数読み取り>
        // リクエスト送信
        const res = await this.request();
        // ヘッダー表示
        this.showHeader(res);
        return res;

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

    /**
     * リクエスト送信
     * @return {AxiosResponse<any, any>}
     */
    private async request() {
        if (this.method == 'GET') {
            const res = await axios.get(this.url);
            return res;
        } else {
            const res = await axios.post(this.url, this.params);
            return res;
        }
    }

    /**
     * ヘッダーの表示
     * @param {AxiosResponse<any, any>} res
     */
    private showHeader(res: AxiosResponse<any, any>) {
        if (this.isVisibleHeaders) {
            // ヘッダー出力
            const blue = '\u001b[34m';
            const reset   = '\u001b[0m';
            console.log(blue + '<--request header-->' + reset)
            console.log(res.config);
            console.log(blue +  '</--request header-->'+ reset)
            console.log(blue +  '<--response header-->'+ reset)
            console.log(res.headers);
            console.log(blue +  '</--response header-->'+ reset)

        }
    }
}
