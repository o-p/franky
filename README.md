# LOKI

自助式 SP Welcome Page 產生器

# 建立 Project

- 確認可以使用 yarn
    - `which yarn`, 有回傳就跳過這趴
    - 沒回傳, 有 root 權限, 直接照 yarn 官網說明即可
    - 如果你在 unix 環境, 並且不具備 root 權限
        - 請先確認可以使用 npm, 不行, 放棄吧孩子
        - 讓 global 安裝路徑導向自己家目錄 `npm config set prefix ~/.npm_packages`
        - 請前女友幫你新女友搬家: `npm install --global yarn`
        - 加到執行路徑: `export PATH="$PATH:$HOME/.npm_packages/bin`


- 下載並安裝

    ```bash
    git clone git@gitlab.kkinternal.com:AST/loki.git

    cd loki
    
    yarn install
    
    yarn build
    ```

# 如果以上失敗了

  - May the [stackoverflow](https://stackoverflow.com/) be with you

