# LOKI

自助式 SP Welcome Page 產生器

# How to

- Setup Development Environment

    ```bash
    git clone git@gitlab.kkcorp:AST/loki.git
    
    cd loki
    
    npm install
    ```


- Build Each Page

    ```bash
    # 理想上未來會調整script成執行一次就可以
    # 但現實上...  請再等等...
    
    # 首頁, 成品在dist目錄中
    npm run build:home
    
    # 滿版, 成品在dist目錄中
    npm run build:full
    
    # 非滿版, 成品在dist目錄中
    npm run build:rect
    ```


- Quit from the project

    ```bash
    rm -fR loki
    git add .
    git commit -m "I Quit!"
    git push master
    
    echo "and of course it not works..."
    ```
  

# Thanks to

  即將因為功能太不完整而準備加入的你

