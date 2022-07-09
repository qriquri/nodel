import axios from 'axios';

/**
 * curlコマンドのクローン
 */
export default class Curl {
    private method = 'GET';
    /**
     * 
     * @param {string} url 
     * @param {string[]} args
     * @return {any}
     */
    public async send(url: string, args: string[]) {
        // <引数読み取り>
        for (let i = 0; i < args.length; i++) {
            if (args[i] == '-X') {
                if (args[i + 1] == 'POST') {
                    this.method = 'POST';
                    i++;
                }
            }
        }
        // </引数読み取り>
        // リクエスト送信
        switch (this.method) {
            case 'GET':
                return await axios.get(url);
            case 'POST':
                return await axios.post(url);
        }



    }
}
