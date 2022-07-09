import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import path from 'path';
/**
 * curlコマンドのクローン
 */
export default class Curl {
    private method = 'GET';
    private params = new URLSearchParams();
    private isVisibleHeaders = false;
    private isOutput = false;
    private fileName = "";
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
            } else if (args[i] == '-o') {
                this.isOutput = true;
                this.fileName = args[i + 1];
                i++;
            } else {
                this.url = args[i];
            }
        }
        // </引数読み取り>
        
        // リクエスト送信
        const res = await this.request();
        // 成功か失敗かを出力
        console.log(res.status, res.statusText);
        // ヘッダー表示
        if (this.isVisibleHeaders) this.showHeader(res);
        if (this.isOutput) {
            // ファイル出力
            this.outPut(this.fileName, res.data);
        } else {
            // ファイル出力しない場合は結果を出力
            if (res.data.length >= 10000) {
                // サイズが大きすぎる場合はコンソールに出力しない
                const yellow  = '\u001b[33m';
                const reset   = '\u001b[0m';
                console.log(yellow + "This data is too large. This size is " + reset, res.data.length);
            } else {
                console.log(Buffer.from(new Uint16Array(res.data)).toString());
            }
        }

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
            // GETリクエスト
            // ファイル出力することを考えてバイナリで受け取るようにしておく
            const res = await axios.get(this.url, { responseType: 'arraybuffer' });
            return res;
        } else {
            // POSTリクエスト
            // ファイル出力することを考えてバイナリで受け取るようにしておく
            const res = await axios.post(this.url, this.params, { responseType: 'arraybuffer' });
            return res;
        }
    }

    /**
     * ヘッダーの表示
     * @param {AxiosResponse<any, any>} res
     */
    private showHeader(res: AxiosResponse<any, any>) {
        // ヘッダー出力
        const blue = '\u001b[34m';
        const reset = '\u001b[0m';
        console.log(blue + '<--request header-->' + reset)
        console.log(res.config);
        console.log(blue + '</--request header-->' + reset)
        console.log(blue + '<--response header-->' + reset)
        console.log(res.headers);
        console.log(blue + '</--response header-->' + reset)
    }

    /**
     * ファイル出力
     * @param {string} fileName 
     * @param {any} val 
     */
    private outPut(fileName: string, val: any) {
        const tmpPath = path.join(__dirname, "tmp");
        // ディレクトリがないときだけ作成する
        if (!fs.existsSync(tmpPath)) fs.mkdirSync(tmpPath);
        fs.writeFileSync(path.join(tmpPath, fileName), val);

        console.log("output file => ", path.join(tmpPath, fileName));
    }
}
