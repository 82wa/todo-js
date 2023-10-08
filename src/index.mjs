import "./styles.css";

// 追加ボタンが押された時
const onClickAdd = () => {
  // テキストボックスの値を出力し、初期化する
  const input_text = document.getElementById("add_text").value;
  document.getElementById("add_text").value = "";

  create_incomplete_list(input_text);
}


// 未完了リストから指定の要素を削除
const delete_from_incomplete_list = (target) => {

    // 押された削除ボタンの親(div)の親(li)タグを未完了リストから削除する
    document.getElementById("incomplete_list").removeChild(target);
}


// 未完了リストに追加する関数
const create_incomplete_list = (text) => {
  //liタグの生成（今回中身はpタグに書くので生成だけ）
  const li = document.createElement("li");

  //divタグの生成→クラス名の付与(JSでdomの作成)
  const div = document.createElement("div");
  div.className = "list_row";

  //pタグの生成、クラス名の付与、pタグに内容を挿入
  const p_todo = document.createElement("p");
  p_todo.className = "list_content";
  p_todo.innerText = text;  
  
  // button(完了)タグ作成
  const complete_button = document.createElement("button");
  complete_button.innerText = "完了";

  // 完了ボタン
  complete_button.addEventListener("click", () => {
    // 押された完了ボタンの親(div)の親(li)タグを未完了リストから削除する
    // 親の親要素(li)がうまく取れないのでとりあえずこの書き方で
    // const delete_target = complete_button.parentNode.parentNode;
    delete_from_incomplete_list(complete_button.parentNode.parentNode)

    // complete_listに追加
    // 未完了リストから削除した要素を取得
      const add_target = complete_button.parentNode.parentNode;

    // 更に上記から、todo内容のテキストを取得
    // 子の子要素(p)がうまく取れないのでとりあえずこの書き方で
      const text = add_target.children[0].children[0].innerText;

    // div(list_row)の中身を初期化
    // (add_targetがli以下なので、更にその下のdivの中身を消す)
      add_target.children[0].textContent = null;
    
    //liタグとdivタグの生成はしなくてOK…上記で消す際にliと子のdivは残しているため

    //pタグの生成、クラス名の付与、pタグに内容を挿入
      const p_todo = document.createElement("p");
      p_todo.className = "list_content";
      p_todo.innerText = text;  
      
    // buttonタグ(戻す)の生成
      const back_button = document.createElement("button");
      back_button.innerText = "戻す";
      back_button.addEventListener("click", () => {
        // 戻すボタンを押された親の親要素タグ(li)を完了リストから削除
        const delete_target = back_button.parentNode.parentNode;
        document.getElementById("complete_list").removeChild(delete_target);

        // 削除したテキストの取得
        // previousElementSibling・・・直前の兄弟要素の取得
        const text = back_button.previousElementSibling.innerText;
        create_incomplete_list(text);
      });

    // (liタグの中の)divタグの子要素に各要素を設定
      add_target.children[0].appendChild(p_todo);
      add_target.children[0].appendChild(back_button);

    // 完了リストに追加する
    document.getElementById("complete_list").appendChild(add_target);
  });

  // button(削除)タグ作成
  const delete_button = document.createElement("button");
  delete_button.innerText = "削除";
  delete_button.addEventListener("click", () => {
    // 押された削除ボタンの親(div)の親(li)タグを未完了リストから削除する
    // 親の親要素(li)がうまく取れないのでとりあえずこの書き方で
    // const delete_target = delete_button.parentNode.parentNode;
    // document.getElementById("incomplete_list").removeChild(delete_target);
    delete_from_incomplete_list(delete_button.parentNode.parentNode);
  });

  //divタグの子要素に各要素を設定
  //(上で作ったliタグを収める)
  li.appendChild(div);
  div.appendChild(p_todo);
  div.appendChild(complete_button);
  div.appendChild(delete_button);

  //未完了のリストに追加する(ulの中にdivを収める)
  document.getElementById("incomplete_list").appendChild(li);
}


document
  .getElementById("add_button")
  .addEventListener("click", () => onClickAdd());