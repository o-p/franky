# LOKI

自助式 SP Welcome Page 產生器

# 建立 Project

- 確認可以使用 yarn
    - `which yarn`, 有回傳就跳過這趴
    - 沒回傳, 有 root 權限, 直接照 yarn 官網說明即可
        - 照表操課 [Yarn Installation - Linux](https://yarnpkg.com/en/docs/install#linux-tab)
    - 沒有 root 權限
        - 依照這段操作 [Yarn Installation - Alternatives](https://yarnpkg.com/en/docs/install#alternatives-tab)
        - 或直接使用這段 cmd: `curl -o- -L https://yarnpkg.com/install.sh | bash`

- 下載並安裝

    ```bash
    git clone git@gitlab.kkinternal.com:AST/loki.git

    cd loki
    
    yarn install
    
    yarn build
    ```

# 如果以上失敗了

  - MAY THE [Stack Overflow](https://stackoverflow.com/) BE WITH YOU!
