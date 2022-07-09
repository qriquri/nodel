/* eslint-disable @typescript-eslint/no-var-requires */
const isDev = process.env.NODE_ENV === 'development';

const baseConfig = {
  // webpack watch したときに差分ビルドができる
  cache: true,
  cache: {
    type: 'filesystem',
  },
  // development は、 source map file を作成、再ビルド時間の短縮などの設定となる
  // production は、コードの圧縮やモジュールの最適化が行われる設定となる
  mode: isDev ? 'development' : 'production',
  // ソースマップのタイプ
  devtool: isDev ? 'eval' : undefined,
  // ファイルタイプ毎の処理を記述する
  module: {
    rules: [
      // {
      //   // コンパイルの事前に eslint による
      //   // 拡張子 .ts または .tsx の場合
      //   test: /\.tsx?$/,
      //   // 事前処理であることを示す
      //   enforce: 'pre',
      //   // TypeScript をコードチェックする
      //   loader: 'eslint-loader',
      // },
      {
        // 正規表現で指定する
        // 拡張子 .ts または .tsx の場合
        test: /\.tsx?$/,
        exclude: /node_modules/,
        // TypeScript をコンパイルする
        use: [
          {
            loader: 'thread-loader',
            options: {
              // workers: require('os').cpus().length / 2,
              works: 2,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
      },
    ],
  },
  // 処理対象のファイルを記載する
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  // <watch options>
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 200, // 指定時間待ってから更新する
  },
  // </watch options>
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

/** server用設定 */
/** @type import('webpack').Configuration */
const index = {
  // 共通設定を読み込み
  ...baseConfig,
  target: 'node',
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
  },
  entry: {
    index: './src/index.ts',
  },
};


module.exports = [index];

